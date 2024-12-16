const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Vip_customization extends Model {}

    Vip_customization.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull:false
            },
            active_date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            activated: {
                type: DataTypes.INTEGER,
                validate: {
                    min: 0,
                    max: 1,
                },
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: 'Vip_customization',
            tableName: 'vip_customization',
            timestamps: false,
        }
    );

    return Vip_customization;
};