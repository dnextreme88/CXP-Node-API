const db = require('../models');

const USER_ID = '762f9267-0c4a-4745-9673-7272407a32d6';

module.exports = {
    up: async (queryInterface) => {
        const victoriousUserType = await db.UserType.findByPk(1);
        victoriousUserType.CreatedById = USER_ID;
        await victoriousUserType.save();

        return queryInterface.bulkInsert('UserType', [
            {
                Id: 2,
                Name: 'Customer',
                CreatedAt: new Date(),
                ModifiedAt: new Date(),
                CreatedById: USER_ID,
            }], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('UserType', null, {});
    },
};
