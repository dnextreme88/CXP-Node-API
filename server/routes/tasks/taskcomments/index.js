const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { taskComments, tasks } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/', async (request, response, next) => {
        try {
            const allTaskComments = await taskComments.getAll();

            return response.json(api.success(allTaskComments));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const taskComment = await taskComments.getById(request.params.id);
            if (!taskComment) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(taskComment));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const task = await tasks.getById(request.body.TaskId);
            if (!task) {
                errorList.TaskId = helpers.addErrorMessages('TaskId');
            }

            const newTaskComment = await taskComments.createTaskComment(request.body);

            return response.status(201).json(api.success(newTaskComment));
        } catch (event) {
            if (event instanceof ValidationError) {
                event.errors.forEach((error) => {
                    errorList[error.path] = error.message;
                });
            }

            response.status(500).json({
                errors: errorList,
                statusCode: 500,
            });

            return next(event);
        }
    });

    // UPDATE
    router.post('/:id/update', async (request, response, next) => {
        const errorList = {};

        try {
            const taskComment = await taskComments.getById(request.params.id);
            if (!taskComment) {
                return response.status(404).json(api.error('', 404));
            }

            const task = await tasks.getById(request.body.TaskId);
            if (request.body.TaskId && !task) {
                errorList.TaskId = helpers.addErrorMessages('TaskId');
            }

            const updatedTaskComment = await taskComments.updateTaskComment(
                request.params.id, request.body,
            );

            return response.json(api.success(updatedTaskComment));
        } catch (event) {
            if (event instanceof ValidationError) {
                event.errors.forEach((error) => {
                    errorList[error.path] = error.message;
                });
            }

            response.status(500).json({
                errors: errorList,
                statusCode: 500,
            });

            return next(event);
        }
    });

    // DELETE
    router.post('/:id/delete', async (request, response, next) => {
        try {
            const taskComment = await taskComments.getById(request.params.id);
            if (!taskComment) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteTaskComment = await taskComments.deleteTaskComment(request.params.id);

            return response.json(api.success(deleteTaskComment));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
