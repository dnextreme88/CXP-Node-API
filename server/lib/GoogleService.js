/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
/* eslint-disable object-shorthand */
require('dotenv').config();
const { google } = require('googleapis');
const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const config = require('../config/index')[process.env.NODE_ENV || 'development'];
const Helpers = require('./Helpers');
const TenantSettingsService = require('../services/TenantSettingsService');

const helpers = new Helpers();
const tenantSettings = new TenantSettingsService(config.log());
const formatOut = bformat({ outputMode: 'short' });

const logger = bunyan.createLogger({ name: 'GoogleService', stream: formatOut, level: 'info' });

class GoogleService {
    async authorize(scopesArray) {
        // Scopes: https://developers.google.com/identity/protocols/oauth2/scopes
        for (let i = 0; i < scopesArray.length; i++) {
            scopesArray[i] = `https://www.googleapis.com/auth/${scopesArray[i]}`;
        }

        const privateKeyErrors = ['ERR_OSSL_PEM_NO_START_LINE', 'ERR_OSSL_PEM_BAD_END_LINE', 'ERR_OSSL_EVP_UNSUPPORTED ALGORITHM', 'ERR_OSSL_ASN1_WRONG_TAG'];

        const googleSettings = await tenantSettings.getAllByNamePrefix('GOOGLE_');
        let serviceAccount;
        let serviceAccountKey;
        let impersonatedUser;

        googleSettings.forEach((setting) => {
            if (setting.Name === 'GOOGLE_SERVICE_ACCOUNT_EMAIL') serviceAccount = setting.Val1;
            if (setting.Name === 'GOOGLE_SERVICE_ACCOUNT_KEY') serviceAccountKey = setting.Val1;
            if (setting.Name === 'GOOGLE_IMPERSONATED_ACCOUNT') impersonatedUser = setting.Val1;
        });

        // ServiceAccountCredential
        const credentials = new google.auth.JWT(
            serviceAccount, // process.env.GSC_SERVICE_ACCOUNT_EMAIL
            null,
            serviceAccountKey.replace(/\\n/g, '\n'), // process.env.GSC_PRIVATE_KEY.replace(/\\n/g, '\n')
            scopesArray,
            impersonatedUser,
        );

        // Check if GSC account credentials are valid based on the params
        try {
            await credentials.authorize();
            logger.info('Successfully authorized to Google APIs!');
        } catch (GoogleApiException) {
            logger.info('Failed to authorize to Google APIs! Please check your credential info');
            logger.fatal(GoogleApiException);
            let message = '';

            // Invalid private key - they don't have a response.data object
            if (privateKeyErrors.includes(GoogleApiException.code)) {
                message = `Invalid private key for GSC account (${GoogleApiException.code})`;
            } else if (GoogleApiException.response.data.error) {
                // Invalid service account (invalid_client) or impersonated user (invalid_grant, invalid_request)
                message = `${GoogleApiException.response.data.error_description} (${GoogleApiException.response.data.error})`;
            }

            return { error: true, message };
        }

        return credentials;
    }

    async getGaData(gaTypeId, credentials, gaViewId, dateStringWithTimezone) {
        const service = google.analytics('v3'); // AnalyticsService
        const gaService = await service.data.ga;

        // Check if start date is in the date format YYYY-MM-DD
        // startAndEndDate param must be eg. 2021-12-08T05:35:35.980Z
        // startDate will be parsed as 2021-12-08
        const startDate = helpers.parseToDateStringYYYYMMDD(dateStringWithTimezone);
        const lstPagePath = []; // Store page path data
        const lstByPage = []; // Store individual page path data

        const gaParams = {
            auth: credentials,
            ids: `ga:${gaViewId}`,
            'start-date': startDate, // Must be YYYY-MM-DD
            'end-date': startDate, // Must be YYYY-MM-DD
            filters: 'ga:medium==organic',
        };

        if (gaTypeId === 1) { // Organic
            gaParams.metrics = 'ga:sessions, ga:bounceRate, ga:newUsers, ga:users';
            gaParams.dimensions = 'ga:source, ga:pagePath';
            gaParams.sort = '-ga:sessions';
        } else if (gaTypeId === 2) { // eCommerce
            gaParams.metrics = 'ga:uniquePurchases, ga:itemQuantity, ga:itemRevenue, ga:revenuePerItem, ga:itemsPerPurchase';
            gaParams.dimensions = 'ga:pagePath';
        }

        const gaResponse = await gaService.get(gaParams);
        const tot = gaResponse.data.totalsForAllResults;
        const resHeader = gaResponse.data.columnHeaders;
        const resRows = gaResponse.data.rows;

        if (gaTypeId === 1) { // Organic
            // Get header positions
            let gaSourcePos = 0;
            let gaPagePathPos = 0;
            let gaSessionsPos = 0;
            let gaBounceRatePos = 0;
            let gaNewUsersPos = 0;
            let gaUsersPos = 0;

            for (let i = 0; i < resHeader.length; i++) {
                if (resHeader[i].name === 'ga:source') {
                    gaSourcePos = i;
                }
                if (resHeader[i].name === 'ga:pagePath') {
                    gaPagePathPos = i;
                }
                if (resHeader[i].name === 'ga:sessions') {
                    gaSessionsPos = i;
                }
                if (resHeader[i].name === 'ga:bounceRate') {
                    gaBounceRatePos = i;
                }
                if (resHeader[i].name === 'ga:newUsers') {
                    gaNewUsersPos = i;
                }
                if (resHeader[i].name === 'ga:users') {
                    gaUsersPos = i;
                }
            }
            for (let j = 0; j < resRows.length; j++) {
                lstByPage.push({
                    source: resRows[j][gaSourcePos],
                    pagePath: resRows[j][gaPagePathPos],
                    sessions: resRows[j][gaSessionsPos],
                    bounceRate: resRows[j][gaBounceRatePos],
                    newUsers: resRows[j][gaNewUsersPos],
                    users: resRows[j][gaUsersPos],
                });
                lstPagePath.push(resRows[j][gaPagePathPos]);
            }
        } else if (gaTypeId === 2) { // eCommerce
            // Get header positions
            let gaUniquePurchasesCommPos = 0;
            let gaItemQuantityCommPos = 0;
            let gaItemRevenueCommPos = 0;
            let gaRevenuePerItemCommPos = 0;
            let gaItemsPerPurchaseCommPos = 0;
            let gaPagePathCommPos = 0;

            for (let i = 0; i < resHeader.length; i++) {
                if (resHeader[i].name === 'ga:pagePath') {
                    gaPagePathCommPos = i;
                }
                if (resHeader[i].name === 'ga:uniquePurchases') {
                    gaUniquePurchasesCommPos = i;
                }
                if (resHeader[i].name === 'ga:itemQuantity') {
                    gaItemQuantityCommPos = i;
                }
                if (resHeader[i].name === 'ga:itemRevenue') {
                    gaItemRevenueCommPos = i;
                }
                if (resHeader[i].name === 'ga:revenuePerItem') {
                    gaRevenuePerItemCommPos = i;
                }
                if (resHeader[i].name === 'ga:itemsPerPurchase') {
                    gaItemsPerPurchaseCommPos = i;
                }
            }
            for (let j = 0; j < resRows.length; j++) {
                lstByPage.push({
                    pagePath: resRows[j][gaPagePathCommPos],
                    uniquePurchases: resRows[j][gaUniquePurchasesCommPos],
                    itemQuantity: resRows[j][gaItemQuantityCommPos],
                    itemRevenue: resRows[j][gaItemRevenueCommPos],
                    revenuePerItem: resRows[j][gaRevenuePerItemCommPos],
                    itemsPerPurchase: resRows[j][gaItemsPerPurchaseCommPos],
                });
                lstPagePath.push(resRows[j][gaPagePathCommPos]);
            }
        }

        const total = {};
        Object.entries(tot).forEach((pair) => {
            const [key, value] = pair;
            const replacedKey = key.replace('ga:', '');
            total[replacedKey] = value;
        });

        const res = { Total: total, ByPage: lstByPage, LstPagePathArray: lstPagePath };

        return res;
    }

    async getResultList(searchConsoleParams) {
        const searchConsole = google.searchconsole('v1'); // SearchConsoleService
        const resultList = [];
        let startRow = 0;

        while (true) {
            searchConsoleParams.requestBody.startRow = startRow;
            const googleResponse = await searchConsole.searchanalytics.query(searchConsoleParams);

            resultList.push(googleResponse.data.rows);

            // 5000 < rowLimit of 20000 or 250000
            if (googleResponse.data.rows.length < searchConsoleParams.requestBody.rowLimit) break;

            startRow += searchConsoleParams.requestBody.rowLimit;
        }

        return resultList[0];
    }

    async countTotalKwrRankedData(resultListArray) {
        // Creates new arrays based on given condition on callback function
        const top3 = resultListArray.filter((x) => x.position < 3.5).length;
        const top10 = resultListArray.filter((x) => x.position < 10.5).length;
        const top100 = resultListArray.filter((x) => x.position < 100.5).length;
        const over100 = resultListArray.filter((x) => x.position >= 100.5).length;

        return { top3, top10, top100, over100 };
    }
}

module.exports = GoogleService;
