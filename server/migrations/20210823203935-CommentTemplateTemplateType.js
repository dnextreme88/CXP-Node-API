module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('CommentTemplateTemplateType', {
            Id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
            },
            CommentTemplateId: {
                type: Sequelize.UUID,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'CommentTemplate',
                    key: 'Id',
                },
            },
            CommentTemplateTypeId: {
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'CommentTemplateType',
                    key: 'Id',
                },
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('CommentTemplateTemplateType');
    },
};
