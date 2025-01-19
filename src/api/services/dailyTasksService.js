const { Op } = require('sequelize');
const { DailyTasks, Tasks } = require('../models'); 
const sequelize = require('../models').sequelize; 

function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate(); 
}


async function assignDailyTasks() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    console.log('Checking if tasks are already assigned for this month');

    const existingTasks = await DailyTasks.findOne({
        where: {
            expire_date: {
                [Op.gte]: new Date(currentYear, currentMonth - 1, 1),
                [Op.lte]: new Date(currentYear, currentMonth, 0, 23, 59, 59),
            },
        },
    });

    if (existingTasks) {
        console.log("Daily tasks for this month already assigned.");
        return;
    }

    console.log('No tasks found for this month. Proceeding to assign tasks.');

    const tasks = await Tasks.findAll();

    if (tasks.length === 0) {
        console.log("No tasks found in the database.");
        return;
    }

    console.log(`Found ${tasks.length} tasks. Assigning tasks for the month.`);

    const shuffledTasks = shuffleArray(tasks);

    const transaction = await sequelize.transaction();

    try {
        let currentDate = new Date(currentYear, currentMonth - 1, 1);

        for (let day = 1; day <= daysInMonth; day++) {
            const task = shuffledTasks[(day - 1) % shuffledTasks.length];

            const expireDate = new Date(currentDate);
            expireDate.setHours(23, 59, 59, 999);

            await DailyTasks.create({
                task_id: task.id,
                expire_date: expireDate,
            }, { transaction });

            currentDate.setDate(currentDate.getDate() + 1);
        }

        await transaction.commit();
        console.log("Daily tasks for this month successfully assigned.");
    } catch (error) {
        await transaction.rollback();
        console.log("Error assigning daily tasks:", error);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

module.exports = { assignDailyTasks };
