module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('Tenant', [
            {
                Id: '8af9eae7-51bb-443f-ab87-cd55fa7ad5e8',
                Active: true,
                Name: 'Victorious',
                CreatedAt: new Date(),
                CreatedById: '762f9267-0c4a-4745-9673-7272407a32d6',
            },
        ], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('Tenant', null, {});
    },
};
