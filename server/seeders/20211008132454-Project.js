require('dotenv').config(); // .env

module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('Project', [
            {
                Id: '3138d895-6368-4122-9805-5c55ffc2f93d',
                Name: 'test project name',
                GoogleAnalyticsViewId: process.env.GA_VIEW_ID,
                Domain: 'https://victoriousseo.com',
                GoogleDriveFolderId: process.env.GOOGLE_DRIVE_FOLDER_ID,
                GoogleAnalyticsPropertyId: process.env.GA_PROPERTY_ID,
                ProjectStatusId: 4,
                AsanaProjectId: 1200230478011317,
                AsanaRefName: 'Duplicate of Jackson - Performance Testing',
                AsanaOwnerName: 'Jackson Sabol',
                AsanaTeamName: 'dev-cxp',
                AsanaCreatedAt: '2021-04-23T18:27:42.984',
                CreatedAt: new Date(),
                CreatedById: '762f9267-0c4a-4745-9673-7272407a32d6',
                ModifiedById: '762f9267-0c4a-4745-9673-7272407a32d6',
                TenantId: '8af9eae7-51bb-443f-ab87-cd55fa7ad5e8',
                MainContactId: '762f9267-0c4a-4745-9673-7272407a32d6',
                CustomerId: '489e36d1-aeb9-4ad6-b3aa-6cc1573b5652',
            },
        ], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('Project', null, {});
    },
};
