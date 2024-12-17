const express = require("express");

const route = express.Router();

const mathSolveControllers = require("../controllers/mathSolveControllers");

route.get("/register", mathSolveControllers.getUsers);

route.post("/register", mathSolveControllers.registerUser);

route.post("/login", mathSolveControllers.loginUser);

route.post("/forget-password", mathSolveControllers.forgetPassword);

route.patch("/set-new-password", mathSolveControllers.setNewPassword);

route.get("/profile", mathSolveControllers.getFullUser);

const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const MAX_SIZE = 10 * 1024 * 1024;  // Maximum 10MB

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_SIZE },  // Limitált fájlméret
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            return cb(null, true);
        } else {
            return cb(new Error('Csak JPEG, JPG és PNG fájlok engedélyezettek'));
        }
    }
});

route.patch("/profile", upload.single('blob'), mathSolveControllers.profilPicUpload);

module.exports = route;