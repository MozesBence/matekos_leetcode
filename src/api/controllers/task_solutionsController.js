const task_solutionsService = require('../services/task_solutionsService');

const getTaskState = async (req, res, next) => {
    const { id } = req.params;
    console.log('Received ID:', id);
    try {
        const taskState = await task_solutionsService.getTaskState(id);
        res.status(200).json(taskState);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching task states', error });
    }
};


const getCompletionRate = async (req, res, next) => {
    try {
        const completionRates = await task_solutionsService.getCompletionRate();
        res.status(200).json(completionRates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching completion rates', error });
    }
};
    

const getSolvedTasksRate = async (req, res, next) => {
    const { id } = req.params;
    try {
        const solvedTasksRate = await task_solutionsService.getSolvedTasksRate(id);
        res.status(200).json(solvedTasksRate);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching solved tasks rate', error });
    }
};

// Module Exports
module.exports = {
    getTaskState,
    getCompletionRate,
    getSolvedTasksRate,
};
