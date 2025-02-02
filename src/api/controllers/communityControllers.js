const communityService = require("../services/communityService");

exports.getLimitedPosts = async (req, res, next) => {
    const { limit, id } = req.query;

    const get_posts = await communityService.getLimitedPost(limit,id);

    res.status(200).send(get_posts == null ? 'null' : get_posts);
};

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

    try{
        const post_result = await communityService.postUpload(newPost);

        if(post_result == null){
            const error = new Error("Sikertelen volt a poszt feltöltés!");

            error.status(400);

            throw error;
        }
    
        const postFiles_result = await communityService.postFilesUpload(files, post_result.id);

        if(postFiles_result == null){
            const error = new Error("A poszt feltöltése megtörtént de sikertelen volt a fájl(ok) feltöltése(i)!");

            error.status(400);

            throw error;
        }
    
        res.status(201).json(post_result);
    }
    catch(error){
        next(error);
    }
};

exports.postLike = async (req,res,next)=>{
    const {post_id, user_id, upload_type, type} = req.body;

    var like_result = null;

    if(type == 0){
        like_result = await communityService.postLike(post_id, upload_type, user_id);
    }
    else if(type == 1){
        like_result = await communityService.postDislike(post_id, upload_type, user_id);
    }
    try{
        if(like_result == null){
            const error = new Error("Sikertelen volt a reakció feltöltés!");

            error.status(400);

            throw error;
        }

        res.status(200).send(like_result);
    }
    catch(error){
        next(error);
    }
}

exports.postComment = async (req,res,next)=>{
    const {content, linkAuthor, linked_id, user_id, type } = req.body;

    var comment = null;
    if(type == 0){
        comment = {
            id: null,
            content: content,
            linkAuthor: linkAuthor,
            post_id: linked_id,
            parent_comment_id: null,
            user_id: user_id
        }
    }
    else if(type == 1){
        comment = {
            id: null,
            content: content,
            linkAuthor: linkAuthor,
            post_id: null,
            parent_comment_id: linked_id,
            user_id: user_id
        }
    }

    const comment_result = await communityService.postComment(comment);
    try{
        if(comment_result == null){
            const error = new Error("Sikertelen volt a comment feltöltés!");

            error.status(400);

            throw error;
        }

        res.status(200).send(comment_result);
    }
    catch(error){
        next(error);
    }
}