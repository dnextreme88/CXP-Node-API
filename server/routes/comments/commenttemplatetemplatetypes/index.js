/* eslint-disable max-len */
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const {
        commentTemplateTemplateTypes, commentTemplateTypes, commentTemplates, tenants,
    } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/', async (request, response, next) => {
        try {
            const { tenantId } = request.query;
            const tenant = await tenants.getById(tenantId);
            if (!tenant) {
                const tenantNotFound = helpers.addErrorMessages('TenantId');
                return response.status(404).json(api.error(tenantNotFound, 404));
            }

            const allCommentTemplateTemplateTypes = await commentTemplateTemplateTypes.getAllByTenantId(tenantId);

            return response.json(api.success(allCommentTemplateTemplateTypes));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/commentTemplates/:commentTemplateId', async (request, response, next) => {
        try {
            const commentTemplate = await commentTemplates.getById(request.params.commentTemplateId);
            if (!commentTemplate) {
                const commentTemplateNotFound = helpers.addErrorMessages('CommentTemplateId');
                return response.status(404).json(api.error(commentTemplateNotFound, 404));
            }

            const allCommentTemplateTemplateTypes = await commentTemplateTemplateTypes.getAllByCommentTemplateId(
                request.params.commentTemplateId,
            );

            return response.json(api.success(allCommentTemplateTemplateTypes));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const commentTemplateTemplateType = await commentTemplateTemplateTypes.getById(request.params.id);
            if (!commentTemplateTemplateType) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(commentTemplateTemplateType));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const commentTemplateType = await commentTemplateTypes.getById(request.body.CommentTemplateTypeId);
            const commentTemplate = await commentTemplates.getById(request.body.CommentTemplateId);

            if (!commentTemplateType) {
                errorList.CommentTemplateTypeId = helpers.addErrorMessages('CommentTemplateTypeId');
            }
            if (!commentTemplate) {
                errorList.CommentTemplateId = helpers.addErrorMessages('CommentTemplateId');
            }

            const newCommentTemplateTemplateType = await commentTemplateTemplateTypes.createCommentTemplateTemplateType(request.body);

            return response.status(201).json(api.success(newCommentTemplateTemplateType));
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
            const commentTemplateTemplateType = await commentTemplateTemplateTypes.getById(request.params.id);
            if (!commentTemplateTemplateType) {
                return response.status(404).json(api.error('', 404));
            }

            const commentTemplateType = await commentTemplateTypes.getById(request.body.CommentTemplateTypeId);
            const commentTemplate = await commentTemplates.getById(request.body.CommentTemplateId);

            if (request.body.CommentTemplateTypeId && !commentTemplateType) {
                errorList.CommentTemplateTypeId = helpers.addErrorMessages('CommentTemplateTypeId');
            }
            if (request.body.CommentTemplateId && !commentTemplate) {
                errorList.CommentTemplateId = helpers.addErrorMessages('CommentTemplateId');
            }

            const updatedCommentTemplateTemplateType = await commentTemplateTemplateTypes.updateCommentTemplateTemplateType(
                request.params.id, request.body,
            );

            return response.json(api.success(updatedCommentTemplateTemplateType));
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
            const commentTemplateTemplateType = await commentTemplateTemplateTypes.getById(request.params.id);
            if (!commentTemplateTemplateType) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteCommentTemplateTemplateType = await commentTemplateTemplateTypes.deleteCommentTemplateTemplateType(
                request.params.id,
            );

            return response.json(api.success(deleteCommentTemplateTemplateType));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
