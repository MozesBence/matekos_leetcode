const express = require('express');
const router = express.Router();
const { getTaskState,getCompletionRate,getSolvedTasksRate,getTasksByCompletionState,submitSolution,monthlySolvingRate,mostRecentlyTriedTask,getDailyTaskStreak} = require('../controllers/task_solutionsController');
const { verifyToken } = require("../middlewares/profileAuth");

router.get('/taskState/:id', getTaskState);
router.get('/tasks/task-completion-rates', getCompletionRate);
router.get('/solved-tasks-rate/:id', getSolvedTasksRate);
router.get('/task-by-completion-state/:state/:userId', getTasksByCompletionState);
router.post("/submit-solution/:data", submitSolution); 
router.get('/monthlySolvingRate',monthlySolvingRate)
router.get('/mostRecentlyTriedTask',mostRecentlyTriedTask)
router.get('/dailyTaskStreak',getDailyTaskStreak)

module.exports = router;
