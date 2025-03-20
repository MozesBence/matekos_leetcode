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
 *                  posts: "[{id: 1, title: 'Teszt poszt', content: '<div>Teszt kontent<div>', gotEdit: false, createdAt: (timestamp), user_id: 1, Comments: []}]"
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
 *           description: Mi alapján rendezze
 *           example: [['date']]
 *         tagsArray:
 *           type: Array<number>
 *           description: Posztokhoz hozzárendelhető tagek
 *           example: secretpassword
 *         password:
 *           type: string
 *           description: Felhasználó jelszava
 *           example: secretpassword
 * 
 */
route.get("/community", communityControllers.getLimitedPosts);

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

route.post("/community", upload.array('files', 10), communityControllers.postUpload);

route.post("/community/post-like", communityControllers.postLike);

route.post("/community/post-comment", communityControllers.postComment);

route.patch("/community/comment-edit", communityControllers.commentEdit);
  
route.patch("/community/post-edit",upload.array("files", 10), communityControllers.postEditUpload);
  
route.get("/community/tags", communityControllers.getTags);

route.post("/community/reports", communityControllers.sendReports);

module.exports = route;