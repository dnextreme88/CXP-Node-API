const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const RequestLog = sequelize.define('RequestLog', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // Uses new Date() on its RequestLogService create method
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
        timestamps: false,
    });

    return RequestLog;
};
