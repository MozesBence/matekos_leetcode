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
        //await countByDifficulty(completedTasksArray)
        return {
            userId,
            totalTasks,
            completedTasks,
            completedTasksArray,
            solvedRate: (completedTasks / totalTasks) * 100
        };
    },
    //emiatt nem mukodik meg
    async countByDifficulty(completedTasksArray){
        for(var i=0; i< completedTasksArray.length;++i){
            await Tasks.findOne({
                where:{
                    id: completedTasksArray[i].task_id,
                    attributes:['id','difficulty']
                }
            })
        }
    }
};

module.exports = task_solutionRepository;