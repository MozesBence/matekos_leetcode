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

router.get('/getThemeById/:theme_id',getThemeById)

module.exports = router;