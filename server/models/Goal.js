const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const Goal = sequelize.define('Goal', {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        ValidFrom: {
            type: DataTypes.DATE_NO_TZ,
            allowNull: false,
            validate: {
                isDate: {
                    args: true,
                    msg: 'Valid from is not a valid date or is not in the formats YYYY-MM-DD or YYYY/MM/DD',
                },
                notNull: {
                    args: true,
                    msg: 'Valid from cannot be null',
                },
            },
        },
        ValidTo: {
            type: DataTypes.DATE_NO_TZ,
            allowNull: false,
            validate: {
                isDate: {
                    args: true,
                    msg: 'Valid to is not a valid date or is not in the formats YYYY-MM-DD or YYYY/MM/DD',
                },
                notNull: {
                    args: true,
                    msg: 'Valid to cannot be null',
                },
            },
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
            validate: {
                isDate: {
                    args: true,
                    msg: 'Goal reached at is not a valid date or is not in the formats YYYY-MM-DD or YYYY/MM/DD',
                },
            },
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
            validate: {
                notNull: {
                    args: true,
                    msg: 'Project id cannot be null',
                },
            },
            references: {
                model: 'Project',
                key: 'Id',
            },
        },
        GoalTypeId: {
            type: DataTypes.INTEGER,
            onDelete: 'restrict',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Goal type id cannot be null',
                },
            },
            references: {
                model: 'GoalType',
                key: 'Id',
            },
        },
    }, {
        freezeTableName: true,
        timestamps: false,
        // Model-wide validations
        validate: {
            isValidToLessThanValidFrom() {
                if (this.ValidTo <= this.ValidFrom) {
                    throw new Error('Valid to cannot be less than or equal to valid from');
                }
            },
            isEndValueLessThanInitialValue() {
                if (this.EndValue <= this.InitialValue) {
                    throw new Error('End value cannot be less than or equal to initial value');
                }
            },
        },
    });

    return Goal;
};
