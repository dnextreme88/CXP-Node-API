/* eslint-disable max-len */
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../lib/Helpers');
const ApiResponse = require('../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { googleAnalyticValues, googleAnalyticTypes, projects } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/', async (request, response, next) => {
        try {
            const {
                tenantId, gaTypeId, projectId, from, to,
            } = request.query;
            const allGoogleAnalyticValues = await googleAnalyticValues.getAllByRange(
                tenantId, gaTypeId, projectId, from, to,
            );

            return response.json(api.success(allGoogleAnalyticValues));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/organic/30days', async (request, response, next) => {
        try {
            const { projectId } = request.query;
            const project = await projects.getById(projectId);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            const allGoogleAnalyticValues = await googleAnalyticValues.getAllOrganicLast30Days(projectId);

            return response.json(api.success(allGoogleAnalyticValues));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/eCommerce/30days', async (request, response, next) => {
        try {
            const { projectId } = request.query;
            const project = await projects.getById(projectId);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            const allGoogleAnalyticValues = await googleAnalyticValues.getAlleCommerceLast30Days(projectId);

            return response.json(api.success(allGoogleAnalyticValues));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/goals/30days', async (request, response, next) => {
        try {
            const { projectId } = request.query;
            const project = await projects.getById(projectId);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            const allGoogleAnalyticValues = await googleAnalyticValues.getAllGoalCompletionsLast30Days(projectId);

            return response.json(api.success(allGoogleAnalyticValues));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const googleAnalyticValue = await googleAnalyticValues.getById(request.params.id);
            if (!googleAnalyticValue) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(googleAnalyticValue));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/process/first', async (request, response, next) => {
        const errorList = {};

        try {
            const googleAnalyticType = await googleAnalyticTypes.getById(request.body.GoogleAnalyticTypeId);
            const project = await projects.getById(request.body.ProjectId);

            if (!googleAnalyticType) {
                errorList.GoogleAnalyticTypeId = helpers.addErrorMessages('GoogleAnalyticTypeId');
            }
            if (!project) {
                errorList.ProjectId = helpers.addErrorMessages('ProjectId');
            }

            const firstProcessDate = await googleAnalyticValues.getFirstProcessDate(
                request.body.TenantId, googleAnalyticType.Id, project.Id,
            );

            return response.json(api.success(firstProcessDate));
        } catch (event) {
            response.status(500).json({
                errors: errorList,
                statusCode: 500,
            });

            return next(event);
        }
    });

    router.post('/process/last', async (request, response, next) => {
        const errorList = {};

        try {
            const googleAnalyticType = await googleAnalyticTypes.getById(request.body.GoogleAnalyticTypeId);
            const project = await projects.getById(request.body.ProjectId);

            if (!googleAnalyticType) {
                errorList.GoogleAnalyticTypeId = helpers.addErrorMessages('GoogleAnalyticTypeId');
            }
            if (!project) {
                errorList.ProjectId = helpers.addErrorMessages('ProjectId');
            }

            const firstProcessDate = await googleAnalyticValues.getLastProcessDate(
                request.body.TenantId, googleAnalyticType.Id, project.Id,
            );

            return response.json(api.success(firstProcessDate));
        } catch (event) {
            response.status(500).json({
                errors: errorList,
                statusCode: 500,
            });

            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const googleAnalyticType = await googleAnalyticTypes.getById(request.body.GoogleAnalyticTypeId);
            const project = await projects.getById(request.body.ProjectId);

            if (!googleAnalyticType) {
                errorList.GoogleAnalyticTypeId = helpers.addErrorMessages('GoogleAnalyticTypeId');
            }
            if (!project) {
                errorList.ProjectId = helpers.addErrorMessages('ProjectId');
            }

            const newGoogleAnalyticValue = await googleAnalyticValues.createGoogleAnalyticValue(request.body);

            return response.status(201).json(api.success(newGoogleAnalyticValue));
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
            const googleAnalyticValue = await googleAnalyticValues.getById(request.params.id);
            if (!googleAnalyticValue) {
                return response.status(404).json(api.error('', 404));
            }

            const googleAnalyticType = await googleAnalyticTypes.getById(request.body.GoogleAnalyticTypeId);
            const project = await projects.getById(request.body.ProjectId);

            if (request.body.GoogleAnalyticTypeId && !googleAnalyticType) {
                errorList.GoogleAnalyticTypeId = helpers.addErrorMessages('GoogleAnalyticTypeId');
            }
            if (request.body.ProjectId && !project) {
                errorList.ProjectId = helpers.addErrorMessages('ProjectId');
            }

            const updatedGoogleAnalyticValue = await googleAnalyticValues.updateGoogleAnalyticValue(
                request.params.id, request.body,
            );

            return response.json(api.success(updatedGoogleAnalyticValue));
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
            const googleAnalyticValue = await googleAnalyticValues.getById(request.params.id);
            if (!googleAnalyticValue) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteGoogleAnalyticValue = await googleAnalyticValues.deleteGoogleAnalyticValue(request.params.id);

            return response.json(api.success(deleteGoogleAnalyticValue));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
