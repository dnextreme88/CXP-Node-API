module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('DsType', {
            Id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('DsType');
    },
};
