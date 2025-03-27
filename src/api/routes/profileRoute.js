const express = require("express");

const route = express.Router();

const profileControllers = require("../controllers/profileController");

const profileAuth = require("../middlewares/profileAuth");

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Felhasználó lekérése
 *     tags:
 *       - Profile
 *     description: Felhasználó összes adatának lekérése
  *     parameters:
 *       - in: header
 *         name: Token
 *         required: true
 *         schema:
 *           type: string
 *         description: "Token a felhasználó ellenőrzéséhez"
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpbnRlYWRhbmk4OEBnbWFpbC5jb20iLCJpYXQiOjE3NDI0NjY4NjcsImV4cCI6MTc0MjQ3MDQ2N30.eAv8ZrTREgFFY2U8AK_hUy3mFbbJEQc_eGcQ6VZCP6c
 *       - in: header
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: "Felhasználó azonosítója az igazoláshoz (ettől függ, milyen adat kerül vissza)"
 *         example: 1
 *     responses:
 *       200:
 *         description: Sikeres lekérés
 *         content:
 *           application/json:
 *              example:
 *                  user: {id: 1, user_name: 'Teszt felhasználó', email: 'example@gmail.com', password: { hash-elt jelszó}, user_role: 'member', experience_point: 150, currency_count: 60, roll_back_token: 2, admin: 0, join_date: {timestamp}, activaed: 1}
 *       400:
 *         description: Hiba a felhasználó adatainak lekérése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a felhasználó adatait!"
 */
route.get("/profile", [ profileAuth.verifyToken ], profileControllers.getFullUser);

const multer = require('multer');

const storage = multer.memoryStorage();

const MAX_SIZE = 25 * 1024 * 1024;  // Maximum 10MB

const upload = multer({
    storage,
    limits: { fileSize: MAX_SIZE }, // Maximum fájlméret
    fileFilter: (req, file, cb) => {
        if(file != null){
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
            // Ellenőrzés

            console.log(file.mimetype);
            
            if (allowedMimeTypes.includes(file.mimetype)) {
                return cb(null, true); // Elfogadott fájl
            } else {
                return cb(new Error('Csak JPEG, JPG, PNG és GIF fájlok engedélyezettek.'));
            }
        }
    }
});

/**
 * @swagger
 * /profile:
 *   patch:
 *     summary: Profil / háttér kép
 *     tags:
 *       - Profile
 *     description: Profil / háttér kép feltöltése
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/get-limited-posts'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/get-limited-posts'
 *     responses:
 *       201:
 *         description: Profil / háttér kép feltöltése
 *         content:
 *           application/json:
 *              example:
 *                  message: "Profilkép sikeresen feltöltve!"
 *       400:
 *         description: Hiba a profil / háttér kép feltöltése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült feltölteni a profil / háttér képet!"
 * 
 * components:
 *   schemas:
 *     get-limited-posts:
 *       type: object
 *       required:
 *         - id
 *         - pic
 *         - type
 *       properties:
 *         id:
 *           type: number 
 *           description: A felhasználónak az azonosítója
 *           example: 1
 *         pic:
 *           type: blob
 *           description: Profil / háttér kép tömörített fálja / fájlai
 *         type:
 *           type: number
 *           description: A fájl típusa (profil / háttér)
 *           example: 0
 */
route.patch("/profile", upload.single('blob'), profileControllers.profilPicUpload);

module.exports = route;