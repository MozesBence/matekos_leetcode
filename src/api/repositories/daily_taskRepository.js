const db = require('../database/dbContext')
const {Daily_Tasks} = db;
const sequelize = require('sequelize');

const daily_taskRepository = {
    async getDailyTask(id){
        return await Daily_Tasks.findOne({
            attributes:['task_id'],
            where: {
                id: id
            }
        })
    },
    async CheckIfDailyTask(taskid){
        return await Daily_Tasks.findOne(
            {
                where:{
                    task_id:taskid
                }
            });
    }
}

module.exports = daily_taskRepository;