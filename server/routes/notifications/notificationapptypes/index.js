/* eslint-disable max-len */
const express = require('express');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { notificationAppTypes } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/', async (request, response, next) => {
        try {
            const allNotificationAppTypes = await notificationAppTypes.getAll();

            return response.json(api.success(allNotificationAppTypes));
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

            const notificationAppType = await notificationAppTypes.getById(request.params.id);
            if (!notificationAppType) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(notificationAppType));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
