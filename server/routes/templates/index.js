const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../lib/Helpers');
const ApiResponse = require('../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { templates, templateTypes, tenants } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/:id', async (request, response, next) => {
        try {
            const isIdInt = helpers.isValidPositiveInteger(request.params.id);
            if (!isIdInt) {
                return response.status(500).json(api.error('Cannot be parsed into an integer'));
            }

            const template = await templates.getById(request.params.id);
            if (!template) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(template));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/templatetypes/:templateTypeId', async (request, response, next) => {
        try {
            const template = await templates.getByTemplateTypeId(request.params.templateTypeId);
            if (!template) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(template));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const templateType = await templateTypes.getById(request.body.TemplateTypeId);
            const tenant = await tenants.getById(request.body.TenantId);

            if (!templateType) {
                errorList.TemplateTypeId = helpers.addErrorMessages('TemplateTypeId');
            }
            if (!tenant) {
                errorList.TenantId = helpers.addErrorMessages('TenantId');
            }

            const newTemplate = await templates.createTemplate(request.body);

            return response.status(201).json(api.success(newTemplate));
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

            const template = await templates.getById(request.params.id);
            if (!template) {
                return response.status(404).json(api.error('', 404));
            }

            const templateType = await templateTypes.getById(request.body.TemplateTypeId);
            const tenant = await tenants.getById(request.body.TenantId);

            if (request.body.TemplateTypeId && !templateType) {
                errorList.TemplateTypeId = helpers.addErrorMessages('TemplateTypeId');
            }
            if (request.body.TenantId && !tenant) {
                errorList.TenantId = helpers.addErrorMessages('TenantId');
            }

            const updatedTemplate = await templates.updateTemplate(request.params.id, request.body);

            return response.json(api.success(updatedTemplate));
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

            const template = await templates.getById(request.params.id);
            if (!template) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteTemplate = await templates.deleteTemplate(request.params.id);

            return response.json(api.success(deleteTemplate));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
