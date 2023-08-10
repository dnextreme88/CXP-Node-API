module.exports = (sequelize, SequelizeDataTypes) => {
    const DeliverableType = sequelize.define('DeliverableType', {
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

    return DeliverableType;
};
