const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Extend support for no time zones
        const DataTypes = withDateNoTz(Sequelize);

        await queryInterface.createTable('Deliverable', {
            Id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            AsanaGid: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Name: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Host: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            PermanentUrl: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            ViewUrl: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            CreatedAt: {
                type: DataTypes.DATE_NO_TZ,
                allowNull: false,
            },
            CreatedById: {
                type: DataTypes.UUID,
                onDelete: 'set null',
                references: {
                    model: 'User',
                    key: 'Id',
                },
            },
            TaskId: {
                type: DataTypes.UUID,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'Task',
                    key: 'Id',
                },
            },
            ProjectId: {
                type: DataTypes.UUID,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'Project',
                    key: 'Id',
                },
            },
            DeliverableTypeId: {
                type: DataTypes.INTEGER,
                onDelete: 'restrict',
                allowNull: true,
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
        await queryInterface.dropTable('Deliverable');
    },
};
