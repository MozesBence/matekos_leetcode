const db = require("../database/dbContext");

const { Op } = require('sequelize');

const { Sequelize, DataTypes, fn, literal } = require('sequelize');


class communityRepository
{
    constructor(db)
  {
      this.Users = db.Users;

      this.Community_posts = db.Community_posts;

      this.Community_files = db.Community_files;

      this.Community_comments = db.Community_comments;

      this.Community_likes = db.Community_likes;
    }

    async getLimitedPost(limit, userId) {
      // Gondoskodj arról, hogy a limit egy szám legyen
      const parsedLimit = Number(limit);
    
      if (isNaN(parsedLimit) || parsedLimit <= 0) {
        throw new Error('The limit parameter must be a positive integer.');
      }

      const posts = await this.Community_posts.findAll({
        limit: parsedLimit,
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
                include: [
                  {
                    model: this.Users, // Gyerek kommentek felhasználói
                    attributes: ['id', 'user_name'],
                  },
                ],
              },
              {
                model: this.Users, // Kommentek felhasználói
                attributes: ['id', 'user_name'],
              },
              {
                model: this.Community_likes, // Kommentek like-jai
                required: false,
                where: { entity_type: 'comment' },
                attributes: [
                  'id',
                  [
                    Sequelize.literal(`(
                      SELECT COUNT(*) 
                      FROM Community_likes 
                      WHERE Community_likes.entity_id = Community_comments.id 
                      AND Community_likes.entity_type = 'comment' 
                      AND Community_likes.like_type = 'like'
                    )`),
                    'total_likes',
                  ],
                  [
                    Sequelize.literal(`(
                      SELECT COUNT(*) 
                      FROM Community_likes 
                      WHERE Community_likes.entity_id = Community_comments.id 
                      AND Community_likes.entity_type = 'comment' 
                      AND Community_likes.like_type = 'dislike'
                    )`),
                    'total_dislikes',
                  ],
                  ...(userId
                    ? [
                        [
                          Sequelize.literal(`(
                            SELECT like_type
                            FROM Community_likes
                            WHERE Community_likes.entity_id = Community_comments.id
                            AND Community_likes.entity_type = 'comment'
                            AND Community_likes.user_id = ${userId}
                            LIMIT 1
                          )`),
                          'user_reacted',
                        ],
                      ]
                    : []),
                ],
              },
            ],
          },
          {
            model: this.Users, // Posztok felhasználói
            attributes: ['id', 'user_name'],
          },
          {
            model: this.Community_likes, // Posztok like-jai
            required: false,
            where: { entity_type: 'post' },
            attributes: [
              [
                Sequelize.fn('SUM', Sequelize.literal("CASE WHEN `Community_likes`.`like_type` = 'like' THEN 1 ELSE 0 END")),
                'total_likes',
              ],
              [
                Sequelize.fn('SUM', Sequelize.literal("CASE WHEN `Community_likes`.`like_type` = 'dislike' THEN 1 ELSE 0 END")),
                'total_dislikes',
              ],
              ...(userId
                ? [
                    [
                      Sequelize.literal(`COALESCE((
                        SELECT like_type
                        FROM Community_likes
                        WHERE Community_likes.entity_id = Community_posts.id
                        AND Community_likes.entity_type = 'post'
                        AND Community_likes.user_id = ${userId}
                        LIMIT 1
                      ), 'no_reaction')`),
                      'user_reacted',                    
                    ],
                  ]
                : []),
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
      
            // Fájl hozzáadása az images vagy files tömbökhöz a MIME típus alapján
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
      
        let userReaction = null;

        if (postObj.Community_likes && postObj.Community_likes.length > 0) {
          const userLike = postObj.Community_likes[0].user_reacted;
          userReaction = userLike ? userLike : null;
        }

        var Comments = [];

        postObj.Community_comments.forEach(comment =>{

          let userReactionForComment = null;

          if (comment.Community_likes && comment.Community_likes.length > 0) {
            const userLike = comment.Community_likes[0].user_reacted;
            userReactionForComment = userLike ? userLike : null;
          }

          Comments.push({
            id: comment.id,
            User: comment.User,
            content: comment.content,
            user_id: comment.user_id,
            post_id: comment.post_id,
            parent_comment_id: comment.parent_comment_id,
            like: Number(comment.Community_likes[0]?.total_likes) ?? null,
            dislike: Number(comment.Community_likes[0]?.total_dislikes) ?? null,
            userReaction: userReactionForComment,
            limitedComments: 10,
            comments: comment.Community_comments,
            createdAt: comment.createdAt,
          });
        });
      
        const FinalPost = {
          id: postObj.id,
          title: postObj.title,
          content: postObj.content,
          createdAt: postObj.createdAt,
          user_id: postObj.user_id,
          files: postObj.Community_files,
          comments: Comments,
          User: postObj.User,
          like: Number(postObj.Community_likes[0]?.total_likes) ?? null,
          dislike: Number(postObj.Community_likes[0]?.total_dislikes) ?? null,
          userReaction: userReaction,
          newComment: '',
          showComments: false,
          images: postObj.images,
          files: postObj.files,
          limitedComments: 10
        }
      
        return FinalPost;
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
  
  async postLike(post_id, upload_type, user_id) {
    // Először keresd meg, hogy van-e már reakciója a felhasználónak a poszthoz
    const existingReaction = await this.Community_likes.findOne({
      where: {
        entity_id: post_id,
        entity_type: upload_type,
        user_id: user_id
      }
    });
  
    if (existingReaction) {
      // Ha már van reakció
      if (existingReaction.like_type === 'like') {
        // Ha a reakció 'like', töröljük
        await existingReaction.destroy();
        return { message: 'Like törölve' };
      } else if (existingReaction.like_type === 'dislike') {
        // Ha a reakció 'dislike', módosítjuk 'like'-ra
        existingReaction.like_type = 'like';
        await existingReaction.save();
        return existingReaction; // Visszaadjuk a módosított reakciót
      }
    }  else {
      // Ha nincs reakció, hozz létre egy újat
      const newLike = await this.Community_likes.create({
        user_id: user_id,
        entity_id: post_id,
        entity_type: upload_type,
        like_type: 'like'
      });
      return newLike;
    }
  }

  async postDislike(post_id, upload_type, user_id) {
    // Először keresd meg, hogy van-e már reakciója a felhasználónak a poszthoz
    const existingReaction = await this.Community_likes.findOne({
      where: {
        entity_id: post_id,
        entity_type: upload_type,
        user_id: user_id
      }
    });
  
    if (existingReaction) {
      // Ha már van reakció
      if (existingReaction.like_type === 'dislike') {
        // Ha a reakció 'dislike', töröljük
        await existingReaction.destroy();
        return { message: 'Dislike törölve' };
      } else if (existingReaction.like_type === 'like') {
        // Ha a reakció 'like', módosítjuk 'dislike'-ra
        existingReaction.like_type = 'dislike';
        await existingReaction.save();
        return existingReaction;
      }
    } else {
      // Ha nincs reakció, hozz létre egy újat 'dislike' típusúval
      const newDislike = await this.Community_likes.create({
        user_id: user_id,
        entity_id: post_id,
        entity_type: upload_type,
        like_type: 'dislike'
      });
      return newDislike;
    }
  }

  async postComment(comment) {
    const newComment = await this.Community_comments.build(comment);
      
    await newComment.save();
    
    return newComment;
  }  
}

module.exports = new communityRepository(db);