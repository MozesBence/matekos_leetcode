const express = require('express');
const router = express.Router();
const { getTaskState,getCompletionRate,getSolvedTasksRate,getTasksByCompletionState,submitSolution,monthlySolvingRate,mostRecentlyTriedTask,getDailyTaskStreak} = require('../controllers/task_solutionsController');
const { verifyToken } = require("../middlewares/profileAuth");

/**
 * @swagger
 * /taskState/:id:
 *   get:
 *     summary: Feladat készenléti állapota
 *     tags:
 *       - Tasks solutions
 *     description: Feladat készenléti állapot lekérése
 *     parameters:
 *       - in: params
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           description: Felhasználó azonosítója
 *           example: 1
 *     responses:
 *       200:
 *         description: Sikeres információ lekérése
 *         content:
 *           application/json:
 *              example:
 *                  task: {task_id: 1, state: 1}
 *       400:
 *         description: Hiba az információ lekérésben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a feladat készenléti állapotát!"
 */
router.get('/taskState/:id', getTaskState);

/**
 * @swagger
 * /tasks/task-completion-rates:
 *   get:
 *     summary: Feladatok teljesítési aránya
 *     tags:
 *       - Tasks solutions
 *     description: Feladatok teljesítési aránya lekérése
 *     responses:
 *       200:
 *         description: Sikeres lekérés
 *         content:
 *           application/json:
 *              example:
 *                  task: {task_id: 1, totalTasks: 10, completedTasks: 2}
 *       400:
 *         description: Hiba a teljesítési aránya lekérésben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a feladatok teljesítési arányát!"
 */
router.get('/tasks/task-completion-rates', getCompletionRate);

/**
 * @swagger
 * /solved-tasks-rate/:id:
 *   get:
 *     summary: Teljesítésitett feladatok aránya
 *     tags:
 *       - Tasks solutions
 *     description: Teljesítésitett feladatok arányának lekérése
 *     parameters:
 *       - in: params
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           description: Felhasználó azonosítója
 *           example: 1
 *     responses:
 *       200:
 *         description: Sikeres lekérés
 *         content:
 *           application/json:
 *              example:
 *                  task: {userId: 1, totalTasks: 10, completedTasks: 2, completedTasksArray: [1], solvedRate: 20, countpercenct: [id: 1, difficulty: 1]}
 *       400:
 *         description: Hiba a teljesítésitett feladatok arányának lekérésben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a teljesítésitett feladatok arányát!"
 */
router.get('/solved-tasks-rate/:id', getSolvedTasksRate);

/**
 * @swagger
 * /task-by-completion-state/:state/:userId:
 *   get:
 *     summary: Kész feladatok készenlét alapján
 *     tags:
 *       - Tasks solutions
 *     description:  Kész feladatok készenlét alapján lekérése
 *     parameters:
 *       - in: params
 *         name: state
 *         required: true
 *         schema:
 *           type: number
 *           description: Feladat készenléti állapota
 *           example: 1
 *       - in: params
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *           description: Felhasználó azonosítója
 *           example: 1
 *     responses:
 *       200:
 *         description: Sikeres lekérés
 *         content:
 *           application/json:
 *              example:
 *                  task_id: [1,4]
 *       400:
 *         description: Hiba a feladatok lekérésben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a feladatokat!"
 */
router.get('/task-by-completion-state/:state/:userId', getTasksByCompletionState);

/**
 * @swagger
 * /submit-solution/:data:
 *   post:
 *     summary: Feladat ellenőrzés
 *     tags:
 *       - Tasks solutions
 *     description: Feladat elfogadása / elutasítása
 *     parameters:
 *       - in: params
 *         name: data
 *         required: true
 *         schema:
 *           type: string
 *           description: Felhasználó azonosítója, a feladat azonosítója és a beküldött megoldás
 *           example: "1;1;120"
 *     responses:
 *       201:
 *         description: Sikeres ellenörzés
 *         content:
 *           application/json:
 *              example:
 *                  response: { state: 1, message: "Solution is correct." }
 *       400:
 *         description: Hiba a feladat engedélyezése / elutasítása közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem a sikerült feladat engedélyezése / elutasítása!"
 */
router.post("/submit-solution/:data", submitSolution);

/**
 * @swagger
 * /monthlySolvingRate:
 *   get:
 *     summary: Feladatok teljesítése aránya havonta
 *     tags:
 *       - Tasks solutions
 *     description: Feladatok teljesítése aránya havi lekérése
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *           description: Felhasználó azonosítója
 *           example: 1
 *     responses:
 *       200:
 *         description: Sikeres lekérés
 *         content:
 *           application/json:
 *              example:
 *                  response: [{month: 1, solutionCount: 10}]
 *       400:
 *         description: Hiba a lekérés közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a havi teljesítési arányt!"
 */
router.get('/monthlySolvingRate',monthlySolvingRate);

/**
 * @swagger
 * /mostRecentlyTriedTask:
 *   get:
 *     summary: Legtöbbször megpróbált feladat
 *     tags:
 *       - Tasks solutions
 *     description:  Legtöbbször megpróbált feladat lekérése
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *           description: Felhasználó azonosítója
 *           example: 1
 *     responses:
 *       200:
 *         description: Sikeres lekérés
 *         content:
 *           application/json:
 *              example:
 *                  response: {id: 1, task_title: 'Teszt feladat cím', difficulty: 1, submission_date: '2025-03-27 8:11', task_id: 1, UserId: 1, state: 0}
 *       400:
 *         description: Hiba a lekérés közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a havi teljesítési arányt!"
 */
router.get('/mostRecentlyTriedTask',mostRecentlyTriedTask);

/**
 * @swagger
 * /dailyTaskStreak:
 *   get:
 *     summary: Napi sorozat
 *     tags:
 *       - Tasks solutions
 *     description: Napi sorozat adainak lekérése
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *           description: Felhasználó azonosítója
 *           example: 1
 *     responses:
 *       200:
 *         description: Sikeres lekérés
 *         content:
 *           application/json:
 *              example:
 *                  response: {streak:10,longestStreak:20,missedDays:4}
 *       400:
 *         description: Hiba a lekérés közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a napi srozoat adatait!"
 */
router.get('/dailyTaskStreak',getDailyTaskStreak);

module.exports = router;
