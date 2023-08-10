module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('TargetKeyword', {
            Id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
            },
            Name: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            TargetPageId: {
                type: Sequelize.UUID,
                onDelete: 'restrict',
                allowNull: true,
                references: {
                    model: 'TargetPage',
                    key: 'Id',
                },
            },
            ProjectId: {
                type: Sequelize.UUID,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'Project',
                    key: 'Id',
                },
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('TargetKeyword');
    },
};
