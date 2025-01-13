const task_solutionRepository = require('../repositories/task_solutionRepository');

class Task_Solutions {
    // Get task states for a user by user ID
    async getTaskState(id) {
        return await task_solutionRepository.getTaskState(id); // Use the provided repository method
    }

    async getCompletionRate() {
        return await task_solutionRepository.getCompletionRate();
    }
    

    // Get solved tasks rate for a specific user
    async getSolvedTasksRate(id) {
        return await task_solutionRepository.getSolvedTasksRate(id); // Pass user ID to the repository
    }
}

module.exports = new Task_Solutions();
