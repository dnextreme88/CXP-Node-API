module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('TenantModule', {
            Id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
            },
            TenantId: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            ModuleTypeId: {
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'ModuleType',
                    key: 'Id',
                },
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('TenantModule');
    },
};
