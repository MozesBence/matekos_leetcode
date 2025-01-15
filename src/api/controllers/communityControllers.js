const communityService = require("../services/communityService");

exports.postUpload = async (req, res, next) => {
    const {id, title, content} = req.body;
    const files = req.files;

    const newPost = {
        id: null,
        title: title,
        content: content,
        likes: 0,
        dislike: 0,
        user_id: id,
    }

    const post_result = await communityService.postUpload(newPost);

    const postFiles_result = await communityService.postFilesUpload(files, post_result.id);

    console.log(postFiles_result); // Fájlok

    res.status(200).send({ message: 'Files received', files: req.files });
};