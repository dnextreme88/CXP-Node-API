const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time sonzes
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const ExceptionLog = sequelize.define('ExceptionLog', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // Uses new Date() on its ExceptionLogService create method
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
        Exception: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return ExceptionLog;
};
