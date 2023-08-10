module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('ActionArea', [
            { Id: 1, Name: 'Asset' },
            { Id: 2, Name: 'AssetDevice' },
            { Id: 3, Name: 'AssetType' },
            { Id: 4, Name: 'Device' },
            { Id: 5, Name: 'Tenant' },
            { Id: 6, Name: 'TenantDevice' },
        ], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('ActionArea', null, {});
    },
};
