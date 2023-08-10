const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Extend support for no time zones
        const DataTypes = withDateNoTz(Sequelize);

        await queryInterface.createTable('User', {
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
            },
            LastName: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            FirstLastName: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            Title: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            Email: {
                type: DataTypes.STRING(100),
                validate: {
                    isEmail: true,
                    message: (props) => `${props.value} is not a valid email address!`,
                },
                allowNull: false,
                unique: true,
            },
            PasswordHash: {
                type: DataTypes.BLOB,
                allowNull: true,
            },
            PasswordSalt: {
                type: DataTypes.BLOB,
                allowNull: true,
            },
            CreatedAt: {
                type: DataTypes.DATE_NO_TZ,
                allowNull: false,
            },
            FunFacts: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            ModifiedAt: {
                type: DataTypes.DATE_NO_TZ,
                allowNull: false,
                defaultValue: '0001-01-01 00:00:00',
            },
            IsPrimaryContact: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
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
            UserTypeId: {
                type: DataTypes.INTEGER,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'UserType',
                    key: 'Id',
                },
            },
            DsTypeId: {
                type: DataTypes.INTEGER,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'DsType',
                    key: 'Id',
                },
            },
            CustomerId: {
                type: DataTypes.UUID,
                onDelete: 'restrict',
                references: {
                    model: 'Customer',
                    key: 'Id',
                },
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('User');
    },
};
