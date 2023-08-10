const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    // Extend support for no time zones
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const Customer = sequelize.define('Customer', {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        TenantId: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Tenant id cannot be null',
                },
            },
        },
        Name: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'Name must not exceed 200 characters',
                },
            },
        },
        RefName: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'Ref name must not exceed 200 characters',
                },
            },
        },
        RefId: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'Ref id must not exceed 200 characters',
                },
            },
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
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    Customer.associate = (models) => { Customer.hasOne(models.Project); };

    return Customer;
};
