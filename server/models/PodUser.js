const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const PodUser = sequelize.define('PodUser', {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
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
        PodId: {
            type: DataTypes.UUID,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Pod id cannot be null',
                },
            },
            references: {
                model: 'Pod',
                key: 'Id',
            },
        },
        UserId: {
            type: DataTypes.UUID,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'User id cannot be null',
                },
            },
            references: {
                model: 'User',
                key: 'Id',
            },
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    PodUser.associate = (models) => { PodUser.belongsTo(models.Pod); };

    return PodUser;
};
