const profileService = require("../services/profileService");

exports.postUpload = async (req, res, next) =>{
    const {id, title, content, type} = req.body;

    console.log(id, title, content);

    res.status(200).send(id);
}