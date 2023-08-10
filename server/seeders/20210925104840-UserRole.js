module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('UserRole', [
            {
                Id: '26ecff88-817c-463d-957d-33584bc57699',
                CreatedAt: new Date(),
                CreatedById: '762f9267-0c4a-4745-9673-7272407a32d6',
                RoleId: 1,
                UserId: '762f9267-0c4a-4745-9673-7272407a32d6',
            },
        ], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('UserRole', null, {});
    },
};
