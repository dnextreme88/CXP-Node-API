/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
const express = require('express');
require('dotenv').config();
const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const ApiResponse = require('../lib/ApiResponse');
const AsanaService = require('../lib/AsanaService');
const UserResolverService = require('../lib/UserResolverService');

const formatOut = bformat({ outputMode: 'short' });
const logger = bunyan.createLogger({ name: 'asanaCommentSync', stream: formatOut, level: 'info' });

const router = express.Router();
const asanaAccessToken = process.env.ASANA_PERSONAL_ACCESS_TOKEN;

module.exports = (params) => {
    const { tasks, taskComments, users } = params;
    const api = new ApiResponse();
    const asana = new AsanaService(asanaAccessToken);
    const userResolver = new UserResolverService();

    router.post('/fetchComments', async (request, response, next) => {
        try {
            const today = new Date();

            let skip = 0;
            let newTaskCommentCount = 0;
            while (true) {
                const task = await tasks.getForAsanaSync(skip);
                if (task == null) break;

                skip++;

                // Execute Asana API request
                const asanaResponse = await asana.getStoriesForTask(task.AsanaGid);
                if (asanaResponse.error) {
                    return response.status(asanaResponse.statusCode).json(api.error(
                        asanaResponse.message, asanaResponse.statusCode,
                    ));
                }

                const newComments = [];
                const asanaComments = [];
                asanaResponse.data.forEach((story) => {
                    if (story.resource_subtype === 'comment_added' && story.text.includes('@customer')) {
                        asanaComments.push(story);
                    }
                });

                let taskComment = {};
                for (let i = 0; i < asanaComments.length; i++) {
                    for (let j = 0; j < task.taskComments.length; j++) {
                        if (task.taskComments[j].AsanaGid === asanaComments[i].gid) {
                            taskComment = task.taskComments[j];
                        } else {
                            taskComment = asanaComments[i];
                        }
                    }
                    taskComment.text = asanaComments[i].text.replace('@customer', '');

                    if (taskComment.created_by.email !== asanaComments[i].created_by.email) {
                        const user = await users.getByEmail(asanaComments[i].created_by.email);
                        taskComment.createdBy = user.dataValues;
                    }

                    const values = {
                        AsanaGid: taskComment.gid ? taskComment.gid : taskComment.AsanaGid,
                        Text: taskComment.text ? taskComment.text : taskComment.Text,
                        CreatedById: await userResolver.getUserId(),
                        TaskId: task.Id,
                    };
                    await taskComments.createTaskComment(values);
                    newTaskCommentCount++;

                    newComments.push(taskComment);
                }
                task.TaskComments = newComments;
                await task.save();
            }

            const newToday = new Date().toLocaleString();

            return response.json(api.success(
                { newTaskCommentRecords: newTaskCommentCount },
                `Sync started at ${today.toLocaleString()} and was completed on ${newToday}`,
            ));
        } catch (e) {
            logger.info('An exception was caught...');
            logger.fatal(e);
            return next(e);
        }
    });

    return router;
};
