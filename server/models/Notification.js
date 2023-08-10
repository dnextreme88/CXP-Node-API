const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const Notification = sequelize.define('Notification', {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        Subject: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'Subject must not exceed 200 characters',
                },
            },
        },
        From: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'From must not exceed 100 characters',
                },
            },
        },
        To: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'To must not exceed 100 characters',
                },
            },
        },
        Message: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        NotificationGuid: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Notification guid cannot be null',
                },
            },
        },
        ValidTill: {
            type: DataTypes.DATE_NO_TZ,
            allowNull: false,
            validate: {
                isDate: {
                    args: true,
                    msg: 'Valid till is not a valid date or is not in the formats YYYY-MM-DD or YYYY/MM/DD',
                },
                notNull: {
                    args: true,
                    msg: 'Valid till cannot be null',
                },
            },
        },
        CreatedAt: {
            type: DataTypes.DATE_NO_TZ,
            allowNull: false,
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
        TemplateTypeId: {
            type: DataTypes.INTEGER,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Template type id cannot be null',
                },
            },
            references: {
                model: 'TemplateType',
                key: 'Id',
            },
        },
        TemplateId: {
            type: DataTypes.INTEGER,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Template id cannot be null',
                },
            },
            references: {
                model: 'Template',
                key: 'Id',
            },
        },
        UserId: {
            type: DataTypes.UUID,
            onDelete: 'set null',
            allowNull: true,
            references: {
                model: 'User',
                key: 'Id',
            },
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    Notification.associate = (models) => { Notification.belongsTo(models.User); };

    return Notification;
};
