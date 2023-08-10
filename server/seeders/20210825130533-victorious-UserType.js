module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('UserType', [
            {
                Id: 1,
                Name: 'Victorious',
                CreatedAt: new Date(),
                ModifiedAt: new Date(),
            }], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('UserType', null, {});
    },
};
