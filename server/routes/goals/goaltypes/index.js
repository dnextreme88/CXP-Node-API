const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { goalTypes } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/getAll', async (request, response, next) => {
        try {
            const allGoalTypes = await goalTypes.getAll();

            return response.json(api.success(allGoalTypes));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/getById/:id', async (request, response, next) => {
        try {
            const isIdInt = helpers.isValidPositiveInteger(request.params.id);
            if (!isIdInt) {
                return response.status(500).json(api.error('Cannot be parsed into an integer'));
            }

            const goalType = await goalTypes.getById(request.params.id);
            if (!goalType) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(goalType));
        } catch (event) {
            return next(event);
        }
    });

    // CUSTOM ROUTES BELOW IMPLEMENTED FROM DAL IN .NET REPO
    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const newGoalType = await goalTypes.createGoalType(request.body);

            return response.status(201).json(api.success(newGoalType));
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

            const goalType = await goalTypes.getById(request.params.id);
            if (!goalType) {
                return response.status(404).json(api.error('', 404));
            }

            const updatedGoalType = await goalTypes.updateGoalType(request.params.id, request.body);

            return response.json(api.success(updatedGoalType));
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

            const goalType = await goalTypes.getById(request.params.id);
            if (!goalType) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteGoalType = await goalTypes.deleteGoalType(request.params.id);

            return response.json(api.success(deleteGoalType));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
