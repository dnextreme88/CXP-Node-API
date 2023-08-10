const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const Project = sequelize.define('Project', {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        Name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'Name must not exceed 100 characters',
                },
                notNull: {
                    args: true,
                    msg: 'Name cannot be null',
                },
            },
        },
        AsanaProjectId: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'Asana project id must not exceed 200 characters',
                },
            },
        },
        AsanaRefName: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'Asana ref name must not exceed 200 characters',
                },
            },
        },
        AsanaOwnerName: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'Asana owner name must not exceed 200 characters',
                },
            },
        },
        AsanaTeamName: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'Asana team name must not exceed 200 characters',
                },
            },
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
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'Google analytics view id must not exceed 200 characters',
                },
            },
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
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'Contract file name must not exceed 200 characters',
                },
            },
        },
        ContractLocation: {
            type: DataTypes.STRING(254),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 254],
                    msg: 'Contract location must not exceed 254 characters',
                },
            },
        },
        LogoLocation: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'Logo location must not exceed 200 characters',
                },
            },
        },
        AsanaSectionDone: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'Asana section done must not exceed 200 characters',
                },
            },
        },
        AsanaSectionRevision: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'Asana section revision must not exceed 200 characters',
                },
            },
        },
        MaxBackfills: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 12,
            validate: {
                isInt: {
                    msg: 'Max backfills must be an integer and must be between 1 to 2147483646',
                    gt: 0,
                    lt: 2147483647,
                },
            },
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
            validate: {
                notNull: {
                    args: true,
                    msg: 'Customer id cannot be null',
                },
            },
            references: {
                model: 'Customer',
                key: 'Id',
            },
        },
        ProjectStatusId: {
            type: DataTypes.INTEGER,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Project status id cannot be null',
                },
            },
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
            validate: {
                notNull: {
                    args: true,
                    msg: 'Tenant id cannot be null',
                },
            },
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
        timestamps: false,
        // Model-wide validations
        validate: {
            isMaxBackfillsLessThanNumBackfills() {
                if (this.MaxBackfills < this.NumBackfills) {
                    throw new Error('Max backfills cannot be less than num backfills');
                }
            },
        },
    });

    Project.associate = (models) => {
        Project.belongsTo(models.Customer);
        Project.hasOne(models.Deliverable);
        Project.hasMany(models.Goal);
        Project.hasOne(models.PodProject);
        Project.hasOne(models.Task);
        Project.hasMany(models.TargetPage);
        Project.belongsTo(models.User, { as: 'MainContact' });
    };

    return Project;
};
