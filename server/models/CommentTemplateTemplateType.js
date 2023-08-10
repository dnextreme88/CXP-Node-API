module.exports = (sequelize, SequelizeDataTypes) => {
    const CommentTemplateTemplateType = sequelize.define('CommentTemplateTemplateType', {
        Id: {
            type: SequelizeDataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        CommentTemplateId: {
            type: SequelizeDataTypes.UUID,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Comment template id cannot be null',
                },
            },
            references: {
                model: 'CommentTemplate',
                key: 'Id',
            },
        },
        CommentTemplateTypeId: {
            type: SequelizeDataTypes.INTEGER,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Comment template type id cannot be null',
                },
            },
            references: {
                model: 'CommentTemplateType',
                key: 'Id',
            },
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    CommentTemplateTemplateType.associate = (models) => {
        CommentTemplateTemplateType.belongsTo(models.CommentTemplate);
    };

    return CommentTemplateTemplateType;
};
