/* eslint-disable max-len */
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { targetPages, projects } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    // CUSTOM ROUTES BELOW IMPLEMENTED FROM DAL IN .NET REPO
    router.get('/projects/:projectId/keywords', async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.projectId);
            if (!project) {
                const projectNotFound = helpers.addErrorMessages('ProjectId');
                return response.status(404).json(api.error(projectNotFound, 404));
            }

            const allTargetPages = await targetPages.getAllByProjectIdWithKeywords(request.params.projectId);

            return response.json(api.success(allTargetPages));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/projects/:projectId/url/:url', async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.projectId);
            if (!project) {
                const projectNotFound = helpers.addErrorMessages('ProjectId');
                return response.status(404).json(api.error(projectNotFound, 404));
            }

            const targetPage = await targetPages.getByProjectIdAndUrlWithKeywords(
                request.params.projectId, request.params.url,
            );
            if (!targetPage) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(targetPage));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const project = await projects.getById(request.body.ProjectId);
            if (!project) {
                errorList.ProjectId = helpers.addErrorMessages('ProjectId');
            }

            const newTargetPage = await targetPages.createTargetPage(request.body);

            return response.status(201).json(api.success(newTargetPage));
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
            const targetPage = await targetPages.getById(request.params.id);
            if (!targetPage) {
                return response.status(404).json(api.error('', 404));
            }

            const project = await projects.getById(request.body.ProjectId);
            if (request.body.ProjectId && !project) {
                errorList.ProjectId = helpers.addErrorMessages('ProjectId');
            }

            const updatedTargetPage = await targetPages.updateTargetPage(request.params.id, request.body);

            return response.json(api.success(updatedTargetPage));
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

    return router;
};
