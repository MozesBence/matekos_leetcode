const profileService = require("../services/profileService");

const bcrypt = require("bcrypt");

const salt = 10;

const jwt = require("jsonwebtoken");

const nodemailer = require('nodemailer');

const multer = require("multer");

// Set up multer storage to store file in memory (as a buffer)
const storage = multer.memoryStorage();  // Use diskStorage if you want to save to disk
const upload = multer({ storage: storage });

exports.getFullUser = async (req, res, next) =>{
    const email = req.headers['email']

    const full_user = await profileService.getUserAndCustomization(email);

    try{
        if(full_user == null){
            const error = new Error("A felhasználó nem található!");

            error.status = 404;

            throw error;
        }

        res.status(200).send(full_user);
    }
    catch(error){
        next(error);
    }
}

exports.profilPicUpload = async (req, res, next) => {
    const { id, type, darkmode } = req.body;
    const blob = req.file ? req.file.buffer : null;
    const mimeType = req.file ? req.file.mimetype : null;
    if (!blob && (type == '1' || type == '2')) {
        return res.status(400).json({ message: 'Fájl nem található!' });
    }

    try {
        // Fájl feltöltésének logikája
        var upload_result;

        if(type == '0' || type == '1' || type == '2'){
            upload_result = await profileService.ProfPicUpload(id, blob, type, mimeType);
        }else if(type == '4'){
            upload_result = await profileService.DarkmodeUpload(id, darkmode);
        }

        // Válasz küldése
        res.status(200).json({ message: 'Profilkép sikeresen feltöltve!', result: upload_result });
    } catch (error) {
        console.error('Hiba a profilkép feltöltésekor:', error);
        res.status(500).json({ message: 'Hiba történt a profil frissítése közben.' });
    }
};