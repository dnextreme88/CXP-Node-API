const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Extend support for no time zones
        const DataTypes = withDateNoTz(Sequelize);

        await queryInterface.createTable('UserPic', {
            Id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            Location: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            IsNotifPic: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            BackColor: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
            OrderNumber: {
                type: DataTypes.INTEGER,
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
            UserId: {
                type: DataTypes.UUID,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'Id',
                },
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('UserPic');
    },
};
