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
const logger = bunyan.createLogger({ name: 'totalKwRankedJob', stream: formatOut, level: 'info' });

const router = express.Router();

module.exports = (params) => {
    const { projects, goals, targetPages, totalKeywordsRankeds, tenantSettings } = params;
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

            // Data is available only after 2 days
            let maxDate = helpers.dateLessFromToday(3, true);
            const maxDateNew = new Date(maxDate);
            const deductHoursMaxDate = maxDateNew.setHours(maxDateNew.getHours() - 8);
            maxDate = new Date(deductHoursMaxDate).toISOString();

            let minDate = helpers.dateLessFromToday(30, true);
            const minDateNew = new Date(minDate);
            const deductHoursMinDate = minDateNew.setHours(minDateNew.getHours() - 8);
            minDate = new Date(deductHoursMinDate).toISOString();

            let skip = 0;
            let newTotalKwRankedCount = 0;
            let newTotalKwRankedWithTargetPageCount = 0;
            while (true) {
                const project = await projects.getByOffsetForTotalKeywordsRanked(skip);
                if (project === null) break;

                skip++;
                try {
                    const { Id, Name, Domain, TenantId } = project;

                    // Get last sync date
                    let syncDate = await totalKeywordsRankeds.getByProjectIdLastSyncDate(Id);
                    if (syncDate === 0) syncDate = minDate;

                    let domainData = null;
                    while (syncDate < maxDate) {
                        const syncDateNew = new Date(syncDate);
                        const epochTomorrow = syncDateNew.setDate(syncDateNew.getDate() + 1);
                        syncDate = new Date(epochTomorrow).toISOString();

                        // domainData = await SaveDataForDomain(syncDate, searchConsoleService, project);
                        // TODO: DRY PRINCIPLE
                        const searchConsoleParams = {
                            auth: credentials,
                            applicationName: gaApplicationName,
                            requestBody: {
                                dimensions: ['query'],
                                startDate: syncDate.split('T')[0],
                                endDate: syncDate.split('T')[0],
                                rowLimit: 20000,
                            },
                            siteUrl: Domain,
                            domain: Domain,
                        };
                        // Get data from last sync
                        const queries = await googleService.getResultList(searchConsoleParams);

                        // Returns object with count of top3, top10, top100, over100 data
                        const totalKwrRankedData = await googleService.countTotalKwrRankedData(queries);
                        const values = { // No target page id
                            Date: syncDate,
                            Top3: totalKwrRankedData.top3,
                            Top10: totalKwrRankedData.top10,
                            Top100: totalKwrRankedData.top100,
                            Over100: totalKwrRankedData.over100,
                            ProjectId: Id,
                        };
                        domainData = await totalKeywordsRankeds.createTotalKeywordsRanked(values);
                        newTotalKwRankedCount++;

                        const pages = await targetPages.getAllByProjectId(Id);

                        // pageErrors = await SaveDataForPages(syncDate, searchConsoleService, project, pages)
                        for (let i = 0; i < pages.length; i++) {
                            try {
                                // TODO: DRY PRINCIPLE
                                searchConsoleParams.requestBody = {
                                    dimensions: ['query'],
                                    startDate: syncDate.split('T')[0],
                                    endDate: syncDate.split('T')[0],
                                    rowLimit: 20000,
                                    dimensionFilterGroups: [{
                                        filters: [{
                                            dimension: 'page',
                                            operator: 'equals',
                                            expression: pages[i].Url,
                                        }],
                                    }],
                                };
                                // Get data from last sync
                                const queriesB = await googleService.getResultList(searchConsoleParams);
                                if (queriesB.length < 1) continue;

                                // Returns object with count of top3, top10, top100, over100 data
                                const totalKwrRankedDataB = await googleService.countTotalKwrRankedData(queriesB);
                                const valuesB = { // Has target page id
                                    Date: syncDate,
                                    Top3: totalKwrRankedDataB.top3,
                                    Top10: totalKwrRankedDataB.top10,
                                    Top100: totalKwrRankedDataB.top100,
                                    Over100: totalKwrRankedDataB.over100,
                                    TargetPageId: pages[i].Id,
                                    ProjectId: Id,
                                };
                                await totalKeywordsRankeds.createTotalKeywordsRanked(valuesB);
                                newTotalKwRankedWithTargetPageCount++;
                            } catch (e) {
                                logger.fatal(`Error for project: ${Name}, id: ${Id}, target page: ${pages[i].Url}`);
                                logger.fatal(e);
                            }
                        }
                        logger.info(`syncDate: ${syncDate}; maxDate: ${maxDate}`);
                    }

                    if (domainData === null) continue;

                    let totalGoal = '';
                    let pageOneGoal = '';
                    project.Goals.forEach((goalObj) => {
                        const validFrom = new Date(goalObj.ValidFrom).toISOString();
                        const validTo = new Date(goalObj.ValidTo).toISOString();
                        // GoalTypeId: 2 = Total keywords ranked
                        if (validFrom <= today.toISOString() && validTo >= today.toISOString() && goalObj.GoalTypeId === 2) {
                            totalGoal = goalObj;
                        }
                        // GoalTypeId: 6 = Page one keyword
                        if (validFrom <= today.toISOString() && validTo >= today.toISOString() && goalObj.GoalTypeId === 6) {
                            pageOneGoal = goalObj;
                        }
                    });

                    logger.info('Processing notifications...');
                    // Total keywords ranked goal reached notifications
                    // GoalTypeId: 2 = Total keywords ranked
                    await goals.createNotificationForGoalType(totalGoal, domainData.Top100, TenantId, 2, domainData);

                    // Page one keyword notifications
                    // GoalTypeId: 6 = Page one keyword
                    await goals.createNotificationForGoalType(pageOneGoal, domainData.Top10, TenantId, 6, domainData);
                } catch (e) {
                    logger.info('An exception was caught...');
                    logger.fatal(e);
                }
            }

            const newToday = new Date();

            return response.json(api.success(
                { newTotalKwRankedCount, newTotalKwRankedWithTargetPageCount },
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
