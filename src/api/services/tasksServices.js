const tasksRepository = require('../repositories/tasksRepository');

class TasksService {
  async getCardInfo() {
    try {
      return await tasksRepository.getCardInfo();
    } catch (error) {
      throw error;
    }
  }
  async getSpecificCard(id) {
    try{
      return await tasksRepository.getSpecificCard(id);
    }catch(error){
      throw error;
    }
  }
}

module.exports = new TasksService();
