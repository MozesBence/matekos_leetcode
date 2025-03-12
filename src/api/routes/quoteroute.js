const express = require('express')
const route = express.Router();
const {getQuote} = require('../controllers/quoteController')

route.get('/request-quote',getQuote)

module.exports = route;