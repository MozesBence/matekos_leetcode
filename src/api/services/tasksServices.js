const tasksRepository = require('../repositories/tasksRepository');

class TasksService {
  async getCardInfo(id) {
    try {
      return await tasksRepository.getCardInfo(id);
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
  async getTaskCount(){
    try{
      return await tasksRepository.getTaskCount();
    }catch(error){
      throw error;
    }
  }
}

module.exports = new TasksService();
