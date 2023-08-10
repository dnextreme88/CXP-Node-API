module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('UserEmailSettingsType', [
            { Id: 1, Name: 'Assignee added to a task' },
            { Id: 2, Name: 'Assignee changed' },
            { Id: 3, Name: 'Victorious completed task' },
            { Id: 4, Name: 'New customer task' },
            { Id: 5, Name: 'New approvals needed' },
            { Id: 6, Name: 'Team updates' },
        ], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('UserEmailSettingsType', null, {});
    },
};
