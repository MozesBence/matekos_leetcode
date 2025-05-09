const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task_solutions extends Model {}

  Task_solutions.init(
    {
      submission_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Tasks',
          key: 'id',
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      state: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isIn: [[0, 1]],
        },
      },
      awarded:{
        type:DataTypes.TINYINT(1),
        allowNull:true,
        defaultValue:null
      }
    },
    {
      sequelize,
      modelName: 'Task_solutions',
      tableName: 'task_solutions',
      timestamps: false,
    }
  );
  return Task_solutions;
};
