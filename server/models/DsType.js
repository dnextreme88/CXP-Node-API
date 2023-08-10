module.exports = (sequelize, SequelizeDataTypes) => {
    const DsType = sequelize.define('DsType', {
        Id: {
            type: SequelizeDataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: SequelizeDataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: {
                    args: [0, 50],
                    msg: 'Name must not exceed 50 characters',
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

    return DsType;
};
