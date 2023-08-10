module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('CommentType', {
            Id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            Description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            GoalTypeId: {
                type: Sequelize.INTEGER,
                onDelete: 'restrict',
                allowNull: true,
                references: {
                    model: 'GoalType',
                    key: 'Id',
                },
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('CommentType');
    },
};
