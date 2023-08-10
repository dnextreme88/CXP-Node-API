const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../lib/Helpers');
const ApiResponse = require('../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { dsTypes } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/', async (request, response, next) => {
        try {
            const allDsTypes = await dsTypes.getAll();

            return response.json(api.success(allDsTypes));
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

            const dsType = await dsTypes.getById(request.params.id);
            if (!dsType) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(dsType));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const newDsType = await dsTypes.createDsType(request.body);

            return response.status(201).json(api.success(newDsType));
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

            const dsType = await dsTypes.getById(request.params.id);
            if (!dsType) {
                return response.status(404).json(api.error('', 404));
            }

            const updatedDsType = await dsTypes.updateDsType(request.params.id, request.body);

            return response.json(api.success(updatedDsType));
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

            const dsType = await dsTypes.getById(request.params.id);
            if (!dsType) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteDsType = await dsTypes.deleteDsType(request.params.id);

            return response.json(api.success(deleteDsType));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
