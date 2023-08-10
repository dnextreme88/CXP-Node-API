const express = require('express');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { deliverableTypes } = params;
    const api = new ApiResponse();

    router.get('/', async (request, response, next) => {
        try {
            const allDeliverableTypes = await deliverableTypes.getAll();

            return response.json(api.success(allDeliverableTypes));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
