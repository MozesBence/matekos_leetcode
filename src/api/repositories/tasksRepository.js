const { number } = require('zod');
const { Sequelize } = require('sequelize');
const db = require('../database/dbContext');
const { Tasks,Themes,Task_solutions } = db;
const { Op } = require('sequelize');
const { isConstructorDeclaration } = require('typescript');
const { stat } = require('fs');

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
  
  async getFilteredTasks({ difficulty, search, themes, state, userId, offset }) {
    try {
        const whereClause = {};

        if (themes && typeof themes === 'string') {
            themes = themes.split(';').map(t => t.trim());
        }

        if (difficulty !== undefined) {
            whereClause.difficulty = difficulty;
        }

        if (search) {
            whereClause.task_title = { [Op.like]: `%${search}%` };
        }

        let themeTaskIds = null;
        if (themes && themes.length > 0) {
            const themesWithTasks = await db.Themes.findAll({
                where: { theme: { [Op.in]: themes } },
                include: {
                    model: db.Tasks,
                    attributes: ['id'],
                }
            });
            themeTaskIds = themesWithTasks.flatMap(theme => theme.Tasks.map(task => task.id));
        }

        let stateTaskIds = null;
        if (state !== undefined && userId) {
            if (state == 2) {
                const solvedTaskIds = await db.Task_solutions.findAll({
                    where: { UserId: userId },
                    attributes: ['task_id'],
                    group: ['task_id']
                });
                stateTaskIds = solvedTaskIds.map(ts => ts.task_id);

                stateTaskIds = await db.Tasks.findAll({
                    where: { id: { [Op.notIn]: stateTaskIds } },
                    attributes: ['id'],
                }).then(tasks => tasks.map(task => task.id));

            } else {
                const solvedTasks = await db.Task_solutions.findAll({
                    where: { state: state, UserId: userId },
                    attributes: ['task_id']
                });
                stateTaskIds = solvedTasks.map(ts => ts.task_id);
            }
        }

        let finalTaskIds = null;
        if (themeTaskIds !== null && stateTaskIds !== null) {
            finalTaskIds = themeTaskIds.filter(id => stateTaskIds.includes(id));
        } else if (themeTaskIds !== null) {
            finalTaskIds = themeTaskIds;
        } else if (stateTaskIds !== null) {
            finalTaskIds = stateTaskIds;
        }

        if (finalTaskIds !== null) {
            whereClause.id = { [Op.in]: finalTaskIds };
        }

        const tasks = await db.Tasks.findAll({
            where: Object.keys(whereClause).length > 0 ? whereClause : {},
            order: [['id', 'ASC']],
            limit: 15,
            attributes:['id','theme_id','difficulty','task_title'],
            offset: Number(offset) || 0,
        });

        return tasks;

    } catch (error) {
        console.error('Error fetching filtered tasks:', error);
        throw error;
    }
}



};

module.exports = tasksRepository;
