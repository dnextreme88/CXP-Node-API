/* eslint-disable max-len */
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { projectStatuses } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/', async (request, response, next) => {
        try {
            const allProjectStatuses = await projectStatuses.getAll();

            return response.json(api.success(allProjectStatuses));
        } catch (event) {
            return next(event);
        }
    });

    // CUSTOM ROUTES BELOW IMPLEMENTED FROM DAL IN .NET REPO
    router.get('/:id', async (request, response, next) => {
        try {
            const isIdInt = helpers.isValidPositiveInteger(request.params.id);
            if (!isIdInt) {
                return response.status(500).json(api.error('Cannot be parsed into an integer'));
            }

            const projectStatus = await projectStatuses.getById(request.params.id);
            if (!projectStatus) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(projectStatus));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const newProjectStatus = await projectStatuses.createProjectStatus(request.body);

            return response.status(201).json(api.success(newProjectStatus));
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

            if (!request.body.Name) {
                return response.status(500).json(api.error('No values being passed'));
            }

            const projectStatus = await projectStatuses.getById(request.params.id);
            if (!projectStatus) {
                return response.status(404).json(api.error('', 404));
            }

            const updatedProjectStatus = await projectStatuses.updateProjectStatus(
                request.params.id, request.body,
            );

            return response.json(api.success(updatedProjectStatus));
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

            const projectStatus = await projectStatuses.getById(request.params.id);
            if (!projectStatus) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteProjectStatus = await projectStatuses.deleteProjectStatus(request.params.id);

            return response.json(api.success(deleteProjectStatus));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
