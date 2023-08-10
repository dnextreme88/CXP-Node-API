/* eslint-disable max-len */
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../lib/Helpers');
const ApiResponse = require('../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { googleAnalyticTypes } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/', async (request, response, next) => {
        try {
            const allGoogleAnalyticTypes = await googleAnalyticTypes.getAll();

            return response.json(api.success(allGoogleAnalyticTypes));
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

            const googleAnalyticType = await googleAnalyticTypes.getById(request.params.id);
            if (!googleAnalyticType) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(googleAnalyticType));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const newGoogleAnalyticType = await googleAnalyticTypes.createGoogleAnalyticType(request.body);

            return response.status(201).json(api.success(newGoogleAnalyticType));
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

            const googleAnalyticType = await googleAnalyticTypes.getById(request.params.id);
            if (!googleAnalyticType) {
                return response.status(404).json(api.error('', 404));
            }

            const updatedGoogleAnalyticType = await googleAnalyticTypes.updateGoogleAnalyticType(request.params.id, request.body);

            return response.json(api.success(updatedGoogleAnalyticType));
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

            const googleAnalyticType = await googleAnalyticTypes.getById(request.params.id);
            if (!googleAnalyticType) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteGoogleAnalyticType = await googleAnalyticTypes.deleteGoogleAnalyticType(request.params.id);

            return response.json(api.success(deleteGoogleAnalyticType));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
