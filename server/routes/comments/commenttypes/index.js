const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { commentTypes, goals } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/getAll', async (request, response, next) => {
        try {
            const allCommentTypes = await commentTypes.getAll();

            return response.json(api.success(allCommentTypes));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/getById/:id', async (request, response, next) => {
        try {
            const isIdInt = helpers.isValidPositiveInteger(request.params.id);
            if (!isIdInt) {
                return response.status(500).json(api.error('Cannot be parsed into an integer'));
            }

            const commentType = await commentTypes.getById(request.params.id);
            if (!commentType) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(commentType));
        } catch (event) {
            return next(event);
        }
    });

    // CUSTOM ROUTES BELOW IMPLEMENTED FROM DAL IN .NET REPO
    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const goal = await goals.getById(request.body.GoalId);
            if (!goal) {
                errorList.GoalId = helpers.addErrorMessages('GoalId');
            }

            const newCommentType = await commentTypes.createCommentType(request.body);

            return response.status(201).json(newCommentType);
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
            const commentType = await commentTypes.getById(request.params.id);
            if (!commentType) {
                return response.status(404).json(api.error('', 404));
            }

            const goal = await goals.getById(request.body.GoalId);
            if (request.body.GoalId && !goal) {
                errorList.GoalId = helpers.addErrorMessages('GoalId');
            }

            const updatedCommentType = await commentTypes.updateCommentType(
                request.params.id, request.body,
            );

            return response.json(updatedCommentType);
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
            const isIdInt = helpers.isValidPositiveInteger(request.params.id);
            if (!isIdInt) {
                return response.status(500).json(api.error('Cannot be parsed into an integer'));
            }

            const commentType = await commentTypes.getById(request.params.id);
            if (!commentType) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteCommentType = await commentTypes.deleteCommentType(request.params.id);

            return response.json(api.success(deleteCommentType));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
