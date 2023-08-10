/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
require('dotenv').config(); // .env
const express = require('express');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const ApiResponse = require('../lib/ApiResponse');

const formatOut = bformat({ outputMode: 'short' });
const logger = bunyan.createLogger({ name: 'targetPagesAndKeywordJob', stream: formatOut, level: 'info' });

const router = express.Router();

module.exports = (params) => {
    const { projects, targetKeywords, targetPages } = params;
    const api = new ApiResponse();

    router.post('/run', async (request, response, next) => {
        const today = new Date();

        try {
            const project = await projects.getByOffsetForTargetPagesAndKeywordSync();

            // Victorious spreadsheet ID
            const doc = new GoogleSpreadsheet(
                process.env.GOOGLE_SAMPLE_SPREADSHEET_ID,
            );
            await doc.useServiceAccountAuth({
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            });
            // Load document properties and worksheets
            await doc.loadInfo();

            // Isolate Page Ops sheet ID
            const allSheetIds = Object.keys(doc._rawSheets);
            let summarySheetId = '';
            let kwrSheetId = '';
            let pageOpsSheetId = '';
            for (const key of allSheetIds) {
                const workingSheetTitle = doc._rawSheets[key]._rawProperties.title;
                const pageOpsTitles = ['Page Optimization', 'Page Optimizations', 'Master Page Optimization'];
                if (pageOpsTitles.includes(workingSheetTitle)) pageOpsSheetId = key;

                if (workingSheetTitle === 'Summary') summarySheetId = key;

                if (workingSheetTitle === 'Master Keyword Research') kwrSheetId = key;
            }
            if (!pageOpsSheetId || !kwrSheetId || !summarySheetId) {
                throw new Error('Please make sure the KWR doc has data tabs titled "Summary", "Master Keyword Research", and "Page Optimizations"');
            }

            const kwSheet = doc.sheetsById[kwrSheetId];
            await kwSheet.loadCells('B:D'); // 3

            const noOfLoadedCells = kwSheet.cellStats.loaded;
            // This value must be changed depending on the number of columns being loaded by
            // await kwSheet.loadCells() above
            const noOfColumns = 3;
            const targetPageUrlsArray = [];
            for (let k = 3; k <= (noOfLoadedCells / noOfColumns); k++) {
                const cellValueAtColumnB = kwSheet.getCellByA1(`B${k}`).value;
                const cellValueAtColumnC = kwSheet.getCellByA1(`C${k}`).value;
                if (cellValueAtColumnB && cellValueAtColumnC) {
                    if (cellValueAtColumnC.startsWith('http') && !targetPageUrlsArray.includes(cellValueAtColumnB)) {
                        targetPageUrlsArray.push(cellValueAtColumnC.trim());
                    }
                }
            }

            let newTargetPageCount = 0;
            let newTargetKwCount = 0;
            let targetPageTitle = '';
            let startingIndex = 3;
            for (let i = startingIndex; i < (noOfLoadedCells / noOfColumns); i++) {
                const currentUrl = kwSheet.getCellByA1(`C${i}`).value;
                // Check if url is in the array
                if (currentUrl && targetPageUrlsArray.includes(currentUrl.trim())) {
                    targetPageTitle = kwSheet.getCellByA1(`B${i}`).value;
                    // Check if a value from column B is null, especially for merged cells as it
                    // uses the topmost column and leaves the other merged cells as null
                    if (!targetPageTitle) {
                        // Begin from the initial start index and work towards the bottom
                        for (let j = startingIndex; j < i; j++) {
                            const workingTitle = kwSheet.getCellByA1(`B${j}`).value;
                            // If a cell value is not null, use it as the page title then skip the
                            // rest of the loop
                            if (workingTitle) {
                                targetPageTitle = workingTitle;
                                break;
                            }
                        }
                    }
                    // Check for unique target page URLs so we don't duplicate it on the DB
                    let targetPage = await targetPages.getByProjectIdAndUrlWithKeywords(
                        project.Id, currentUrl.trim(),
                    );
                    if (!targetPage) {
                        const values = {
                            Name: targetPageTitle,
                            Url: currentUrl.trim(),
                            ProjectId: project.Id,
                        };
                        targetPage = await targetPages.createTargetPage(values);
                        newTargetPageCount++;
                    }
                    const values = {
                        Name: kwSheet.getCellByA1(`D${i}`).value,
                        TargetPageId: targetPage.Id,
                        ProjectId: project.Id,
                    };
                    await targetKeywords.createTargetKeyword(values);
                    newTargetKwCount++;
                } else {
                    // Add 1 to skip cells with null values as they're used as separators for the
                    // next target page being optimized
                    startingIndex = i + 1;
                }
            }

            const newToday = new Date();

            return response.json(api.success(
                { newTargetPageRecords: newTargetPageCount, newTargetKwsRecords: newTargetKwCount },
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
