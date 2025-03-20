const express = require('express');
const router = express.Router();
const { getDailyTask,CheckIfDailyTask } = require('../controllers/daily_taskController');

router.get('/get-daily-task/:id', getDailyTask);

router.get('/checkIfDailyTask/:taskid', CheckIfDailyTask)

module.exports = router;