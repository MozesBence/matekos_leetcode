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

const getTasksByCompletionState = async (req,res,next) =>{
    const{state,userId} = req.params;
    try{
        const filteredTasks = await task_solutionsService.getTasksByCompletionState(state,userId)
        res.status(200).json(filteredTasks);
    }catch(error){
        res.status(500).json({ message: 'Error fetching tasks by completion state', error });
    }

}

const submitSolution = async (req, res,next) => {
    try {
        const userId = req.user.id;
        const { taskId, score } = req.body;

        if (!taskId || score === undefined) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const result = await taskSolutionService.submitSolution(userId, taskId, score);

        res.status(201).json({
            message: "Solution submitted successfully",
            solutionId: result.insertId
        });

    } catch (error) {
        console.error("Error submitting solution:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getTaskState,
    getCompletionRate,
    getSolvedTasksRate,
    getTasksByCompletionState,
    submitSolution
};
