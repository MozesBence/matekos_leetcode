const daily_taskRepository = require('../repositories/daily_taskRepository');

class Daily_Task_Service {
    async getDailyTask(id){
        return await daily_taskRepository.getDailyTask(id);
    }
    async CheckIfDailyTask(taskid){
        return await daily_taskRepository.CheckIfDailyTask(taskid)
    }
}
module.exports = new Daily_Task_Service();