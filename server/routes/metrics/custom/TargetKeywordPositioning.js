/* eslint-disable max-len */
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { targetKeywordPositionings, projects, targetKeywords } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    // CUSTOM ROUTES BELOW IMPLEMENTED FROM DAL IN .NET REPO
    router.get('/targetKeywords/:targetKeywordId', async (request, response, next) => {
        try {
            const targetKeyword = await targetKeywords.getById(request.params.targetKeywordId);
            if (!targetKeyword) {
                const targetKeywordNotFound = helpers.addErrorMessages('TargetKeywordId');
                return response.status(404).json(api.error(targetKeywordNotFound, 404));
            }

            const targetKeywordPositioning = await targetKeywordPositionings.getByTargetKeywordIdLast(
                targetKeyword.Id,
            );

            return response.json(api.success(targetKeywordPositioning));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/projects/:projectId/firstSync', async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.projectId);
            if (!project) {
                const projectNotFound = helpers.addErrorMessages('ProjectId');
                return response.status(404).json(api.error(projectNotFound, 404));
            }

            const allTargetKeywordPositionings = await targetKeywordPositionings.getByProjectIdFirstSyncDate(
                request.params.projectId,
            );

            return response.json(api.success(allTargetKeywordPositionings));
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

            const allTargetKeywordPositionings = await targetKeywordPositionings.getByProjectIdLastSyncDate(
                request.params.projectId,
            );

            return response.json(api.success(allTargetKeywordPositionings));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/sum/period', async (request, response, next) => {
        try {
            const project = await projects.getById(request.body.ProjectId);
            if (!project) {
                const projectNotFound = helpers.addErrorMessages('ProjectId');
                return response.status(404).json(api.error(projectNotFound, 404));
            }

            const allTargetKeywordPositionings = await targetKeywordPositionings.getSumForPeriod(
                request.body.ProjectId, request.body.From, request.body.To,
            );

            return response.json(api.success(allTargetKeywordPositionings));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const project = await projects.getById(request.body.ProjectId);
            const targetKeyword = await targetKeywords.getById(request.body.TargetKeywordId);

            if (!project) {
                errorList.ProjectId = helpers.addErrorMessages('ProjectId');
            }
            if (!targetKeyword) {
                errorList.TargetKeywordId = helpers.addErrorMessages('TargetKeywordId');
            }

            const newTargetKeywordPositioning = await targetKeywordPositionings.createTargetKeywordPositioning(request.body);

            return response.status(201).json(api.success(newTargetKeywordPositioning));
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
