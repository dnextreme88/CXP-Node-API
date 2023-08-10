module.exports = (sequelize, SequelizeDataTypes) => {
    const TenantModule = sequelize.define('TenantModule', {
        Id: {
            type: SequelizeDataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        TenantId: {
            type: SequelizeDataTypes.UUID,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Tenant id cannot be null',
                },
            },
        },
        ModuleTypeId: {
            type: SequelizeDataTypes.INTEGER,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Module type id cannot be null',
                },
            },
            references: {
                model: 'ModuleType',
                key: 'Id',
            },
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    TenantModule.associate = (models) => { TenantModule.belongsTo(models.ModuleType); };

    return TenantModule;
};
