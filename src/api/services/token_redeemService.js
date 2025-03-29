const token_redeemRepository = require('../repositories/token_redeemRepository');

class token_Service{
    async useWayBackToken(userId,taskId){
        try{
            return await token_redeemRepository.useWayBackToken(userId,taskId)
        }catch(error){
            throw error;
        }
    }

    async deactivateToken(userId,taskId){
        try{
            return await token_redeemRepository.deactivateToken(userId,taskId)
        }catch(error){
            throw error;
        }
    }

    async checkToken(userId,taskId){
        try{
            return await token_redeemRepository.checkToken(userId,taskId);
        }catch(error){
            throw error;
        }
    }
}

module.exports = new token_Service();