const task_solutionRepository = require('../repositories/task_solutionRepository');

class Task_Solutions {
    async getTaskState(id) {
        return await task_solutionRepository.getTaskState(id);
    }

    async getCompletionRate() {
        return await task_solutionRepository.getCompletionRate();
    }
    
    async getSolvedTasksRate(id) {
        return await task_solutionRepository.getSolvedTasksRate(id);
    }

async getTasksByCompletionState(state,userId){
        return await task_solutionRepository.getTasksByCompletionState(state,userId);
    }
    async submitSolution(userId,taskId,solution){
        return await task_solutionRepository.submitSolution(userId,taskId,solution);
    }
    async monthlySolvingRate(userId,year) {
        try{
          return await task_solutionRepository.monthlySolvingRate(userId);
        }catch(error){
          throw error;
        }
    }
    async mostRecentlyTriedTask(userId){
        try{
            return await task_solutionRepository.mostRecentlyTriedTask(userId);
          }catch(error){
            throw error;
          }
    }
    async getDailyTaskStreak(userId){
        try{
            return await task_solutionRepository.getDailyTaskStreak(userId);
        }catch(error){
            throw error;
        }
    }
}

module.exports = new Task_Solutions();
