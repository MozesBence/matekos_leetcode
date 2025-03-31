const daily_taskServices = require('../services/daily_taskServices');

const getDailyTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await daily_taskServices.getDailyTask(id);

        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

const CheckIfDailyTask = async (req, res, next) => {
    try {
        const { taskid } = req.params;
        const check = await daily_taskServices.CheckIfDailyTask(taskid);
        res.status(200).json(check);
    } catch (error) {
        console.error("Error in CheckIfDailyTask controller:", error);
        next(error); // Pass to error handler
    }
};

module.exports = {
    getDailyTask,
    CheckIfDailyTask
};
