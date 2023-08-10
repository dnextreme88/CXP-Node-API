/* eslint-disable max-len */
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../lib/Helpers');
const ApiResponse = require('../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { googleAnalyticPagePaths, projects, googleAnalyticTypes } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/', async (request, response, next) => {
        const errorList = {};

        try {
            const { projectId, gaTypeId } = request.query;
            const project = await projects.getById(projectId);
            if (!project) {
                errorList.ProjectId = helpers.addErrorMessages('ProjectId');
            }

            const googleAnalyticType = await googleAnalyticTypes.getById(gaTypeId);
            if (!googleAnalyticType) {
                errorList.GoogleAnalyticTypeId = helpers.addErrorMessages('GoogleAnalyticTypeId');
            }

            if (Object.keys(errorList).length > 0) {
                return response.status(404).json(api.error(errorList, 404));
            }

            const allGoogleAnalyticPagePaths = await googleAnalyticPagePaths.getAllByProjectIdAndGoogleAnalyticTypeId(
                projectId, gaTypeId,
            );

            return response.json(api.success(allGoogleAnalyticPagePaths));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const googleAnalyticPagePath = await googleAnalyticPagePaths.getById(request.params.id);
            if (!googleAnalyticPagePath) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(googleAnalyticPagePath));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const newGoogleAnalyticPagePath = await googleAnalyticPagePaths.createGoogleAnalyticPagePath(request.body);

            return response.status(201).json(api.success(newGoogleAnalyticPagePath));
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
            const googleAnalyticPagePath = await googleAnalyticPagePaths.getById(request.params.id);
            if (!googleAnalyticPagePath) {
                return response.status(404).json(api.error('', 404));
            }

            const updatedGoogleAnalyticPagePath = await googleAnalyticPagePaths.updateGoogleAnalyticPagePath(
                request.params.id, request.body,
            );

            return response.json(api.success(updatedGoogleAnalyticPagePath));
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
            const googleAnalyticPagePath = await googleAnalyticPagePaths.getById(request.params.id);
            if (!googleAnalyticPagePath) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteGoogleAnalyticPagePath = await googleAnalyticPagePaths.deleteGoogleAnalyticPagePath(
                request.params.id,
            );

            return response.json(api.success(deleteGoogleAnalyticPagePath));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
