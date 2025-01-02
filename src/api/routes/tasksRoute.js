const express = require('express');
const router = express.Router();
const { getCardInfo } = require('../controllers/tasksController');

router.get('/get-cards-info', getCardInfo);

module.exports = router;

