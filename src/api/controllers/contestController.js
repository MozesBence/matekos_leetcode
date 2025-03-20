const contestService = require("../services/contestService");

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