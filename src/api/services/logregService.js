const logregRepository  = require("../repositories/logregRepository");

class logregService
{
    async checkUser(email, user_name)
    {
        return await logregRepository.checkUser(email, user_name);
    }
    
    async registerUser(user)
    {
        return await logregRepository.registerUser(user);
    }

    async getUser(email)
    {
        return await logregRepository.getUser(email);
    }

    async getToken(token,user_id)
    {
        return await logregRepository.getToken(token,user_id);
    }
    
    async activateUser(id)
    {
        return await logregRepository.activateUser(id);
    }
    
    async uploadToken(tokenz)
    {
        return await logregRepository.uploadToken(tokenz);
    }

    async getUserAndCustomization(email)
    {
        return await logregRepository.getUserAndCustomization(email);
    }

    async SetNewPassword(user_id, new_password)
    {
        return await logregRepository.SetNewPassword(user_id, new_password);
    }
}

module.exports = new logregService();