require('dotenv').config(); // .env
const uuid = require('uuid').v4;

const TENANT_ID = '8af9eae7-51bb-443f-ab87-cd55fa7ad5e8';

module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('TenantSettings', [
            // SMTP
            { Id: uuid(), TenantId: TENANT_ID, Name: 'SMTP_USERNAME', Val1: process.env.SMTP_USERNAME, Val2: null },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'SMTP_PASSWORD', Val1: process.env.SMTP_PASSWORD, Val2: null },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'SMTP_HOST', Val1: process.env.SMTP_HOST, Val2: null },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'SMTP_PORT', Val1: process.env.SMTP_PORT, Val2: null },

            // HUBSPOT
            { Id: uuid(), TenantId: TENANT_ID, Name: 'HUBSPOT_API_KEY', Val1: process.env.HUBSPOT_API_KEY, Val2: null },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'HUBSPOT_LAST_SYNC_DATE', Val1: null, Val2: null },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'HUBSPOT_CLOSED_WON', Val1: 'closedwon', Val2: null },

            // ASANA
            { Id: uuid(), TenantId: TENANT_ID, Name: 'ASANA_TOKEN', Val1: process.env.ASANA_PERSONAL_ACCESS_TOKEN, Val2: null },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'ASANA_WORKSPACE_GID', Val1: '117246870784855', Val2: null },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'ASANA_SHOW_CUSTOMER_FIELD_ID', Val1: '1199951165136336', Val2: null },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'ASANA_SHOW_CUSTOMER_FIELD_ID_VALUE_YES', Val1: '1199951165136337', Val2: null },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'ASANA_ASSIGNED_TO_CUSTOMER_VALUE', Val1: '1199951165136340', Val2: null },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'ASANA_CUSTOMER_APPROVAL_FIELD', Val1: '1199951165136342', Val2: null },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'ASANA_CUSTOMER_APPROVAL_VALUE', Val1: '1199951165136343', Val2: null },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'ASANA_FIELD_DELIVERABLE_TYPE', Val1: '1190445358834074', Val2: null },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'ASANA_CUSTOMER_NOTE_FIELD', Val1: '1199951165136345', Val2: null },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'ASANA_CUSTOMER_DESCRIPTION_FIELD', Val1: '1199951165136347', Val2: null },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'ASANA_HELPFUL_MATERIAL_FIELD', Val1: '1199951165136349', Val2: null },

            // ASANA TEAM PROJECT
            // -- Strategy Content
            // -- Val1: project id, project id
            // -- Val2: section id Revisions Needed, section id Completed Content Orders
            { Id: uuid(), TenantId: TENANT_ID, Name: 'ASANA_TEAM_PROJECT_SECTION_REVISION', Val1: '1200081695793344', Val2: '1200082385668072' },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'ASANA_TEAM_PROJECT_SECTION_DONE', Val1: '1200081695793344', Val2: '1200082385672309' },

            // -- Strategy Web Dev Triage
            // -- Val1: project id, project id
            // -- Val2: section id, section id
            { Id: uuid(), TenantId: TENANT_ID, Name: 'ASANA_TEAM_PROJECT_SECTION_REVISION', Val1: '1200075363551435', Val2: '1200075363551440' },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'ASANA_TEAM_PROJECT_SECTION_DONE', Val1: '1200075363551435', Val2: '1200075363551441' },

            // -- CS Triage
            // -- Val1: project id, project id
            // -- Val2: section id, section id
            { Id: uuid(), TenantId: TENANT_ID, Name: 'ASANA_TEAM_PROJECT_SECTION_REVISION', Val1: '1200076563390729', Val2: '1200076563390739' },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'ASANA_TEAM_PROJECT_SECTION_DONE', Val1: '1200076563390729', Val2: '1200076563390738' },

            // GOOGLE ANALYTICS DATA
            { Id: uuid(), TenantId: TENANT_ID, Name: 'GA_APPLICATION_NAME', Val1: 'Victorious CXP', Val2: null },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'GOOGLE_SERVICE_ACCOUNT_EMAIL', Val1: process.env.GSC_SERVICE_ACCOUNT_EMAIL, Val2: null },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'GOOGLE_IMPERSONATED_ACCOUNT', Val1: process.env.GOOGLE_IMPERSONATED_ACCOUNT, Val2: null },
            {
                Id: uuid(),
                TenantId: TENANT_ID,
                Name: 'GOOGLE_SERVICE_ACCOUNT_KEY',
                Val1: process.env.GSC_PRIVATE_KEY.replace(/\\n/g, '\n'),
                Val2: null,
            },
            { Id: uuid(), TenantId: TENANT_ID, Name: 'GOOGLE_CUSTOMER_FOLDER_LOCATION', Val1: process.env.GOOGLE_CUSTOMER_FOLDER_LOCATION, Val2: null },
        ], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('TenantSettings', null, {});
    },
};
