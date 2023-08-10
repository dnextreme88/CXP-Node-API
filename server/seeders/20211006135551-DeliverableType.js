module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('DeliverableType', [
            { Id: 1, Name: 'Keyword Research' },
            { Id: 2, Name: 'On-Page Analysis' },
            { Id: 3, Name: 'Off-page Analysis' },
            { Id: 4, Name: 'Content' },
            { Id: 5, Name: 'Competitive Analysis' },
            { Id: 6, Name: 'Local SEO' },
            { Id: 7, Name: 'Site Migration' },
            { Id: 8, Name: 'Customer Task' },
        ], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('DeliverableType', null, {});
    },
};
