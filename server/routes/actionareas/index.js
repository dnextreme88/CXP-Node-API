const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../lib/Helpers');
const ApiResponse = require('../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { actionAreas } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/', async (request, response, next) => {
        try {
            const allActionAreas = await actionAreas.getAll();

            return response.json(api.success(allActionAreas));
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

            const actionArea = await actionAreas.getById(request.params.id);
            if (!actionArea) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(actionArea));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const newActionArea = await actionAreas.createActionArea(request.body);

            return response.status(201).json(api.success(newActionArea));
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

            const actionArea = await actionAreas.getById(request.params.id);
            if (!actionArea) {
                return response.status(404).json(api.error('', 404));
            }

            const updatedActionArea = await actionAreas.updateActionArea(
                request.params.id, request.body,
            );

            return response.json(api.success(updatedActionArea));
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

            const actionArea = await actionAreas.getById(request.params.id);
            if (!actionArea) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteActionArea = await actionAreas.deleteActionArea(request.params.id);

            return response.json(api.success(deleteActionArea));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
