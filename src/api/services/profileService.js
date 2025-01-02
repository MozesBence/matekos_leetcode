const profileRepository  = require("../repositories/profileRepository");

class profileService
{
    async getUserAndCustomization(email)
    {
        return await profileRepository.getUserAndCustomization(email);
    }

    async ProfPicUpload(id, blob, type, mimeType)
    {
        return await profileRepository.ProfPicUpload(id, blob, type, mimeType);
    }

    async DarkmodeUpload(id, darkmode)
    {
        return await profileRepository.DarkmodeUpload(id, darkmode);
    }
}

module.exports = new profileService();