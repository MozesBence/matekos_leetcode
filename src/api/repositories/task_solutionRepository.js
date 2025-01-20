const db = require('../database/dbContext');
const {Task_solutions,Tasks} = db;
const sequelize = require('sequelize');


const task_solutionRepository = {
    async getCompletionRate() {
        const result = await Task_solutions.findAll({
            attributes: [
                'task_id',
                [sequelize.fn('COUNT', sequelize.col('task_id')), 'totalTasks'],
                [
                    sequelize.fn('SUM', sequelize.literal(`CASE WHEN state = 1 THEN 1 ELSE 0 END`)),
                    'completedTasks'
                ]
            ],
            group: ['task_id']
        });
    
        return result.map(task => ({
            task_id: task.task_id,
            completionRate: (task.dataValues.completedTasks / task.dataValues.totalTasks) * 100
        }));
    },

    async getTaskState(userId) {
        return await Task_solutions.findAll({
            where: { UserId: userId },
            attributes: ['task_id', 'state']
        });
    },

    async getSolvedTasksRate(userId) {
        const totalTasks = await Task_solutions.count({ where: { UserId: userId } });
        const completedTasks = await Task_solutions.count({
            where: {
                UserId: userId,
                state: 1
            }
        });
        const completedTasksArray = await Task_solutions.findAll({
            where: {
                UserId: userId,
                state: 1
            }
        });
        
        const countpercenct = await task_solutionRepository.countByDifficulty(completedTasksArray);
        
        return {
            userId,
            totalTasks,
            completedTasks,
            completedTasksArray,
            solvedRate: (completedTasks / totalTasks) * 100,
            countpercenct
        };
    },
    
    
    async countByDifficulty(completedTasksArray) {
        const difficultyPromises = completedTasksArray.map(async (taskSolution) => {
            const task = await Tasks.findOne({
                where: { id: taskSolution.task_id },
                attributes: ['id', 'difficulty']
            });
            return task ? task.difficulty : null; 
        });
    
        const difficulties = await Promise.all(difficultyPromises);
    
        // Initialize an array to store the counts for difficulties 0, 1, and 2.
        const difficultyCounts = [0, 0, 0];
    
        // Count the occurrences of each difficulty.
        difficulties.forEach((difficulty) => {
            if (difficulty !== null && difficulty >= 0 && difficulty <= 2) {
                difficultyCounts[difficulty]++;
            }
        });
    
        return difficultyCounts; // Returns an array like [count_for_0, count_for_1, count_for_2]
    }
    
    
};

module.exports = task_solutionRepository;