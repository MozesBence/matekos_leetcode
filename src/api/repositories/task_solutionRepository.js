const db = require('../database/dbContext');
const {Task_solutions,Tasks,Users} = db;
const sequelize = require('sequelize');
const tasks = require('../models/tasks');
const task_solution = require('../models/task_solution');
const { includes } = require('lodash');


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
    
        const difficultyCounts = [0, 0, 0];
    
        difficulties.forEach((difficulty) => {
            if (difficulty !== null && difficulty >= 0 && difficulty <= 2) {
                difficultyCounts[difficulty]++;
            }
        });
    
        return difficultyCounts;
    },
    async getTasksByCompletionState(state_value, userId) {
        if (state_value == 2) {
            const taskSolutions = await Task_solutions.findAll({
                attributes: ['task_id'],
                group: ['task_id']
            });

            const taskIdsInSolutions = taskSolutions.map(ts => ts.task_id);

            return await Tasks.findAll({
                limit: 15,
                where: {
                    id: {
                        [db.Sequelize.Op.notIn]: taskIdsInSolutions
                    }
                }
            });
        } else {
            const taskSolutions = await Task_solutions.findAll({
                where: {
                    state: state_value,
                    UserId: userId
                },
                attributes: ['task_id']
            });

            const taskIdsInSolutions = taskSolutions.map(ts => ts.task_id);

            return await Tasks.findAll({
                limit: 15,
                where: {
                    id: {
                        [db.Sequelize.Op.in]: taskIdsInSolutions
                    }
                }
            });
        }
    },
    async submitSolution(userId, taskId, solution) {
        try {
            const state = await this.CheckSolution(taskId, solution);
            const currentTimestamp = new Date();
    
            const existingSolution = await Task_solutions.findOne({
                where: { UserId: userId, task_id: taskId }
            });
    
            if (!existingSolution) {
                // Full uj rekord hozzaadasa a dbhez ha jo/ ha rossz
                const newSolution = await Task_solutions.create({
                    UserId: userId,
                    task_id: taskId,
                    state: state,
                    submission_date: currentTimestamp
                });
    
                // ha helyes a megoldas xp plussz
                if (state === 1) {
                    await this.IncreaseExperiencePoints(userId, taskId);
                }
    
                return newSolution;
            } else {
                if (state === 1) {
                    if (existingSolution.state === 1) {
                        // ha mar alapbol jo volt, csak a datumot frissiti
                        await Task_solutions.update(
                            { submission_date: currentTimestamp },
                            { where: { UserId: userId, task_id: taskId } }
                        );
                    } else {
                        // ha hibas problakozas volt de most jo akkor update
                        await Task_solutions.update(
                            { state: 1, submission_date: currentTimestamp },
                            { where: { UserId: userId, task_id: taskId } }
                        );
                        // xp plussz
                        await this.IncreaseExperiencePoints(userId, taskId);
                    }
                    return { state: 1, message: "Solution is correct." };
                } else {
                    // hibas megoldas vissza state
                    return { state: 0, message: "Solution is incorrect." };
                }
            }
        } catch (error) {
            throw error;
        }
    }
    ,    
    
    //valasz ellenorzese
    async CheckSolution(taskId, solution) {
        const correctSolution = await Tasks.findOne({
            where: { id: taskId },
            attributes: ['solution']
        });
    
        if (!correctSolution) return 0;
        return solution === correctSolution.solution ? 1 : 0;
    },
    
    //lekeri az adott feladat xp-jet (azonositas taskid alapjan) es utanna frissiti a usernel a kapott mennyiseggel
    async IncreaseExperiencePoints(userId, taskId) {
        const exp = await this.GetExperiencePoints(taskId);
        if (exp > 0) {
            await this.UpdateExperiencePoints(userId, exp);
        }
    },
    
    //experience_point-ok lekerese
    async GetExperiencePoints(taskId) {
        const task = await Tasks.findOne({
            where: { id: taskId },
            attributes: ['experience_points']
        });
    
        return task ? task.experience_points : 0;
    },
    
    //experienc_point-ok frissitese
    async UpdateExperiencePoints(userId, exp) {
        try {
            await Users.increment('experience_point', {
                by: exp,
                where: { id: userId }
            });
        } catch (error) {
           throw error;
        }
    },
    
    async monthlySolvingRate(userId) {
        const solutions = await Task_solutions.findAll({
            attributes: ['submission_date'],
            where: {
                UserId: userId,
                state: 1
            }
        });
    
        const groupedSolutions = solutions.reduce((acc, solution) => {
            const month = new Date(solution.submission_date).getMonth() + 1;
    
            if (!acc[month]) {
                acc[month] = 0;
            }
    
            acc[month] += 1;
    
            return acc;
        }, {});
    
        const result = Array.from({ length: 12 }, (_, i) => {
            const month = i + 1;
            return {
                month,
                solutionCount: groupedSolutions[month] || 0
            };
        });
    
        return result;
    },
    
    
    async mostRecentlyTriedTask(userId) {
        const taskSolution = await Task_solutions.findOne({
          where: {
            UserId: userId,
            state: 0
          },
          order: [['submission_date', 'DESC']],
          limit: 1,
          include: [
            {
              model: Tasks,
              required: true,
              attributes: ['id', 'task_title', 'difficulty'],
            },
          ],
        });
      
        return taskSolution ? taskSolution.Task : null;
      },


      async  getDailyTaskStreak(userId) {
        //rossz
      }
      
};    

module.exports = task_solutionRepository;