const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const Tenant = sequelize.define('Tenant', {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        Active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                isIn: {
                    args: [[true, false, 0, 1, 'true', 'false', 'True', 'False', 'TRUE', 'FALSE']],
                    msg: 'Active is not a valid boolean',
                },
                notNull: {
                    args: true,
                    msg: 'Active cannot be null',
                },
            },
        },
        Name: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'Name must not exceed 200 characters',
                },
                notNull: {
                    args: true,
                    msg: 'Name cannot be null',
                },
            },
        },
        Address: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'Address must not exceed 100 characters',
                },
            },
        },
        Phone: {
            type: DataTypes.STRING(50),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 50],
                    msg: 'Phone must not exceed 50 characters',
                },
            },
        },
        Email: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Email is not a valid email address',
                },
                len: {
                    args: [0, 100],
                    msg: 'Email must not exceed 100 characters',
                },
            },
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
            onDelete: 'restrict',
            references: {
                model: 'User',
                key: 'Id',
            },
        },
        ModifiedById: {
            type: DataTypes.UUID,
            onDelete: 'restrict',
            references: {
                model: 'User',
                key: 'Id',
            },
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return Tenant;
};
