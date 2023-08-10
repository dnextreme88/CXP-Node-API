module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('AsanaDeliverableType', {
            Id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Name: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            Gid: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            Description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            HelpfulMaterial: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            Note: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            DeliverableTypeId: {
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'DeliverableType',
                    key: 'Id',
                },
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('AsanaDeliverableType');
    },
};
