module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('GoogleAnalyticType', [
            { Id: 1, Name: 'Organic' },
            { Id: 2, Name: 'eCommerce' },
            { Id: 3, Name: 'Goal' },
        ], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('GoogleAnalyticType', null, {});
    },
};
