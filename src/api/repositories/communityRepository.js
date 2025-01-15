const db = require("../database/dbContext");

const { Op } = require('sequelize');

const { Sequelize, DataTypes } = require('sequelize');

class communityRepository
{
    constructor(db)
    {
        this.Community_posts = db.Community_posts;

        this.Community_files = db.Community_files;
    }

    async postUpload(post) {
        const newPost = await this.Community_posts.build(post);
        
        await newPost.save();
        
        return newPost;
    }

    async postFilesUpload(files, postId) {
        const saveFiles = [];
        for (let file of files) {
            const newFiles = await this.Community_files.build({
                id: null,
                file_name: file.originalname,
                file_size: file.size,
                file_type: file.mimetype,
                file: file.buffer,
                post_id: postId,
            });

            console.log(newFiles);
    
            // Mentés adatbázisba
            await newFiles.save();
            saveFiles.push(newFiles);
        }
        
        return saveFiles;
    }
}

module.exports = new communityRepository(db);