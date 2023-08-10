const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Extend support for no time zones
        const DataTypes = withDateNoTz(Sequelize);

        await queryInterface.createTable('Template', {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            Template: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            CreatedAt: {
                type: DataTypes.DATE_NO_TZ,
                allowNull: false,
                defaultValue: '0001-01-01 00:00:00',
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
            TemplateTypeId: {
                type: DataTypes.INTEGER,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'TemplateType',
                    key: 'Id',
                },
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('Template');
    },
};
