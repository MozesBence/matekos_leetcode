const express = require("express");

const route = express.Router();

const mathSolveControllers = require("../controllers/mathSolveControllers");

const logregControllers = require("../controllers/logregController");

const profileControllers = require("../controllers/profileController");

route.get("/register", mathSolveControllers.getUsers);

route.post("/register", logregControllers.registerUser);

route.post("/login", logregControllers.loginUser);

route.post("/forget-password", logregControllers.forgetPassword);

route.patch("/set-new-password", logregControllers.setNewPassword);

route.get("/profile", profileControllers.getFullUser);

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.memoryStorage();

const MAX_SIZE = 10 * 1024 * 1024;  // Maximum 10MB

const upload = multer({
    storage,
    limits: { fileSize: MAX_SIZE }, // Maximum fájlméret
    fileFilter: (req, file, cb) => {
        if(file != null){
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
            // Ellenőrzés
            
            if (allowedMimeTypes.includes(file.mimetype)) {
                return cb(null, true); // Elfogadott fájl
            } else {
                return cb(new Error('Csak JPEG, JPG, PNG és GIF (ha type = 1) fájlok engedélyezettek.'));
            }
        }
    }
});

route.patch("/profile", upload.single('blob'), profileControllers.profilPicUpload);

module.exports = route;