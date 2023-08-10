module.exports = (sequelize, SequelizeDataTypes) => {
    const UserEmailSettings = sequelize.define('UserEmailSettings', {
        Id: {
            type: SequelizeDataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        Value: {
            type: SequelizeDataTypes.BOOLEAN,
            allowNull: true,
            validate: {
                isIn: {
                    args: [[true, false, 0, 1, 'true', 'false', 'True', 'False', 'TRUE', 'FALSE']],
                    msg: 'Value is not a valid boolean',
                },
            },
        },
        UserEmailSettingsTypeId: {
            type: SequelizeDataTypes.INTEGER,
            onDelete: 'cascade',
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'User email settings type id cannot be null',
                },
            },
            references: {
                model: 'UserEmailSettingsType',
                key: 'Id',
            },
        },
        UserId: {
            type: SequelizeDataTypes.UUID,
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

    return UserEmailSettings;
};
