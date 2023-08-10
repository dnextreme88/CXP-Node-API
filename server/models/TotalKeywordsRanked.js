const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const TotalKeywordsRanked = sequelize.define('TotalKeywordsRanked', {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        Date: {
            type: DataTypes.DATE_NO_TZ,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Date cannot be null',
                },
            },
        },
        Top3: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: 'Top 3 must be a numeric value',
                },
                notNull: {
                    args: true,
                    msg: 'Top 3 cannot be null',
                },
            },
        },
        Top10: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: 'Top 10 must be a numeric value',
                },
                notNull: {
                    args: true,
                    msg: 'Top 10 cannot be null',
                },
            },
        },
        Top100: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: 'Top 100 must be a numeric value',
                },
                notNull: {
                    args: true,
                    msg: 'Top 100 cannot be null',
                },
            },
        },
        Over100: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: 'Over 100 must be a numeric value',
                },
                notNull: {
                    args: true,
                    msg: 'Over 100 cannot be null',
                },
            },
        },
        TargetPageId: {
            type: DataTypes.UUID,
            onDelete: 'restrict',
            allowNull: true,
            references: {
                model: 'TargetPage',
                key: 'Id',
            },
        },
        ProjectId: {
            type: DataTypes.UUID,
            onDelete: 'restrict',
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
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return TotalKeywordsRanked;
};
