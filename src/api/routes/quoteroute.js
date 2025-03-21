const express = require('express')
const route = express.Router();
const {getQuote} = require('../controllers/quoteController')

/**
 * @swagger
 * /request-quote:
 *   get:
 *     summary: Napi idézet
 *     tags:
 *       - Daily quote
 *     description: Napi idézet lekérése
 *     responses:
 *       200:
 *         description: Sikeres lekérés
 *         content:
 *           application/json:
 *              example:
 *                  user: "{id: 1, quote: 'Teszt idézet'}"
 *       400:
 *         description: Hiba a felhasználó adatainak lekérése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a napi idézetet!"
 */
route.get('/request-quote',getQuote)

module.exports = route;