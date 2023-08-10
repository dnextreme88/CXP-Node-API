const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const TaskComment = sequelize.define('TaskComment', {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        AsanaGid: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        Text: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        CreatedAt: {
            type: DataTypes.DATE_NO_TZ,
            allowNull: true,
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
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    TaskComment.associate = (models) => { TaskComment.hasOne(models.User, { as: 'CreatedBy' }); };

    return TaskComment;
};
