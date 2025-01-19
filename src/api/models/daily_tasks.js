const {Sequalize, Model, DataTypes} = require('sequelize')


module.exports = (sequelize, DataTypes ) => {
    class Daily_tasks extends Model{}
    Daily_tasks.init(
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull:false,
                primaryKey:true 
            },
            task_id:{
                type: DataTypes.INTEGER,
                allowNull:false,
                references: {
                    model:'Tasks',
                    key:'id'
                }
            },
            user_id:{
                type: DataTypes.INTEGER,
                allowNull:false,
                references:{
                    model:'Users',
                    key:'id',
                }
            },
            expire_date:{
                type: DataTypes.DATE,
                allowNull: false
            }
            },
            {
                sequelize,
                modelName: 'Daily_Tasks',
                tableName:'daily_tasks',
                timestamps:false,
            }
    )
    return Daily_tasks;
}