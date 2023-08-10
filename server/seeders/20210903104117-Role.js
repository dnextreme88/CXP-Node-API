module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('Role', [
            { Id: 1, RoleName: 'VictoriousAdmin', UserTypeId: 1 },
            { Id: 2, RoleName: 'VictoriousMember', UserTypeId: 1 },
            { Id: 3, RoleName: 'Administrator', UserTypeId: 2 },
            { Id: 4, RoleName: 'User', UserTypeId: 2 },
            { Id: 5, RoleName: 'AccountOwner', UserTypeId: 2 },
        ], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('Role', null, {});
    },
};
