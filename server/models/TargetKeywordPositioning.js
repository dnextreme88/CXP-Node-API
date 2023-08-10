const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const TargetKeywordPositioning = sequelize.define('TargetKeywordPositioning', {
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
        Position: {
            type: DataTypes.DECIMAL,
        },
        Delta: {
            type: DataTypes.DECIMAL,
        },
        TargetKeywordId: {
            type: DataTypes.UUID,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Target keyword id cannot be null',
                },
            },
            references: {
                model: 'TargetKeyword',
                key: 'Id',
            },
        },
        ProjectId: {
            type: DataTypes.UUID,
            onDelete: 'cascade',
            allowNull: false,
            defaultValue: '00000000-0000-0000-0000-000000000000',
            references: {
                model: 'Project',
                key: 'Id',
            },
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return TargetKeywordPositioning;
};
