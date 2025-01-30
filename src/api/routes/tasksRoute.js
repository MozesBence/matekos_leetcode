const express = require('express');
const router = express.Router();
const { getCardInfo, getSpecificCard, getTaskCount, getRandomTask, getTaskWithSearch} = require('../controllers/tasksController');

router.get('/get-cards-info/:offset', getCardInfo);
router.get('/get-one-card/:id',getSpecificCard)
router.get('/taskCount',getTaskCount);
router.get('/random-task',getRandomTask);
router.get('/task-with-search/:characters',getTaskWithSearch)
module.exports = router;

