const express = require('express');
const router = express.Router();
const { getDailyTask,CheckIfDailyTask } = require('../controllers/daily_taskController');

/**
 * @swagger
 * /get-daily-task/:id:
 *   get:
 *     summary: Napi feladat
 *     tags:
 *       - Dilay tasks
 *     description: Napi feladat lekérése 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: A napi feladat azonosítója
 *           example: 1
 *     responses:
 *       201:
 *         description: Sikeres regisztráció
 *         content:
 *           application/json:
 *              example:
 *                  task_id: "1"
 *       400:
 *         description: Hiba a felhasználó regisztrálása közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült a regisztráció!"
 */
router.get('/get-daily-task/:id', getDailyTask);

/**
 * @swagger
 * /checkIfDailyTask/:taskid:
 *   get:
 *     summary: Napi feladat ellenörzés
 *     tags:
 *       - Dilay tasks
 *     description: Leellenörzi hogy a feladat az a napi feladatok között bent van-e
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *           description: A feladat id-ja
 *           example: 1
 *     responses:
 *       201:
 *         description: Sikeres regisztráció
 *         content:
 *           application/json:
 *              example:
 *                  message: "A felhasználó regisztrálva lett és az email el lett küldve!"
 *       400:
 *         description: Hiba a felhasználó regisztrálása közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült a regisztráció!"
 */
router.get('/checkIfDailyTask/:taskid', CheckIfDailyTask)

module.exports = router;