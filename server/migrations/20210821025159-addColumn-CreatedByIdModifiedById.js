module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('UserType', 'CreatedById', {
            type: Sequelize.UUID,
            onDelete: 'restrict',
            references: {
                model: 'User',
                key: 'Id',
            },
        });

        await queryInterface.addColumn('UserType', 'ModifiedById', {
            type: Sequelize.UUID,
            onDelete: 'restrict',
            references: {
                model: 'User',
                key: 'Id',
            },
        });
    },

    down: async (queryInterface) => {
        await Promise.all([
            queryInterface.removeColumn('UserType', 'CreatedById'),
            queryInterface.removeColumn('UserType', 'ModifiedById'),
        ]);
    },
};
