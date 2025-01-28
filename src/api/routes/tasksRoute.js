const express = require('express');
const router = express.Router();
const { getCardInfo, getSpecificCard } = require('../controllers/tasksController');

router.get('/get-cards-info', getCardInfo);
router.get('/get-one-card/:id',getSpecificCard)
module.exports = router;

