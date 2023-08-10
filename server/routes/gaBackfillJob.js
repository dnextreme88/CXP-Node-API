/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
/* eslint-disable max-len */
const express = require('express');
const { google } = require('googleapis');
const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const ApiResponse = require('../lib/ApiResponse');
const GoogleService = require('../lib/GoogleService');

const formatOut = bformat({ outputMode: 'short' });
const logger = bunyan.createLogger({ name: 'gaBackfillJob', stream: formatOut, level: 'info' });

const router = express.Router();

module.exports = (params) => {
    const {
        projects, googleAnalyticValues, googleAnalyticPagePaths, tenantSettings,
    } = params;
    const api = new ApiResponse();
    const googleService = new GoogleService();

    const scopes = ['analytics.readonly', 'webmasters.readonly'];
    const daysInPast = 30; // Go 1 month into the past from the furthest date

    router.post('/organic', async (request, response, next) => {
        try {
            const today = new Date();
            const credentials = await googleService.authorize(scopes); // ServiceAccountCredential
            if (credentials.error === true) {
                return response.status(401).json(api.error(credentials.message, 401));
            }

            const lstProject = await projects.getAllGaJob();
            if (lstProject != null && lstProject.length > 0) {
                for (let i = 0; i < lstProject.length; i++) {
                    const { Id, Name, GoogleAnalyticsViewId, MaxBackfills, NumBackfills, TenantId } = lstProject[i];

                    for (let j = 0; j < lstProject[i].Goals.length; j++) {
                        // Explicitly process projects whose goal type is Organic search traffic
                        if (lstProject[i].Goals[j].GoalTypeId === 1) {
                            // Only perform the backfill if the project has not reached its limit of
                            // months allowed for backfilling
                            if (NumBackfills >= MaxBackfills) continue;

                            const gaViewId = GoogleAnalyticsViewId;

                            // GoogleAnalyticTypeId: 1 = Organic
                            const gaValue = await googleAnalyticValues.getFirstProcessDate(TenantId, 1, Id);
                            let dtStartDate = request.body.DateFrom == null ? gaValue : request.body.DateFrom;

                            const dtStartDateNew = new Date(dtStartDate);
                            const epochDtStartDate = dtStartDateNew.setDate(dtStartDateNew.getDate() - 1);
                            dtStartDate = new Date(epochDtStartDate).toISOString();

                            let procDate = dtStartDate;
                            // Negative value for going into past
                            const procDateNew = new Date(procDate);
                            const epochProcDate = procDateNew.setDate(procDateNew.getDate() - daysInPast);
                            procDate = new Date(epochProcDate).toISOString();

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

                                    let values = {
                                        TenantId,
                                        Data: res,
                                        Created: startDate,
                                        Filter: '',
                                        GoogleAnalyticTypeId: 1, // Organic
                                        ProjectId: Id,
                                    };
                                    await googleAnalyticValues.createGoogleAnalyticValue(values);

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
                                                values = {
                                                    ProjectId: Id,
                                                    GoogleAnalyticTypeId: 1, // Organic
                                                    Path: lstPathForInsert[m],
                                                    Created: startDate,
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

    router.post('/eCommerce', async (request, response, next) => {
        try {
            const today = new Date();
            const credentials = await googleService.authorize(scopes); // ServiceAccountCredential
            if (credentials.error === true) {
                return response.status(401).json(api.error(credentials.message, 401));
            }

            const lstProject = await projects.getAllGaJob();
            if (lstProject != null && lstProject.length > 0) {
                for (let i = 0; i < lstProject.length; i++) {
                    const { Id, Name, GoogleAnalyticsViewId, MaxBackfills, NumBackfills, TenantId } = lstProject[i];

                    for (let j = 0; j < lstProject[i].Goals.length; j++) {
                        // Explicitly process projects whose goal type is eCommerce/Revenue tracking
                        if (lstProject[i].Goals[j].GoalTypeId === 5) {
                            // Only perform the backfill if the project has not reached its limit of
                            // months allowed for backfilling
                            if (NumBackfills >= MaxBackfills) continue;

                            const gaViewId = GoogleAnalyticsViewId;

                            // GoogleAnalyticTypeId: 2 = eCommerce
                            const gaValue = await googleAnalyticValues.getFirstProcessDate(TenantId, 2, Id);
                            let dtStartDate = request.body.DateFrom == null ? gaValue : request.body.DateFrom;

                            const dtStartDateNew = new Date(dtStartDate);
                            const epochDtStartDate = dtStartDateNew.setDate(dtStartDateNew.getDate() - 1);
                            dtStartDate = new Date(epochDtStartDate).toISOString();

                            let procDate = dtStartDate;
                            // Negative value for going into past
                            const procDateNew = new Date(procDate);
                            const epochProcDate = procDateNew.setDate(procDateNew.getDate() - daysInPast);
                            procDate = new Date(epochProcDate).toISOString();

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

                                    let values = {
                                        TenantId,
                                        Data: res,
                                        Created: startDate,
                                        Filter: '',
                                        GoogleAnalyticTypeId: 2, // eCommerce
                                        ProjectId: Id,
                                    };
                                    await googleAnalyticValues.createGoogleAnalyticValue(values);

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
                                                values = {
                                                    ProjectId: Id,
                                                    GoogleAnalyticTypeId: 2, // eCommerce
                                                    Path: lstPathForInsert[m],
                                                    Created: startDate,
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

    router.post('/goalGaBackfill', async (request, response, next) => {
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

            const lstProject = await projects.getAllGaJob();
            if (lstProject != null && lstProject.length > 0) {
                for (let i = 0; i < lstProject.length; i++) {
                    const { Id, Name, GoogleAnalyticsViewId, GoogleAnalyticsPropertyId, MaxBackfills, NumBackfills, TenantId } = lstProject[i];

                    for (let j = 0; j < lstProject[i].Goals.length; j++) {
                        // Explicitly process projects whose goal type is Goal conversions
                        if (lstProject[i].Goals[j].GoalTypeId === 4) {
                            // Only perform the backfill if the project has not reached its limit of
                            // months allowed for backfilling
                            if (NumBackfills >= MaxBackfills) continue;

                            const gaAccountId = GoogleAnalyticsPropertyId.split('-')[1];
                            const gaViewId = GoogleAnalyticsViewId;

                            // GoogleAnalyticTypeId: 3 = Goal
                            const gaValue = await googleAnalyticValues.getFirstProcessDate(TenantId, 3, Id);
                            let dtStartDate = request.body.DateFrom == null ? gaValue : request.body.DateFrom;

                            const dtStartDateNew = new Date(dtStartDate);
                            const epochDtStartDate = dtStartDateNew.setDate(dtStartDateNew.getDate() - 1);
                            dtStartDate = new Date(epochDtStartDate).toISOString();

                            let procDate = dtStartDate;
                            // Negative value for going into past
                            const procDateNew = new Date(procDate);
                            const epochProcDate = procDateNew.setDate(procDateNew.getDate() - daysInPast);
                            procDate = new Date(epochProcDate).toISOString();

                            for (let k = 0; k <= daysInPast; k++) {
                                // Go toward the future from past
                                const procDateAsDate = new Date(procDate);
                                const dtProcess = procDateAsDate.setDate(procDateAsDate.getDate() + j);
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

                                        let values = {
                                            TenantId,
                                            Data: lstByPage,
                                            Created: startDate,
                                            Filter: '',
                                            GoogleAnalyticTypeId: 3, // Goal
                                            ProjectId: Id,
                                        };
                                        await googleAnalyticValues.createGoogleAnalyticValue(values);

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
                                                    values = {
                                                        ProjectId: Id,
                                                        GoogleAnalyticTypeId: 3, // Goal
                                                        Path: lstPathForInsert[p],
                                                        Created: startDate,
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

    // This is to be run manually after all the backfill jobs have been run, including those of target pages
    router.post('/increment', async (request, response, next) => {
        try {
            let incrementedProjectsCount = 0;

            const lstProject = await projects.getAllForBackfillIncrement();
            if (lstProject != null && lstProject.length > 0) {
                for (let i = 0; i < lstProject.length; i++) {
                    const project = await projects.getById(lstProject[i].Id);
                    if (project.NumBackfills < project.MaxBackfills) {
                        project.NumBackfills += 1;
                        await project.save();
                        incrementedProjectsCount++;
                    }
                }
            }

            return response.json(api.success(null, `NumBackfills incremented for ${incrementedProjectsCount} projects`));
        } catch (e) {
            logger.info('An exception was caught...');
            logger.fatal(e);
            return next(e);
        }
    });

    return router;
};
