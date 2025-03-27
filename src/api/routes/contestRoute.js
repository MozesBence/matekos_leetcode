const express = require("express");

const route = express.Router();

const contestController = require("../controllers/contestController");

const profileAuth = require("../middlewares/profileAuth");

/**
 * @swagger
 * /contest/leader-board:
 *   get:
 *     summary: Ranglista
 *     tags:
 *       - Contest
 *     description: Ranglista lekérése
 *     responses:
 *       200:
 *         description: Sikeres ranglista lekérés
 *         content:
 *           application/json:
 *              example:
 *                  leader_board: [{id:1, user_name: 'Teszt_felhasználó_1',experience_point: 15}, {id:2, user_name: 'Teszt_felhasználó_2',experience_point: 0}]
 *       400:
 *         description: Hiba a ranglista lekérésben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a ranglistát!"
 */
route.get("/contest/leader-board", contestController.getLeaderBoard);

/**
 * @swagger
 * /contest/challange:
 *   get:
 *     summary: Verseny feladatok
 *     tags:
 *       - Contest
 *     description: Verseny feladatok lekérése hó / hét
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           description: A feladat azonosítója
 *           example: 1
 *       - in: query
 *         name: define
 *         required: true
 *         schema:
 *           type: string
 *           description: A feladat megnevezése ('week' / 'month')
 *           example: 'week'
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           description: A felhasználó tokenizált azonosítója
 *           example: 'week'
 *     responses:
 *       200:
 *         description: Sikeres feladat lekérés
 *         content:
 *           application/json:
 *              example:
 *                  challange: {id: 1, identifier: 13, define: 'week', Tasks: [{id:1, CompetitionID: null, competition_tasks: {id: 1, task_id: 2, competition_id: 13}, creator_id: null, difficulty: 2, experience_points: 25,first_hint: "Próbáld megtalálni az egész gyököket az osztók segítségével.",id: 2,second_hint: "A lehetséges gyökök a konstans tag osztói (±1, ±2, ±3, ±6).",solution: "1 2 3",solution_format: "Három szám szóközzel",task: "Oldd meg valós számok halmazán: $x^3 - 6x^2 + 11x - 6 = 0$",task_title: "Harmadfokú egyenlet",theme_id: 3validated,: 1 }] }
 *       400:
 *         description: Hiba a feadat lekérésében
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a feladatot!"
 */
route.get("/contest/challange", contestController.getChallange);

/**
 * @swagger
 * /contest/prev-challange:
 *   get:
 *     summary: Előző versenyek
 *     tags:
 *       - Contest
 *     description: Előző versenyek és feladatok lekérése hó / hét
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           description: A felhasználó tokenizált azonosítója
 *           example: 'week'
 *     responses:
 *       200:
 *         description: Sikeres feladatok lekérése
 *         content:
 *           application/json:
 *              example:
 *                  challanges: [{id: 13, identifier: 13,  define: 'week', Competetins_submissions: []}]
 *       400:
 *         description: Hiba a feladatok lekérésben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a feladatokat!"
 */
route.get("/contest/prev-challange", contestController.getPrevChallange);

/**
 * @swagger
 * /contest/upload-solution:
 *   post:
 *     summary: Verseny feladatok ellenörzése
 *     tags:
 *       - Contest
 *     description: Verseny feladatok ellenörzése
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/upload-solution'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/upload-solution'
 *     responses:
 *       201:
 *         description: Sikeres ellenörzés
 *         content:
 *           application/json:
 *              example:
 *                  message: "Feltöltve!"
 *       400:
 *         description: Hiba az ellenörzés közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a feladatokat!"
 * 
 * components:
 *   schemas:
 *     upload-solution:
 *       type: object
 *       required:
 *         - data
 *         - comp_id
 *       properties:
 *         data:
 *           type: Array
 *           description: Feladat azonosítója és a hozzá adott megoldás
 *           example: [id: 1, solution: "k < 2"]
 *         comp_id:
 *           type: number
 *           description: A Verseny azonosítója
 *           example: 1
 */
route.post("/contest/upload-solution", [ profileAuth.verifyToken ],  contestController.uploadSolution);

module.exports = route;