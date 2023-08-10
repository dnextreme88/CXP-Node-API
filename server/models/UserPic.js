const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const UserPic = sequelize.define('UserPic', {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        Location: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'Location must not exceed 200 characters',
                },
            },
        },
        IsNotifPic: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                isIn: {
                    args: [[true, false, 0, 1, 'true', 'false', 'True', 'False', 'TRUE', 'FALSE']],
                    msg: 'Is notif pic is not a valid boolean',
                },
                notNull: {
                    args: true,
                    msg: 'Is notif pic cannot be null',
                },
            },
        },
        BackColor: {
            type: DataTypes.STRING(30),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 30],
                    msg: 'Back color must not exceed 30 characters',
                },
            },
        },
        OrderNumber: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: {
                    msg: 'Order number must be an integer and must be between 1 to 2147483646',
                    gt: 0,
                    lt: 2147483647,
                },
            },
        },
        CreatedAt: {
            type: DataTypes.DATE_NO_TZ,
            allowNull: false,
            defaultValue: '0001-01-01 00:00:00',
        },
        ModifiedAt: {
            type: DataTypes.DATE_NO_TZ,
            allowNull: false,
            defaultValue: '0001-01-01 00:00:00',
        },
        CreatedById: {
            type: DataTypes.UUID,
            onDelete: 'set null',
            references: {
                model: 'User',
                key: 'Id',
            },
        },
        ModifiedById: {
            type: DataTypes.UUID,
            onDelete: 'set null',
            references: {
                model: 'User',
                key: 'Id',
            },
        },
        UserId: {
            type: DataTypes.UUID,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'User id cannot be null',
                },
            },
            references: {
                model: 'User',
                key: 'Id',
            },
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return UserPic;
};
