const express = require('express');
const router = express.Router();
const { getDailyTask,CheckIfDailyTask } = require('../controllers/daily_taskController');

/**
 * @swagger
 * /get-daily-task/:id:
 *   get:
 *     summary: Napi feladat
 *     tags:
 *       - Daily tasks
 *     description: Napi feladat lekérése 
 *     parameters:
 *       - in: headers
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           description: A felhasználó tokenizált azonosítója
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpbnRlYWRhbmk4OEBnbWFpbC5jb20iLCJpYXQiOjE3NDI0NjY4NjcsImV4cCI6MTc0MjQ3MDQ2N30.eAv8ZrTREgFFY2U8AK_hUy3mFbbJEQc_eGcQ6VZCP6c
 *     responses:
 *       200:
 *         description: Sikeres lekérés
 *         content:
 *           application/json:
 *              example:
 *                  task_id: "1"
 *       400:
 *         description: Hiba a napi feladat lekérése közben!
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült a lekérni a napi feladatot!"
 */
router.get('/get-daily-task/:id', getDailyTask);

/**
 * @swagger
 * /checkIfDailyTask/:taskid:
 *   get:
 *     summary: Napi feladat ellenörzés
 *     tags:
 *       - Daily tasks
 *     description: Leellenörzi hogy a feladat az a napi feladatok között bent van-e
 *     parameters:
 *       - in: path
 *         name: taskid
 *         required: true
 *         schema:
 *           type: integer
 *           description: A feladat azonosítója
 *           example: 1
 *     responses:
 *       200:
 *         description: Sikeres ellenörzés
 *         content:
 *           application/json:
 *              example:
 *                  task: "{id: 1, theme_id: 1, solution: 'megoldás', creator_id: null, difficulty: 1, experience_points: 10, task_title: Teszt feladat, solution_format: Egész szám, first_hint: 'Első segítség', second_hint: 'Második segítség', validated: null, CompetitionID: null}"
 *       400:
 *         description: Hiba a feladat ellenörzése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült leellenőrizni a feladatot!"
 */
router.get('/checkIfDailyTask/:taskid', CheckIfDailyTask)

module.exports = router;