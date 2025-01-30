const express = require('express');
const router = express.Router();
const { getCardInfo, getSpecificCard, getTaskCount } = require('../controllers/tasksController');

router.get('/get-cards-info/:offset', getCardInfo);
router.get('/get-one-card/:id',getSpecificCard)
router.get('/taskCount',getTaskCount);
module.exports = router;

