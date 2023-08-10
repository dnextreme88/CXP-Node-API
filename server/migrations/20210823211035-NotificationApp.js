const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Extend support for no time zones
        const DataTypes = withDateNoTz(Sequelize);

        await queryInterface.createTable('NotificationApp', {
            Id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            Title: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Action: {
                type: DataTypes.STRING(100),
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
            NotificationAppTypeId: {
                type: DataTypes.INTEGER,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'NotificationAppType',
                    key: 'Id',
                },
            },
            TenantId: {
                type: DataTypes.UUID,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'Tenant',
                    key: 'Id',
                },
            },
            TaskId: {
                type: DataTypes.UUID,
                onDelete: 'cascade',
                allowNull: true,
                references: {
                    model: 'Task',
                    key: 'Id',
                },
            },
            CommentId: {
                type: DataTypes.UUID,
                onDelete: 'cascade',
                allowNull: true,
                references: {
                    model: 'Comment',
                    key: 'Id',
                },
            },
            GoalId: {
                type: DataTypes.UUID,
                onDelete: 'cascade',
                allowNull: true,
                references: {
                    model: 'Goal',
                    key: 'Id',
                },
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('NotificationApp');
    },
};
