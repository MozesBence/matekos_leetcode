const express = require('express');
const router = express.Router();
const { getTaskState,getCompletionRate,getSolvedTasksRate,getTasksByCompletionRate } = require('../controllers/task_solutionsController');

router.get('/taskState/:id', getTaskState);
router.get('/tasks/task-completion-rates', getCompletionRate);
router.get('/solved-tasks-rate/:id', getSolvedTasksRate);
//router.get('/task-by-completion-rate/:state',getTasksByCompletionRate)

module.exports = router;
