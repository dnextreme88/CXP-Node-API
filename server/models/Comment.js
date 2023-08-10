const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const Comment = sequelize.define('Comment', {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        Title: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'Title must not exceed 200 characters',
                },
                notNull: {
                    args: true,
                    msg: 'Title cannot be null',
                },
            },
        },
        Description: {
            type: DataTypes.STRING(500),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 500],
                    msg: 'Description must not exceed 500 characters',
                },
            },
        },
        Active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            validate: {
                isIn: {
                    args: [[true, false, 0, 1, 'true', 'false', 'True', 'False', 'TRUE', 'FALSE']],
                    msg: 'Active is not a valid boolean',
                },
            },
        },
        IsDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                isIn: {
                    args: [[true, false, 0, 1, 'true', 'false', 'True', 'False', 'TRUE', 'FALSE']],
                    msg: 'Is deleted is not a valid boolean',
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
        },
        DeletedAt: {
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
        ModifiedById: {
            type: DataTypes.UUID,
            onDelete: 'set null',
            references: {
                model: 'User',
                key: 'Id',
            },
        },
        CommentTypeId: {
            type: DataTypes.INTEGER,
            onDelete: 'restrict',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Comment type id cannot be null',
                },
            },
            references: {
                model: 'CommentType',
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
        GoalId: {
            type: DataTypes.UUID,
            onDelete: 'restrict',
            allowNull: true,
            references: {
                model: 'Goal',
                key: 'Id',
            },
        },
    }, {
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        createdAt: 'CreatedAt',
        deletedAt: 'DeletedAt',
        updatedAt: 'ModifiedAt',
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.CommentType);
        Comment.belongsTo(models.User, { as: 'ModifiedBy' });
        Comment.belongsTo(models.Goal);
    };

    return Comment;
};
