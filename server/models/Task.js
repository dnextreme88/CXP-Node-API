const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const Task = sequelize.define('Task', {
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
        Description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        DueDate: {
            type: DataTypes.DATE_NO_TZ,
            allowNull: true,
            validate: {
                isDate: {
                    args: true,
                    msg: 'Due date is not a valid date or is not in the formats YYYY-MM-DD or YYYY/MM/DD',
                },
            },
        },
        AssignedToCustomer: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            validate: {
                isIn: {
                    args: [[true, false, 0, 1, 'true', 'false', 'True', 'False', 'TRUE', 'FALSE']],
                    msg: 'Assigned to customer is not a valid boolean',
                },
            },
        },
        NeedsApproval: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            validate: {
                isIn: {
                    args: [[true, false, 0, 1, 'true', 'false', 'True', 'False', 'TRUE', 'FALSE']],
                    msg: 'Needs approval is not a valid boolean',
                },
            },
        },
        Completed: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            validate: {
                isIn: {
                    args: [[true, false, 0, 1, 'true', 'false', 'True', 'False', 'TRUE', 'FALSE']],
                    msg: 'Completed is not a valid boolean',
                },
            },
        },
        AssistanceRequestedAt: {
            type: DataTypes.DATE_NO_TZ,
            allowNull: true,
            validate: {
                isDate: {
                    args: true,
                    msg: 'Assistance requested at is not a valid date or is not in the formats YYYY-MM-DD or YYYY/MM/DD',
                },
            },
        },
        Revision: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            validate: {
                isIn: {
                    args: [[true, false, 0, 1, 'true', 'false', 'True', 'False', 'TRUE', 'FALSE']],
                    msg: 'Revision is not a valid boolean',
                },
            },
        },
        HelpfulMaterial: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        Note: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        Done: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            validate: {
                isIn: {
                    args: [[true, false, 0, 1, 'true', 'false', 'True', 'False', 'TRUE', 'FALSE']],
                    msg: 'Done is not a valid boolean',
                },
            },
        },
        AsanaTeamProjectGid: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        AsanaDeliverableTypeId: {
            type: DataTypes.INTEGER,
            onDelete: 'restrict',
            allowNull: true,
            references: {
                model: 'AsanaDeliverableType',
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
        AssigneeId: {
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

    Task.associate = (models) => {
        Task.belongsTo(models.User, { as: 'Assignee' });
        Task.hasOne(models.Deliverable);
        Task.belongsTo(models.AsanaDeliverableType);
        Task.belongsTo(models.Project);
        Task.hasMany(models.TaskComment);
    };

    return Task;
};
