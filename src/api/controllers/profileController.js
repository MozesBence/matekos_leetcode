const profileService = require("../services/profileService");

const jwt = require("jsonwebtoken");

require('dotenv').config(); 

const { TextEncoder } = require('util');

exports.getFullUser = async (req, res, next) =>{
    const token = req.headers['token'];

    const secretKey = process.env.JWT_KEY;

    const decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });

    const full_user = await profileService.getUserAndCustomization(decoded.id);

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