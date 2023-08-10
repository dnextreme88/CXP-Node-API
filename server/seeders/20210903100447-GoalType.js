module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('GoalType', [
            { Id: 1, Name: 'Organic search traffic' },
            { Id: 2, Name: 'Total keywords ranked' },
            { Id: 3, Name: 'Target keyword positioning' },
            { Id: 4, Name: 'Goal conversions' },
            { Id: 5, Name: 'eCommerce/Revenue tracking' },
            { Id: 6, Name: 'Page one keyword' },
        ], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('GoalType', null, {});
    },
};
