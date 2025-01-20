const tasksRepository = require('../repositories/tasksRepository');

class TasksService {
  async getCardInfo() {
    try {
      return await tasksRepository.getCardInfo();
    } catch (error) {
      throw error; // Ensure proper propagation of errors
    }
  }
}

module.exports = new TasksService();
