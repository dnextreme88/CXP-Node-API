const express = require('express');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { targetKeywords, projects } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/', async (request, response, next) => {
        try {
            const { projectId } = request.query;
            const project = await projects.getById(projectId);
            if (!project) {
                const projectNotFound = helpers.addErrorMessages('ProjectId');
                return response.status(404).json(api.error(projectNotFound, 404));
            }

            const allTargetKeywords = await targetKeywords.getAllByProjectId(projectId);

            return response.json(api.success(allTargetKeywords));
        } catch (event) {
            return next(event);
        }
    });

    // CUSTOM
    router.get('/:id', async (request, response, next) => {
        try {
            const targetKeyword = await targetKeywords.getById(request.params.id);
            if (!targetKeyword) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(targetKeyword));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
