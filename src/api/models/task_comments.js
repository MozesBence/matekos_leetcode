const { Model,Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Task_comments extends Model {}

    Task_comments.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            comment_text: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            comment_date: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        },
        {
            sequelize,
            modelName: 'Task_comments',
            tableName: 'task_comments',
            timestamps: false,
        }
    );

    return Task_comments;
};
