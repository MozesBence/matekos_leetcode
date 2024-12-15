const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Tokenz extends Model {}

    Tokenz.init(
        {
            token: {
                type: DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true,
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 0,
                    max: 10,
                },
            },
            expires: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        },
        {
            sequelize,
            modelName: 'Tokenz',
            tableName: 'tokenz',
            timestamps: false,
        }
    );

    return Tokenz;
};
