/* eslint-disable consistent-return */
const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
    const DataTypes = withDateNoTz(SequelizeDataTypes);

    const User = sequelize.define('User', {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        TenantId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        FirstName: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'First name must not exceed 100 characters',
                },
            },
        },
        LastName: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'Last name must not exceed 100 characters',
                },
            },
        },
        FirstLastName: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'First last name must not exceed 100 characters',
                },
            },
            set() {
                let fullName;
                if (this.FirstName === undefined && this.LastName === undefined) {
                    fullName = null;
                } else {
                    fullName = `${this.FirstName} ${this.LastName}`;
                }
                this.setDataValue('FirstLastName', fullName);
            },
        },
        Title: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'Title must not exceed 100 characters',
                },
            },
        },
        Email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Email is not a valid email address',
                },
                len: {
                    args: [0, 100],
                    msg: 'Email must not exceed 100 characters',
                },
                notNull: {
                    args: true,
                    msg: 'Email cannot be null',
                },
            },
        },
        /**
         * In the near future, I would like to change this setup to leverage bcrypt,
         * which includes the PasswordSalt in the PasswordHash
         * This improves performance, and bcrypt is also more secure
         * Right now the .NET backend uses SHA256 to generate the password hash
         * which is vulnerable to timing attacks, even with salted password hashes
         * See more: https://crypto.stackexchange.com/a/40444
         */
        PasswordHash: {
            type: DataTypes.STRING(100), // DataTypes.BLOB for bytea datatype
            allowNull: true,
        },
        PasswordSalt: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        FunFacts: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        IsPrimaryContact: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            validate: {
                isIn: {
                    args: [[true, false, 0, 1, 'true', 'false', 'True', 'False', 'TRUE', 'FALSE']],
                    msg: 'Is primary contact is not a valid boolean',
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
            onDelete: 'restrict',
            allowNull: true,
            references: {
                model: 'Customer',
                key: 'Id',
            },
        },
        DsTypeId: {
            type: DataTypes.INTEGER,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Ds type id cannot be null',
                },
            },
            references: {
                model: 'DsType',
                key: 'Id',
            },
        },
        UserTypeId: {
            type: DataTypes.INTEGER,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'User type id cannot be null',
                },
            },
            references: {
                model: 'UserType',
                key: 'Id',
            },
        },
    }, {
        // Sequelize pluralizes table names automatically, e.g. the table would become 'Users' here
        // So this property is set to prevent that from happening
        freezeTableName: true,
        timestamps: false,
        hooks: {
            afterCreate: (record) => {
                const rec = record;
                delete rec.dataValues.PasswordHash;
                delete rec.dataValues.PasswordSalt;
            },
            afterUpdate: (record) => {
                const rec = record;
                delete rec.dataValues.PasswordHash;
                delete rec.dataValues.PasswordSalt;
            },
        },
    });

    // Manually add the UserTypeId field as running sequelize.sync() method messes up the fields
    User.addConstraintsManually = (queryInterface) => {
        if (!User.rawAttributes.UserTypeId) { // Check if UserTypeId field exists on the table
            return queryInterface.addColumn('User', 'UserTypeId', {
                type: DataTypes.INTEGER,
                onDelete: 'cascade',
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: 'User type id cannot be null',
                    },
                },
                references: {
                    model: 'UserType',
                    key: 'Id',
                },
            });
        }
    };

    User.associate = (models) => {
        User.hasOne(models.UserRole);
        User.hasOne(models.PodUser);
        User.hasOne(models.UserPic);
        User.hasOne(models.UserEmailSettings);
    };

    return User;
};
