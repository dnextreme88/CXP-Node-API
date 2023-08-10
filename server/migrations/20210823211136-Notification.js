const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Extend support for no time zones
        const DataTypes = withDateNoTz(Sequelize);

        await queryInterface.createTable('Notification', {
            Id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            Subject: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            From: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            To: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            Message: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            NotificationGuid: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            ValidTill: {
                type: DataTypes.DATE_NO_TZ,
                allowNull: false,
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
            TemplateTypeId: {
                type: DataTypes.INTEGER,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'TemplateType',
                    key: 'Id',
                },
            },
            TemplateId: {
                type: DataTypes.INTEGER,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'Template',
                    key: 'Id',
                },
            },
            UserId: {
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
        await queryInterface.dropTable('Notification');
    },
};
