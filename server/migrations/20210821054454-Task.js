const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Extend support for no time zones
        const DataTypes = withDateNoTz(Sequelize);

        await queryInterface.createTable('Task', {
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
            Description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            DueDate: {
                type: DataTypes.DATE_NO_TZ,
                allowNull: true,
            },
            AssignedToCustomer: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            NeedsApproval: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            Completed: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            AssistanceRequestedAt: {
                type: DataTypes.DATE_NO_TZ,
                allowNull: true,
            },
            Revision: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            HelpfulMaterial: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Note: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Done: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            AsanaTeamProjectGid: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            AsanaDeliverableTypeId: {
                type: DataTypes.INTEGER,
                onDelete: 'restrict',
                allowNull: true,
                references: {
                    model: 'AsanaDeliverableType',
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
            AssigneeId: {
                type: DataTypes.UUID,
                onDelete: 'set null',
                allowNull: true,
                references: {
                    model: 'User',
                    key: 'Id',
                },
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('Task');
    },
};
