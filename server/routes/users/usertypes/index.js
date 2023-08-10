const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { userTypes } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/getAll', async (request, response, next) => {
        try {
            const allUserTypes = await userTypes.getAll();

            return response.json(api.success(allUserTypes));
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

            const userType = await userTypes.getById(request.params.id);
            if (!userType) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(userType));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const newUserType = await userTypes.createUserType(request.body);

            return response.status(201).json(api.success(newUserType));
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
            const isIdInt = helpers.isValidPositiveInteger(request.params.id);
            if (!isIdInt) {
                return response.status(500).json(api.error('Cannot be parsed into an integer'));
            }

            const userType = await userTypes.getById(request.params.id);
            if (!userType) {
                return response.status(404).json(api.error('', 404));
            }

            const updatedUserType = await userTypes.updateUserType(request.params.id, request.body);

            return response.json(api.success(updatedUserType));
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
            const isIdInt = helpers.isValidPositiveInteger(request.params.id);
            if (!isIdInt) {
                return response.status(500).json(api.error('Cannot be parsed into an integer'));
            }

            const userType = await userTypes.getById(request.params.id);
            if (!userType) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteUserType = await userTypes.deleteUserType(request.params.id);

            return response.json(api.success(deleteUserType));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
