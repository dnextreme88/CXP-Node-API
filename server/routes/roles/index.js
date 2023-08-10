const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../lib/Helpers');
const ApiResponse = require('../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { roles, userTypes } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/getAll', async (request, response, next) => {
        try {
            const allRoles = await roles.getAll();

            return response.json(api.success(allRoles));
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

            const role = await roles.getById(request.params.id);
            if (!role) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(role));
        } catch (event) {
            return next(event);
        }
    });

    // CUSTOM ROUTES BELOW IMPLEMENTED FROM DAL IN .NET REPO
    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const userType = await userTypes.getById(request.body.UserTypeId);
            if (!userType) {
                errorList.UserTypeId = helpers.addErrorMessages('UserTypeId');
            }

            const newRole = await roles.createRole(request.body);

            return response.status(201).json(api.success(newRole));
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

            const role = await roles.getById(request.params.id);
            if (!role) {
                return response.status(404).json(api.error('', 404));
            }

            const userType = await userTypes.getById(request.body.UserTypeId);
            if (request.body.UserTypeId && !userType) {
                errorList.UserTypeId = helpers.addErrorMessages('UserTypeId');
            }

            const updatedRole = await roles.updateRole(request.params.id, request.body);

            return response.json(api.success(updatedRole));
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

            const role = await roles.getById(request.params.id);
            if (!role) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteRole = await roles.deleteRole(request.params.id);

            return response.json(api.success(deleteRole));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
