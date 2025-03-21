const express = require('express');
const router = express.Router();
const {purchaseItem} = require('../controllers/transactionController')

/**
 * @swagger
 * /purchaseItem:
 *   post:
 *     summary: Termékek megvétele
 *     tags:
 *       - Purchase items
 *     description: áruház zermékeinek megvétele
 *     responses:
 *       201:
 *         description: Sikeres termék váráslás
 *         content:
 *           application/json:
 *              example:
 *                  user: "{id:1, UserId: 1, date: '2025-03-20 21:18:57', currency: 'gold', itemId: 1, amount: 100, createdAt: '2025-03-20 21:18:58', updatedAt: '2025-03-20 21:18:58'}"
 *       400:
 *         description: Hiba a termék váráslása közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült megvásárolni az adott terméket!"
 */
router.post('/purchaseItem',purchaseItem)

module.exports = router;