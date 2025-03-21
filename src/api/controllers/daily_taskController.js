const daily_taskServices = require('../services/daily_taskServices');

const getDailyTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await daily_taskServices.getDailyTask(id);

        if(!task){
            const error = new Error("Nem sikerült lekérni a napi feladatot!");

            error.status = 400;

            throw error;
        }

        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

const CheckIfDailyTask = async (req,res) => {
    try{
        const {taskid} = req.params;

        const check = await daily_taskServices.CheckIfDailyTask(taskid)

        if(!check){
            const error = new Error("Nem sikerült leellenőrizni a feladatot!");

            error.status = 400;

            throw error;
        }

        res.status(200).json(check);
    }catch(error){
        next(error);
    }
}

module.exports = {
    getDailyTask,
    CheckIfDailyTask
};
