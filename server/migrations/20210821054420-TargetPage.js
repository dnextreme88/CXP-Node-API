module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('TargetPage', {
            Id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
            },
            Name: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            Url: {
                type: Sequelize.TEXT,
                allowNull: true,
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
        await queryInterface.dropTable('TargetPage');
    },
};
