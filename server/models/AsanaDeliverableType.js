module.exports = (sequelize, SequelizeDataTypes) => {
    const AsanaDeliverableType = sequelize.define('AsanaDeliverableType', {
        Id: {
            type: SequelizeDataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: SequelizeDataTypes.TEXT,
            allowNull: true,
        },
        Gid: {
            type: SequelizeDataTypes.TEXT,
            allowNull: true,
        },
        Description: {
            type: SequelizeDataTypes.TEXT,
            allowNull: true,
        },
        HelpfulMaterial: {
            type: SequelizeDataTypes.TEXT,
            allowNull: true,
        },
        Note: {
            type: SequelizeDataTypes.TEXT,
            allowNull: true,
        },
        DeliverableTypeId: {
            type: SequelizeDataTypes.INTEGER,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Deliverable type id cannot be null',
                },
            },
            references: {
                model: 'DeliverableType',
                key: 'Id',
            },
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    AsanaDeliverableType.associate = (models) => {
        AsanaDeliverableType.belongsTo(models.DeliverableType);
    };

    return AsanaDeliverableType;
};
