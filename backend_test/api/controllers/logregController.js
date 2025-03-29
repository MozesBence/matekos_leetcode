const logregServices = require("../services/logregService");
require("dotenv").config();

const bcrypt = require("bcrypt");

const salt = 10;

const jwt = require("jsonwebtoken");

const nodemailer = require('nodemailer');

exports.registerUser = async (req, res, next) =>
{
    const { email, user_name, password } = req.body;

    const newUser =
    {
        id: null,
        email: email,
        password: await bcrypt.hash(password, salt),
        user_name: user_name,
        user_role: "admin",
        experience_level: 0,
        currency_cout: 0,
        admin: 1,
        activated: 1,
    }

    const user_check = await logregServices.checkUser(email, user_name);
    
    try{

        if(user_check != null){
            if(user_check.email == email){ 
                const error = new Error("Már van regisztrálva ilyen felhasználó ezzel az email-el!");

                error.status = 400;
    
                throw error;
            }else{
                const error = new Error("Már van ilyen felhasználó ezzel felhasználó névvel!");

                error.status = 400;
    
                throw error;
            }
        }

        
        try{
            const result = await logregServices.registerUser(newUser);
            
            if(result && result.id != null)
            {
                // token generálás
                const token = jwt.sign(
                    { email: email },
                    process.env.JWT_KEY,
                    { expiresIn: '1h' }
                );
                // Verifikációs token
                const newToken =
                {
                    token: token,
                    type: "regisztrálás",
                    user_id: result.id,
                }

                const token_result = await logregServices.uploadToken(newToken);

                res.status(201).send('A felhasználó regisztrálva lett és az email el lett küldve!');
            };
        }catch(error){
            next(error);
        }
    }
    catch(error){
        next(error);
    }
}

exports.successRegister = async (req,res,next) =>{
    const { token } = req.body;

    token_result = token != 'null' ? await logregServices.getToken(token) : null;

    try{
        if(token_result == null){
            const error = new Error("Nem megfelelő a token vagy már nem létezik!");
            
            error.status = 404;

            throw error;
        }

        const user = await logregServices.getUser(null,token_result.user_id);

        if(user.activated == 1){
            const error = new Error("A felhasználó már aktiválva lett!");
            
            error.status = 400;
            
            throw error;
        }

        const user_activated = await logregServices.activateUser(token_result.user_id);

        
        if(user_activated == false){
            const error = new Error("Nem lehetett a felhasználót aktiválni!");
            
            error.status = 500;
            
            throw error;
        }

        res.status(200).send("A felhasználó sikeresen aktiválva lett!");
    }
    catch(error){
        next(error);
    }
}
    
exports.loginUser = async (req, res, next) =>
{
    const { email, password, rememberMe } = req.body;
    
    const user = await logregServices.getUser(email,null);

    try
    {
        if(user == null || await bcrypt.compare(password, user.password) == false)
        {
            const error = new Error("Nem sikerült a bejelentkezés!");

            error.status = 400;

            throw error;
        }

        if(user != null && user.activated == 0)
        {
            const error = new Error("A profil nincs aktiválva!");

            error.status = 400;

            throw error;
        }

        if(user != null && user.activated == 2)
        {
            const error = new Error("A felhasználó ki van tíltva a weboldalról!");

            error.status = 400;

            throw error;
        }

        const user_activated = await logregServices.activateUser(user.id);

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_KEY,
            rememberMe ? {} : { expiresIn: '1d' }
        );

        res.status(200).send(token);
    }
    catch(error)
    {
        next(error);
    }
}
    
exports.forgetPassword = async (req, res, next) =>{
    const { email } = req.body;

    const user = await logregServices.getUser(email, null);
    try{
        if(user == null){
            const error = new Error("Ilyen felhasználó nem létezik!");

            error.status = 404;

            throw error;
        }


        // token generálás
        const token = jwt.sign(
            { email: email },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );

        // Verifikációs token
        const newToken =
        {
            token: token+"Teszt", //Hozzá kell tenni mert nem mindig működik a teszteknél, van hogy ugyan azt a tokent generálja ki
            type: 1,
            user_id: user.id,
        }

        const token_result = await logregServices.uploadToken(newToken);
        
        // Verifikációs link
        const verificationLink = `http://localhost:5173/set-new-password?token=${token_result.token}`;

        res.status(200).send('Új jelszó kérelem el lett küldve a emailre!');
    }
    catch(error){
        next(error);
    }
}
    
exports.setNewPassword = async (req, res, next) =>{
    const { token, password } = req.body;

    try
    {
        if(token == 'null' || token == null)
        {
                const error = new Error("Rossz az elérési útvonal!");
                
                error.status = 400;
                
                throw error;
        }
        
        const token_result = await logregServices.getUseridThroughToken(token);

        if(token_result.user_id == null)
        {
            const error = new Error("A felhasználó nem létezik!");

            error.status = 400;

            throw error;
        }

        if(token_result.type != 1)
        {
            const error = new Error("Rossz token lett használva!");

            error.status = 400;

            throw error;
        }

        const hashed_password = await bcrypt.hash(password, salt);

        const password_change_result = await logregServices.SetNewPassword(token_result.user_id, hashed_password);
        if(password_change_result.success){
            res.status(200).send(password_change_result.message)
        }else{
            res.status(400).send(password_change_result.message)
        }
    }
    catch(error)
    {
        next(error);
    }
}