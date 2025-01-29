const tasksService = require('../services/tasksServices');

const getCardInfo = async (req, res) => {
  try {
    const {offset} = req.params;
    const cards = await tasksService.getCardInfo(offset);
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
module.exports = {
  getCardInfo,
  getSpecificCard
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
