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
}

module.exports = new Task_Solutions();
