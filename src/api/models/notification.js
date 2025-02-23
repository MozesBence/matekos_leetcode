const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {}

    Notification.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull:false
            },
            notif_content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content_type: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            type: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Notification',
            tableName: 'notification',
            timestamps: false,
        }
    );

    return Notification;
};