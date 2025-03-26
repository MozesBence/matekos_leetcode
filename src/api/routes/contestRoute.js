const express = require("express");

const route = express.Router();

const contestController = require("../controllers/contestController");

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

route.get("/contest/challange", contestController.getChallange);

module.exports = route;