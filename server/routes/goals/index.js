/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
const express = require('express');
const { ValidationError } = require('sequelize');
const { google } = require('googleapis');
const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const Helpers = require('../../lib/Helpers');
const ApiResponse = require('../../lib/ApiResponse');
const GoogleService = require('../../lib/GoogleService');

const formatOut = bformat({ outputMode: 'short' });
const logger = bunyan.createLogger({ name: 'routes/goals', stream: formatOut, level: 'info' });

const router = express.Router();

module.exports = (params) => {
    const {
        goals, projects, comments, goalTypes, googleAnalyticValues, googleAnalyticPagePaths, customers, tenantSettings,
    } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();
    const googleService = new GoogleService();

    router.get('/', async (request, response, next) => {
        try {
            const { projectId } = request.query;
            const project = await projects.getById(projectId);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            const allGoals = await goals.getAllByProjectId(projectId);

            return response.json(api.success(allGoals));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            if (!request.body.ProjectId) {
                errorList.ProjectId = 'Project id cannot be null';
            }
            if (!request.body.GoalTypeId) {
                errorList.GoalTypeId = 'Goal type id cannot be null';
            }

            if (Object.keys(errorList).length > 0) {
                return response.status(404).json(api.error(errorList, 404));
            }

            const project = await projects.getById(request.body.ProjectId);
            const goalType = await goalTypes.getById(request.body.GoalTypeId);

            if (!project) {
                errorList.ProjectId = helpers.addErrorMessages('ProjectId');
            }
            if (!goalType) {
                errorList.GoalTypeId = helpers.addErrorMessages('GoalTypeId');
            }

            if (Object.keys(errorList).length > 0) {
                return response.status(404).json(api.error(errorList, 404));
            }

            const dateYesterday = helpers.dateLessFromToday(1);
            if (request.body.ValidFrom < dateYesterday) {
                return response.status(400).json(api.error('Valid from must not be lesser than the current date', 400));
            }

            // Validate request
            const isValidNewGoal = await goals.checkIfValidNewGoal(request.body);
            // Creating another goal if a previous goal hasn't expired yet (ValidTo) must return an error
            if (!isValidNewGoal) {
                return response.status(400).json(api.error('New goal cannot be set up before the active goal expires', 400));
            }

            // Deactivate all comments for previous goal
            const oldGoal = await goals.getLastGoalByProjectIdAndGoalTypeId(
                request.body.ProjectId, request.body.GoalTypeId,
            );
            if (oldGoal) {
                oldGoal.EndValue = request.body.EndValue;
                const allComments = await comments.getAllByGoalId(oldGoal.Id);

                for (let i = 0; i < allComments.length; i++) {
                    await comments.deleteComment(allComments[i].Id);
                }
            }

            project.ProjectStatusId = 4; // EQUAL TO Active
            await project.save();

            const newGoal = await goals.createGoal(request.body);

            return response.status(201).json(api.success(newGoal));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/:id', async (request, response, next) => {
        const errorList = {};

        try {
            const goal = await goals.getById(request.params.id);
            if (!goal) {
                return response.status(404).json(api.error('', 404));
            }

            if (!request.body.ProjectId) {
                errorList.ProjectId = 'Project id cannot be null';
            }
            if (!request.body.GoalTypeId) {
                errorList.GoalTypeId = 'Goal type id cannot be null';
            }

            if (Object.keys(errorList).length > 0) {
                return response.status(404).json(api.error(errorList, 404));
            }

            const project = await projects.getById(request.body.ProjectId);
            const goalType = await goalTypes.getById(request.body.GoalTypeId);

            if (!project) {
                errorList.ProjectId = helpers.addErrorMessages('ProjectId');
            }
            if (!goalType) {
                errorList.GoalTypeId = helpers.addErrorMessages('GoalTypeId');
            }

            if (Object.keys(errorList).length > 0) {
                return response.status(404).json(api.error(errorList, 404));
            }

            // Validate request
            const isValidNewGoal = await goals.checkIfValidNewGoal(request.body);
            if (!isValidNewGoal) {
                return response.status(400).json(api.error('Goal of this type already exists for the requested period', 400));
            }

            const updatedGoal = await goals.updateGoal(request.params.id, request.body);

            return response.json(api.success(updatedGoal));
        } catch (event) {
            return next(event);
        }
    });

    router.delete('/:id', async (request, response, next) => {
        try {
            const goal = await goals.getById(request.params.id);
            if (!goal) {
                return response.status(404).json(api.error('', 404));
            }

            const doesProjectHaveGoals = await projects.checkIfProjectHasAnyGoals(goal.ProjectId);
            if (!doesProjectHaveGoals) {
                const project = await projects.getById(request.body.ProjectId);
                project.ProjectStatusId = 3; // EQUAL TO Goal setup required
                await project.save();
            }

            const deleteGoal = await goals.deleteGoal(request.params.id);

            return response.json(api.success(deleteGoal));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/organicSearch', async (request, response, next) => {
        try {
            const project = await projects.getById(request.body.ProjectId);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            // GoogleAnalyticTypeId: 1 = Organic
            const res = await googleAnalyticValues.processPagePathData(
                request.body.From, request.body.To, 1, request.body.ProjectId, request.body.PagePath,
            );
            if (!res) {
                return response.status(400).json(api.error('Google analytic type id must either be 1, 2, or 3', 400));
            }

            return response.json(api.success(res));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/pagePath', async (request, response, next) => {
        try {
            const allGoogleAnalyticPagePaths = await googleAnalyticPagePaths.getAllByProjectIdAndGoogleAnalyticTypeId(
                request.body.ProjectId, request.body.GoogleAnalyticTypeId,
            );

            return response.json(api.success(allGoogleAnalyticPagePaths));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/eCommerceMetric', async (request, response, next) => {
        try {
            const project = await projects.getById(request.body.ProjectId);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            // GoogleAnalyticTypeId: 2 = eCommerce
            const res = await googleAnalyticValues.processPagePathData(
                request.body.From, request.body.To, 2, request.body.ProjectId, request.body.PagePath,
            );
            if (!res) {
                return response.status(400).json(api.error('Google analytic type id must either be 1, 2, or 3', 400));
            }

            return response.json(api.success(res));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/goalMetric', async (request, response, next) => {
        try {
            const project = await projects.getById(request.body.ProjectId);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            // GoogleAnalyticTypeId: 3 = Goal
            const res = await googleAnalyticValues.processPagePathData(
                request.body.From, request.body.To, 3, request.body.ProjectId, request.body.PagePath,
            );
            if (!res) {
                return response.status(400).json(api.error('Google analytic type id must either be 1, 2, or 3', 400));
            }

            return response.json(api.success(res));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/googleConnectionCheck', async (request, response, next) => {
        const res = {
            WebProperty: { Id: '', IsValid: false },
            ViewId: { Id: '', IsValid: false },
            Domain: { Id: '', IsValid: false },
        };
        res.WebProperty.Id = request.body.WebPropertyId;
        res.ViewId.Id = request.body.ViewId;
        res.Domain.Id = request.body.Domain;

        try {
            const gaAccountId = request.body.WebPropertyId.split('-')[1];
            const getGaApplicationName = await tenantSettings.getByName('GA_APPLICATION_NAME');
            const gaApplicationName = getGaApplicationName.Val1;
            const scopes = ['analytics.readonly', 'webmasters.readonly'];
            const credentials = await googleService.authorize(scopes);
            if (credentials.error === true) {
                return response.status(401).json(api.error(credentials.message, 401));
            }

            // AnalyticsService
            const service = google.analytics('v3');
            const analyticsParams = {
                auth: credentials,
                applicationName: gaApplicationName,
                accountId: gaAccountId,
            };

            const today = new Date();

            // SearchConsoleService
            const searchConsoleService = google.searchconsole('v1');
            const searchConsoleParams = {
                auth: credentials,
                applicationName: gaApplicationName,
                domain: request.body.Domain,
                siteUrl: request.body.Domain,
                requestBody: {
                    dimensions: ['query'],
                    startDate: new Date(today).toISOString().split('T')[0],
                    endDate: new Date(today).toISOString().split('T')[0],
                    rowLimit: 1,
                },
            };

            // Query accountId
            await service.management.accounts.list(analyticsParams);

            const propsReq = await service.management.webproperties.list(analyticsParams);
            if (propsReq != null && propsReq.data.items.length > 0) {
                // Query webPropertyId
                for (let i = 0; i < propsReq.data.items.length; i++) {
                    if (propsReq.data.items[i].id === request.body.WebPropertyId) {
                        res.WebProperty.IsValid = true;
                        analyticsParams.webPropertyId = propsReq.data.items[i].id;
                        const viewReq = await service.management.profiles.list(analyticsParams);

                        if (viewReq != null && viewReq.data.items.length > 0) {
                            // Query viewId
                            for (let j = 0; j < viewReq.data.items.length; j++) {
                                if (viewReq.data.items[j].id === request.body.ViewId) {
                                    res.ViewId.IsValid = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            try {
                // Query domain
                await searchConsoleService.searchanalytics.query(searchConsoleParams);

                res.Domain.IsValid = true;
            } catch (GoogleApiException) {
                logger.fatal(GoogleApiException.response.data.error.message);
                res.Domain.IsValid = false;
            }

            return response.json(api.success(res));
        } catch (e) {
            logger.fatal(e);
            return next(e);
        }
    });

    // CUSTOM ROUTES BELOW IMPLEMENTED FROM DAL IN .NET REPO
    router.get('/projects/:projectId/active', async (request, response, next) => {
        try {
            const allGoals = await goals.getAllActiveForProject(request.params.projectId);

            return response.json(api.success(allGoals));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/projects/:projectId/latest', async (request, response, next) => {
        try {
            const allGoalTypes = await goals.getAllLatestForProject(request.params.projectId);

            return response.json(api.success(allGoalTypes));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const goal = await goals.getById(request.params.id);
            if (!goal) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(goal));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/customers/:customerId/hasAccess', async (request, response, next) => {
        try {
            const customer = await customers.getById(request.params.customerId);
            if (!customer) {
                return response.status(404).json(api.error('', 404));
            }

            const goal = await goals.checkIfUserHasAccess(
                request.params.customerId, request.body.GoalsArray,
            );

            return response.json(api.success(goal));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/bulkCreate', async (request, response, next) => {
        const errorList = {};

        try {
            const newGoals = await customers.bulkCreateGoal(request.body);

            return response.status(201).json(api.success(newGoals));
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

    return router;
};
