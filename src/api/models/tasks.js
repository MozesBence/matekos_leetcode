const { Model } = require('sequelize');
const { nullable } = require('zod');

module.exports = (sequelize, DataTypes) => {
    class Tasks extends Model {}

    Tasks.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            theme_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            solution: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },
            creator_id:{
                type: DataTypes.INTEGER,
                allowNull:true,
                defaultValue: nullable
            },
            difficulty: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            experience_points: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            task_title: {
                type: DataTypes.STRING(250),
                allowNull: false,
            },
            task: {
                type: DataTypes.TEXT,
                allowNull: false, 
            },
        },
        {
            sequelize,
            modelName: 'Tasks',
            tableName: 'tasks',
            timestamps: false,
        }
    );

    return Tasks;
};
