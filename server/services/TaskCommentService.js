const uuid = require('uuid').v4;
const db = require('../models');

class TaskCommentService {
    constructor(log) {
        this.log = log;
    }

    async getAll() {
        const taskComments = await db.TaskComment.findAll({
            order: [['CreatedAt', 'ASC']],
        });

        return taskComments;
    }

    async getById(id) {
        const taskComment = await db.TaskComment.findByPk(id);

        return taskComment;
    }

    async createTaskComment(body) {
        const values = {
            Id: uuid(),
            AsanaGid: body.AsanaGid,
            Text: body.Text,
            CreatedAt: new Date(),
            CreatedById: body.CreatedById,
            TaskId: body.TaskId,
        };
        const newTaskComment = await db.TaskComment.create(values);

        return newTaskComment;
    }

    async updateTaskComment(id, body) {
        const taskComment = await db.TaskComment.findByPk(id);
        let taskId;

        if (body.TaskId) {
            taskId = body.TaskId;
        }

        const values = {
            AsanaGid: body.AsanaGid ? body.AsanaGid : taskComment.AsanaGid,
            Text: body.Text ? body.Text : taskComment.Text,
            CreatedAt: taskComment.CreatedAt,
            CreatedById: taskComment.CreatedById,
            TaskId: taskId,
        };
        const updateTaskComment = await db.TaskComment.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateTaskComment[1].dataValues;
    }

    async deleteTaskComment(id) {
        await db.TaskComment.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = TaskCommentService;
