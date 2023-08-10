const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const UserRole = sequelize.define('UserRole', {
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
        RoleId: {
            type: DataTypes.INTEGER,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Role id cannot be null',
                },
            },
            references: {
                model: 'Role',
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

    UserRole.associate = (models) => {
        UserRole.belongsTo(models.Role);
        UserRole.belongsTo(models.User);
    };

    return UserRole;
};
