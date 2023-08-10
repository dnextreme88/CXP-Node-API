const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const CommentTemplate = sequelize.define('CommentTemplate', {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        Name: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'Name must not exceed 200 characters',
                },
            },
        },
        Title: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'Title must not exceed 200 characters',
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
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    CommentTemplate.associate = (models) => {
        CommentTemplate.hasOne(models.CommentTemplateTemplateType);
        CommentTemplate.belongsTo(models.User, { as: 'ModifiedBy' });
    };

    return CommentTemplate;
};
