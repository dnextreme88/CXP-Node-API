const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const Template = sequelize.define('Template', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'Name must not exceed 100 characters',
                },
                notNull: {
                    args: true,
                    msg: 'Name cannot be null',
                },
            },
        },
        Template: {
            type: DataTypes.TEXT,
            allowNull: true,
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
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return Template;
};
