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
const logger = bunyan.createLogger({ name: 'targetKwPositioningBackfillJob', stream: formatOut, level: 'info' });

const router = express.Router();

module.exports = (params) => {
    const { projects, targetKeywordPositionings, tenantSettings } = params;
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

            // For each project, fetch target pages and keywords
            // Query search console for all the keywords
            let skip = 0;
            let newTargetKwPosCount = 0;
            while (true) {
                const project = await projects.getByOffsetForTargetKeywordPositioningSync(skip);
                if (project === null) break;

                skip++;

                const { Domain, MaxBackfills, NumBackfills } = project;

                // Only perform the backfill if the project has not reached its limit of months
                // allowed for backfilling
                if (NumBackfills >= MaxBackfills) continue;

                try {
                    // Get earliest sync date
                    const queryDateUtc = await targetKeywordPositionings.getByProjectIdFirstSyncDate(project.Id);

                    // Subtract 1 day since we've already processed the earliest day found in DB
                    const queryDateUtcNew = new Date(queryDateUtc);
                    const epochYesterday = queryDateUtcNew.setDate(queryDateUtcNew.getDate() - 1);
                    const maxDate = new Date(epochYesterday).toISOString();

                    // Pull data for 1 month prior to the earliest sync date
                    const maxDateNew = new Date(maxDate);
                    const epoch30DaysAgo = maxDateNew.setDate(maxDateNew.getDate() - 30);
                    let syncDate = new Date(epoch30DaysAgo).toISOString();
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
