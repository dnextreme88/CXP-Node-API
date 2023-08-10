module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ProjectStatus', {
            Id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Name: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('ProjectStatus');
    },
};
