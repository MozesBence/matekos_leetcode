const express = require('express');
const router = express.Router();
const { getCardInfo, getSpecificCard, getTaskCount, getRandomTask, getFilteredTasks,getsimilarTasks,getSolution,submitTask} = require('../controllers/tasksController');

router.get('/get-cards-info/:offset', getCardInfo);
router.get('/get-one-card/:id',getSpecificCard)
router.get('/taskCount',getTaskCount);
router.get('/random-task',getRandomTask);
router.get('/filteredTasks', getFilteredTasks);
router.get('/getsimilarTasks/:themeid',getsimilarTasks)
router.get('/solution/:id',getSolution)
router.post('/submitTask',submitTask)



module.exports = router;
