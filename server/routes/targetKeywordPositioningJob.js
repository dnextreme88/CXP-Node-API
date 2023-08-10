/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
/* eslint-disable no-continue */
const express = require('express');
const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const Helpers = require('../lib/Helpers');
const ApiResponse = require('../lib/ApiResponse');
const GoogleService = require('../lib/GoogleService');

const formatOut = bformat({ outputMode: 'short' });
const logger = bunyan.createLogger({ name: 'targetKwPositioningJob', stream: formatOut, level: 'info' });

const router = express.Router();

module.exports = (params) => {
    const { projects, goals, targetKeywordPositionings, tenantSettings } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();
    const googleService = new GoogleService();

    router.post('/run', async (request, response, next) => {
        try {
            const today = new Date();

            const getGaApplicationName = await tenantSettings.getByName('GA_APPLICATION_NAME');
            const gaApplicationName = getGaApplicationName.Val1;
            const scopes = ['webmasters.readonly'];
            const credentials = await googleService.authorize(scopes); // ServiceAccountCredential
            if (credentials.error === true) {
                return response.status(401).json(api.error(credentials.message, 401));
            }

            // SearchAnalyticsQueryRequest expects PST time
            // Data is available only after 2 days
            const queryDateUtc = helpers.dateLessFromToday(3, true);
            const queryDateUtcNew = new Date(queryDateUtc);
            const deductHours = queryDateUtcNew.setHours(queryDateUtcNew.getHours() - 8);
            const maxDate = new Date(deductHours).toISOString();

            // For each project, fetch target pages and keywords
            // Query search console for all the keywords
            let skip = 0;
            let newTargetKwPosCount = 0;
            while (true) {
                const project = await projects.getByOffsetForTargetKeywordPositioningSync(skip);
                if (project === null) break;

                skip++;
                try {
                    const { Domain, TenantId } = project;
                    // Get last sync date
                    const lastSyncDate = await targetKeywordPositionings.getByProjectIdLastSyncDate(project.Id);

                    // If no lastSyncDate, pull data in the last 7 days
                    const maxDateNew = new Date(maxDate);
                    const epoch7DaysAgo = maxDateNew.setDate(maxDateNew.getDate() - 7);
                    const date7DaysAgo = new Date(epoch7DaysAgo).toISOString();

                    let syncDate = lastSyncDate > 0 ? lastSyncDate : date7DaysAgo;
                    while (syncDate < maxDate) {
                        const syncDateNew = new Date(syncDate);
                        const epochTomorrow = syncDateNew.setDate(syncDateNew.getDate() + 1);
                        syncDate = new Date(epochTomorrow).toISOString();

                        const searchConsoleParams = {
                            auth: credentials,
                            applicationName: gaApplicationName,
                            requestBody: {
                                dimensions: ['query'],
                                startDate: syncDate.split('T')[0],
                                endDate: syncDate.split('T')[0],
                                rowLimit: 25000,
                            },
                            siteUrl: Domain,
                            domain: Domain,
                        };
                        // Get data from last sync
                        const queries = await googleService.getResultList(searchConsoleParams);

                        for (let i = 0; i < project.TargetPages.length; i++) {
                            for (let j = 0; j < project.TargetPages[i].Keywords.length; j++) {
                                const { Id, Name } = project.TargetPages[i].Keywords[j];
                                if (!Name) continue;

                                // x.keys is an array that contains the keyword with length of 1
                                const position = queries.find((x) => x.keys.includes(Name));

                                const values = {
                                    Date: syncDate,
                                    Position: position ? position.position : null,
                                    TargetKeywordId: Id,
                                    ProjectId: project.Id,
                                };
                                await targetKeywordPositionings.createTargetKeywordPositioning(values);
                                newTargetKwPosCount++;
                            }
                        }
                        logger.info(`syncDate: ${syncDate}; maxDate: ${maxDate}`);
                    }

                    let goal = '';
                    project.Goals.forEach((goalObj) => {
                        const validFrom = new Date(goalObj.ValidFrom).toISOString();
                        const validTo = new Date(goalObj.ValidTo).toISOString();
                        if (validFrom <= today.toISOString() && validTo >= queryDateUtc && goalObj.GoalTypeId === 3) {
                            goal = goalObj;
                        }
                    });

                    if (!goal) continue;

                    const total = await targetKeywordPositionings.getSumForPeriod(
                        project.Id, goal.ValidFrom, goal.ValidTo,
                    );

                    // Goal reached notifications
                    logger.info('Processing notifications...');
                    if (goal.Goal && total >= goal.Goal && !goal.GoalReachedAt) {
                        // Check if goal is reached with sum and goal type then create
                        // notification if goal is reached or if there is no goal set
                        // GoalTypeId: 3 = Target keyword positioning
                        await goals.createNotificationForGoalType(goal, total, TenantId, 3);
                    }

                    if (!goal.Goal) await goals.createNotificationForGoalType(goal, total, TenantId, 3);
                } catch (e) {
                    logger.info('An exception was caught...');
                    logger.fatal(e);
                }
            }

            const newToday = new Date();

            return response.json(api.success(
                { newTargetKeywordPositioningRecords: newTargetKwPosCount },
                `Sync started at ${today.toLocaleString()} and was completed on ${newToday.toLocaleString()}`,
            ));
        } catch (e) {
            logger.info('An exception was caught...');
            logger.fatal(e);
            return next(e);
        }
    });

    return router;
};
