module.exports = (sequelize, SequelizeDataTypes) => {
    const TenantSettings = sequelize.define('TenantSettings', {
        Id: {
            type: SequelizeDataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        Name: {
            type: SequelizeDataTypes.TEXT,
            allowNull: true,
        },
        Val1: {
            type: SequelizeDataTypes.TEXT,
            allowNull: true,
        },
        Val2: {
            type: SequelizeDataTypes.TEXT,
            allowNull: true,
        },
        TenantId: {
            type: SequelizeDataTypes.UUID,
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

    return TenantSettings;
};
