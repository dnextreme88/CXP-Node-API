module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('GoogleAnalyticType', {
            Id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('GoogleAnalyticType');
    },
};
