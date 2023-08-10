/* eslint-disable max-len */
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../lib/Helpers');
const ApiResponse = require('../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const {
        notifications, templateTypes, templates, users,
    } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/:id', async (request, response, next) => {
        try {
            const notification = await notifications.getById(request.params.id);
            if (!notification) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(notification));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/notificationGuid/:notificationGuid', async (request, response, next) => {
        try {
            const notification = await notifications.getByNotificationGuid(request.params.notificationGuid);
            if (!notification) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(notification));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/templateTypes/:templateTypeId/users/:userId', async (request, response, next) => {
        try {
            const notification = await notifications.getByTemplateTypeIdAndUserId(
                request.params.templateTypeId, request.params.userId,
            );
            if (!notification) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(notification));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const templateType = await templateTypes.getById(request.body.TemplateTypeId);
            const template = await templates.getById(request.body.TemplateId);
            const user = await users.getById(request.body.UserId);

            if (!templateType) {
                errorList.TemplateTypeId = helpers.addErrorMessages('TemplateTypeId');
            }
            if (!template) {
                errorList.TemplateId = helpers.addErrorMessages('TemplateId');
            }
            if (!user) {
                errorList.UserId = helpers.addErrorMessages('UserId');
            }

            const newNotification = await notifications.createNotification(request.body);

            return response.status(201).json(api.success(newNotification));
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
            const notification = await notifications.getById(request.params.id);
            if (!notification) {
                return response.status(404).json(api.error('', 404));
            }

            const templateType = await templateTypes.getById(request.body.TemplateTypeId);
            const template = await templates.getById(request.body.TemplateId);
            const user = await users.getById(request.body.UserId);

            if (request.body.TemplateTypeId && !templateType) {
                errorList.TemplateTypeId = helpers.addErrorMessages('TemplateTypeId');
            }
            if (request.body.TemplateId && !template) {
                errorList.TemplateId = helpers.addErrorMessages('TemplateId');
            }
            if (request.body.UserId && !user) {
                errorList.UserId = helpers.addErrorMessages('UserId');
            }

            const updatedNotification = await notifications.updateNotification(request.params.id, request.body);

            return response.json(api.success(updatedNotification));
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
            const notification = await notifications.getById(request.params.id);
            if (!notification) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteNotification = await notifications.deleteNotification(request.params.id);

            return response.json(api.success(deleteNotification));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
