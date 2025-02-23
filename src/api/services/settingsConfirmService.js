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

    async getElseUserById(id){
        return await settingsConfirmRepository.getElseUserById(id);
    }

    async getReports(){
        return await settingsConfirmRepository.getReports();
    }
}

module.exports = new settingsConfirmService();