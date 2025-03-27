const express = require('express');
const router = express.Router();
const { getAllThemesController,getThemeById } = require('../controllers/themeControllers');

/**
 * @swagger
 * /themes:
 *   get:
 *     summary: Feladat témái
 *     tags:
 *       - Themes
 *     description: Feladat témái lekérése
 *     responses:
 *       200:
 *         description: Sikeres lekérés
 *         content:
 *           application/json:
 *              example:
 *                  user: "{id: 1, theme: 'Egyenletek'}"
 *       400:
 *         description: Hiba a feladat témái lekérése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a feladat témáit!"
 */
router.get('/themes', getAllThemesController);

/**
 * @swagger
 * /getThemeById/:theme_id:
 *   get:
 *     summary: Téma
 *     tags:
 *       - Themes
 *     description: Egy feladat témájának lekérése
 *     parameters:
 *       - in: params
 *         name: theme_id
 *         required: true
 *         schema:
 *           type: intiger
 *           description: A téma azonosítója
 *           example: 1'
 *     responses:
 *       200:
 *         description: Sikeres lekérés
 *         content:
 *           application/json:
 *              example:
 *                  theme: "Bizonyítások"
 *       400:
 *         description: Hiba a feladat témája lekérése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "404"
 *                  message: "Nem sikerült lekérni a témát!"
 */
router.get('/getThemeById/:theme_id',getThemeById)

module.exports = router;