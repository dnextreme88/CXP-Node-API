const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const Deliverable = sequelize.define('Deliverable', {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        AsanaGid: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        Name: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        Host: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        PermanentUrl: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                isUrl: {
                    msg: 'Permanent url is not a valid URL',
                },
            },
        },
        ViewUrl: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                isUrl: {
                    msg: 'View url is not a valid URL',
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
        TaskId: {
            type: DataTypes.UUID,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Task id cannot be null',
                },
            },
            references: {
                model: 'Task',
                key: 'Id',
            },
        },
        ProjectId: {
            type: DataTypes.UUID,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Project id cannot be null',
                },
            },
            references: {
                model: 'Project',
                key: 'Id',
            },
        },
        DeliverableTypeId: {
            type: DataTypes.INTEGER,
            onDelete: 'restrict',
            allowNull: true,
            references: {
                model: 'DeliverableType',
                key: 'Id',
            },
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    Deliverable.associate = (models) => {
        Deliverable.belongsTo(models.User, { as: 'CreatedBy' });
        Deliverable.belongsTo(models.DeliverableType);
        Deliverable.belongsTo(models.Project);
    };

    return Deliverable;
};
