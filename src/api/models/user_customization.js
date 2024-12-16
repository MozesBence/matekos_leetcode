const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User_customization extends Model {}

    User_customization.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull:false
            },
            darkmode:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'User_customization',
            tableName: 'user_customization',
            timestamps: false,
        }
    );

    return User_customization;
};