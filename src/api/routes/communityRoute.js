const express = require("express");

const route = express.Router();

const communityControllers = require("../controllers/communityControllers");

/**
 * @swagger
 * /community:
 *   get:
 *     summary: Posztok lekérése
 *     tags:
 *       - Community
 *     description: Limitált mennyiségű posztok lekérése
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
 *       200:
 *         description: Limitált mennyiségű posztok lekérése
 *         content:
 *           application/json:
 *              example:
 *                  posts: "[{id: 1, title: 'Teszt poszt', content: '<div>Teszt kontent<div>', gotEdit: false, createdAt: (timestamp), user_id: 1, user_name: 'teszt user', total_comments: 0, User: {felhasználó adatainak objektuma}, like: 2, dislike: 0, userReaction: 'like', editable: false, tags: [A posthoz tartozó tagek], hasMoreComments: false, files: [fájlok], images: [képek], comments: []}]"
 *                  total_posts: "5"
 *       400:
 *         description: Hiba a posztok lekérése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a posztokat!"
 * 
 * components:
 *   schemas:
 *     get-limited-posts:
 *       type: object
 *       required:
 *         - id
 *         - limit
 *         - offset
 *         - filter
 *         - tagsArray
 *         - search
 *       properties:
 *         id:
 *           type: number | null
 *           description: A felhasználónak az id-ja
 *           example: 1
 *         limit:
 *           type: number
 *           description: Amennyi poszt legyen lekérve
 *           example: 10
 *         offset:
 *           type: number
 *           description: Amennyi poszt idáig le lett kérve
 *           example: 0
 *         filter:
 *           type: Array<Array<string>>
 *           description: Ami alapján rendezzi a posztokat
 *           example: [['date']]
 *         tagsArray:
 *           type: Array<number>
 *           description: Posztokhoz hozzárendelhető tagek
 *           example: [1, 2 ]
 *         search:
 *           type: string
 *           description: Ami alapján megszűri a posztokat
 *           example: "alma"
 * 
 */
route.get("/community", communityControllers.getLimitedPosts);

/**
 * @swagger
 * /community/get-comments:
 *   get:
 *     summary: Kommentek lekérése
 *     tags:
 *       - Community
 *     description: Limitált mennyiségű komment lekérése
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/get-limited-comments'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/get-limited-comments'
 *     responses:
 *       200:
 *         description: Limitált mennyiségű komment lekérése
 *         content:
 *           application/json:
 *              example:
 *                  comments: "[{id: 1, title: 'Módosított teszt cím', content: '<div>Teszt kontent<div>', gotEdit: false, createdAt: (timestamp), user_id: 1,user_name: 'teszt user', post_id: 1, parent_comment_id: null, total_comments: 0, User: {felhasználó adatainak objektuma}, like: 2, dislike: 0, userReaction: 'like', editable: false, tags: [A posthoz tartozó tagek], hasMoreComments: false, comments: []}]"
 *       400:
 *         description: Hiba a kommentek lekérése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a kommenteket!"
 * 
 * components:
 *   schemas:
 *     get-limited-comments:
 *       type: object
 *       required:
 *         - id
 *         - limit
 *         - offset
 *         - type
 *         - user_id
 *       properties:
 *         id:
 *           type: number
 *           description: A posztnak az id-ja
 *           example: 1
 *         limit:
 *           type: number
 *           description: Amennyi komment legyen lekérve
 *           example: 10
 *         offset:
 *           type: number
 *           description: Amennyi komment idáig le lett kérve
 *           example: 10
 *         type:
 *           type: number
 *           description: Váltás a kommentek és a kommentekre érkezett válaszok között
 *           example: 0
 *         user_id:
 *           type: number
 *           description: Posztokhoz hozzárendelhető tagek
 *           example: 1
 * 
 */
route.get("/community/get-comments", communityControllers.getLimitedComments);

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.memoryStorage();

const MAX_SIZE = 10 * 1024 * 1024;  // Maximum 10MB

const upload = multer({
    storage,
    limits: { fileSize: MAX_SIZE }, // Maximum fájlméret
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/jpg',
            'image/gif',
            'text/plain', 
            'application/javascript',
            'text/css',
            'application/json',
            'application/typescript',
            'text/x-lua',
            'text/x-vue',
            'text/csharp',
        ];

        if (allowedMimeTypes.includes(file.mimetype)) {
            return cb(null, true); // Elfogadott fájl
        } else {
            return cb(new Error('Csak megengedett fájltípusok tölthetők fel.'));
        }
    }
});

/**
 * @swagger
 * /community:
 *   post:
 *     summary: Poszt feltöltés
 *     tags:
 *       - Community
 *     description: Poszt feltöltés
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/community-post-upload'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/community-post-upload'
 *     responses:
 *       201:
 *         description: Sikeres poszt feltöltés
 *         content:
 *           application/json:
 *              example:
 *                  post: "[{id: 1, title: 'Teszt poszt cím', content: '<div>Ez egy div<div>', user_id: 1, like: 0, dislike: 0, tags: [A posthoz tartozó tagek]}]"
 *       400:
 *         description: Hiba a poszt feltöltése lekérése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült feltölteni a posztot!"
 * 
 * components:
 *   schemas:
 *     community-post-upload:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - content
 *         - files
 *         - chips
 *       properties:
 *         id:
 *           type: number
 *           description: A felhasználónak az id-ja
 *           example: 1
 *         title:
 *           type: string
 *           description: A posztnak a címe
 *           example: 'Teszt poszt cím'
 *         content:
 *           type: string
 *           description: A posztnak a tartalma html stílusban
 *           example: <div>Ez egy div</div>
 *         files:
 *           type: Array<File>
 *           description: A posztokhoz hozzárendelt képek / fájlok
 *         chips:
 *           type: Array<number>
 *           description: Posztokhoz hozzárendelt tagek
 *           example: [1, 2]
 */
route.post("/community", upload.array('files', 10), communityControllers.postUpload);

/**
 * @swagger
 * /community/post-like:
 *   post:
 *     summary: Poszt reakció
 *     tags:
 *       - Community
 *     description: Reakció a posztra (like/dislike)
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/community-post-like'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/community-post-like'
 *     responses:
 *       201:
 *         description: Sikeres reakció feltöltése
 *         content:
 *           application/json:
 *              example:
 *                  reaction_result: "{user_id: 1, entity_id: 1, entity_type: 'poszt', like_type: 'like'}"
 *       400:
 *         description: Hiba a reakció feltöltése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Sikertelen volt a reakció feltöltés!"
 * 
 * components:
 *   schemas:
 *     community-post-like:
 *       type: object
 *       required:
 *         - post_id
 *         - user_id
 *         - upload_type
 *         - type
 *       properties:
 *         post_id:
 *           type: number
 *           description: A posztnak az id-ja
 *           example: 1
 *         user_id:
 *           type: number
 *           description: A felhasználónak az id-ja
 *           example: 1
 *         upload_type:
 *           type: string
 *           description: A felhasználó mire reagált (poszt/komment)
 *           example: 'post'
 *         type:
 *           type: number
 *           description: A felhasználó reakciója
 *           example: 0
 */
route.post("/community/post-like", communityControllers.postLike);

/**
 * @swagger
 * /community/post-comment:
 *   post:
 *     summary: Komment feltöltése
 *     tags:
 *       - Community
 *     description: Komment / Komment-kommentje feltöltése
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/community-comment-upload'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/community-comment-upload'
 *     responses:
 *       201:
 *         description: Sikeres komment feltöltése
 *         content:
 *           application/json:
 *              example:
 *                  reaction_result: "{id: 1, conent: 'Teszt komment', linkAuthor: 'Teszt_felhasználó_1', linked_id: 1, parent_comment_id: null, user_id: 1}"
 *       400:
 *         description: Hiba a komment feltöltése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Sikertelen volt a komment feltöltés!"
 * 
 * components:
 *   schemas:
 *     community-comment-upload:
 *       type: object
 *       required:
 *         - content
 *         - linkAuthor
 *         - linked_id
 *         - user_id
 *         - type
 *       properties:
 *         content:
 *           type: string
 *           description: A komment szövegének a tartalma
 *           example: "Teszt komment"
 *         linkAuthor:
 *           type: string | null
 *           description: A felhasználónak a neve
 *           example: 'Teszt_felhasználó_1'
 *         linked_id:
 *           type: number
 *           description: A felhasználó mire reagált (poszt/komment)
 *           example: 1
 *         user_id:
 *           type: number
 *           description: A felhasználónak az id-ja
 *           example: 1
 *         type:
 *           type: number
 *           description: Komment fajtája
 *           example: 0
 */
route.post("/community/post-comment", communityControllers.postComment);

/**
 * @swagger
 * /community/comment-edit:
 *   patch:
 *     summary: Komment módosítása
 *     tags:
 *       - Community
 *     description: Komment / Komment-kommentjének módosítása
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/community-comment-edit'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/community-comment-edit'
 *     responses:
 *       201:
 *         description: Sikeres komment szerkeztés
 *         content:
 *           application/json:
 *              example:
 *                  reaction_result: "Sikeres volt a szerkeztés!"
 *       400:
 *         description: Hiba a komment szerkeztése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Sikertelen volt a comment szekeztésének mentése közben!"
 * 
 * components:
 *   schemas:
 *     community-comment-edit:
 *       type: object
 *       required:
 *         - content
 *         - comment_id
 *       properties:
 *         content:
 *           type: string
 *           description: A komment szövegének a tartalma
 *           example: "Módosított teszt komment"
 *         comment_id:
 *           type: number
 *           description: A módosítani kívánt komment id-ja
 *           example: 1
 * 
 */
route.patch("/community/comment-edit", communityControllers.commentEdit);

/**
 * @swagger
 * /community/post-edit:
 *   patch:
 *     summary: Poszt módosítása
 *     tags:
 *       - Community
 *     description: Poszt módosítása
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/community-post-edit'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/community-post-edit'
 *     responses:
 *       201:
 *         description: Sikeres komment szerkeztés
 *         content:
 *           application/json:
 *              example:
 *                  post_result: "[{id: 1,title: 'Módosított teszt cím' , content: '<div>Módosított teszt kontent<div>', gotEdit: true, createdAt: (timestamp), user_id: 1,user_name: 'teszt user', post_id: 1, parent_comment_id: null, total_comments: 0, User: {felhasználó adatainak objektuma}, like: 2, dislike: 0, userReaction: 'like', editable: false, tags: [A posthoz tartozó módosított tagek], hasMoreComments: false, comments: []}]"
 *       400:
 *         description: Hiba a komment szerkeztése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Sikertelen volt a comment szekeztésének mentése közben!"
 * 
 * components:
 *   schemas:
 *     community-post-edit:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - content
 *         - files
 *         - none_files
 *         - new_Chips
 *         - none_Chips
 *       properties:
 *         id:
 *           type: number
 *           description: A posztnak az id-ja
 *           example: 1
 *         title:
 *           type: string
 *           description: A posztnak a módosított címe
 *           example: 'Módosított teszt poszt cím'
 *         content:
 *           type: string
 *           description: A posztnak a módosított tartalma html stílusban
 *           example: <div>Ez egy módosított div</div>
 *         files:
 *           type: Array<File>
 *           description: A posztokhoz hozzárendelt új képek / fájlok
 *         none_files:
 *           type: number[] | null
 *           description: Posztokhoz hozzárendelt képek / fájlok amik törlésre kerültek
 *           example: [1, 2]
 *         new_Chips:
 *           type: number[] | null
 *           description: Posztokhoz hozzárendelt új tagek
 *           example: [1, 2]
 *         none_Chips:
 *           type: number[] | null
 *           description: Posztokhoz hozzárendelt tagek amik törlésre kerültek
 *           example: [1, 2]
 */
route.patch("/community/post-edit",upload.array("files", 10), communityControllers.postEditUpload);

/**
 * @swagger
 * /community/tags:
 *   get:
 *     summary: Tagek lekérése
 *     tags:
 *       - Community
 *     description: Tagek lekérése
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/community-comment-upload'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/community-comment-upload'
 *     responses:
 *       201:
 *         description: Sikeres tagek lekérése
 *         content:
 *           application/json:
 *              example:
 *                  reaction_result: "[{id: 1, tag: 'Probléma'},{id: 1, tag: 'Bejelentés'}]"
 *       400:
 *         description: Hiba a tagek lekérése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a tageket!"
 */
route.get("/community/tags", communityControllers.getTags);

/**
 * @swagger
 * /community/reports:
 *   post:
 *     summary: Reportok
 *     tags:
 *       - Community
 *     description: Poszt / Komment reportolása
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/community-reports'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/community-reports'
 *     responses:
 *       201:
 *         description: Sikeres Poszt / Komment reportolása
 *         content:
 *           application/json:
 *              example:
 *                  message: "El lett küldve a bejelentés!"
 *       400:
 *         description: Hiba a poszt / komment szerkeztése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Sikertelen volt a comment szekeztésének mentése közben!"
 * 
 * components:
 *   schemas:
 *     community-reports:
 *       type: object
 *       required:
 *         - type
 *         - notif_content
 *         - content_type
 *         - user_id
 *         - from_user_id
 *         - content_id
 *       properties:
 *         type:
 *           type: boolean
 *           description: A bejelentést admin küldi-e
 *           example: false
 *         notif_content:
 *           type: string
 *           description: A bejelntésnek a szövege
 *           example: 'Teszt bejelentés'
 *         content_type:
 *           type: boolean
 *           description: Poszt vagy kontent-e
 *           example: false
 *         user_id:
 *           type: number
 *           description: Akinek ment az értesítés / bejelentés
 *           example: 1
 *         from_user_id:
 *           type: number
 *           description: Aki küldte az értesítés / bejelentés
 *           example: 2
 *         content_id:
 *           type: number
 *           description: Poszt / komment id-ja
 *           example: 1
 */
route.post("/community/reports", communityControllers.sendReports);

module.exports = route;