const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Extend support for no time zones
        const DataTypes = withDateNoTz(Sequelize);

        await queryInterface.createTable('TargetKeywordPositioning', {
            Id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            Date: {
                type: DataTypes.DATE_NO_TZ,
                allowNull: false,
            },
            Position: {
                type: DataTypes.DECIMAL,
            },
            Delta: {
                type: DataTypes.DECIMAL,
            },
            TargetKeywordId: {
                type: DataTypes.UUID,
                onDelete: 'cascade',
                allowNull: false,
                references: {
                    model: 'TargetKeyword',
                    key: 'Id',
                },
            },
            ProjectId: {
                type: DataTypes.UUID,
                onDelete: 'cascade',
                allowNull: false,
                defaultValue: '00000000-0000-0000-0000-000000000000',
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
        await queryInterface.dropTable('TargetKeywordPositioning');
    },
};
