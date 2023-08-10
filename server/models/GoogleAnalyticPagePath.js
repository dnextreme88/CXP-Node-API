const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const GoogleAnalyticPagePath = sequelize.define('GoogleAnalyticPagePath', {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        ProjectId: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Project id cannot be null',
                },
            },
        },
        GoogleAnalyticTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Google analytic type id cannot be null',
                },
            },
        },
        Path: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Path cannot be null',
                },
            },
        },
        Created: {
            type: DataTypes.DATE_NO_TZ,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return GoogleAnalyticPagePath;
};
