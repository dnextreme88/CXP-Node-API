module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('UserEmailSettingsType', {
            Id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Name: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('UserEmailSettingsType');
    },
};
