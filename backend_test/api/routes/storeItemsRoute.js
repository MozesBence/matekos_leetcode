const express = require('express');
const router = express.Router();
const {getItems} = require('../controllers/storeItemsController')

/**
 * @swagger
 * /getItems:
 *   get:
 *     summary: Áruház termékei
 *     tags:
 *       - Store Items
 *     description: Áruház termékeinek lekérése
 *     responses:
 *       200:
 *         description: Sikeres lekérés
 *         content:
 *           application/json:
 *              example:
 *                  user: "{id: 1, name: 'Teszt termék név', description: 'Teszt leírás', picture: '{kép tömörített base64 értéke}', price: 1500, amoun: 10}"
 *       400:
 *         description: Hiba a áruház termékeinek lekérése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni az áruház termékeit!"
 */
router.get('/getItems',getItems)

module.exports = router;