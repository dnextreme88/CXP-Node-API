module.exports = (sequelize, SequelizeDataTypes) => {
    const Role = sequelize.define('Role', {
        Id: {
            type: SequelizeDataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        RoleName: {
            type: SequelizeDataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'Role name must not exceed 100 characters',
                },
                notNull: {
                    args: true,
                    msg: 'Role name cannot be null',
                },
            },
        },
        UserTypeId: {
            type: SequelizeDataTypes.INTEGER,
            onDelete: 'cascade',
            allowNull: false,
            defaultValue: 0,
            references: {
                model: 'UserType',
                key: 'Id',
            },
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    Role.associate = (models) => { Role.belongsTo(models.UserType); };

    return Role;
};
