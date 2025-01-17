const db = require("../database/dbContext");

const { Op } = require('sequelize');

const { Sequelize, DataTypes } = require('sequelize');


class communityRepository
{
    constructor(db)
    {
        this.Users = db.Users;

        this.Community_posts = db.Community_posts;

        this.Community_files = db.Community_files;

        this.Community_comments = db.Community_comments;
    }

    async getLimitedPost(limit) {
      // Gondoskodj arról, hogy a limit egy szám legyen
      const parsedLimit = parseInt(limit, 10);
    
      if (isNaN(parsedLimit) || parsedLimit <= 0) {
        throw new Error('The limit parameter must be a positive integer.');
      }
    
      const posts = await this.Community_posts.findAll({
        limit: parsedLimit, // A limit értéke most már helyesen szám
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: this.Community_files,
          },
          {
            model: this.Community_comments,
            include: [
              {
                model: this.Community_comments, // Gyerek kommentek kapcsolása
              },
            ],
          },
        ],
      });

      const postsWithBase64Files = posts.map(post => {
        // Átalakítjuk az instanciát sima objektummá
        const postObj = post.get({ plain: true });
      
        // Hozzáadjuk a kívánt mezőket az objektumhoz, alapértelmezett értékekkel
        postObj.userReaction = null;
        postObj.newComment = "";
        postObj.showComments = false;
      
        // Létrehozzuk az images és files tömböket
        postObj.images = [];
        postObj.files = [];
      
        if (postObj.Community_files && postObj.Community_files.length > 0) {
          postObj.Community_files.forEach(file => {
            const fileBuffer = file.file; // Feltételezve, hogy BLOB típusú
            const mimeType = file.file_type || 'application/octet-stream'; // Alap MIME típus
      
            // BLOB fájl átalakítása Base64 formátumba
            const base64File = Buffer.from(fileBuffer).toString('base64');
            const base64Data = `data:${mimeType};base64,${base64File}`;
      
            // Fájl hozzáadása az images vagy files tömbhöz a MIME típus alapján
            if (mimeType.startsWith('image/')) {
              postObj.images.push({
                ...file,
                file: base64Data
              });
            } else {
              postObj.files.push({
                ...file,
                file: base64Data
              });
            }
          });
        }
      
        return postObj;
      });
      
      return postsWithBase64Files;
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

            await newFiles.save();
            saveFiles.push(newFiles);
        }
        
        return saveFiles;
    }
}

module.exports = new communityRepository(db);