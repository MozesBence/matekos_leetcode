const express = require("express");

const route = express.Router();

const communityControllers = require("../controllers/communityControllers");

const profileControllers = require("../controllers/profileController");

const profileAuth = require("../middlewares/profileAuth");

route.get("/community", [ profileAuth.verifyToken ], profileControllers.getFullUser);

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

module.exports = route;