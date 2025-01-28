const db = require('../database/dbContext');
const { Tasks } = db;

const tasksRepository = {
  
  async getCardInfo() {
    if(!Tasks){
        return 'nem task'
    }
    try {
      return await Tasks.findAll({
        distinct: true,
        order: [['id', 'ASC']],
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
  }
  
};

module.exports = tasksRepository;
