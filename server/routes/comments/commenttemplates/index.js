/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
const express = require('express');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');
const UserResolverService = require('../../../lib/UserResolverService');

const router = express.Router();

module.exports = (params) => {
    const { commentTemplates, commentTemplateTemplateTypes, tenants, users } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();
    const userResolver = new UserResolverService();

    router.get('/getAll', async (request, response, next) => {
        try {
            const tenantId = await userResolver.getTenantId();
            const tenant = await tenants.getById(tenantId);
            if (!tenant) {
                const tenantNotFound = helpers.addErrorMessages('TenantId');
                return response.status(404).json(api.error(tenantNotFound, 404));
            }

            const allCommentTemplates = await commentTemplates.getAllByTenantId(tenantId);

            return response.json(api.success(allCommentTemplates));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/create', async (request, response, next) => {
        try {
            // Create comment template and comment template types based on request.body.Type (which is an array)
            const newCommentTemplate = await commentTemplates.createCommentTemplate(request.body);

            const commentTemplateObj = { Id: newCommentTemplate.Id };

            return response.status(201).json(api.success(commentTemplateObj));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/update', async (request, response, next) => {
        try {
            const commentTemplate = await commentTemplates.getById(request.body.Id);
            if (!commentTemplate) {
                return response.status(404).json(api.error('', 404));
            }

            const updatedCommentTemplate = await commentTemplates.updateCommentTemplate(
                request.body.Id, request.body,
            );

            const allCommentTemplateTemplateTypes = await commentTemplateTemplateTypes.getAllByCommentTemplateId(
                request.body.Id,
            );

            // Delete previous comment template template type records
            for (let i = 0; i < allCommentTemplateTemplateTypes.length; i++) {
                await commentTemplateTemplateTypes.deleteCommentTemplateTemplateType(
                    allCommentTemplateTemplateTypes[i].Id,
                );
            }

            // Create new comment template template type records
            for (let j = 0; j < request.body.Type.length; j++) {
                const commentTemplateTemplateTypeValues = {
                    CommentTemplateId: request.body.Id,
                    CommentTemplateTypeId: request.body.Type[j],
                };

                await commentTemplateTemplateTypes.createCommentTemplateTemplateType(
                    commentTemplateTemplateTypeValues,
                );
            }
            const commentTemplateObj = { Id: updatedCommentTemplate.Id };

            return response.json(api.success(commentTemplateObj));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/getPaged', async (request, response, next) => {
        const commentTemplateNoUserArray = [];
        let itemUser = {};
        let itemType = {};

        try {
            const allCommentTemplates = await commentTemplates.getPagged(request.body);

            for (let i = 0; i < allCommentTemplates.length; i++) {
                const commentTemplateTypeArray = [];
                const commentTemplate = await commentTemplates.getById(allCommentTemplates[i].Id);
                const user = await users.getById(allCommentTemplates[i].ModifiedById);

                itemUser = { CreatedBy: user.FirstLastName, CreatedAt: commentTemplate.ModifiedAt };

                const allCommentTemplateTemplateTypes = await commentTemplateTemplateTypes.getAllByCommentTemplateId(
                    allCommentTemplates[i].Id,
                );
                // Add an array before pushing to Type key
                for (let j = 0; j < allCommentTemplateTemplateTypes.length; j++) {
                    commentTemplateTypeArray.push(allCommentTemplateTemplateTypes[j].CommentTemplateTypeId);
                }

                itemType = { ...itemUser, Type: commentTemplateTypeArray };

                commentTemplateNoUserArray.push(itemType);
            }

            return response.json(api.success(allCommentTemplates));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const commentTemplate = await commentTemplates.getById(request.params.id);
            if (!commentTemplate) {
                return response.status(404).json(api.error('', 404));
            }

            const commentTemplateTypes = [];
            const allCommentTemplateTemplateTypes = await commentTemplateTemplateTypes.getAllByCommentTemplateId(request.params.id);
            allCommentTemplateTemplateTypes.forEach((commentTemplateType) => {
                commentTemplateTypes.push(commentTemplateType.CommentTemplateTypeId);
            });

            const user = await users.getById(commentTemplate.ModifiedById);

            const commentTemplateObj = {
                Type: commentTemplateTypes,
                CreatedBy: user.FirstLastName,
                CreatedAt: commentTemplate.ModifiedAt,
            };

            return response.json(api.success(commentTemplateObj));
        } catch (event) {
            return next(event);
        }
    });

    router.delete('/:id', async (request, response, next) => {
        try {
            const commentTemplate = await commentTemplates.getById(request.params.id);
            if (!commentTemplate) {
                return response.status(404).json(api.error('', 404));
            }

            const allCommentTemplateTemplateTypes = await commentTemplateTemplateTypes.getAllByCommentTemplateId(
                request.params.id,
            );
            for (let i = 0; i < allCommentTemplateTemplateTypes.length; i++) {
                await commentTemplateTemplateTypes.deleteCommentTemplateTemplateType(
                    allCommentTemplateTemplateTypes[i].Id,
                );
            }

            const deleteCommentTemplate = await commentTemplates.deleteCommentTemplate(request.params.id);

            return response.json(api.success(deleteCommentTemplate));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
