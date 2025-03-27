const userRepository = require('../repositories/userdataRepository');
class UserInfo {
    async getUserInfo(id) {
        try {
            return await userRepository.getUserInfo(id);
        } catch (error) {
            throw error;
        }
    }
    async getRollBackTokensCount(userId){
        try{
            return await userRepository.getRollBackTokensCount(userId);
        }catch(error){
            throw error;
        }
    }
    async getUserById(id){
        try{
            return await userRepository.getUserById(id);
        }catch(error){
            throw error;
        }
    }
}

module.exports = new UserInfo();
