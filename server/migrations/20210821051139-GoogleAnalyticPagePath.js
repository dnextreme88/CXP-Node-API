const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Extend support for no time zones
        const DataTypes = withDateNoTz(Sequelize);

        await queryInterface.createTable('GoogleAnalyticPagePath', {
            Id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            ProjectId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            GoogleAnalyticTypeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            Path: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            Created: {
                type: DataTypes.DATE_NO_TZ,
                allowNull: false,
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('GoogleAnalyticPagePath');
    },
};
