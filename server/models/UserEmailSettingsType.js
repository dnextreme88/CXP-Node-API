module.exports = (sequelize, SequelizeDataTypes) => {
    const UserEmailSettingsType = sequelize.define('UserEmailSettingsType', {
        Id: {
            type: SequelizeDataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: SequelizeDataTypes.TEXT,
            allowNull: true,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return UserEmailSettingsType;
};
