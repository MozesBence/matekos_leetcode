const express = require('express');
const router = express.Router();
const { getTaskState,getCompletionRate,getSolvedTasksRate,getTasksByCompletionState } = require('../controllers/task_solutionsController');

router.get('/taskState/:id', getTaskState);
router.get('/tasks/task-completion-rates', getCompletionRate);
router.get('/solved-tasks-rate/:id', getSolvedTasksRate);
router.get('/task-by-completion-state/:state/:userId', getTasksByCompletionState);

module.exports = router;
