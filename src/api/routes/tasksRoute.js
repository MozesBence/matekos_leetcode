const express = require('express');
const router = express.Router();
const { getCardInfo, getSpecificCard, getTaskCount, getRandomTask, getFilteredTasks,getsimilarTasks,getSolution,submitTask,getUnvalidatedTasks, updateTaskValidationState} = require('../controllers/tasksController');

router.get('/get-cards-info/:offset', getCardInfo);

router.get('/get-one-card/:id',getSpecificCard)

router.get('/taskCount',getTaskCount);

router.get('/random-task',getRandomTask);

router.get('/filteredTasks', getFilteredTasks);

router.get('/getsimilarTasks',getsimilarTasks);

router.get('/solution/:id',getSolution);

router.get('/unvalidatedTasks',getUnvalidatedTasks)

router.post('/validateTask/',updateTaskValidationState)

router.post('/submitTask',submitTask);

module.exports = router;
