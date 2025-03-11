const daily_taskServices = require('../services/daily_taskServices');

const getDailyTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const card = await daily_taskServices.getDailyTask(id);
        res.status(200).json(card);
    } catch (error) {
        console.log(`error in daily tasks controller! ${error}`);
        res.status(500).json({ message: error.message });
    }
};

const CheckIfDailyTask = async (req,res) => {
    try{
        const {taskid} = req.params;
        const val = await daily_taskServices.CheckIfDailyTask(taskid)
        res.status(200).json(val);
    }catch(error){
        console.log(`error in daily tasks controller! ${error}`);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getDailyTask,
    CheckIfDailyTask
};
