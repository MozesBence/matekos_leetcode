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
  async getTaskCount({ difficulty, search, themes, state, userId, offset }){
    try {
      difficulty = difficulty !== undefined ? parseInt(difficulty) : undefined;
      state = state !== undefined ? parseInt(state) : undefined;
      if (themes) {
        themes = themes.split(";");
      }
      return await tasksRepository.getTaskCount({
        difficulty,
        search,
        themes,
        state,
        userId,
        offset
      });
    } catch (error) {
      throw error;
    }
  }
  async getRandomTask(){
    try{
      return await tasksRepository.getRandomTask();
    }catch(error){
      throw error;
    }
  }
  async getTaskWithSearch(characters){
    try{
      return await tasksRepository.getTaskWithSearch(characters);
    }catch(error){
      throw error;
    }
  }
  async getTasksByDifficult(difficulty_value){
    try{
      return await tasksRepository.getTasksByDifficult(difficulty_value)
    }catch(error){
      throw error;
    }
  }
  async getFilteredTasks({ difficulty, search, themes, state, userId, offset }) {
    try {

      if (themes) {
        themes = themes.split(";");
      }
      return await tasksRepository.getFilteredTasks({
        difficulty,
        search,
        themes,
        state,
        userId,
        offset
      });
    } catch (error) {
      throw error;
    }
  }
  async getsimilarTasks(taskId,themeId){
    try{
      return await tasksRepository.getsimilarTasks(taskId,themeId)
    }catch(error){
      throw error;
    }
  }
  async getSolution(id){
    try{
      return await tasksRepository.getSolution(id);
    }catch(error){
      throw error;
    }
  }
  async submitTask({taskTitle,task,themeId,solution,difficulty,creatorId,experiencePoints,solutionFormat,hint1,hint2,validated}){
    try{
      return await tasksRepository.submitTask({taskTitle,task,themeId,solution,difficulty,creatorId,experiencePoints,solutionFormat,hint1,hint2,validated})
    }catch(error){
      throw error;
    }
  }
  async getUnvalidatedTasks(){
    try{
      return await tasksRepository.getUnvalidatedTasks();
    }catch(error){
      throw error;
    }
  }
  async updateTaskValidationState(taskId,validity, user_id, from_user_id, message){
    try{
      return await tasksRepository.updateTaskValidationState(taskId,validity, user_id, from_user_id, message);
    }catch(error){
      throw error;
    }
  }

}

module.exports = new TasksService();
