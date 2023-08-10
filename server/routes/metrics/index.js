const express = require('express');
const Helpers = require('../../lib/Helpers');
const ApiResponse = require('../../lib/ApiResponse');
const UserResolverService = require('../../lib/UserResolverService');

const router = express.Router();

module.exports = (params) => {
    const {
        targetKeywords, targetKeywordPositionings, targetPages, totalKeywordsRankeds, projects,
    } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();
    const userResolver = new UserResolverService();

    router.post('/totalKeywordsRanked', async (request, response, next) => {
        try {
            const project = await projects.getById(request.body.ProjectId);
            if (!project) {
                const projectNotFound = helpers.addErrorMessages('ProjectId');
                return response.status(404).json(api.error(projectNotFound, 404));
            }

            const isAuthorized = await userResolver.isVictoriousAndProjectCustomer(
                project.CustomerId,
            );
            if (!isAuthorized) {
                return response.status(401).json(api.error('Unauthorized', 401));
            }

            const allTotalKeywordsRanked = await totalKeywordsRankeds.getAllForPeriod(
                request.body.ProjectId, request.body.From, request.body.To,
            );

            return response.json(api.success(allTotalKeywordsRanked));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/targetKeywordPositioning', async (request, response, next) => {
        try {
            const project = await projects.getById(request.body.ProjectId);
            if (!project) {
                const projectNotFound = helpers.addErrorMessages('ProjectId');
                return response.status(404).json(api.error(projectNotFound, 404));
            }

            const isAuthorized = await userResolver.isVictoriousAndProjectCustomer(
                project.CustomerId,
            );
            if (!isAuthorized) {
                return response.status(401).json(api.error('Unauthorized', 401));
            }

            const allTargetKeywordPositionings = await targetKeywordPositionings.getAllForPeriod(
                request.body.ProjectId, request.body.From, request.body.To,
            );

            return response.json(api.success(allTargetKeywordPositionings));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:projectId/keywords', async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.projectId);
            if (!project) {
                const projectNotFound = helpers.addErrorMessages('ProjectId');
                return response.status(404).json(api.error(projectNotFound, 404));
            }

            const isAuthorized = await userResolver.isVictoriousAndProjectCustomer(
                project.CustomerId,
            );
            if (!isAuthorized) {
                return response.status(401).json(api.error('Unauthorized', 401));
            }

            const allTargetKeywords = await targetKeywords.getAllByProjectId(
                request.params.projectId,
            );

            return response.json(api.success(allTargetKeywords));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:projectId/targetPages', async (request, response, next) => {
        let pageUrl = '';

        try {
            const project = await projects.getById(request.params.projectId);
            if (!project) {
                const projectNotFound = helpers.addErrorMessages('ProjectId');
                return response.status(404).json(api.error(projectNotFound, 404));
            }

            const isAuthorized = await userResolver.isVictoriousAndProjectCustomer(
                project.CustomerId,
            );
            if (!isAuthorized) {
                return response.status(401).json(api.error('Unauthorized', 401));
            }

            const allTargetPages = await targetPages.getAllByProjectId(request.params.projectId);

            allTargetPages.forEach((targetPage) => {
                pageUrl = targetPage.Url.replace(project.Domain, '');
                if (!pageUrl.startsWith('/')) pageUrl = `/${pageUrl}`;

                targetPage.Url = pageUrl;
            });

            return response.json(api.success(allTargetPages));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
