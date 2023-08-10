/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
const express = require('express');
require('dotenv').config();
const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const ApiResponse = require('../lib/ApiResponse');
const HubspotService = require('../lib/HubspotService');

const formatOut = bformat({ outputMode: 'short' });
const logger = bunyan.createLogger({ name: 'hubspotCustomerSyncJob', stream: formatOut, level: 'info' });

const router = express.Router();
const apiKey = process.env.HUBSPOT_API_KEY;

module.exports = (params) => {
    const { customers, tenantSettings } = params;
    const api = new ApiResponse();
    const hubspot = new HubspotService(apiKey);

    router.post('/fetch', async (request, response, next) => {
        try {
            const today = new Date();

            const queryDealWonStage = await tenantSettings.getByName('HUBSPOT_CLOSED_WON');
            const dealWonStage = queryDealWonStage.Val1;

            const lastSyncSettings = await tenantSettings.getByName('HUBSPOT_LAST_SYNC_DATE');
            const lastSyncDateTimestamp = lastSyncSettings.Val1; // Epoch in milliseconds or null
            const syncDateUnixTimestamp = Date.now(); // Epoch of current time in milliseconds

            // Fetch deals - closed won
            const deals = [];
            const takeLimit = 100;
            let after = 0;
            let total = 0;
            while (true) {
                // Execute Hubspot API request
                const hubspotResponse = await hubspot.getAllClosedWonDeals(
                    dealWonStage, lastSyncDateTimestamp, after,
                );
                if (hubspotResponse.error) {
                    return response.status(hubspotResponse.statusCode).json(api.error(
                        hubspotResponse.message, hubspotResponse.statusCode,
                    ));
                }

                deals.push(hubspotResponse.results);
                total = hubspotResponse.total;

                if (hubspotResponse.paging) {
                    after = hubspotResponse.paging.next.after;
                } else {
                    break;
                }
            }

            // Fetch associations for deals
            const associations = [];
            const dealIdsArr = [];
            deals.forEach((deal) => {
                deal.forEach((dealObj) => {
                    dealIdsArr.push({ id: dealObj.id });
                });
            });
            let skipAssociation = 0;
            while (deals.length > 0) {
                // Take a maximum of 100 ids to ensure rate limits isn't reached
                const take = skipAssociation + takeLimit;
                const dealIds = dealIdsArr.slice(skipAssociation, take);

                // Execute Hubspot API request
                const hubspotResponse = await hubspot.getCompaniesByDeals(dealIds);
                if (hubspotResponse.error) {
                    return response.status(hubspotResponse.statusCode).json(api.error(
                        hubspotResponse.message, hubspotResponse.statusCode,
                    ));
                }

                if (hubspotResponse.results) associations.push(hubspotResponse.results);

                skipAssociation += takeLimit;

                if (skipAssociation >= total) break;
            }

            // Fetch companies
            const companies = [];
            const companyIds = []; // Or requestIds, they have the same array values in C# repo
            associations.forEach((associationArray) => {
                associationArray.forEach((associationObj) => {
                    companyIds.push({ id: associationObj.to[0].id });
                });
            });
            let skipCompany = 0;

            while (companyIds.length > 0) {
                // Take a maximum of 100 ids to ensure rate limits isn't reached
                const take = skipCompany + takeLimit;
                const requestIds = companyIds.slice(skipCompany, take);

                // Execute Hubspot API request
                const hubspotResponse = await hubspot.getCompaniesBatch(requestIds);
                if (hubspotResponse.error) {
                    return response.status(hubspotResponse.statusCode).json(api.error(
                        hubspotResponse.message, hubspotResponse.statusCode,
                    ));
                }

                if (hubspotResponse.results) companies.push(hubspotResponse.results);

                skipCompany += takeLimit;

                if (skipCompany >= companyIds.length) break;
            }

            let updatedCustomerCount = 0;
            let newCustomerCount = 0;
            for (let j = 0; j < companies.length; j++) {
                for (let k = 0; k < companies[j].length; k++) {
                    const hubspotId = companies[j][k].id;
                    const customer = await customers.getByRefId(hubspotId);
                    if (customer) {
                        customer.ModifiedAt = today;
                        await customer.save();
                        updatedCustomerCount++;
                    } else {
                        const values = {
                            Name: companies[j][k].properties.name,
                            RefId: hubspotId,
                            RefName: companies[j][k].properties.name,
                        };

                        await customers.createCustomer(values);
                        newCustomerCount++;
                    }
                }
            }

            // Update tenant settings for HUBSPOT_LAST_SYNC_DATE and set it to current time in epoch
            lastSyncSettings.Val1 = syncDateUnixTimestamp;
            await lastSyncSettings.save();

            const newToday = new Date().toLocaleString();

            return response.json(api.success(
                { updatedCustomerCount, newCustomerRecords: newCustomerCount },
                `Sync started at ${today.toLocaleString()} and was completed on ${newToday}`,
            ));
        } catch (e) {
            logger.info('An exception was caught...');
            logger.fatal(e);
            return next(e);
        }
    });

    return router;
};
