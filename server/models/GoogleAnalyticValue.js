const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const GoogleAnalyticValue = sequelize.define('GoogleAnalyticValue', {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        TenantId: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Tenant id cannot be null',
                },
            },
        },
        Data: {
            type: DataTypes.JSONB,
        },
        Created: {
            type: DataTypes.DATE_NO_TZ,
            allowNull: false,
            defaultValue: '0001-01-01 00:00:00',
        },
        Filter: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        GoogleAnalyticTypeId: {
            type: DataTypes.INTEGER,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Google analytic type id cannot be null',
                },
            },
            references: {
                model: 'GoogleAnalyticType',
                key: 'Id',
            },
        },
        ProjectId: {
            type: DataTypes.UUID,
            onDelete: 'cascade',
            allowNull: false,
            defaultValue: '00000000-0000-0000-0000-000000000000',
            references: {
                model: 'Project',
                key: 'Id',
            },
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return GoogleAnalyticValue;
};
