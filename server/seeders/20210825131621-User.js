require('dotenv').config(); // .env

module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('User', [
            {
                Id: '762f9267-0c4a-4745-9673-7272407a32d6',
                TenantId: '8af9eae7-51bb-443f-ab87-cd55fa7ad5e8',
                FirstName: 'Victorious',
                LastName: 'Product',
                FirstLastName: 'Victorious Product',
                Title: 'admin',
                Email: process.env.VICTORIOUS_EMAIL,
                PasswordHash: process.env.VICTORIOUS_PASSWORD,
                PasswordSalt: process.env.VICTORIOUS_PASSWORD,
                FunFacts: null,
                IsPrimaryContact: true,
                CreatedAt: new Date(),
                ModifiedAt: new Date(),
                CreatedById: '762f9267-0c4a-4745-9673-7272407a32d6',
                ModifiedById: '762f9267-0c4a-4745-9673-7272407a32d6',
                CustomerId: null,
                DsTypeId: 1,
                UserTypeId: 1,
            },
        ], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('User', null, {});
    },
};
