module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('ProjectStatus', [
            { Id: 1, Name: 'Setup required' },
            { Id: 2, Name: 'GA setup required' },
            { Id: 3, Name: 'Goal setup required' },
            { Id: 4, Name: 'Active' },
            { Id: 5, Name: 'Archived' },
        ], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('ProjectStatus', null, {});
    },
};
