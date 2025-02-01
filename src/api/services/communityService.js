const communityRepository  = require("../repositories/communityRepository");

class communityService
{
    async getLimitedPost(limit, id){
        return await communityRepository.getLimitedPost(limit, id);
    }

    async postUpload(post)
    {
        return await communityRepository.postUpload(post);
    }

    async postFilesUpload(files,post_id)
    {
        return await communityRepository.postFilesUpload(files, post_id);
    }

    async postLike(post_id, upload_type, user_id)
    {
        return await communityRepository.postLike(post_id, upload_type, user_id);
    }

    async postDislike(post_id, upload_type, user_id)
    {
        return await communityRepository.postDislike(post_id, upload_type, user_id);
    }

    async postComment(comment)
    {
        return await communityRepository.postComment(comment);
    }
}

module.exports = new communityService();