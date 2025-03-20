const express = require('express');
const router = express.Router();
const {getItems} = require('../controllers/storeItemsController')
router.get('/getItems',getItems)
module.exports = router;