const express = require('express');
const router = express.Router();
const { getAds } = require("../controllers/advertisement_cards_controller.js");

/**
 * @swagger
 * /get-ads-for-mainpage:
 *   get:
 *     summary: Kártyák
 *     tags:
 *       - Cards
 *     description: Kártyák lekérése
 *     responses:
 *       200:
 *         description: Sikeres lekérés
 *         content:
 *           application/json:
 *              example:
 *                  cards: "[{id:1, title: 'Vágj bele egy versenybe!', content: 'Inspirílódj és mérd össze tudásodat másokkal – lépj be a kihívásba!', button_title: 'Kezdés', redirect: '{egy url link}'}]"
 *       400:
 *         description: Hiba a kártyák lekérésben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a kártyák adatait!"
 */
router.get('/get-ads-for-mainpage',getAds)

module.exports = router;