module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('Customer', [
            {
                Id: '489e36d1-aeb9-4ad6-b3aa-6cc1573b5652',
                TenantId: '8af9eae7-51bb-443f-ab87-cd55fa7ad5e8',
                Name: null,
                RefName: 'Victorious',
                RefId: '439617208',
                CreatedAt: new Date(),
                ModifiedAt: new Date(),
            },
        ], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('Customer', null, {});
    },
};
