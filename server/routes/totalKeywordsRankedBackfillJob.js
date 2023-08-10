/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
/* eslint-disable no-continue */
const express = require('express');
const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const ApiResponse = require('../lib/ApiResponse');
const GoogleService = require('../lib/GoogleService');

const formatOut = bformat({ outputMode: 'short' });
const logger = bunyan.createLogger({ name: 'totalKwRankedBackfillJob', stream: formatOut, level: 'info' });

const router = express.Router();

module.exports = (params) => {
    const { projects, targetPages, totalKeywordsRankeds, tenantSettings } = params;
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

            let skip = 0;
            let newTotalKwRankedCount = 0;
            let newTotalKwRankedWithTargetPageCount = 0;
            while (true) {
                const project = await projects.getByOffsetForTotalKeywordsRanked(skip);
                if (project === null) break;

                skip++;
                try {
                    const { Id, Name, Domain, NumBackfills, MaxBackfills } = project;

                    // Only perform the backfill if the project has not reached its limit of months
                    // allowed for backfilling
                    if (NumBackfills >= MaxBackfills) continue;

                    // Get earliest sync date
                    const queryDateUtc = await totalKeywordsRankeds.getByProjectIdFirstSyncDate(Id);

                    // Subtract 1 day since we've already processed the earliest day found in DB
                    const queryDateUtcNew = new Date(queryDateUtc);
                    const epochYesterday = queryDateUtcNew.setDate(queryDateUtcNew.getDate() - 1);
                    const maxDate = new Date(epochYesterday).toISOString();

                    // Pull data for 1 month prior to the earliest sync date
                    const maxDateNew = new Date(maxDate);
                    const epoch30DaysAgo = maxDateNew.setDate(maxDateNew.getDate() - 30);
                    let syncDate = new Date(epoch30DaysAgo).toISOString();

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
