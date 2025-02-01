const express = require('express');
const router = express.Router();
const { getCardInfo, getSpecificCard, getTaskCount, getRandomTask, getTaskWithSearch, getTasksByDifficult} = require('../controllers/tasksController');

router.get('/get-cards-info/:offset', getCardInfo);
router.get('/get-one-card/:id',getSpecificCard)
router.get('/taskCount',getTaskCount);
router.get('/random-task',getRandomTask);
router.get('/task-with-search/:characters',getTaskWithSearch)
router.get('/task-with-difficulty/:difficulty',getTasksByDifficult)
module.exports = router;

