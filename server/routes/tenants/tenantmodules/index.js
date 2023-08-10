/* eslint-disable no-await-in-loop */
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { tenantModules, moduleTypes } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/tenants/:tenantId', async (request, response, next) => {
        try {
            const allTenantModules = await tenantModules.getAllByTenantId(request.params.tenantId);

            return response.json(api.success(allTenantModules));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const tenantModule = await tenantModules.getById(request.params.id);
            if (!tenantModule) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(tenantModule));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const moduleType = await moduleTypes.getById(request.body.ModuleTypeId);
            if (!moduleType) {
                errorList.ModuleTypeId = helpers.addErrorMessages('ModuleTypeId');
            }

            const newTenantModule = await tenantModules.createTenantModule(request.body);

            return response.status(201).json(api.success(newTenantModule));
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
            const newTenantModules = await tenantModules.bulkCreateTenantModule(request.body);

            return response.status(201).json(api.success(newTenantModules));
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
            const tenantModule = await tenantModules.getById(request.params.id);
            if (!tenantModule) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteTenantModule = await tenantModules.deleteTenantModule(request.params.id);

            return response.json(api.success(deleteTenantModule));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/bulkDelete', async (request, response, next) => {
        const errorList = {};

        try {
            for (let i = 0; i < request.body.length; i++) {
                const tenantModule = await tenantModules.getById(request.body[i]);

                if (!tenantModule) {
                    return response.status(404).json(api.error('', 404));
                }
            }

            const deleteTenantModules = await tenantModules.bulkDeleteTenantModule(request.body);

            return response.json(api.success(deleteTenantModules));
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
