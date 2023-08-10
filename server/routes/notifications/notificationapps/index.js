/* eslint-disable max-len */
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const {
        notificationApps, comments, goals, notificationAppTypes, tasks, tenants, users, customers,
    } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.post('/create', async (request, response, next) => {
        const errorList = {};

        try {
            const notificationAppType = await notificationAppTypes.getById(request.body.NotificationAppTypeId);
            if (!notificationAppType) {
                const notificationAppTypeNotFound = helpers.addErrorMessages('NotificationAppTypeId');
                return response.status(404).json(api.error(notificationAppTypeNotFound, 404));
            }

            if (request.body.CommentId) {
                const comment = await comments.getById(request.body.CommentId);

                if (!comment) errorList.CommentId = helpers.addErrorMessages('CommentId');
            }
            if (request.body.GoalId) {
                const goal = await goals.getById(request.body.GoalId);

                if (!goal) errorList.GoalId = helpers.addErrorMessages('GoalId');
            }
            if (request.body.TaskId) {
                const task = await tasks.getById(request.body.TaskId);

                if (!task) errorList.TaskId = helpers.addErrorMessages('TaskId');
            }

            const newNotificationApp = await notificationApps.createNotificationApp(request.body);

            return response.status(201).json(api.success(newNotificationApp));
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

    router.post('/getPaged', async (request, response, next) => {
        try {
            const allNotificationApps = await notificationApps.getPagged(
                request.body.ProjectId, request.body,
            );

            return response.json(api.success(allNotificationApps));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/update', async (request, response, next) => {
        const errorList = {};

        try {
            const notificationApp = await notificationApps.getById(request.body.Id);
            if (!notificationApp) {
                return response.status(404).json(api.error('', 404));
            }

            if (request.body.CommentId) {
                const comment = await comments.getById(request.body.CommentId);

                if (!comment) errorList.CommentId = helpers.addErrorMessages('CommentId');
            }
            if (request.body.GoalId) {
                const goal = await goals.getById(request.body.GoalId);

                if (!goal) errorList.GoalId = helpers.addErrorMessages('GoalId');
            }
            if (request.body.NotificationAppTypeId) {
                const notificationAppType = await notificationAppTypes.getById(request.body.NotificationAppTypeId);

                if (!notificationAppType) {
                    errorList.NotificationAppTypeId = helpers.addErrorMessages('NotificationAppTypeId');
                }
            }
            if (request.body.TaskId) {
                const task = await tasks.getById(request.body.TaskId);

                if (!task) errorList.TaskId = helpers.addErrorMessages('TaskId');
            }

            const updatedNotificationApp = await notificationApps.updateNotificationApp(
                request.body.Id, request.body,
            );

            return response.json(api.success(updatedNotificationApp));
        } catch (event) {
            response.status(500).json({
                errors: errorList,
                statusCode: 500,
            });

            return next(event);
        }
    });

    // Creates a NotificationAppUserRead record
    router.post('/notificationReadSet', async (request, response, next) => {
        const errorList = {};

        try {
            const notificationApp = await notificationApps.getById(request.body.NotificationAppId);
            const user = await users.getById(request.body.UserId);

            if (!notificationApp) {
                errorList.NotificationAppId = helpers.addErrorMessages('NotificationAppId');
            }
            if (!user) {
                errorList.UserId = helpers.addErrorMessages('UserId');
            }

            const newNotificationAppUserRead = await notificationApps.setNotificationRead(request.body);

            return response.status(201).json(api.success(newNotificationAppUserRead));
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
    router.delete('/:id', async (request, response, next) => {
        try {
            const notificationApp = await notificationApps.getById(request.params.id);
            if (!notificationApp) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteNotificationApp = await notificationApps.deleteNotificationApp(request.params.id);

            return response.json(api.success(deleteNotificationApp));
        } catch (event) {
            return next(event);
        }
    });

    // CUSTOM ROUTES BELOW IMPLEMENTED FROM DAL IN .NET REPO
    router.get('/', async (request, response, next) => {
        try {
            const { tenantId } = request.query;
            const tenant = await tenants.getById(tenantId);
            if (!tenant) {
                const tenantNotFound = helpers.addErrorMessages('TenantId');
                return response.status(404).json(api.error(tenantNotFound, 404));
            }

            const allNotificationApps = await notificationApps.getAllByTenantId(tenantId);

            return response.json(api.success(allNotificationApps));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/getForWeek/customers/:customerId', async (request, response, next) => {
        try {
            const customer = await customers.getById(request.params.customerId);
            if (!customer) {
                const customerNotFound = helpers.addErrorMessages('CustomerId');
                return response.status(404).json(api.error(customerNotFound, 404));
            }

            const allNotificationApps = await notificationApps.getAllForWeek(request.params.customerId);

            return response.json(api.success(allNotificationApps));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const notificationApp = await notificationApps.getById(request.params.id);
            if (!notificationApp) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(notificationApp));
        } catch (event) {
            return next(event);
        }
    });

    // Create new notification
    // router.post('/create', async (req, res, next) => {
    //     try {
    //         // Get title and description from request body
    //         // const { title, description } = req.body;
    //         // Add the notification to the database
    //         // const notification = notifications.create(title, description);
    //         // return res.json(notification);
    //         return res.sendStatus(200);
    //     } catch (err) {
    //         return next(err);
    //     }
    // });

    // // Update an existing notification
    // router.post('/update', async (req, res, next) => {
    //     try {
    //         return res.sendStatus(200);
    //     } catch (err) {
    //         return next(err);
    //     }
    // });

    return router;
};
