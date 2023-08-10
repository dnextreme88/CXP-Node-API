module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('CommentType', [
            { Id: 1, Name: 'Home', GoalTypeId: null },
            { Id: 2, Name: 'Organic search traffic status', GoalTypeId: 1 },
            { Id: 3, Name: 'Organic search traffic metrics', GoalTypeId: 1 },
            { Id: 4, Name: 'Total keywords ranked status', GoalTypeId: 2 },
            { Id: 5, Name: 'Total keywords ranked metrics', GoalTypeId: 2 },
            { Id: 6, Name: 'Target keyword positioning status', GoalTypeId: 3 },
            { Id: 7, Name: 'Target keyword positioning metrics', GoalTypeId: 3 },
            { Id: 8, Name: 'Goal conversions status', GoalTypeId: 4 },
            { Id: 9, Name: 'Goal conversions metrics', GoalTypeId: 4 },
            { Id: 10, Name: 'eCommerce revenue tracking status', GoalTypeId: 5 },
            { Id: 11, Name: 'eCommerce revenue tracking metrics', GoalTypeId: 5 },
        ], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('CommentType', null, {});
    },
};
