const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Competitions extends Model {};

    Competitions.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            identifier: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            define: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Competitions',
            tableName: 'competitions',
            timestamps: false
        }
    );

    return Competitions;
};
