module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('DsType', [
            { Id: 1, Name: 'Active' },
            { Id: 2, Name: 'Not Active' },
            { Id: 3, Name: 'Pending' },
        ], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('DsType', null, {});
    },
};
