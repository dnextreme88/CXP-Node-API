/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
const express = require('express');
const { google } = require('googleapis');
const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const Helpers = require('../lib/Helpers');
const ApiResponse = require('../lib/ApiResponse');
const GoogleService = require('../lib/GoogleService');

const formatOut = bformat({ outputMode: 'short' });
const logger = bunyan.createLogger({ name: 'gaSyncJob', stream: formatOut, level: 'info' });

const router = express.Router();

module.exports = (params) => {
    const {
        projects, goals, googleAnalyticValues, googleAnalyticPagePaths, tenantSettings,
    } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();
    const googleService = new GoogleService();

    const scopes = ['analytics.readonly', 'webmasters.readonly'];

    router.post('/syncOrganic', async (request, response, next) => {
        try {
            const today = new Date();
            const credentials = await googleService.authorize(scopes); // ServiceAccountCredential
            if (credentials.error === true) {
                return response.status(401).json(api.error(credentials.message, 401));
            }

            const lstProject = await projects.getAllGaJob();
            if (lstProject != null && lstProject.length > 0) {
                let daysInPast = 0;

                for (let i = 0; i < lstProject.length; i++) {
                    const { Id, Name, GoogleAnalyticsViewId, TenantId } = lstProject[i];

                    for (let j = 0; j < lstProject[i].Goals.length; j++) {
                        const { ValidFrom, ValidTo, GoalTypeId } = lstProject[i].Goals[j];
                        const gaViewId = GoogleAnalyticsViewId;
                        const dateYesterday = helpers.dateLessFromToday(1);
                        const dtStartDate = request.body.DateFrom == null ? dateYesterday : new Date(request.body.DateFrom).toISOString();

                        // GoogleAnalyticTypeId: 1 = Organic
                        const lastProcessDate = await googleAnalyticValues.getLastProcessDate(TenantId, 1, Id);
                        // Skip that project - it's already processed, hence the for loop below will skip
                        if (lastProcessDate != null && lastProcessDate === dtStartDate) continue;

                        let procDate = dtStartDate;

                        if (lastProcessDate == null) {
                            daysInPast = 32;
                            const startDate = new Date(dtStartDate);
                            const previous32Days = startDate.setDate(startDate.getDate() - daysInPast);
                            const date32DaysAgo = new Date(previous32Days).toISOString();

                            procDate = date32DaysAgo;
                        }

                        for (let k = 0; k <= daysInPast; k++) {
                            // Go toward the future from past
                            const procDateAsDate = new Date(procDate);
                            const dtProcess = procDateAsDate.setDate(procDateAsDate.getDate() + k);
                            const startDate = new Date(dtProcess).toISOString();

                            try {
                                // GoogleAnalyticTypeId: 1 = Organic
                                const gaData = await googleService.getGaData(1, credentials, gaViewId, startDate);
                                const res = { Total: gaData.Total, ByPage: gaData.ByPage };
                                const lstPagePath = gaData.LstPagePathArray;

                                // GoalTypeId: 1 = Organic search traffic
                                if (GoalTypeId === 1) {
                                    const values = {
                                        TenantId,
                                        Data: res,
                                        Created: startDate,
                                        Filter: '',
                                        GoogleAnalyticTypeId: 1, // Organic
                                        ProjectId: Id,
                                    };
                                    await googleAnalyticValues.createGoogleAnalyticValue(values);
                                }

                                try {
                                    const lstPathForInsert = [];
                                    for (let l = 0; l < lstPagePath.length; l++) {
                                        // Check if path exists in DB
                                        const gaPagePath = await googleAnalyticPagePaths.getByGaTypeIdAndPath(
                                            1, lstPagePath[l],
                                        );
                                        if (!gaPagePath) lstPathForInsert.push(lstPagePath[l]);
                                    }

                                    if (lstPathForInsert.length > 0) {
                                        for (let m = 0; m < lstPathForInsert.length; m++) {
                                            const values = {
                                                ProjectId: Id,
                                                GoogleAnalyticTypeId: 1, // Organic
                                                Path: lstPathForInsert[m],
                                            };
                                            await googleAnalyticPagePaths.createGoogleAnalyticPagePath(values);
                                        }
                                    }
                                } catch (ex) {
                                    logger.info(`Unable to process GA path for projectId: ${Id}, google analytic type: 1`);
                                    logger.fatal(ex);
                                }
                            } catch (ex) {
                                logger.info(`Sync organic failed for project ${Name}, and viewId: ${gaViewId}, projectId: ${Id}`);
                                logger.fatal(ex);
                            }
                        }

                        try {
                            logger.info('Processing notifications...');
                            const organics = await googleAnalyticValues.getAllOrganicLast30Days(Id);
                            for (let o = 0; o < organics.length; o++) {
                                const { Data } = organics[o];

                                let cxpgoal = '';
                                // GoalTypeId: 1 = Organic search traffic
                                if (GoalTypeId === 1 && ValidFrom <= today && ValidTo >= today) {
                                    cxpgoal = lstProject[i].Goals[j];
                                }

                                let sum = 0;
                                for (let p = 0; p < Data.ByPage.length; p++) {
                                    const pageObj = Data.ByPage[p];
                                    const sessions = parseInt(pageObj.sessions, 10);
                                    // Check if value of sessions is a number
                                    if ('sessions' in pageObj && !Number.isNaN(sessions)) {
                                        sum += sessions;
                                    }
                                }

                                // Check if goal is reached with sum and goal type then create
                                // notification if goal is reached or if there is no goal set
                                await goals.createNotificationForGoalType(cxpgoal, sum, TenantId, 1);
                            }
                        } catch (ex) {
                            logger.info(`Sync organic failed for project ${Name}, and viewId: ${gaViewId}, projectId: ${Id}`);
                            logger.fatal(ex);
                        }
                    }
                }
            }

            const newToday = new Date();

            return response.json(api.success(null, `Sync started at ${today.toLocaleString()} and was completed on ${newToday.toLocaleString()}`));
        } catch (e) {
            logger.info('An exception was caught...');
            logger.fatal(e);
            return next(e);
        }
    });

    router.post('/syncEcommerce', async (request, response, next) => {
        try {
            const today = new Date();
            const credentials = await googleService.authorize(scopes); // ServiceAccountCredential
            if (credentials.error === true) {
                return response.status(401).json(api.error(credentials.message, 401));
            }

            const lstProject = await projects.getAllGaJob();
            if (lstProject != null && lstProject.length > 0) {
                let daysInPast = 0;

                for (let i = 0; i < lstProject.length; i++) {
                    const { Id, Name, GoogleAnalyticsViewId, TenantId } = lstProject[i];

                    for (let j = 0; j < lstProject[i].Goals.length; j++) {
                        const { ValidFrom, ValidTo, GoalTypeId } = lstProject[i].Goals[j];
                        const gaViewId = GoogleAnalyticsViewId;
                        const dateYesterday = helpers.dateLessFromToday(1);
                        const dtStartDate = request.body.DateFrom == null ? dateYesterday : new Date(request.body.DateFrom).toISOString();

                        // GoogleAnalyticTypeId: 2 = eCommerce
                        const lastProcessDate = await googleAnalyticValues.getLastProcessDate(TenantId, 2, Id);
                        // Skip that project - it's already processed, hence the for loop below will skip
                        if (lastProcessDate != null && lastProcessDate === dtStartDate) continue;

                        let procDate = dtStartDate;

                        if (lastProcessDate == null) {
                            daysInPast = 32;
                            const startDate = new Date(dtStartDate);
                            const previous32Days = startDate.setDate(startDate.getDate() - daysInPast);
                            const date32DaysAgo = new Date(previous32Days).toISOString();

                            procDate = date32DaysAgo;
                        }

                        for (let k = 0; k <= daysInPast; k++) {
                            // Go toward the future from past
                            const procDateAsDate = new Date(procDate);
                            const dtProcess = procDateAsDate.setDate(procDateAsDate.getDate() + k);
                            const startDate = new Date(dtProcess).toISOString();

                            try {
                                // GoogleAnalyticTypeId: 2 = eCommerce
                                const gaData = await googleService.getGaData(2, credentials, gaViewId, startDate);
                                const res = { Total: gaData.Total, ByPage: gaData.ByPage };
                                const lstPagePath = gaData.LstPagePathArray;

                                // GoalTypeId: 5 = eCommerce/Revenue tracking
                                if (GoalTypeId === 5) {
                                    const values = {
                                        TenantId,
                                        Data: res,
                                        Created: startDate,
                                        Filter: '',
                                        GoogleAnalyticTypeId: 2, // eCommerce
                                        ProjectId: Id,
                                    };
                                    await googleAnalyticValues.createGoogleAnalyticValue(values);
                                }

                                try {
                                    const lstPathForInsert = [];
                                    for (let l = 0; l < lstPagePath.length; l++) {
                                        // Check if path exists in DB
                                        const gaPagePath = await googleAnalyticPagePaths.getByGaTypeIdAndPath(
                                            2, lstPagePath[l],
                                        );
                                        if (!gaPagePath) lstPathForInsert.push(lstPagePath[l]);
                                    }

                                    if (lstPathForInsert.length > 0) {
                                        for (let m = 0; m < lstPathForInsert.length; m++) {
                                            const values = {
                                                ProjectId: Id,
                                                GoogleAnalyticTypeId: 2, // eCommerce
                                                Path: lstPathForInsert[m],
                                            };
                                            await googleAnalyticPagePaths.createGoogleAnalyticPagePath(values);
                                        }
                                    }
                                } catch (ex) {
                                    logger.info(`Unable to process GA path for projectId: ${Id}, google analytic type: 2`);
                                    logger.fatal(ex);
                                }
                            } catch (ex) {
                                logger.info(`Sync ecommerce failed for project ${Name}, and viewId: ${gaViewId}, projectId: ${Id}`);
                                logger.fatal(ex);
                            }
                        }

                        try {
                            logger.info('Processing notifications...');
                            const eCommerceValues = await googleAnalyticValues.getAlleCommerceLast30Days(Id);
                            for (let o = 0; o < eCommerceValues.length; o++) {
                                const { Data } = eCommerceValues[o];

                                let cxpgoal = '';
                                // GoalTypeId: 5 = eCommerce/Revenue tracking
                                if (GoalTypeId === 5 && ValidFrom <= today && ValidTo >= today) {
                                    cxpgoal = lstProject[i].Goals[j];
                                }

                                let sum = 0;
                                for (let p = 0; p < Data.ByPage.length; p++) {
                                    const pageObj = Data.ByPage[p];
                                    const itemRevenue = parseInt(pageObj.itemRevenue, 10);
                                    // Check if value of itemRevenue is a number
                                    if ('itemRevenue' in pageObj && !Number.isNaN(itemRevenue)) {
                                        sum += itemRevenue;
                                    }
                                }

                                // Check if goal is reached with sum and goal type then create
                                // notification if goal is reached or if there is no goal set
                                await goals.createNotificationForGoalType(cxpgoal, sum, TenantId, 5);
                            }
                        } catch (ex) {
                            logger.info(`Sync ecommerce failed for project ${Name}, and viewId: ${gaViewId}, projectId: ${Id}`);
                            logger.fatal(ex);
                        }
                    }
                }
            }

            const newToday = new Date();

            return response.json(api.success(null, `Sync started at ${today.toLocaleString()} and was completed on ${newToday.toLocaleString()}`));
        } catch (e) {
            logger.info('An exception was caught...');
            logger.fatal(e);
            return next(e);
        }
    });

    router.post('/syncGoal', async (request, response, next) => {
        try {
            const today = new Date();

            const getGaApplicationName = await tenantSettings.getByName('GA_APPLICATION_NAME');
            const gaApplicationName = getGaApplicationName.Val1;
            const credentials = await googleService.authorize(scopes); // ServiceAccountCredential
            if (credentials.error === true) {
                return response.status(401).json(api.error(credentials.message, 401));
            }

            const service = google.analytics('v3'); // AnalyticsService
            const analyticsParams = { auth: credentials, applicationName: gaApplicationName };
            const gaService = await service.data.ga;

            const dateYesterday = helpers.dateLessFromToday(1);
            const dtStartDate = request.body.DateFrom == null ? dateYesterday : new Date(request.body.DateFrom).toISOString();

            const lstProject = await projects.getAllGaJob();
            if (lstProject != null && lstProject.length > 0) {
                let daysInPast = 0;

                for (let i = 0; i < lstProject.length; i++) {
                    const { Id, Name, GoogleAnalyticsPropertyId, GoogleAnalyticsViewId, TenantId } = lstProject[i];

                    for (let j = 0; j < lstProject[i].Goals.length; j++) {
                        const { ValidFrom, ValidTo, GoalTypeId } = lstProject[i].Goals[j];
                        const gaAccountId = GoogleAnalyticsPropertyId.split('-')[1];
                        const gaViewId = GoogleAnalyticsViewId;

                        // GoogleAnalyticTypeId: 3 = Goal
                        const lastProcessDate = await googleAnalyticValues.getLastProcessDate(TenantId, 3, Id);
                        // Skip that project - it's already processed, hence the for loop below will skip
                        if (lastProcessDate != null && lastProcessDate === dtStartDate) continue;

                        let procDate = dtStartDate;

                        if (lastProcessDate == null) {
                            daysInPast = 32;
                            const startDate = new Date(dtStartDate);
                            const previous32Days = startDate.setDate(startDate.getDate() - daysInPast);
                            const date32DaysAgo = new Date(previous32Days).toISOString();

                            procDate = date32DaysAgo;
                        }

                        for (let k = 0; k <= daysInPast; k++) {
                            // Go toward the future from past
                            const procDateAsDate = new Date(procDate);
                            const dtProcess = procDateAsDate.setDate(procDateAsDate.getDate() + k);
                            const startDate = new Date(dtProcess).toISOString();

                            // Process queries
                            const lstByPage = [];
                            const lstPagePath = [];
                            const sbGoalQuery = [];
                            const lstGoalKeyValue = []; // key value pair of {string, string}
                            try {
                                analyticsParams.accountId = gaAccountId;
                                analyticsParams.profileId = gaViewId;
                                analyticsParams.webPropertyId = GoogleAnalyticsPropertyId;
                                const lstGoals = await service.management.goals.list(analyticsParams);
                                const allGoals = lstGoals.data.items;
                                if (lstGoals != null) {
                                    allGoals.forEach((g) => {
                                        if (g.active) {
                                            lstGoalKeyValue.push({ id: g.id, name: g.name });
                                        }
                                    });
                                }

                                if (lstGoalKeyValue.length > 0) {
                                    for (let l = 0; l < lstGoalKeyValue.length; l++) {
                                        const go = lstGoalKeyValue[l];
                                        sbGoalQuery.push(`ga:goal${go.id}Completions, ga:goal${go.id}Value, ga:goal${go.id}ConversionRate, ga:goal${go.id}AbandonRate, ga:users`);

                                        const byPageGoalRes = await gaService.get({
                                            auth: credentials,
                                            ids: `ga:${gaViewId}`,
                                            'start-date': startDate.split('T')[0], // Must be YYYY-MM-DD
                                            'end-date': startDate.split('T')[0], // Must be YYYY-MM-DD
                                            metrics: sbGoalQuery,
                                            filters: 'ga:medium==organic',
                                            dimensions: 'ga:landingPagePath',
                                        });
                                        if (byPageGoalRes.data.rows.length > 0) {
                                            const resHeader = byPageGoalRes.data.columnHeaders;
                                            const resRows = byPageGoalRes.data.rows;
                                            // Get header positions
                                            let gaLandingPagePathPos = 0;
                                            let gaCompletionsPos = 0;
                                            let gaValuePos = 0;
                                            let gaConversionRatePos = 0;
                                            let gaAbandonRatePos = 0;
                                            let gaUsersPos = 0;

                                            for (let m = 0; m < resHeader.length; m++) {
                                                if (resHeader[m].name === 'ga:landingPagePath') {
                                                    gaLandingPagePathPos = m;
                                                }
                                                if (resHeader[m].name === `ga:goal${go.id}Completions`) {
                                                    gaCompletionsPos = m;
                                                }
                                                if (resHeader[m].name === `ga:goal${go.id}Value`) {
                                                    gaValuePos = m;
                                                }
                                                if (resHeader[m].name === `ga:goal${go.id}ConversionRate`) {
                                                    gaConversionRatePos = m;
                                                }
                                                if (resHeader[m].name === `ga:goal${go.id}AbandonRate`) {
                                                    gaAbandonRatePos = m;
                                                }
                                                if (resHeader[m].name === 'ga:users') {
                                                    gaUsersPos = m;
                                                }
                                            }

                                            for (let n = 0; n < resRows.length; n++) {
                                                lstByPage.push({
                                                    goalId: go.id,
                                                    goalName: go.name,
                                                    pagePath: resRows[n][gaLandingPagePathPos],
                                                    completions: resRows[n][gaCompletionsPos],
                                                    value: resRows[n][gaValuePos],
                                                    conversionRate: resRows[n][gaConversionRatePos],
                                                    abandonRate: resRows[n][gaAbandonRatePos],
                                                    users: resRows[n][gaUsersPos],
                                                });
                                                lstPagePath.push(resRows[n][gaLandingPagePathPos]);
                                            }
                                        }
                                    }

                                    // GoalTypeId: 4 = Goal conversions
                                    if (GoalTypeId === 4) {
                                        const values = {
                                            TenantId,
                                            Data: lstByPage,
                                            Created: startDate,
                                            Filter: '',
                                            GoogleAnalyticTypeId: 3, // Goal
                                            ProjectId: Id,
                                        };
                                        await googleAnalyticValues.createGoogleAnalyticValue(values);
                                    }

                                    try {
                                        const lstPathForInsert = [];
                                        const set = new Set(lstPagePath);
                                        const pathsArray = Array.from(set);
                                        for (let o = 0; o < pathsArray.length; o++) {
                                            // Check if path exists in DB
                                            const gaPagePath = await googleAnalyticPagePaths.getByGaTypeIdAndPath(
                                                3, pathsArray[o],
                                            );
                                            if (!gaPagePath) lstPathForInsert.push(pathsArray[o]);
                                        }

                                        if (lstPathForInsert.length > 0) {
                                            for (let p = 0; p < lstPathForInsert.length; p++) {
                                                const values = {
                                                    ProjectId: Id,
                                                    GoogleAnalyticTypeId: 3, // Goal
                                                    Path: lstPathForInsert[p],
                                                };
                                                await googleAnalyticPagePaths.createGoogleAnalyticPagePath(values);
                                            }
                                        }
                                    } catch (ex) {
                                        logger.info(`Unable to process GA path for projectId: ${Id}, google analytic type: 3`);
                                        logger.fatal(ex);
                                    }
                                }
                            } catch (ex) {
                                logger.info(`Sync goal failed for project ${Name}, and viewId: ${gaViewId}, projectId: ${Id}`);
                                logger.fatal(ex);
                            }
                        }

                        try {
                            logger.info('Processing notifications...');
                            const goalCompletions = await googleAnalyticValues.getAllGoalCompletionsLast30Days(Id);
                            for (let q = 0; q < goalCompletions.length; q++) {
                                const { Data } = goalCompletions[q];

                                let cxpgoal = '';
                                // GoalTypeId: 4 = Goal conversions
                                if (GoalTypeId === 4 && ValidFrom <= today && ValidTo >= today) {
                                    cxpgoal = lstProject[i].Goals[j];
                                }

                                let sum = 0;
                                for (let r = 0; r < Data.length; r++) {
                                    const pageObj = Data[r];
                                    const completions = parseInt(pageObj.completions, 10);
                                    // Check if value of completions is a number
                                    if ('completions' in pageObj && !Number.isNaN(completions)) {
                                        sum += completions;
                                    }
                                }

                                // Check if goal is reached with sum and goal type then create
                                // notification if goal is reached or if there is no goal set
                                await goals.createNotificationForGoalType(cxpgoal, sum, TenantId, 4);
                            }
                        } catch (ex) {
                            logger.info(`Sync goal failed for project ${Name}, and viewId: ${gaViewId}, projectId: ${Id}`);
                            logger.fatal(ex);
                        }
                    }
                }
            }

            const newToday = new Date();

            return response.json(api.success(null, `Sync started at ${today.toLocaleString()} and was completed on ${newToday.toLocaleString()}`));
        } catch (e) {
            logger.info('An exception was caught...');
            logger.fatal(e);
            return next(e);
        }
    });

    return router;
};
