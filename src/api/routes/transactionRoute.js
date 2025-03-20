const express = require('express');
const router = express.Router();
const {purchaseItem} = require('../controllers/transactionController')
router.post('/purchaseItem',purchaseItem)

module.exports = router;