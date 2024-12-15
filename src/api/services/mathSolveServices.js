const mathSolveRepository  = require("../repositories/mathSolveRepository");

class UserService
{
    async registerUser(user)
    {
        return await mathSolveRepository.registerUser(user);
    }

    async checkUser(email, user_name)
    {
        return await mathSolveRepository.checkUser(email, user_name);
    }

    async uploadToken(tokenz)
    {
        return await mathSolveRepository.uploadToken(tokenz);
    }

    async getToken(token,user_id)
    {
        return await mathSolveRepository.getToken(token,user_id);
    }

    async getUseridThroughToken(token)
    {
        return await mathSolveRepository.getUseridThroughToken(token);
    }

    async SetNewPassword(user_id, new_password)
    {
        return await mathSolveRepository.SetNewPassword(user_id, new_password);
    }

    async getUsers()
    {
        return await mathSolveRepository.getUsers();
    }

    async getUser(email)
    {
        return await mathSolveRepository.getUser(email);
    }

    async activateUser(id)
    {
        return await mathSolveRepository.activateUser(id);
    }
}

module.exports = new UserService();