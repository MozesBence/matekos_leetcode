const express = require('express');
const router = express.Router();
const settingsConfirmController = require('../controllers/settingsConfrimController');

const profileAuth = require("../middlewares/profileAuth");

/**
 * @swagger
 * /get-confirm-code:
 *   get:
 *     summary: Megerősítő kód
 *     tags:
 *       - Profile settings
 *     description: Az emailre kiküldött megerősítő kód lekérése
 *     parameters:
 *       - in: headers
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A felhasználó emailje amire a megerősító kód küldve lesz
 *         example: 1
 *       - in: headers
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: A napi feladat azonosítója
 *         example: example@gmail.com
 *       - in: headers
 *         name: user_name
 *         required: true
 *         schema:
 *           type: string
 *         description: A felhasználó neve
 *         example: Teszt_felhasználó
 *     responses:
 *       200:
 *         description: Sikeres lekérés
 *         content:
 *           application/json:
 *              example:
 *                  task_id: "235657"
 *       400:
 *         description: Hiba a poszt / komment szerkeztése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Sikertelen volt a komment szekeztésének mentése!"
 */
router.get('/get-confirm-code', settingsConfirmController.sendConfirmCode);

/**
 * @swagger
 * /set-settings:
 *   patch:
 *     summary: Beállítások feltöltése
 *     tags:
 *       - Profile settings
 *     description: A megerősítő kóddal a változtatások elmentése
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/new-settings'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/new-settings'
 *     responses:
 *       200:
 *         description: Sikeres módosítás
 *         content:
 *           application/json:
 *              example:
 *                  code: "235657"
 *       400:
 *         description: Hiba a beállítások módosítása közben!
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült a módosítást végrehajtani!"
 * 
 * components:
 *   schemas:
 *     new-settings:
 *       type: object
 *       required:
 *         - conent
 *         - code
 *         - id
 *         - type
 *       properties:
 *         conent:
 *           type: string
 *           description: A megváltoztatandó érték
 *           example: change-example@gmail.com
 *         code:
 *           type: number
 *           description: A megerősító kód
 *           example: '235657'
 *         id:
 *           type: number
 *           description: A felhasználó azonosítója
 *           example: 1
 *         type:
 *           type: number
 *           description: Az érték ami alapján eldöntődik hogy melyik érték változik meg
 *           example: 1
 */
router.patch('/set-settings', settingsConfirmController.setSettings);

/**
 * @swagger
 * /get-all-reports:
 *   get:
 *     summary: Bejelentések
 *     tags:
 *       - Profile settings
 *     description: Bejelentések a felhasználóktól amit csak az adminisztrátorok kapnak meg
 *     parameters:
 *       - in: headers
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: A felhasználó tokenizált azonosítója
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpbnRlYWRhbmk4OEBnbWFpbC5jb20iLCJpYXQiOjE3NDI0NjY4NjcsImV4cCI6MTc0MjQ3MDQ2N30.eAv8ZrTREgFFY2U8AK_hUy3mFbbJEQc_eGcQ6VZCP6c
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: A napi feladat azonosítója
 *         example: example@gmail.com
 *     responses:
 *       200:
 *         description: Sikeres lekérés
 *         content:
 *           application/json:
 *              example:
 *                  reports: "[{id: 1, type: 1, notif_content: 'Teszt bejelentés', content_type: 0, content_id: 1, closed: 0, user_id: 1, from_user_id: 2}]"
 *       400:
 *         description: Hiba a bejelentések lekérése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Sikertelen volt a bejelentések lekérése!"
 */
router.get('/get-all-reports', [ profileAuth.verifyToken ], settingsConfirmController.getAllReports);

/**
 * @swagger
 * /close-report:
 *   post:
 *     summary: Beállítások feltöltése
 *     tags:
 *       - Profile settings
 *     description: A megerősítő kóddal a változtatások elmentése
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/new-settings'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/new-settings'
 *     responses:
 *       201:
 *         description: Sikeres módosítás
 *         content:
 *           application/json:
 *              example:
 *                  code: "235657"
 *       400:
 *         description: Hiba a beállítások módosítása közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült a módosítást végrehajtani!"
 * 
 * components:
 *   schemas:
 *     new-settings:
 *       type: object
 *       required:
 *         - id
 *         - user_id
 *         - admin_id
 *         - content
 *         - content_type
 *         - token
 *       properties:
 *         id:
 *           type: number
 *           description: A bejelentés azonosítója
 *           example: 1
 *         user_id:
 *           type: number
 *           description: A felhasználó azonosítója akinek megy a üzenet
 *           example: 2
 *         admin_id:
 *           type: number
 *           description: Az admin azonosítója akitől érkezik az üzenet
 *           example: 1
 *         conent:
 *           type: string
 *           description: Válasz üzenet a felhasználó részére
 *           example: example@gmail.com
 *         content_type:
 *           type: boolean
 *           description: Az érték ami eldönti hogy poszt vagy komment-e (de lehet null is hogyha üzenet küldés történik és nem bejelentés)
 *           example: null
 *         token:
 *           type: string
 *           description: Az admin azonosítója a hitelesítéshez
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpbnRlYWRhbmk4OEBnbWFpbC5jb20iLCJpYXQiOjE3NDI0NjY4NjcsImV4cCI6MTc0MjQ3MDQ2N30.eAv8ZrTREgFFY2U8AK_hUy3mFbbJEQc_eGcQ6VZCP6c
 */
router.post('/close-report', [ profileAuth.verifyToken ], settingsConfirmController.closeReport);

/**
 * @swagger
 * /get-all-users:
 *   get:
 *     summary: Felhasználók
 *     tags:
 *       - Profile settings
 *     description: Az összes felhasználó adatai
 *     parameters:
 *       - in: headers
 *         name: name
 *         required: true
 *         schema:
 *           type: string | null
 *         description: A felhasználó neve a szűréshez
 *         example: 'Teszt_felhasználó'
 *       - in: headers
 *         name: activated_type
 *         required: true
 *         schema:
 *           type: integer | null
 *         description: A felhasználó aktív státusza a szűréshez
 *         example: 1
 *       - in: headers
 *         name: admin
 *         required: true
 *         schema:
 *           type: boolean | null
 *         description: A felhasználó jogosultsági szintje a szűréshez
 *         example: false
 *       - in: headers
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Az admin tokenizált azonosítója
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpbnRlYWRhbmk4OEBnbWFpbC5jb20iLCJpYXQiOjE3NDI0NjY4NjcsImV4cCI6MTc0MjQ3MDQ2N30.eAv8ZrTREgFFY2U8AK_hUy3mFbbJEQc_eGcQ6VZCP6c
 *     responses:
 *       200:
 *         description: Sikeres lekérés
 *         content:
 *           application/json:
 *              example:
 *                  notifications: "[{id: 1, user_name: 'Teszt felhasználó', email: 'example@gmail.com', password: { hash-elt jelszó}, user_role: 'member', experience_point: 150, currency_count: 60, roll_back_token: 2, admin: 0, join_date: {timestamp}, activaed: 1}]"
 *       400:
 *         description: Hiba a felhasználó adatai lekérése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Sikertelen volt a felhasználó adatainak lekérése!"
 */
router.get('/get-all-users', [ profileAuth.verifyToken ],  settingsConfirmController.getAllUser);

/**
 * @swagger
 * /set-settings:
 *   patch:
 *     summary: Felhasználó beállításai
 *     tags:
 *       - Profile settings
 *     description: Felhasználó beállításainak módosítása adminként
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/set-user-settings'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/set-user-settings'
 *     responses:
 *       200:
 *         description: Sikeres módosítás
 *         content:
 *           application/json:
 *              example:
 *                  response: "A visszakapott érték függ attól hogy mi lett módosítva, ha a jelszó akkor visszajön a hash-el jelszó, amúgy maga az a content ami be lett küldve"
 *       400:
 *         description: Hiba a felhasználó beállításinak módosítása közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült a módosítást végrehajtani!"
 * 
 * components:
 *   schemas:
 *     set-user-settings:
 *       type: object
 *       required:
 *         - id
 *         - content
 *         - type
 *         - token
 *       properties:
 *         id:
 *           type: number
 *           description: A felhasználó azonosítója
 *           example: 1
 *         conent:
 *           type: string
 *           description: A megváltoztatandó érték
 *           example: change-example@gmail.com
 *         type:
 *           type: number
 *           description: Az érték ami alapján eldöntődik hogy melyik érték változik meg
 *           example: 1
 *         token:
 *           type: number
 *           description: Az admin tokenizált azonosítója
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpbnRlYWRhbmk4OEBnbWFpbC5jb20iLCJpYXQiOjE3NDI0NjY4NjcsImV4cCI6MTc0MjQ3MDQ2N30.eAv8ZrTREgFFY2U8AK_hUy3mFbbJEQc_eGcQ6VZCP6c
 */
router.patch('/set-user-settings', [ profileAuth.verifyToken ],  settingsConfirmController.setUserSettings);

/**
 * @swagger
 * /set-user-roles:
 *   patch:
 *     summary: Felhasználó jogosultsága
 *     tags:
 *       - Profile settings
 *     description: Felhasználó jogosultságának módosítása adminként
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/set-user-settings'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/set-user-settings'
 *     responses:
 *       200:
 *         description: Sikeres módosítás
 *         content:
 *           application/json:
 *              example:
 *                  response: "A felhasználónak a jogosultsága megváltozott!"
 *       400:
 *         description: Hiba a felhasználó beállításinak módosítása közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült a módosítást végrehajtani!"
 * 
 * components:
 *   schemas:
 *     set-user-settings:
 *       type: object
 *       required:
 *         - id
 *         - type
 *         - token
 *       properties:
 *         id:
 *           type: number
 *           description: A felhasználó azonosítója
 *           example: 1
 *         type:
 *           type: number
 *           description: Az érték ami alapján eldöntődik hogy melyik értékre változzon meg
 *           example: 1
 *         token:
 *           type: number
 *           description: Az admin tokenizált azonosítója
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpbnRlYWRhbmk4OEBnbWFpbC5jb20iLCJpYXQiOjE3NDI0NjY4NjcsImV4cCI6MTc0MjQ3MDQ2N30.eAv8ZrTREgFFY2U8AK_hUy3mFbbJEQc_eGcQ6VZCP6c
 */
router.patch('/set-user-roles', [ profileAuth.verifyToken ],  settingsConfirmController.setUserRoles);

/**
 * @swagger
 * /get-all-notif:
 *   get:
 *     summary: Üzenetek
 *     tags:
 *       - Profile settings
 *     description: A felhasználó összes üzenetét lekéri
 *     parameters:
 *       - in: headers
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A felhasználó azonosítója
 *         example: 1
 *     responses:
 *       200:
 *         description: Sikeres lekérés
 *         content:
 *           application/json:
 *              example:
 *                  notifications: "[{id: 1 ,type: false,user_id: 1, from_user_id: 2, notif_content: 'Teszt kontent', content_type: null, content_id: null, closed: true}]"
 *       400:
 *         description: Hiba az üzenetek lekérése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Sikertelen volt az üzenetek lekérése!"
 */
router.get('/get-all-notifs',  settingsConfirmController.getAllNotifs);

module.exports = router;
