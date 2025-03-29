const settingsConfirmService = require("../services/settingsConfirmService")
const communityService = require("../services/communityService");

require("dotenv").config();

const nodemailer = require('nodemailer');

const validator = require("email-validator");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const salt = 10;

exports.sendConfirmCode = async (req, res, next) =>
{
    const {id, email, user_name } = req.query;
    
    try{

        if(email == null || email == undefined || email == ''){
            const error = new Error("Nincs megadva email cím!");

            error.status = 400;

            throw error;
        }

        if(user_name == null || user_name == undefined || user_name == ''){
            const error = new Error("Nem található a felhasználó neve!");

            error.status = 400;

            throw error;
        }

        const randomSixDigitNumber = () => Math.floor(100000 + Math.random() * 900000); 

        const RandomDigits = randomSixDigitNumber();

        const newToken =
        {
            token: RandomDigits,
            type: "beállítások",
            user_id: id,
        }

        const token_result = await settingsConfirmService.setConfirmCode(newToken);

        if(!token_result){
            const error = new Error("Hiba törént a kód feltöltése közbe!");

            error.status = 400;

            throw error;
        }

        res.status(201).json({ message: 'Kód sikeresen elküldve'});
        }
    catch(error){
        next(error);
    }
}

exports.setSettings = async (req,res,next) =>{
    const { content, code, id, type } = req.body;

    const code_result = await settingsConfirmService.codeConfirm(code, id);

    try{
        if(!code_result){
            const error = new Error("Nem megfelelő kód lett megadva!");

            error.status = 400;

            throw error;
        }

        var setSettings_result = null;
        if(type == 'profile'){
            setSettings_result = await settingsConfirmService.setNewUsername(id,content[0]);
        }else if(type == 'email'){
            const isValid = validator.validate(content[0]);

            if(!isValid){
                const error = new Error("Nem létezik a megadott email!");
    
                error.status = 404;
    
                throw error;
            }

            setSettings_result = await settingsConfirmService.setNewGmail(id,content[0]);
        }
        else if(type == 'password'){
            if(!await bcrypt.compare(content[0], content[2])){
                const error = new Error("A jelenlegi jelszó nem egyezik!");
    
                error.status = 404;
    
                throw error;
            }

            setSettings_result = await settingsConfirmService.setNewPassword(id,await bcrypt.hash(content[1], salt));
        }

        if(setSettings_result == null){
            const error = new Error("Valami hiba történt a beállítás firssítése közben!");

            error.status = 500;

            throw error;
        }

        res.status(200).send(setSettings_result);
    }
    catch(error){
        next(error);
    }

}

exports.getAllReports = async (req,res,next) =>{
    const token = req.headers['token'];

    const secretKey = process.env.JWT_KEY;
    
    try{
        var decoded = null;
        
        if(token){
            decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        }else{
            const error = new Error("Valami hiba történt a felhasználó igazolásában!");
    
            error.status = 500;
    
            throw error;
        }

        const adminCheck = await settingsConfirmService.getElseUserById(decoded.id);

        if(!adminCheck){
            const error = new Error("A felhasználónak nincs ehhez joga!");
    
            error.status = 400;
    
            throw error;
        }

        const allReports = await settingsConfirmService.getReports();

        res.status(200).send(allReports);

    }catch(error){
        next(error);
    }
}

exports.closeReport = async (req,res,next) =>{
    const {id, user_id, admin_id, content, content_id, content_type, token} = req.body;

    const secretKey = process.env.JWT_KEY;
    
    try{
        var decoded = null;
        
        if(token){
            decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        }else{
            const error = new Error("Valami hiba történt a felhasználó igazolásában!");
    
            error.status = 500;
    
            throw error;
        }

        const adminCheck = await settingsConfirmService.getElseUserById(decoded.id);

        if(!adminCheck){
            const error = new Error("A felhasználónak nincs ehhez joga!");
    
            error.status = 400;
    
            throw error;
        }

        const close_result = await settingsConfirmService.closeReport(id);

        if(!close_result){
            const error = new Error("Nem sikerült megváltoztatni a bejelentés státuszát!");
    
            error.status = 400;
    
            throw error;
        }

        const newNotif = {
            id: null,
            type: false,
            user_id: user_id,
            from_user_id: admin_id,
            notif_content: content,
            content_type: null,
            content_id: null,
            closed: true
        }

        if(content_id){
            const content_delete = await settingsConfirmService.deleteContent(content_id, content_type);

            if(content_delete == 'Error deleting content.' || content_delete == 'Content not found.'){
                const error = new Error("Hiba történt a fájl törlése közben!");
    
                error.status = 400;
        
                throw error;
            }
        }

        const notif_result = await communityService.sendReports(newNotif);

        if(!notif_result){
            const error = new Error("Valami hiba történt az értesítés feltöltése közben!");
    
            error.status = 400;
    
            throw error;
        }

        res.status(201).send('El lett küldve az értesítés!');
    }
    catch(error){
        next(error)
    }
}

exports.getAllUser = async (req,res,next) =>{
    const {name, activated_type, admin, token} = req.query;

    const secretKey = process.env.JWT_KEY;

    try{
        var decoded = null;
        
        if(token){
            decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        }else{
            const error = new Error("Valami hiba történt a felhasználó igazolásában!");
    
            error.status = 500;
    
            throw error;
        }

        const adminCheck = await settingsConfirmService.getElseUserById(decoded.id);

        if(!adminCheck){
            const error = new Error("A felhasználónak nincs ehhez joga!");
    
            error.status = 400;
    
            throw error;
        }

        const get_users = await settingsConfirmService.getALlUser(name, activated_type, admin);

        if(!get_users){
            const error = new Error("Valami hiba lépett fel a lekérdezés közben!");
    
            error.status = 400;
    
            throw error;
        }

        res.status(200).send(get_users);
    }
    catch(error){
        next(error)
    }
}

exports.setUserSettings = async (req,res,next) =>{
    const {content, id, type, token} = req.body;

    const secretKey = process.env.JWT_KEY;

    try{
        var decoded = null;
        
        if(token){
            decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        }else{
            const error = new Error("Valami hiba történt a felhasználó igazolásában!");
    
            error.status = 500;
    
            throw error;
        }

        const adminCheck = await settingsConfirmService.getElseUserById(decoded.id);

        if(!adminCheck){
            const error = new Error("A felhasználónak nincs ehhez joga!");
    
            error.status = 400;
    
            throw error;
        }

        const setUserSettings = await settingsConfirmService.setUserSettings(content, id, type);

        res.status(200).send(setUserSettings);
    }
    catch(error){
        next(error)
    }
}

exports.setUserRoles = async (req,res,next) =>{
    const {id, type, token} = req.body;

    const secretKey = process.env.JWT_KEY;

    try{
        var decoded = null;
        
        if(token){
            decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        }else{
            const error = new Error("Valami hiba történt a felhasználó igazolásában!");
    
            error.status = 500;
    
            throw error;
        }

        const adminCheck = await settingsConfirmService.getElseUserById(decoded.id);

        if(!adminCheck){
            const error = new Error("A felhasználónak nincs ehhez joga!");
    
            error.status = 400;
    
            throw error;
        }

        const setUserRoles = await settingsConfirmService.setUserRoles(id, type);

        if(!setUserRoles){
            const error = new Error("Nem sikerült megváltoztatni a felhasználónak a jogosultságát!");
    
            error.status = 400;
    
            throw error;
        }

        res.status(200).send("A felhasználónak a jogosultsága megváltozott!");
    }
    catch(error){
        next(error)
    }
}

exports.getAllNotifs = async (req,res,next) =>{
    const id = req.query.id;

    try{
        const getNotifs = await settingsConfirmService.getAllNotifs(id);
        
        if(!getNotifs){
            const error = new Error("Valami hiba történt az értesítések lekérése közben");
    
            error.status = 400;
    
            throw error;
        }

        res.status(200).send(getNotifs);
    }
    catch(error){
        next(error)
    }
}