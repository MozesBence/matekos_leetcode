const token_redeemService = require('../services/token_redeemService')

const useWayBackToken = async (req,res,next) => {
    try{
        const {userId,taskId} = req.query;
        const data = await token_redeemService.useWayBackToken(userId,taskId)
        res.status(201).json(data);

    }catch(error){
        next(error);
    }
}

const deactivateToken = async(req,res,next) => {
    try{
        const {userId,taskId} = req.query;
        const data = await token_redeemService.deactivateToken(userId,taskId)
        res.status(200).json(data);

    }catch(error){
        next(error);
    }
}

module.exports = {
    useWayBackToken,
    deactivateToken
}