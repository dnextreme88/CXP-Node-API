const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Extend support for no time zones
        const DataTypes = withDateNoTz(Sequelize);

        await queryInterface.createTable('TotalKeywordsRanked', {
            Id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            Date: {
                type: DataTypes.DATE_NO_TZ,
                allowNull: false,
            },
            Top3: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            Top10: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            Top100: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            Over100: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            TargetPageId: {
                type: DataTypes.UUID,
                onDelete: 'restrict',
                allowNull: true,
                references: {
                    model: 'TargetPage',
                    key: 'Id',
                },
            },
            ProjectId: {
                type: DataTypes.UUID,
                onDelete: 'restrict',
                allowNull: false,
                references: {
                    model: 'Project',
                    key: 'Id',
                },
            },
        }, {
            freezeTableName: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('TotalKeywordsRanked');
    },
};
