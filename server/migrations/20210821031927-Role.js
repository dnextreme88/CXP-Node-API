module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Role', {
            Id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            RoleName: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            UserTypeId: {
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                allowNull: false,
                defaultValue: 0,
                references: {
                    model: 'UserType',
                    key: 'Id',
                },
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('Role');
    },
};
