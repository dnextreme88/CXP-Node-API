module.exports = (sequelize, SequelizeDataTypes) => {
    const TargetPage = sequelize.define('TargetPage', {
        Id: {
            type: SequelizeDataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        Name: {
            type: SequelizeDataTypes.TEXT,
            allowNull: true,
        },
        Url: {
            type: SequelizeDataTypes.TEXT,
            allowNull: true,
            validate: {
                isUrl: {
                    msg: 'Url is not a valid URL',
                },
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

    TargetPage.associate = (models) => {
        TargetPage.hasMany(models.TargetKeyword, { as: 'Keywords' });
    };

    return TargetPage;
};
