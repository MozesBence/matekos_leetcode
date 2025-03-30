const {useWayBackToken,deactivateToken,checkToken} = require('../controllers/token_redeemController')
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
 *                  response: {success: true, data: { state: active, submission_date, 2025-03-27T23:01:55.650Z, user_id: 2, task_id: 3}, created: true}
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
 *     summary: Visszaállítási token deaktiválása
 *     tags:
 *       - Token redeem
 *     description: Visszaállítási token használata után deaktiválja a tokent hogy ne tudja használni újra
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/deactivate-token'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/deactivate-token'
 *     responses:
 *       201:
 *         description: Sikeres módosítás
 *         content:
 *           application/json:
 *              example:
 *                  response: true
 *       400:
 *         description: Hiba a visszaállítási token állapotán változtatni
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem a sikerült visszaállítási token állapotán változtatni!"
 * 
 * components:
 *   schemas:
 *     deactivate-token:
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

/**
 * @swagger
 * /check-token:
 *   get:
 *     summary: Token ellenörzés
 *     tags:
 *       - Token redeem
 *     description: Token ellenörzés
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *           description: Feladat azonosítója
 *           example: 1
 *       - in: query
 *         name: taskId
 *         required: true
 *         schema:
 *           type: number
 *           description: Feladat azonosítója
 *           example: 1
 *     responses:
 *       200:
 *         description: Sikeres token ellenörzés lekérése
 *         content:
 *           application/json:
 *              example:
 *                  response: {taskId: true} 
 *       400:
 *         description: Hiba az token ellenörzése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült ellenőrizni a tokent!"
 */
router.get('/check-token',checkToken)

module.exports = router;