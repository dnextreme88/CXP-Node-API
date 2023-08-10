const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Extend support for no time zones
        const DataTypes = withDateNoTz(Sequelize);

        await queryInterface.createTable('Comment', {
            Id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            Title: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            Description: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },
            Active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            IsDeleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
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
            DeletedAt: {
                type: DataTypes.DATE_NO_TZ,
                allowNull: true,
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
            CommentTypeId: {
                type: DataTypes.INTEGER,
                onDelete: 'restrict',
                allowNull: false,
                references: {
                    model: 'CommentType',
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
            GoalId: {
                type: DataTypes.UUID,
                onDelete: 'restrict',
                allowNull: true,
                references: {
                    model: 'Goal',
                    key: 'Id',
                },
            },
        }, {
            freezeTableName: true,
            timestamps: true,
            paranoid: true,
            createdAt: 'CreatedAt',
            deletedAt: 'DeletedAt',
            updatedAt: 'ModifiedAt',
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('Comment');
    },
};
