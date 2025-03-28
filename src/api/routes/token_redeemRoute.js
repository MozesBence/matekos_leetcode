const {useWayBackToken,deactivateToken} = require('../controllers/token_redeemController')
const express = require('express')
const router = express.Router();

/**
 * @swagger
 * /useWayBackToken:
 *   post:
 *     summary: Visszaállítási token használata
 *     tags:
 *       - Token redeem
 *     description: Visszaállítási token használata
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/use-way-back-token'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/use-way-back-token'
 *     responses:
 *       201:
 *         description: Sikeres feltöltés
 *         content:
 *           application/json:
 *              example:
 *                  response:
 *       400:
 *         description: Hiba a visszaállítási token használatának feltöltése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem a sikerült visszaállítási token használatának feltöltése!"
 * 
 * components:
 *   schemas:
 *     use-way-back-token:
 *       type: object
 *       required:
 *         - userId
 *         - taskId
 *       properties:
 *         userId:
 *           type: number
 *           description: Felhasználó azonosítója
 *           example: 1
 *         taskId:
 *           type: number
 *           description: Feladat azonosítója
 *           example: 1
 */
router.post('/useWayBackToken',useWayBackToken)

/**
 * @swagger
 * /deactivate-token:
 *   put:
 *     summary: Visszaállítási token használata
 *     tags:
 *       - Token redeem
 *     description: Visszaállítási token használata
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/use-way-back-token'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/use-way-back-token'
 *     responses:
 *       201:
 *         description: Sikeres feltöltés
 *         content:
 *           application/json:
 *              example:
 *                  response:
 *       400:
 *         description: Hiba a visszaállítási token használatának feltöltése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem a sikerült visszaállítási token használatának feltöltése!"
 * 
 * components:
 *   schemas:
 *     use-way-back-token:
 *       type: object
 *       required:
 *         - userId
 *         - taskId
 *       properties:
 *         userId:
 *           type: number
 *           description: Felhasználó azonosítója
 *           example: 1
 *         taskId:
 *           type: number
 *           description: Feladat azonosítója
 *           example: 1
 */
router.put('/deactivate-token',deactivateToken)

module.exports = router;