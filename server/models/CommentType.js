module.exports = (sequelize, SequelizeDataTypes) => {
    const CommentType = sequelize.define('CommentType', {
        Id: {
            type: SequelizeDataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: SequelizeDataTypes.STRING(100),
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
        Description: {
            type: SequelizeDataTypes.TEXT,
            allowNull: true,
        },
        GoalTypeId: {
            type: SequelizeDataTypes.INTEGER,
            onDelete: 'restrict',
            allowNull: true,
            references: {
                model: 'GoalType',
                key: 'Id',
            },
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    CommentType.associate = (models) => { CommentType.hasOne(models.Comment); };

    return CommentType;
};
