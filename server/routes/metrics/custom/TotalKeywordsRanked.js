const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { totalKeywordsRankeds, targetPages, projects } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    // CUSTOM ROUTES BELOW IMPLEMENTED FROM DAL IN .NET REPO
    router.get('/projects/:projectId/firstSync', async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.projectId);
            if (!project) {
                const projectNotFound = helpers.addErrorMessages('ProjectId');
                return response.status(404).json(api.error(projectNotFound, 404));
            }

            const totalKeywordsRanked = await totalKeywordsRankeds.getByProjectIdFirstSyncDate(
                request.params.projectId,
            );

            return response.json(api.success(totalKeywordsRanked));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/projects/:projectId/lastSync', async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.projectId);
            if (!project) {
                const projectNotFound = helpers.addErrorMessages('ProjectId');
                return response.status(404).json(api.error(projectNotFound, 404));
            }

            const totalKeywordsRanked = await totalKeywordsRankeds.getByProjectIdLastSyncDate(
                request.params.projectId,
            );

            return response.json(api.success(totalKeywordsRanked));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const project = await projects.getById(request.body.ProjectId);
            const targetPage = await targetPages.getById(request.body.TargetPageId);

            if (!project) {
                errorList.ProjectId = helpers.addErrorMessages('ProjectId');
            }
            if (!targetPage) {
                errorList.TargetPageId = helpers.addErrorMessages('TargetPageId');
            }

            const newTotalKeywordsRanked = await totalKeywordsRankeds.createTotalKeywordsRanked(
                request.body,
            );

            return response.status(201).json(api.success(newTotalKeywordsRanked));
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
