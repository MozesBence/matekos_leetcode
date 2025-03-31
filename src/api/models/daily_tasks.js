const {Sequalize, Model, DataTypes} = require('sequelize')


module.exports = (sequelize, DataTypes ) => {
    class Daily_tasks extends Model{}
    Daily_tasks.init(
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull:false,
                autoIncrement: true,
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
        },
        {
            sequelize,
            modelName: 'Daily_Tasks',
            tableName:'daily_tasks',
            timestamps:false,
        }
    )

    Daily_tasks.initializeDailyTask = async () => {
        const defaultDailyTasks = [
            { id: new Date().toISOString().split('T')[0].split('-')[2], task_id: 30 },
        ]

        for (const th of defaultDailyTasks) {
            await Daily_tasks.findOrCreate({
                where: { id: th.id },
                defaults: th,
            });
        }
    };
    return Daily_tasks;
}