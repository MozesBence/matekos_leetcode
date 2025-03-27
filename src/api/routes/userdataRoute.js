 const express = require('express');
const router = express.Router();
const {getUserData,getRollBackTokensCount,getUserById} = require('../controllers/userdataController');

/**
 * @swagger
 * /mainpage:
 *   get:
 *     summary: Felhasználó statisztikái
 *     tags:
 *       - Main page
 *     description: Felhasználó statisztikái a főoldal megjelenítéshez
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: A felhasználó azonosítója
 *           example: 1
 *     responses:
 *       200:
 *         description: Sikeres lekérés
 *         content:
 *           application/json:
 *              example:
 *                  user: "{id: 1, user_name: 'Teszt felhasználó', email: 'example@gmail.com', password: { hash-elt jelszó}, user_role: 'member', experience_point: 150, currency_count: 60, roll_back_token: 2, admin: 0, join_date: {timestamp}, activaed: 1}"
 *       400:
 *         description: Hiba a felhasználó statisztikái lekérése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült a lekérni a felhasználó statisztikáit!"
 */
router.get('/mainpage', getUserData);
router.get('/wayBackTokens',getRollBackTokensCount)
router.get('/getUserById/:id',getUserById);
module.exports = router;