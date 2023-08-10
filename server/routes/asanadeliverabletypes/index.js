const express = require('express');
const ApiResponse = require('../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { asanaDeliverableTypes } = params;
    const api = new ApiResponse();

    router.get('/', async (request, response, next) => {
        try {
            const allAsanaDeliverableTypes = await asanaDeliverableTypes.getAll();

            return response.json(api.success(allAsanaDeliverableTypes));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
