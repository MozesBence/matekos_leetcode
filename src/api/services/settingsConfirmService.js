const settingsConfirmRepository  = require("../repositories/settingsConfirmRepository");

class settingsConfirmService
{
    async setConfirmCode(token)
    {
        return await settingsConfirmRepository.setConfirmCode(token);
    }

    async codeConfirm(code, id){
        return await settingsConfirmRepository.codeConfirm(code, id);
    }

    async setNewUsername(id,content){
        return await settingsConfirmRepository.setNewUsername(id,content);
    }

    async setNewGmail(id,content){
        return await settingsConfirmRepository.setNewGmail(id,content);
    }

    async setNewPassword(id,content){
        return await settingsConfirmRepository.setNewPassword(id,content);
    }
}

module.exports = new settingsConfirmService();