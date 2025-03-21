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


module.exports = {
    getUserData,
  };