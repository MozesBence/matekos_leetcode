const express = require("express");

const route = express.Router();

const logregControllers = require("../controllers/logregController");

const mathSolveControllers = require("../controllers/mathSolveControllers");

/**
 * @swagger
 * /register:
 *   get:
 *     summary: Felhasználók lekérése
 *     x-disable-try-it-out: true
 *     tags:
 *       - Register / Login
 *     description: Visszaadja a regisztrált felhasználókat
 *     responses:
 *       200:
 *         description: Sikeres felhasználók lekérve
 *         content:
 *           application/json:
 *              example:
 *                  message: "A felhasználó regisztrálva lett és az email el lett küldve!"
 *       400:
 *         description: Hiba a felhasználók lekérése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Hiba üzenet"
 */
route.get("/register", mathSolveControllers.getUsers);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Felhasználó regisztrálása
 *     tags:
 *       - Register / Login
 *     description: Regisztráció az oldalra
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/register-User'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/register-User'
 *     responses:
 *       201:
 *         description: Sikeres regisztráció
 *         content:
 *           application/json:
 *              example:
 *                  message: "A felhasználó regisztrálva lett és az email el lett küldve!"
 *       400:
 *         description: Hiba a felhasználó regisztrálása közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült a regisztráció!"
 * 
 * components:
 *   schemas:
 *     register-User:
 *       type: object
 *       required:
 *         - email
 *         - user_name
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Felhasználó email címe
 *           example: example@gmail.com
 *         user_name:
 *           type: string
 *           description: Felhasználó neve
 *           example: példa név
 *         password:
 *           type: string
 *           description: Felhasználó jelszava
 *           example: secretpassword
 */
route.post("/register", logregControllers.registerUser);

/**
 * @swagger
 * /success-register:
 *   post:
 *     summary: Felhasználó aktiválása
 *     tags:
 *       - Register / Login
 *     description: Aktiválás
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/activate_User'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/activate_User'
 *     responses:
 *       201:
 *         description: Sikeres aktiválás
 *         content:
 *           application/json:
 *              example:
 *                  token: "A felhasználó sikeresen aktiválva lett!"
 *       400:
 *         description: Hiba a felhasználó aktiválása közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült a felhasználót aktiválni!"
 * 
 * components:
 *   schemas:
 *     activate_User:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           description: Email címre küldött elérési útból kapott token (1 óra után a tokenek lejárnak és törlődnek)
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpbnRlYWRhbmk4OEBnbWFpbC5jb20iLCJpYXQiOjE3NDI0NjY4NjcsImV4cCI6MTc0MjQ3MDQ2N30.eAv8ZrTREgFFY2U8AK_hUy3mFbbJEQc_eGcQ6VZCP6c
 */
route.post("/success-register", logregControllers.successRegister);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Felhasználó bejelentkezése
 *     tags:
 *       - Register / Login
 *     description: Bejelentkezés az oldalra
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/login_User'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login_User'
 *     responses:
 *       201:
 *         description: Sikeres bejelentkezés
 *         content:
 *           application/json:
 *              example:
 *                  token: Az oldal által generált token, pl.: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpbnRlYWRhbmk4OEBnbWFpbC5jb20iLCJpYXQiOjE3NDI0NjY4NjcsImV4cCI6MTc0MjQ3MDQ2N30.eAv8ZrTREgFFY2U8AK_hUy3mFbbJEQc_eGcQ6VZCP6c
 *       400:
 *         description: Hiba a felhasználó bejelentkezése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült a bejelentkezés!"
 * 
 * components:
 *   schemas:
 *     login_User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - rememberMe
 *       properties:
 *         email:
 *           type: string
 *           description: Felhasználó email címe
 *           example: example@gmail.com
 *         password:
 *           type: string
 *           description: Felhasználó jelszava
 *           example: secretpassword
 *         rememberMe:
 *           type: boolean
 *           description: Felhasználó maradjon-e bejelentkezve
 *           example: true
 */
route.post("/login", logregControllers.loginUser);

/**
 * @swagger
 * /forget-password:
 *   post:
 *     summary: Elfelejtett jelszó
 *     tags:
 *       - Register / Login
 *     description: Új jelszó kérelem
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/forget-password'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/forget-password'
 *     responses:
 *       201:
 *         description: Sikeres jelszó kérelem
 *         content:
 *           application/json:
 *              example:
 *                  message: "Új jelszó kérelem el lett küldve a emailre!"
 *       400:
 *         description: Hiba az új jelszó kérése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Hiba történt az új jelszó kérelem közben!"
 * 
 * components:
 *   schemas:
 *     forget-password:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: Felhasználó email címe amivel regisztrált
 *           example: example@gmail.com
 */
route.post("/forget-password", logregControllers.forgetPassword);

/**
 * @swagger
 * /set-new-password:
 *   patch:
 *     summary: Új jelszó létrehozása
 *     tags:
 *       - Register / Login
 *     description: Új jelszó kérelem
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/set-new-password'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/set-new-password'
 *     responses:
 *       200:
 *         description: Sikeresen jelszó beállítás
 *         content:
 *           application/json:
 *              example:
 *                  message: "Új jelszó kérelem el lett küldve a emailre!"
 *       400:
 *         description: Hiba az új jelszó beállítása közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Hiba történt az új jelszó beállítása közben!"
 * 
 * components:
 *   schemas:
 *     set-new-password:
 *       type: object
 *       required:
 *         - token
 *         - email
 *       properties:
 *         token:
 *           type: string
 *           description: A kiküldött email-ből megkapott token
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpbnRlYWRhbmk4OEBnbWFpbC5jb20iLCJpYXQiOjE3NDI0NjY4NjcsImV4cCI6MTc0MjQ3MDQ2N30.eAv8ZrTREgFFY2U8AK_hUy3mFbbJEQc_eGcQ6VZCP6c
 *         email:
 *           type: string
 *           description: Felhasználó email címe amivel regisztrált
 *           example: example@gmail.com
 */
route.patch("/set-new-password", logregControllers.setNewPassword);

module.exports = route;