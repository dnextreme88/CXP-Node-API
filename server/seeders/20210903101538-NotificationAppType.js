module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('NotificationAppType', [
            { Id: 1, Name: 'Comment' },
            { Id: 2, Name: 'GoalReached' },
            { Id: 3, Name: 'Task' },
            { Id: 4, Name: 'Celebration' },
            { Id: 5, Name: 'Performance increase' },
        ], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('NotificationAppType', null, {});
    },
};
