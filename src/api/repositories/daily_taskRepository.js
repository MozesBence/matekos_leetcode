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
        try {
            const task = await db.Daily_Tasks.findOne({
                where: {
                    task_id: taskid
                }
            });
            return task; // Return the task or null
        } catch (error) {
            console.error("Error in CheckIfDailyTask service:", error);
            throw new Error("Database query failed.");
        }
    }
    
}

module.exports = daily_taskRepository;