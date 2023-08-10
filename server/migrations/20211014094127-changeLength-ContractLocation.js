module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Project', 'ContractLocation', {
            type: Sequelize.STRING(254),
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await Promise.all([
            queryInterface.changeColumn('Project', 'ContractLocation', {
                type: Sequelize.STRING(200),
                allowNull: true,
            }),
        ]);
    },
};
