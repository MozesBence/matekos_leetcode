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
 *                  leader_board: "[{id:1, user_name: 'Teszt_felhasználó_1',experience_point: 15}, {id:2, user_name: 'Teszt_felhasználó_2',experience_point: 0}]"
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
 *     responses:
 *       200:
 *         description: Sikeres feladatok lekérés
 *         content:
 *           application/json:
 *              example:
 *                  challange: "{id: 13, define: 'week', Tasks: [{id:1, CompetitionID: null, competition_tasks: {id: 1, task_id: 2, competition_id: 13}, creator_id: null, difficulty: 2, experience_points: 25,first_hint: "Próbáld megtalálni az egész gyököket az osztók segítségével.",id: 2,second_hint: "A lehetséges gyökök a konstans tag osztói (±1, ±2, ±3, ±6).",solution: "1 2 3",solution_format: "Három szám szóközzel",task: "Oldd meg valós számok halmazán: $x^3 - 6x^2 + 11x - 6 = 0$",task_title: "Harmadfokú egyenlet",theme_id: 3validated,: 1 }] }"
 *       400:
 *         description: Hiba a ranglista lekérésben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a feladatokat!"
 */
route.get("/contest/challange", contestController.getChallange);

route.get("/contest/prev-challange", contestController.getPrevChallange);

route.post("/contest/upload-solution", [ profileAuth.verifyToken ],  contestController.uploadSolution);

module.exports = route;