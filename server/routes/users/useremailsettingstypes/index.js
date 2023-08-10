/* eslint-disable max-len */
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { userEmailSettingsTypes } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/', async (request, response, next) => {
        try {
            const allUserEmailSettingsTypes = await userEmailSettingsTypes.getAll();

            return response.json(api.success(allUserEmailSettingsTypes));
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

            const userEmailSettingsType = await userEmailSettingsTypes.getById(request.params.id);
            if (!userEmailSettingsType) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(userEmailSettingsType));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const newUserEmailSettingsType = await userEmailSettingsTypes.createUserEmailSettingsType(request.body);

            return response.status(201).json(api.success(newUserEmailSettingsType));
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

            const userEmailSettingsType = await userEmailSettingsTypes.getById(request.params.id);
            if (!userEmailSettingsType) {
                return response.status(404).json(api.error('', 404));
            }

            const updatedUserEmailSettingsType = await userEmailSettingsTypes.updateUserEmailSettingsType(
                request.params.id, request.body,
            );

            return response.json(api.success(updatedUserEmailSettingsType));
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

            const userEmailSettingsType = await userEmailSettingsTypes.getById(request.params.id);
            if (!userEmailSettingsType) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteUserEmailSettingsType = await userEmailSettingsTypes.deleteUserEmailSettingsType(request.params.id);

            return response.json(api.success(deleteUserEmailSettingsType));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
