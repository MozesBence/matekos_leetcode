const dailyTasksService = require('../services/dailyTasksService');

const assignDailyTasks = async (req, res) => {
  try {
    await dailyTasksService.assignDailyTasks();
    res.status(200).json({ message: 'Daily tasks assigned successfully!' });
    console.log("napi")
  } catch (error) {
    console.error('Error assigning daily tasks:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  assignDailyTasks
};