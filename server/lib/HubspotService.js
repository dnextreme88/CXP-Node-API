/* eslint-disable object-shorthand */
require('dotenv').config();
const hubspot = require('@hubspot/api-client');
const bunyan = require('bunyan');
const bformat = require('bunyan-format');

const formatOut = bformat({ outputMode: 'short' });
const logger = bunyan.createLogger({ name: 'HubspotService', stream: formatOut, level: 'info' });

class HubspotService {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async createClient() {
        const hubspotClient = new hubspot.Client({ apiKey: this.apiKey });

        return hubspotClient;
    }

    // POST /crm/v3/objects/deals/search
    async getAllClosedWonDeals(closedWonStage, lastChecked = null, after = 0, limit = 100) {
        const hubspotClient = await this.createClient();
        const query = {
            properties: ['dealstage'], // DealStageProperty
            sorts: ['hs_lastmodifieddate'], // LastModifiedProperty
            limit: limit,
            after: after,
        };

        // Filters for deals in stage 'closed won' for pipelines MM and ENT
        const mmFilters = {};
        mmFilters.filters = [];
        mmFilters.filters.push({
            propertyName: 'dealstage', // DealStageProperty
            operator: 'EQ',
            value: closedWonStage,
        });

        // Get only changes that occurred after the last sync
        if (lastChecked !== null) {
            mmFilters.filters.push({
                propertyName: 'hs_lastmodifieddate', // LastModifiedProperty
                operator: 'GTE',
                value: lastChecked,
            });
        }

        query.filterGroups = [mmFilters];

        const deals = await hubspotClient.crm.deals.searchApi.doSearch(query)
            .then((res) => {
                // console.log(res);
                return res.body;
            })
            .catch((e) => {
                logger.fatal('HUBSPOT ERROR:');
                logger.fatal(e);

                return { message: e.message, statusCode: e.statusCode, error: true };
            });

        return deals;
    }

    // POST /crm/v3/associations/{fromObjectType}/{toObjectType}/batch/read
    async getCompaniesByDeals(dealIds) { // dealIds must be an array of strings
        const hubspotClient = await this.createClient();
        const params = { inputs: dealIds };

        const apiResponse = await hubspotClient.crm.associations.batchApi.read('deal', 'company', params)
            .then((res) => {
                // console.log(res);
                return res.body;
            })
            .catch((e) => {
                logger.fatal('HUBSPOT ERROR:');
                logger.fatal(e);

                return { message: e.message, statusCode: e.statusCode, error: true };
            });

        return apiResponse;
    }

    // POST /crm/v3/objects/{objectType}/batch/read
    async getCompaniesBatch(companyIds) { // companyIds must be an array of strings
        const hubspotClient = await this.createClient();
        const params = { inputs: companyIds };

        const apiResponse = await hubspotClient.crm.objects.batchApi.read('companies', params)
            .then((res) => {
                // console.log(res);
                return res.body;
            })
            .catch((e) => {
                logger.fatal('HUBSPOT ERROR:');
                logger.fatal(e);

                return { message: e.message, statusCode: e.statusCode, error: true };
            });

        return apiResponse;
    }
}

module.exports = HubspotService;
