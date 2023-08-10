module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('TenantSettings', {
            Id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
            },
            Name: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            Val1: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            Val2: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            TenantId: {
                type: Sequelize.UUID,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'Tenant',
                    key: 'Id',
                },
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('TenantSettings');
    },
};
