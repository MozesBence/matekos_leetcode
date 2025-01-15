const communityRepository  = require("../repositories/communityRepository");

class communityService
{
    async postUpload(post)
    {
        return await communityRepository.postUpload(post);
    }

    async postFilesUpload(files,post_id)
    {
        return await communityRepository.postFilesUpload(files, post_id);
    }
}

module.exports = new communityService();