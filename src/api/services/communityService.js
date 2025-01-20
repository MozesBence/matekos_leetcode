const communityRepository  = require("../repositories/communityRepository");

class communityService
{
    async getLimitedPost(limit){
        return await communityRepository.getLimitedPost(limit);
    }

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