/* eslint-disable max-len */
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { tenantSettings, tenants } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/asana/settings', async (request, response, next) => {
        try {
            const allTenantSettings = await tenantSettings.getAllAsanaSettings();

            return response.json(api.success(allTenantSettings));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/asana/hookSecret', async (request, response, next) => {
        try {
            const asanaHookSecret = await tenantSettings.getAsanaHookSecret();
            if (!asanaHookSecret) {
                return response.status(404).json(api.error('Asana hook not found', 404));
            }

            return response.json(api.success(asanaHookSecret));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/asana/hookSecret', async (request, response, next) => {
        try {
            const asanaHookSecret = await tenantSettings.insertAsanaHookSecret(request.body.HookSecret);
            if (asanaHookSecret.error === true) {
                return response.status(asanaHookSecret.statusCode).json(api.error(
                    asanaHookSecret.message, asanaHookSecret.statusCode,
                ));
            }

            return response.json(api.success(asanaHookSecret));
        } catch (event) {
            return next(event);
        }
    });

    // CUSTOM ROUTES BELOW IMPLEMENTED FROM DAL IN .NET REPO
    router.get('/', async (request, response, next) => {
        try {
            const allTenantSettings = await tenantSettings.getAll();

            return response.json(api.success(allTenantSettings));
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
            const allTenantSettings = await tenantSettings.getPaged(paginationParams);
            if (allTenantSettings.length === 0) {
                return response.status(404).json(api.error('Next page not found', 404));
            }

            return response.json(api.success(allTenantSettings));
        } catch (event) {
            response.status(500).json({
                errors: errorList,
                statusCode: 500,
            });

            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const tenantSetting = await tenantSettings.getById(request.params.id);
            if (!tenantSetting) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(tenantSetting));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/hubspot/apiKey', async (request, response, next) => {
        try {
            const hubspotApiKey = await tenantSettings.getHubspotApiKey();
            if (hubspotApiKey.error === true) {
                return response.status(404).json(api.error(hubspotApiKey.message, 404));
            }

            return response.json(api.success(hubspotApiKey));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/name/prefix/smtp', async (request, response, next) => {
        try {
            const allTenantSettings = await tenantSettings.getAllSmtpSettings();

            return response.json(api.success(allTenantSettings));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/name/prefix/asanaTeamProject', async (request, response, next) => {
        try {
            const allTenantSettings = await tenantSettings.getAllAsanaTeamProjectSections();

            return response.json(api.success(allTenantSettings));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/name/prefix', async (request, response, next) => {
        try {
            const allTenantSettings = await tenantSettings.getAllByNamePrefix(request.body.StartsWith);

            return response.json(api.success(allTenantSettings));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/name', async (request, response, next) => {
        try {
            const tenantSetting = await tenantSettings.getByName(request.body.Name);
            if (!tenantSetting) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(tenantSetting));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const tenant = await tenants.getById(request.body.TenantId);
            if (!tenant) {
                errorList.TenantId = helpers.addErrorMessages('TenantId');
            }

            const newTenantSetting = await tenantSettings.createTenantSettings(request.body);

            return response.status(201).json(api.success(newTenantSetting));
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
            const tenantSetting = await tenantSettings.getById(request.params.id);
            if (!tenantSetting) {
                return response.status(404).json(api.error('', 404));
            }

            const tenant = await tenants.getById(request.body.TenantId);
            if (request.body.TenantId && !tenant) {
                errorList.TenantId = helpers.addErrorMessages('TenantId');
            }

            const updatedTenantSetting = await tenantSettings.updateTenantSettings(
                request.params.id, request.body,
            );

            return response.json(api.success(updatedTenantSetting));
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
            const tenantSetting = await tenantSettings.getById(request.params.id);
            if (!tenantSetting) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteTenantSetting = await tenantSettings.deleteTenantSettings(request.params.id);

            return response.json(api.success(deleteTenantSetting));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
