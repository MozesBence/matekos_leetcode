const { number } = require('zod');
const { Sequelize } = require('sequelize');
const db = require('../database/dbContext');
const { Tasks } = db;
const { Op } = require('sequelize');

const tasksRepository = {
  
  async getCardInfo(offset) {
    
    if(!Tasks){
        return 'nem task'
    }
    try {
      return await Tasks.findAll({
        distinct: true,
        order: [['id', 'ASC']],
        offset: number().int().parse(offset),
        limit: 15,
      });
    } catch (error) {
      console.error('Error fetching cards:', error);
      throw error;
    }
  },
  async getSpecificCard(id) {
    try {
      return await Tasks.findOne({
        where: {
          id: id
        }
      });
    } catch (error) {
      console.error('Error fetching specific card:', error);
      throw error;
    }
  },

  async getTaskCount(){
    try{
      return await Tasks.count();
    }catch(error){
      console.error('Error fetching specific card count:', error);
      throw error;
    }
  },
  async getRandomTask() {
    return await Tasks.findOne({
      attributes: ['id'],
      order: [Sequelize.fn('RAND')],
      limit: 1
    });
  },

  async getTaskWithSearch (characters){
    return await Tasks.findAll({
      where: {
        task_title: {
          [Op.like]: `${characters.toLowerCase()}%`
        }
      },
      order: [['id', 'ASC']],
      limit: 15
    });
  },

  async getTasksByDifficult(difficulty_value){
    return await Tasks.findAll({
      order:[['id','ASC']],
      where:{
        difficulty: difficulty_value
      }
    })
  }
  
  
};

module.exports = tasksRepository;
