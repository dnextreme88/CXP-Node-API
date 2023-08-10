const express = require('express');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { exceptionLogs } = params;
    const api = new ApiResponse();

    router.post('/', async (request, response, next) => {
        try {
            const newExceptionLog = await exceptionLogs.createExceptionLog(request.body);

            return response.status(201).json(api.success(newExceptionLog));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
