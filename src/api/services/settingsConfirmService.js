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
}

module.exports = new settingsConfirmService();