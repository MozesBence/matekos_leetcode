const { Model,Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Community_comments extends Model {}

    Community_comments.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            content: {
                type: DataTypes.TEXT('long'),
                allowNull: false,
            },
            likes: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            dislikes: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            }
        },
        {
            sequelize,
            modelName: 'Community_comments',
            tableName: 'community_comments',
            timestamps: false,
        }
    );

    return Community_comments;
};
