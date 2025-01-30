const tasksService = require('../services/tasksServices');

const getCardInfo = async (req, res) => {
  try {
    const { offset } = req.params;
    const numericOffset = parseInt(offset, 10) || 0;
    const cards = await tasksService.getCardInfo(numericOffset);
    res.status(200).json(cards);
  } catch (error) {
    console.error('Error in tasks controller:', error.message);
    res.status(500).json({ message: error.message });
  }
};


const getSpecificCard = async (req,res,next) =>{
  try{
    const { id } = req.params;
    const card = await tasksService.getSpecificCard(id);
    res.status(200).json(card);
  }catch(error){
    console.error('Error in tasks controller:', error.message);
    res.status(500).json({ message: error.message });
  }
}

const getTaskCount = async (req,res,next) => {
  try{
    const taskCount = await tasksService.getTaskCount();
    res.status(200).json(taskCount);
  }catch(error)
  {
    console.log(`Error in tasks controller: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
}
module.exports = {
  getCardInfo,
  getSpecificCard,
  getTaskCount
};


/*
exports.getCardInfo = async (req, res) => {
    try {
      const tasks = await db.sequelize.query(
        `SELECT 
          id, 
          theme_id, 
          solution, 
          difficulty, 
          experience_points, 
          task_title, 
          task, 
          task_comments_id 
        FROM tasks`, 
        { type: db.Sequelize.QueryTypes.SELECT }
      );
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Failed to retrieve tasks data' });
    }
  };
*/
