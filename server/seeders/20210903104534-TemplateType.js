module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('TemplateType', [
            { Id: 1, Name: 'Notification' },
            { Id: 2, Name: 'Registration' },
            { Id: 3, Name: 'Forgot Password' },
            { Id: 4, Name: 'Registration Customer' },
            { Id: 5, Name: 'Email for task assigned' },
            { Id: 6, Name: 'Email for task awaiting approval' },
            { Id: 7, Name: 'Email for task completed' },
            { Id: 8, Name: 'Email for task waiting to be completed' },
            { Id: 9, Name: 'Team update' },
            { Id: 10, Name: 'Monday update' },
        ], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('TemplateType', null, {});
    },
};
