const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Extend support for no time sonzes
        const DataTypes = withDateNoTz(Sequelize);

        await queryInterface.createTable('RequestLog', {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            RequestTime: {
                type: DataTypes.DATE_NO_TZ,
                allowNull: false,
            },
            RequestId: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            AppName: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            JsonRequest: {
                type: DataTypes.JSONB,
                allowNull: true,
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('RequestLog');
    },
};
