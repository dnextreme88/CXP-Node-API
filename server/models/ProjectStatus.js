module.exports = (sequelize, SequelizeDataTypes) => {
    const ProjectStatus = sequelize.define('ProjectStatus', {
        Id: {
            type: SequelizeDataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: SequelizeDataTypes.STRING(200),
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
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return ProjectStatus;
};
