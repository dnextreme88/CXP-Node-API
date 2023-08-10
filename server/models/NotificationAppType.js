module.exports = (sequelize, SequelizeDataTypes) => {
    const NotificationAppType = sequelize.define('NotificationAppType', {
        Id: {
            type: SequelizeDataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: SequelizeDataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'Name must not exceed 100 characters',
                },
                notNull: {
                    args: true,
                    msg: 'Name cannot be null',
                },
            },
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return NotificationAppType;
};
