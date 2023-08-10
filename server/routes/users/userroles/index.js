/* eslint-disable no-await-in-loop */
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { userRoles, roles, users } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/', async (request, response, next) => {
        try {
            const allUserRoles = await userRoles.getAll();

            return response.json(api.success(allUserRoles));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/users/:userId', async (request, response, next) => {
        try {
            const allUserRoles = await userRoles.getAllByUserId(request.params.userId);

            return response.json(api.success(allUserRoles));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const userRole = await userRoles.getById(request.params.id);
            if (!userRole) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(userRole));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const role = await roles.getById(request.body.RoleId);
            const user = await users.getById(request.body.UserId);

            if (!role) {
                errorList.RoleId = helpers.addErrorMessages('RoleId');
            }
            if (!user) {
                errorList.UserId = helpers.addErrorMessages('UserId');
            }

            const newUserRole = await userRoles.createUserRole(request.body);

            return response.status(201).json(api.success(newUserRole));
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

    router.post('/bulkCreate', async (request, response, next) => {
        const errorList = {};

        try {
            const newUserRoles = await userRoles.bulkCreateUserRole(request.body);

            return response.status(201).json(api.success(newUserRoles));
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
            const userRole = await userRoles.getById(request.params.id);
            if (!userRole) {
                return response.status(404).json(api.error('', 404));
            }

            const role = await roles.getById(request.body.RoleId);
            const user = await users.getById(request.body.UserId);

            if (request.body.RoleId && !role) {
                errorList.RoleId = helpers.addErrorMessages('RoleId');
            }
            if (request.body.UserId && !user) {
                errorList.UserId = helpers.addErrorMessages('UserId');
            }

            const updatedUserRole = await userRoles.updateUserRole(request.params.id, request.body);

            return response.json(api.success(updatedUserRole));
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
            const userRole = await userRoles.getById(request.params.id);
            if (!userRole) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteUserRole = await userRoles.deleteUserRole(request.params.id);

            return response.json(api.success(deleteUserRole));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/bulkDelete', async (request, response, next) => {
        const errorList = {};

        try {
            for (let i = 0; i < request.body.length; i++) {
                const userRole = await userRoles.getById(request.body[i]);

                if (!userRole) {
                    return response.status(404).json(api.error('', 404));
                }
            }

            const deleteUserRoles = await userRoles.bulkDeleteUserRole(request.body);

            return response.json(api.success(deleteUserRoles));
        } catch (event) {
            errorList.Id = 'Must pass an array whose datatype are all UUID';

            response.status(500).json({
                errors: errorList,
                statusCode: 500,
            });

            return next(event);
        }
    });

    return router;
};
