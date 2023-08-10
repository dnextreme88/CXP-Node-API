/* eslint-disable max-len */
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { commentTemplateTypes } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/', async (request, response, next) => {
        try {
            const allCommentTemplateTypes = await commentTemplateTypes.getAll();

            return response.json(api.success(allCommentTemplateTypes));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const isIdInt = helpers.isValidPositiveInteger(request.params.id);
            if (!isIdInt) {
                return response.status(500).json(api.error('Cannot be parsed into an integer'));
            }

            const commentTemplateType = await commentTemplateTypes.getById(request.params.id);
            if (!commentTemplateType) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(commentTemplateType));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const newCommentTemplateType = await commentTemplateTypes.createCommentTemplateType(request.body);

            return response.status(201).json(api.success(newCommentTemplateType));
        } catch (event) {
            if (event instanceof ValidationError) {
                event.errors.forEach((error) => {
                    errorList[error.path] = error.message;
                });

                response.status(500).json({ errors: errorList, statusCode: 500 });
            }

            return next(event);
        }
    });

    // UPDATE
    router.post('/:id/update', async (request, response, next) => {
        const errorList = {};

        try {
            const isIdInt = helpers.isValidPositiveInteger(request.params.id);
            if (!isIdInt) {
                return response.status(500).json(api.error('Cannot be parsed into an integer'));
            }

            const commentTemplateType = await commentTemplateTypes.getById(request.params.id);
            if (!commentTemplateType) {
                return response.status(404).json(api.error('', 404));
            }

            const updatedCommentTemplateType = await commentTemplateTypes.updateCommentTemplateType(
                request.params.id, request.body,
            );

            return response.json(api.success(updatedCommentTemplateType));
        } catch (event) {
            if (event instanceof ValidationError) {
                event.errors.forEach((error) => {
                    errorList[error.path] = error.message;
                });

                response.status(500).json({ errors: errorList, statusCode: 500 });
            }

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

            const commentTemplateType = await commentTemplateTypes.getById(request.params.id);
            if (!commentTemplateType) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteCommentTemplateType = await commentTemplateTypes.deleteCommentTemplateType(request.params.id);

            return response.json(api.success(deleteCommentTemplateType));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
