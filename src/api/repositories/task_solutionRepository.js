const db = require('../database/dbContext');
const {Task_solutions,Tasks,Users} = db;
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
        const totalTasks = await this.getTotalTasks(userId);
        const completedTasks = await this.getCompletedTasks(userId);
        const completedTasksArray = await this.getCompletedTasksArray(userId);
        const countpercenct = await task_solutionRepository.countByDifficulty(completedTasksArray);
        
        return { userId, totalTasks, completedTasks, completedTasksArray, solvedRate: (completedTasks / totalTasks) * 100, countpercenct };
    },
    async getCompletedTasks(userId){
        return await Task_solutions.count({
            where: {
                UserId: userId,
                state: 1
            }
        });
    },
    async getCompletedTasksArray(userId){
        return await Task_solutions.findAll({
            where: {
                UserId: userId,
                state: 1
            }
        });
    },
    async getTotalTasks(userId){
        return await Task_solutions.count({ 
            where: { 
                UserId: userId 
            } 
        });
    },
    async countByDifficulty(completedTasksArray) {
        const taskPromises = completedTasksArray.map(taskSolution =>
            Tasks.findOne({
                where: { id: taskSolution.task_id },
                attributes: ['difficulty']
            })
        );
        const tasks = await Promise.all(taskPromises);
        const difficultyCounts = [0, 0, 0];

        for (const task of tasks) {
            if (task && task.difficulty >= 0 && task.difficulty <= 2) {
                difficultyCounts[task.difficulty]++;
            }
        }
    
        return difficultyCounts;
    },
    
    async getTasksByCompletionState(state_value, userId) {
        const whereCondition = state_value === 2 ? {} : { state: state_value, UserId: userId };
        const taskSolutions = this.getTaskSolutions(whereCondition);
        const solvedTaskIds = taskSolutions.map(ts => ts.task_id);
        return this.returnStateFilteredTasks(state_value,solvedTaskIds)
    },

    async getTaskSolutions(whereCondition){
        return await Task_solutions.findAll({
            where: whereCondition,
            attributes: ['task_id'],
            group: state_value === 2 ? ['task_id'] : undefined 
        });
    },

    async returnStateFilteredTasks(state_value,solvedTaskIds){
        return await Tasks.findAll({
            limit: 15,
            where: {
                id: state_value === 2 ? { [db.Sequelize.Op.notIn]: solvedTaskIds } : { [db.Sequelize.Op.in]: solvedTaskIds }
            }
        });
    },
    
    async submitSolution(userId, taskId, solution) {
        try {
            const state = await this.CheckSolution(taskId, solution);
            const currentTimestamp = new Date();
            const dailyTask = await this.CheckIfDailyTask(taskId);
            const existingSolution = await Task_solutions.findOne({
                where: { UserId: userId, task_id: taskId }
            });
    
            if (!existingSolution) {
                const newSolution = await Task_solutions.create({
                    UserId: userId,
                    task_id: taskId,
                    state: state,
                    submission_date: currentTimestamp,
                    awarded: dailyTask && state === 1 ? 1 : null
                });

                if (state === 1) {
                    await this.IncreaseExperiencePoints(userId, taskId);
                    if (dailyTask) {
                        await this.IncreaseCurrencyCount(userId);
                    }
                }
    
                return newSolution;
            } else {
                if (state === 1) {
                    if (existingSolution.state === 1) {
                        await Task_solutions.update(
                            { submission_date: currentTimestamp },
                            { where: { UserId: userId, task_id: taskId } }
                        );
                    } else {
                        await Task_solutions.update(
                            { state: 1, submission_date: currentTimestamp },
                            { where: { UserId: userId, task_id: taskId } }
                        );
                        await this.IncreaseExperiencePoints(userId, taskId);
                    }
                    if (dailyTask && !existingSolution.awarded) {
                        await this.IncreaseCurrencyCount(userId);
                        await Task_solutions.update(
                            { awarded: 1 },
                            { where: { UserId: userId, task_id: taskId } }
                        );
                    }
    
                    return { state: 1, message: "Solution is correct." };
                } else {
                    return { state: 0, message: "Solution is incorrect." };
                }
            }
        } catch (error) {
            throw error;
        }
    },
    
    async CheckIfAwarded(userId, taskId) {
        const result = await db.Task_solutions.findOne({
            where: {
                UserId: userId,
                task_id: taskId,
                awarded: 1
            }
        });
        return result !== null;
    }
,    
    
    //megnezi, hogy az adott task napi feladat-e (true/false)
    async CheckIfDailyTask(taskId){
        const val = await db.Daily_Tasks.findOne({
            where:{
                task_id:taskId
            }
        });
        return val != null;
    },
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
    //noveljuk a user currency_countjat (mindig 10-el napi task megoldasajert ennyi jar) 
    async IncreaseCurrencyCount(userId){
        return await db.Users.increment('currency_count',{
            by: 10,
            where:{
                id:userId
            }
        });
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


      async getDailyTaskStreak(userId) {
        const result = await Task_solutions.findAll({
            where: { UserId: userId, state: 1 },
            attributes: ['submission_date'],
            include: [
                {
                    model: db.Tasks,
                    attributes: ['id'],
                    required: true,
                    include: [
                        {
                            model: db.Daily_Tasks,
                            attributes: ['id'],
                            required: true
                        }
                    ]
                }
            ],
            order:[["submission_date","ASC"]]
        });
        return await this.ComputeStreak(userId,result.map(task => task.dataValues));
    },

    async ComputeStreak(userId, solution) {
        let streak = await this.getStreak(userId);
        let longestStreak = await this.getMaxStreak(userId);
        let missedDays = 0;

        solution.sort((a, b) => a.Task.Daily_Task.id - b.Task.Daily_Task.id);
        
        let taskIds = solution.map(item => item.Task.Daily_Task.id);
        
        let prevTaskId = null;

        taskIds.forEach(currentTaskId => {
            if (prevTaskId === null) {
                streak = 1;
                longestStreak = 1;
            } else {
                const taskDifference = currentTaskId - prevTaskId;
                if (taskDifference === 1) {
                    streak++;
                    longestStreak = Math.max(longestStreak, streak);
                } else if (taskDifference > 1) {
                    missedDays += taskDifference - 1;
                    streak = 1;
                }
            }
            prevTaskId = currentTaskId;
        });
    
        return { streak: streak, longestStreak: longestStreak, missedDays: missedDays };
    },
    async getStreak(userId) {
        const user = await db.Users.findOne({
            where: { id: userId },
            attributes: ['streak'],
            raw: true
        });
        return user ? user.streak : 0;
    },
    
    async getMaxStreak(userId) {
        const user = await db.Users.findOne({
            where: { id: userId },
            attributes: ['max_streak'],
            raw: true
        });
        return user ? user.max_streak : 0;
    },

    async getAllTimeMaxStreak(userId){
        const user = await db.Users.findOne({
            where:{
                id:userId
            },
            attributes:['all_TimeMax'],
            raw:true
        });
        return user ? user.all_TimeMax : 0;
    }
};    


module.exports = task_solutionRepository;
