const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const NotificationApp = sequelize.define('NotificationApp', {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        Title: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        Description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        Action: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'Action must not exceed 100 characters',
                },
            },
        },
        CreatedAt: {
            type: DataTypes.DATE_NO_TZ,
            allowNull: false,
        },
        CreatedById: {
            type: DataTypes.UUID,
            onDelete: 'set null',
            references: {
                model: 'User',
                key: 'Id',
            },
        },
        NotificationAppTypeId: {
            type: DataTypes.INTEGER,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Notification app type id cannot be null',
                },
            },
            references: {
                model: 'NotificationAppType',
                key: 'Id',
            },
        },
        TenantId: {
            type: DataTypes.UUID,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Tenant id cannot be null',
                },
            },
            references: {
                model: 'Tenant',
                key: 'Id',
            },
        },
        TaskId: {
            type: DataTypes.UUID,
            onDelete: 'cascade',
            allowNull: true,
            references: {
                model: 'Task',
                key: 'Id',
            },
        },
        CommentId: {
            type: DataTypes.UUID,
            onDelete: 'cascade',
            allowNull: true,
            references: {
                model: 'Comment',
                key: 'Id',
            },
        },
        GoalId: {
            type: DataTypes.UUID,
            onDelete: 'cascade',
            allowNull: true,
            references: {
                model: 'Goal',
                key: 'Id',
            },
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    NotificationApp.associate = (models) => {
        NotificationApp.belongsTo(models.User, { as: 'CreatedBy' });
        NotificationApp.belongsTo(models.NotificationAppType);
        NotificationApp.belongsTo(models.Task);
        NotificationApp.belongsTo(models.Comment);
        NotificationApp.belongsTo(models.Goal);
        NotificationApp.hasOne(models.NotificationAppUserRead);
    };

    return NotificationApp;
};
