const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const NotificationAppUserRead = sequelize.define('NotificationAppUserRead', {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        UserId: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'User id cannot be null',
                },
            },
        },
        CreatedAt: {
            type: DataTypes.DATE_NO_TZ,
            allowNull: false,
        },
        NotificationAppId: {
            type: DataTypes.UUID,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Notification app id cannot be null',
                },
            },
            references: {
                model: 'NotificationApp',
                key: 'Id',
            },
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return NotificationAppUserRead;
};
