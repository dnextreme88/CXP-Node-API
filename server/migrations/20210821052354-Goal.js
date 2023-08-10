const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Extend support for no time zones
        const DataTypes = withDateNoTz(Sequelize);

        await queryInterface.createTable('Goal', {
            Id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            ValidFrom: {
                type: DataTypes.DATE_NO_TZ,
                allowNull: false,
            },
            ValidTo: {
                type: DataTypes.DATE_NO_TZ,
                allowNull: false,
            },
            Goal: {
                type: DataTypes.INTEGER,
            },
            InitialValue: {
                type: DataTypes.INTEGER,
            },
            EndValue: {
                type: DataTypes.DECIMAL,
            },
            GoalReachedAt: {
                type: DataTypes.DATE_NO_TZ,
                allowNull: true,
            },
            PerformanceIncreasedCount: {
                type: DataTypes.INTEGER,
            },
            CreatedAt: {
                type: DataTypes.DATE_NO_TZ,
                allowNull: false,
            },
            ModifiedAt: {
                type: DataTypes.DATE_NO_TZ,
                allowNull: false,
                defaultValue: '0001-01-01 00:00:00',
            },
            CreatedById: {
                type: DataTypes.UUID,
                onDelete: 'set null',
                references: {
                    model: 'User',
                    key: 'Id',
                },
            },
            ModifiedById: {
                type: DataTypes.UUID,
                onDelete: 'set null',
                references: {
                    model: 'User',
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
            GoalTypeId: {
                type: DataTypes.INTEGER,
                onDelete: 'restrict',
                allowNull: false,
                references: {
                    model: 'GoalType',
                    key: 'Id',
                },
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('Goal');
    },
};
