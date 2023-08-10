/* eslint-disable max-len */
const express = require('express');
const Helpers = require('../../lib/Helpers');
const ApiResponse = require('../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { deliverables, projects, customers } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/projects/:projectId', async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.projectId);
            if (!project) {
                const projectNotFound = helpers.addErrorMessages('ProjectId');
                return response.status(404).json(api.error(projectNotFound, 404));
            }

            const allDeliverables = await deliverables.getAllByProjectId(request.params.projectId);

            return response.json(api.success(allDeliverables));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const { customerId } = request.query;
            const customer = await customers.getById(customerId);
            if (!customer) {
                const customerNotFound = helpers.addErrorMessages('CustomerId');
                return response.status(404).json(api.error(customerNotFound, 404));
            }

            const deliverable = await deliverables.getById(request.params.id, customerId);
            if (!deliverable) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(deliverable));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
