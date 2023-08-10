/* eslint-disable max-len */
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { notificationAppUserRead, notificationApps } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/', async (request, response, next) => {
        try {
            const allNotificationAppUserRead = await notificationAppUserRead.getAll();

            return response.json(api.success(allNotificationAppUserRead));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const getNotificationAppUserRead = await notificationAppUserRead.getById(request.params.id);
            if (!getNotificationAppUserRead) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(getNotificationAppUserRead));
        } catch (event) {
            return next(event);
        }
    });

    // router.post('/', async (request, response, next) => {
    //     const errorList = {};

    //     try {
    //         const notificationApp = await notificationApps.getById(request.body.NotificationAppId);
    //         if (!notificationApp) {
    //             errorList.NotificationAppId = helpers.addErrorMessages('NotificationAppId');
    //         }

    //         const newNotificationAppUserRead = await notificationAppUserRead.createNotificationAppUserRead(request.body);

    //         return response.status(201).json(api.success(newNotificationAppUserRead));
    //     } catch (event) {
    //         if (event instanceof ValidationError) {
    //             event.errors.forEach((error) => {
    //                 errorList[error.path] = error.message;
    //             });
    //         }

    //         response.status(500).json({
    //             errors: errorList,
    //             statusCode: 500,
    //         });

    //         return next(event);
    //     }
    // });

    // UPDATE
    router.post('/:id/update', async (request, response, next) => {
        const errorList = {};

        try {
            const getNotificationAppUserRead = await notificationAppUserRead.getById(request.params.id);
            if (!getNotificationAppUserRead) {
                return response.status(404).json(api.error('', 404));
            }

            const notificationApp = await notificationApps.getById(request.body.NotificationAppId);
            if (request.body.NotificationAppId && !notificationApp) {
                errorList.NotificationAppId = helpers.addErrorMessages('NotificationAppId');
            }

            const updatedNotificationAppUserRead = await notificationAppUserRead.updateNotificationAppUserRead(
                request.params.id, request.body,
            );

            return response.json(api.success(updatedNotificationAppUserRead));
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
            const getNotificationAppUserRead = await notificationAppUserRead.getById(request.params.id);
            if (!getNotificationAppUserRead) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteNotificationAppUserRead = await notificationAppUserRead.deleteNotificationAppUserRead(
                request.params.id,
            );

            return response.json(api.success(deleteNotificationAppUserRead));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
