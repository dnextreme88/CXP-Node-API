const express = require('express');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { requestLogs } = params;
    const api = new ApiResponse();

    router.post('/', async (request, response, next) => {
        try {
            const newRequestLog = await requestLogs.createRequestLog(request.body);

            return response.status(201).json(api.success(newRequestLog));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
