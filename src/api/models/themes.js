const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Themes extends Model {}

    Themes.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            theme: {
                type: DataTypes.TEXT,
                allowNull: false,
                defaultValue: null,
            },
        },
        {
            sequelize,
            modelName: 'Themes',
            tableName: 'themes',
            timestamps: false,
        }
    );

    return Themes;
};
