const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Extend support for no time zones
        const DataTypes = withDateNoTz(Sequelize);

        await queryInterface.createTable('Pod', {
            Id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            Active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            Name: {
                type: DataTypes.STRING(100),
                allowNull: true,
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
            TenantId: {
                type: DataTypes.UUID,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'Tenant',
                    key: 'Id',
                },
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('Pod');
    },
};
