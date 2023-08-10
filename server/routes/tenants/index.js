const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../lib/Helpers');
const ApiResponse = require('../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { tenants, users } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('getById/:id', async (request, response, next) => {
        try {
            const tenant = await tenants.getById(request.params.id);
            if (!tenant) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(tenant));
        } catch (event) {
            return next(event);
        }
    });

    router.get('toggleActive/:id', async (request, response, next) => {
        try {
            const tenant = await tenants.getById(request.params.id);
            if (!tenant) {
                return response.status(404).json(api.error('', 404));
            }

            const toggleActive = await tenants.toggleActive(request.params.id);

            return response.json(api.success(toggleActive));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/getPaged', async (request, response, next) => {
        const errorList = {};

        try {
            const { Page, Take } = request.query;
            const checkIfPageIsInt = helpers.isValidPositiveInteger(Page);
            const checkIfTakeIsInt = helpers.isValidPositiveInteger(Take);

            if (checkIfPageIsInt.error === true) {
                errorList.page = checkIfPageIsInt.message;
            }

            if (checkIfTakeIsInt.error === true) {
                errorList.take = checkIfTakeIsInt.message;
            }

            const paginationParams = { Page, Take };
            const allTenants = await tenants.getPaged(paginationParams);
            if (allTenants.length === 0) {
                return response.status(404).json(api.error('Next page not found', 404));
            }

            return response.json(api.success(allTenants));
        } catch (event) {
            response.status(500).json({
                errors: errorList,
                statusCode: 500,
            });

            return next(event);
        }
    });

    router.get('/getAll', async (request, response, next) => {
        try {
            const allTenants = await tenants.getAll();

            return response.json(api.success(allTenants));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/create', async (request, response, next) => {
        const errorList = {};

        try {
            const user = await users.getById(request.body.UserId);
            if (!user) {
                const userNotFound = helpers.addErrorMessages('UserId');
                return response.status(404).json(api.error(userNotFound, 404));
            }

            const newTenant = await tenants.createTenant(request.body);

            return response.status(201).json(api.success(newTenant));
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

    router.put('/update', async (request, response, next) => {
        const errorList = {};

        try {
            const tenant = await tenants.getById(request.body.Id);
            if (!tenant) {
                return response.status(404).json(api.error('', 404));
            }

            const updatedTenant = await tenants.updateTenant(request.body.Id, request.body);

            return response.json(api.success(updatedTenant));
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

    router.delete('/delete/:id', async (request, response, next) => {
        try {
            const tenant = await tenants.getById(request.params.id);
            if (!tenant) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteTenant = await tenants.deleteTenant(request.params.id);

            return response.json(api.success(deleteTenant));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
