module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('UserEmailSettings', {
            Id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
            },
            Value: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
            },
            UserEmailSettingsTypeId: {
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'UserEmailSettingsType',
                    key: 'Id',
                },
            },
            UserId: {
                type: Sequelize.UUID,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'Id',
                },
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('UserEmailSettings');
    },
};
