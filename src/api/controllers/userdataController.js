const userdataService = require('../services/userdataService');

const getUserData = async (req, res, next) => {
    try {
        const { id } = req.query;

        const userinfo = await userdataService.getUserInfo(id);

        if(!userinfo){
            const error = new Error("Nem sikerült a lekérni a felhasználó statisztikáit!");

            error.status = 400;

            throw error;
        }

        res.status(200).json(userinfo);
    } catch (error) {
        next(error);
    }
};
const getRollBackTokensCount = async (req, res, next) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            const error = new Error("userId is required");

            error.status = 400;

            throw error;
        }

        const tokenCount = await userdataService.getRollBackTokensCount(userId);
        res.status(200).json(tokenCount);
    } catch (error) {
        next(error);
    }
};

const getUserById = async(req,res,next) => {

}

module.exports = {
    getUserData,
    getRollBackTokensCount,
    getUserById
  };