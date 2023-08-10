const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Extend support for no time zones
        const DataTypes = withDateNoTz(Sequelize);

        await queryInterface.createTable('Project', {
            Id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            Name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            AsanaProjectId: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            AsanaRefName: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            AsanaOwnerName: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            AsanaTeamName: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            AsanaCreatedAt: {
                type: DataTypes.DATE_NO_TZ,
                allowNull: true,
            },
            GoogleAnalyticsPropertyId: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            GoogleAnalyticsViewId: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            Domain: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            GoogleDriveFolderId: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            GoogleDriveFolderName: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            ContractFileName: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            ContractLocation: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            LogoLocation: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            AsanaSectionDone: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            AsanaSectionRevision: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            MaxBackfills: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 12,
            },
            NumBackfills: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
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
            CustomerId: {
                type: DataTypes.UUID,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'Customer',
                    key: 'Id',
                },
            },
            ProjectStatusId: {
                type: DataTypes.INTEGER,
                onDelete: 'cascade',
                allowNull: false,
                defaultValue: 0,
                references: {
                    model: 'ProjectStatus',
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
            MainContactId: {
                type: DataTypes.UUID,
                onDelete: 'restrict',
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
        await queryInterface.dropTable('Project');
    },
};
