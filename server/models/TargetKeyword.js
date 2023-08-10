module.exports = (sequelize, SequelizeDataTypes) => {
    const TargetKeyword = sequelize.define('TargetKeyword', {
        Id: {
            type: SequelizeDataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        Name: {
            type: SequelizeDataTypes.TEXT,
            allowNull: true,
        },
        TargetPageId: {
            type: SequelizeDataTypes.UUID,
            onDelete: 'restrict',
            allowNull: true,
            references: {
                model: 'TargetPage',
                key: 'Id',
            },
        },
        ProjectId: {
            type: SequelizeDataTypes.UUID,
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
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    TargetKeyword.associate = (models) => {
        TargetKeyword.hasOne(models.TargetKeywordPositioning);
        TargetKeyword.belongsTo(models.TargetPage);
    };

    return TargetKeyword;
};
