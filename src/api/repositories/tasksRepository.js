const { number } = require('zod');
const { Sequelize } = require('sequelize');
const db = require('../database/dbContext');
const { Tasks,Themes,Task_solutions } = db;
const { Op } = require('sequelize');
const { isConstructorDeclaration } = require('typescript');

const tasksRepository = {
  
  async getCardInfo(offset) {
    
    if(!Tasks){
        return 'nem task'
    }
    try {
      return await Tasks.findAll({
        distinct: true,
        order: [['id', 'ASC']],
        offset: number().int().parse(offset),
        limit: 15,
      });
    } catch (error) {
      console.error('Error fetching cards:', error);
      throw error;
    }
  },
  async getSpecificCard(id) {
    try {
      return await Tasks.findOne({
        where: {
          id: id
        }
      });
    } catch (error) {
      console.error('Error fetching specific card:', error);
      throw error;
    }
  },

  async getTaskCount(){
    try{
      return await Tasks.count();
    }catch(error){
      console.error('Error fetching specific card count:', error);
      throw error;
    }
  },
  async getRandomTask() {
    return await Tasks.findOne({
      attributes: ['id'],
      order: [Sequelize.fn('RAND')],
      limit: 1
    });
  },

  async getTaskWithSearch (characters){
    return await Tasks.findAll({
      where: {
        task_title: {
          [Op.like]: `%${characters.toLowerCase()}%`
        }
      },
      order: [['id', 'ASC']],
      limit: 15
    });
  },

  async getTasksByDifficult(difficulty_value){
    return await Tasks.findAll({
      order:[['id','ASC']],
      limit:15,
      where:{
        difficulty: difficulty_value
      }
    })
  },

  async getTaskByThemes(themeNames) {
    const themesWithTasks = await db.Themes.findAll({
      where: {
        theme: themeNames
      },
      attributes: ['id', 'theme'],
      include: {
        model: db.Tasks
      }
    });
  
    const tasks = themesWithTasks.reduce((acc, theme) => {
      return acc.concat(theme.Tasks);
    }, []);
  
    return tasks;
  },
  
  async getFilteredTasks({ difficulty, search, themes, state, userId }) {
    try {
        let whereClause = {};
        if (difficulty !== undefined) {
            whereClause.difficulty = difficulty;
        }

        if (search) {
            whereClause.task_title = { [Op.like]: `%${search.toLowerCase()}%` };
        }

        let taskIdsFromThemes = [];
        if (themes && themes.length > 0) {
            const themesWithTasks = await db.Themes.findAll({
                where: { theme: { [Op.in]: themes } },
                include: {
                    model: db.Tasks,
                    attributes: ['id'],
                }
            });

            taskIdsFromThemes = themesWithTasks.flatMap(theme => theme.Tasks.map(task => task.id));
        }

        let taskIdsFromState = [];
        if (state !== undefined && userId) {
            if (state == 2) {
              console.log('2ben')
                const solvedTaskIds = await db.Task_solutions.findAll({
                    attributes: ['task_id'],
                    group: ['task_id']
                });
                taskIdsFromState = solvedTaskIds.map(ts => ts.task_id);
                console.log(taskIdsFromState)
            } else {
                console.log('masikba')
                // Solved tasks (in task_solutions)
                const solvedTasks = await db.Task_solutions.findAll({
                    where: { state: state, UserId: userId },
                    attributes: ['task_id']
                });
                taskIdsFromState = solvedTasks.map(ts => ts.task_id);
                console.log(taskIdsFromState)
            }
        }
        let finalTaskIds = null;
        if (taskIdsFromThemes.length > 0 && taskIdsFromState.length > 0) {
            finalTaskIds = taskIdsFromThemes.filter(id => taskIdsFromState.includes(id));
        } else if (taskIdsFromThemes.length > 0) {
            finalTaskIds = taskIdsFromThemes;
        } else if (taskIdsFromState.length > 0) {
            finalTaskIds = taskIdsFromState;
        }

        if (finalTaskIds !== null) {
            whereClause.id = { [Op.in]: finalTaskIds };
        }

        return await Tasks.findAll({
            where: whereClause,
            order: [['id', 'ASC']],
            limit: 15
        });

    } catch (error) {
        console.error('Error fetching filtered tasks:', error);
        throw error;
    }
}

};

module.exports = tasksRepository;
