const contestService = require("../services/contestService");
require('dotenv').config(); 

const jwt = require("jsonwebtoken");

exports.getLeaderBoard = async (req, res, next) => {
    try{
        const get_leaderBoard = await contestService.getLeaderBoard();

        if(!get_leaderBoard){
            const error = new Error("Nem sikerült lekérni a ranglistát!");

            error.status = 400;

            throw error;
        }

        res.status(200).send(get_leaderBoard);
    }catch(error){
        next(error)
    }
};

exports.getChallange = async (req, res, next) => {
    try{
        const {id, define, token} = req.query;

        const secretKey = process.env.JWT_KEY;

        var decoded = null;
        
        if(token){
            decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        }

        const getChallange = await contestService.getChallange(id, define, decoded ? decoded.id : null);

        if(!getChallange){
            const error = new Error("Nem sikerült lekérni a verseny feladatokat!");

            error.status = 400;

            throw error;
        }

        res.status(200).send(getChallange);
    }catch(error){
        next(error)
    }
};

exports.getPrevChallange = async (req, res, next) => {
    try{
        const {token} = req.query;

        const secretKey = process.env.JWT_KEY;

        var decoded = null;
        
        if(token){
            decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        }

        const getPrevChallange = await contestService.getPrevChallange(decoded ? decoded.id : null);

        if(!getPrevChallange){
            const error = new Error("Nem sikerült lekérni a verseny feladatokat!");

            error.status = 400;

            throw error;
        }

        res.status(200).send(getPrevChallange.reverse());
    }catch(error){
        next(error)
    }
};

exports.uploadSolution = async (req, res, next) => {
    try{
        const {data, comp_id} = req.body;

        const token = req.headers['token'];

        const secretKey = process.env.JWT_KEY;

        var decoded = null;

        if(token){
            decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        }

        if(!decoded){
            const error = new Error("Nem található a felhasználó!")

            error.status = 404;

            throw error;
        }
            
        const get_results = await contestService.getSolutionResults(data);

        if(!get_results){
            const error = new Error("Nem sikerült leellenőrizni a feladatokat!");

            error.status = 400;

            throw error;
        }

        const upload_comp = await contestService.getUploadResults(get_results, decoded.id, comp_id);

        if(upload_comp != 'OK'){
            const error = new Error("Valami hibatörtént a feladatok feltöltése közben!");

            error.status = 500;

            throw error;
        }
        
        console.log(data, comp_id, token);

        res.status(201).send("Feltöltve!");
    }catch(error){
        next(error)
    }
};