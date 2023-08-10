/* eslint-disable max-len */
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../lib/Helpers');
const ApiResponse = require('../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { moduleTypes } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/', async (request, response, next) => {
        try {
            const allModuleTypes = await moduleTypes.getAll();

            return response.json(api.success(allModuleTypes));
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

            const moduleType = await moduleTypes.getById(request.params.id);
            if (!moduleType) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(moduleType));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const newModuleType = await moduleTypes.createModuleType(request.body);

            return response.status(201).json(api.success(newModuleType));
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

            const moduleType = await moduleTypes.getById(request.params.id);
            if (!moduleType) {
                return response.status(404).json(api.error('', 404));
            }

            const updatedModuleType = await moduleTypes.updateModuleType(request.params.id, request.body);

            return response.json(api.success(updatedModuleType));
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

            const moduleType = await moduleTypes.getById(request.params.id);
            if (!moduleType) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteModuleType = await moduleTypes.deleteModuleType(request.params.id);

            return response.json(api.success(deleteModuleType));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
