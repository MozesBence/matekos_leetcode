const { number } = require('zod');
const { Sequelize } = require('sequelize');
const db = require('../database/dbContext');
const { Tasks,Themes,Task_solutions, Users, User_customization, Notification } = db;
const { Op } = require('sequelize');
const { isConstructorDeclaration, isAwaitKeyword } = require('typescript');
const { stat } = require('fs');
const { ADDRGETNETWORKPARAMS } = require('dns');
const { update } = require('lodash');

const tasksRepository = {
  
  async getsimilarTasks(taskId, themeId) {
    try {
      return await Tasks.findAll({
        where: {
          theme_id: themeId,
          validated: 1,
          id: { [Op.ne]: taskId }
        },
        order: [['id', 'ASC']],
        attributes: ['id', 'theme_id', 'difficulty', 'task_title'],
        limit: 15,
      });
    } catch (error) {
      console.error('Error fetching similar tasks:', error);
      throw error;
    }
  },
  async getSpecificCard(id) {
    try {
      const task = await Tasks.findOne({
        where: {
          id: id
        },
        attributes:['id','theme_id','theme_id','creator_id','difficulty','experience_points','task_title','task','solution_format','first_hint','second_hint'],
        include: [{
          model: Users,
          as: 'creator',
          attributes: ["id","user_name"],
          include: [{
            model: User_customization,
            required: false,
            attributes: ["profil_picture"],
          }],
          required: false
        }]
      });
      if (task.creator && task.creator.User_customization.profil_picture != null) {
        const profileProfPicBuffer = task.creator.User_customization.profil_picture;
                    
        const profileProfPicMimeType = task.creator.User_customization.profil_picture_type || 'image/jpeg';
        
        if (profileProfPicBuffer) {
          const base64Image = Buffer.from(profileProfPicBuffer).toString('base64');
          task.creator.User_customization.profil_picture = `data:${profileProfPicMimeType};base64,${base64Image}`;
        }
      }
    
      return task;
    } catch (error) {
      console.error('Error fetching specific card:', error);
      throw error;
    }
  },

  async getTaskCount({ difficulty, search, themes, state, userId }) {
    try {
        const whereClause = {validated:1};

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
                    where:{
                      validated: 1,
                    },
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
                  where: { id: { [Op.in]: stateTaskIds }, validated: 1 },
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

        return await db.Tasks.count({
            where: Object.keys(whereClause).length > 0 ? whereClause : {},
        });

    } catch (error) {
        console.error('Error fetching task count:', error);
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
        const whereClause = {validated:1};

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
                where: { validated: 1 },  
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
                    where: { id: { [Op.notIn]: stateTaskIds },validated:1 },
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
},

async getSolution(id){
  return await Tasks.findOne({
    where:{
      id: id
    },
    attributes:['solution']
  })

},

async submitTask({taskTitle,task,themeId,solution,difficulty,creatorId,experiencePoints,solutionFormat,hint1,hint2,validated}){
  return await Tasks.create({
    theme_id:themeId,
    solution:solution,
    difficulty:difficulty,
    creator_id:creatorId,
    experience_points:experiencePoints,
    task_title:taskTitle,
    task:task,
    solution_format:solutionFormat,
    first_hint:hint1,
    second_hint:hint2,
    validated:validated
  });
},
async getUnvalidatedTasks(){
  const tasks = await Tasks.findAll({
    where: {
      validated: 0
    },
    include: [{
      model: Users,
      as: 'creator',
      attributes: ["id","user_name"],
      include: [{
        model: User_customization,
        required: false,
        attributes: ["profil_picture"],
      }],
      required: false
    }]
  });

  tasks.forEach(user =>{
    if (user.creator && user.creator.User_customization.profil_picture != null) {
      const profileProfPicBuffer = user.creator.User_customization.profil_picture;
                  
      const profileProfPicMimeType = user.creator.User_customization.profil_picture_type || 'image/jpeg';
      
      if (profileProfPicBuffer) {
        const base64Image = Buffer.from(profileProfPicBuffer).toString('base64');
        user.creator.User_customization.profil_picture = `data:${profileProfPicMimeType};base64,${base64Image}`;
      }
    }
  });

  return tasks;
},
async updateTaskValidationState(taskId, validity, user_id, from_user_id, message) {
  try{
    if (validity == '0') {
      this.deleteTaskFromTasks(taskId);
    }else{
      this.updateToValidated(taskId);
    }

    await Notification.create({
      type: 0,
      notif_content: message,
      content_type: 0,
      content_id: null,
      closed: 1,
      user_id: user_id,
      from_user_id: from_user_id
    })

    return 'OK'
  }catch(error){
    throw error;
  }

},


async updateToValidated(taskId) {
  return Tasks.update(
    { validated: 1 },
    { where: { id: taskId } }
  );
},

async deleteTaskFromTasks(taskId) {
  return Tasks.destroy({
    where: { id: taskId }
  });
}


};

module.exports = tasksRepository;
