module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('User', 'PasswordHash', {
            type: Sequelize.STRING(100),
            allowNull: true,
        });

        await queryInterface.changeColumn('User', 'PasswordSalt', {
            type: Sequelize.STRING(100),
            allowNull: true,
        });
    },

    down: async (queryInterface) => {
        await Promise.all([
            queryInterface.removeColumn('User', 'PasswordHash'),
            queryInterface.removeColumn('User', 'PasswordSalt'),
        ]);
    },
};
