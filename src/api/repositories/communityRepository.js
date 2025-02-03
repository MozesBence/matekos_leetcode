const db = require("../database/dbContext");

const { Op } = require('sequelize');

const { Sequelize, DataTypes, fn, literal } = require('sequelize');


class communityRepository
{
    constructor(db)
  {
      this.Users = db.Users;

      this.User_customization = db.User_customization;

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
        order: [['createdAt', 'DESC']],  // Esetleg használj id-t, ha nincs createdAt oszlop
        include: [
          { model: this.Community_files },
          {
            model: this.Users, 
            attributes: ['id', 'user_name'],
            include: [
              {
                model: this.User_customization,  // User_customization tábla
                attributes: ['profil_picture'],  // Csak a profilkép oszlopot húzzuk le
              },
            ],
          },
          {
            model: this.Community_likes,
            required: false,
            where: { entity_type: 'post' },
            attributes: [
              [
                Sequelize.literal(`(
                  SELECT COUNT(*) FROM Community_likes 
                  WHERE Community_likes.entity_id = Community_posts.id 
                  AND Community_likes.entity_type = 'post' 
                  AND Community_likes.like_type = 'like'
                )`),
                'total_likes',
              ],
              [
                Sequelize.literal(`(
                  SELECT COUNT(*) FROM Community_likes 
                  WHERE Community_likes.entity_id = Community_posts.id 
                  AND Community_likes.entity_type = 'post' 
                  AND Community_likes.like_type = 'dislike'
                )`),
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
      
      const postIds = posts.map(post => post.id);
      
      // Kommentek számának lekérdezése külön:
      const comments = await this.Community_comments.findAll({
        where: {
          post_id: postIds,
        },
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: this.Users,
            attributes: ['id', 'user_name'],
            include: [
              {
                model: this.User_customization,
                attributes: ['profil_picture'],
              },
            ],
          },
          {
            model: this.Community_likes,
            required: false,
            where: { entity_type: 'comment' },
            attributes: [
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
                      Sequelize.literal(`COALESCE((  
                        SELECT like_type  
                        FROM Community_likes  
                        WHERE Community_likes.entity_id = Community_comments.id  
                        AND Community_likes.entity_type = 'comment'  
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
      
      const replies = await this.Community_comments.findAll({
        where: {
          parent_comment_id: Sequelize.col('Community_comments.id'),
        },
        include: [
          {
            model: this.Users,
            attributes: ['id', 'user_name'],
            include: [
              {
                model: this.User_customization,
                attributes: ['profil_picture'],
              },
            ],
          },
          {
            model: this.Community_likes,
            required: false,
            where: { entity_type: 'comment' },
            attributes: [
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
                      Sequelize.literal(`COALESCE((  
                        SELECT like_type  
                        FROM Community_likes  
                        WHERE Community_likes.entity_id = Community_comments.id  
                        AND Community_likes.entity_type = 'comment'  
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
      
      for (let comment of comments) {
        // Az adott kommenthez tartozó válaszok hozzáadása
        comment.replies = replies.filter(reply => reply.parent_comment_id === comment.id);
      }

      // Összefűzés
      const postsWithComments = posts.map(post => {
        // A poszt adatainak másolása
        const postJSON = post.toJSON();
      
        // Kézi módosítás: total_comments hozzárendelése
        const commentCount = comments.filter(comment => comment.post_id === post.id).length;
        postJSON.total_comments = commentCount;
      
        // Kommentek hozzáadása
        postJSON.Community_comments = comments.filter(comment => comment.post_id === post.id);
      
        return postJSON;
      });

      const postsWithBase64Files = postsWithComments.map(postObj => {
      
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

        if (postObj.User.User_customization.profil_picture != null) {
          const profileProfPicBuffer = postObj.User.User_customization.profil_picture;
          
          const profileProfPicMimeType = postObj.User.User_customization.profil_picture_type || 'image/jpeg'; // Alapértelmezett MIME típus
          
          if (profileProfPicBuffer) {
            // Blob fájl átalakítása Base64 formátumba
            const base64Image = Buffer.from(profileProfPicBuffer).toString('base64');
            postObj.User.User_customization.profil_picture = `data:${profileProfPicMimeType};base64,${base64Image}`;
          }
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
            const userLike = comment.Community_likes[0].dataValues.user_reacted;
            userReactionForComment = userLike ? userLike : null;
          }

          Comments.push({
            id: comment.id,
            User: comment.User,
            user_name: comment.User.user_name,
            content: comment.content,
            user_id: comment.user_id,
            post_id: comment.post_id,
            parent_comment_id: comment.parent_comment_id,
            total_comments: comment.dataValues.total_comments,
            like: Number(comment.Community_likes[0]?.dataValues.total_likes) ?? null,
            dislike: Number(comment.Community_likes[0]?.dataValues.total_dislikes) ?? null,
            userReaction: userReactionForComment,
            limitedComments: 10,
            prepareReply: false,
            comments: comment.replies == undefined ? [] : comment.replies.map(inner_comment => {
              let inner_userReactionForComment = null;

              if (inner_comment.Community_likes && inner_comment.Community_likes.length > 0) {
                const userLike = inner_comment.Community_likes[0].dataValues.user_reacted;
                inner_userReactionForComment = userLike ? userLike : null;
              }

              return {
                id: inner_comment.id,
                User: inner_comment.User,
                user_name: inner_comment.User.user_name,
                content: inner_comment.content,
                user_id: inner_comment.user_id,
                post_id: inner_comment.post_id,
                linkAuthor: inner_comment.linkAuthor,
                parent_comment_id: inner_comment.parent_comment_id,
                like: Number(inner_comment.Community_likes[0]?.dataValues.total_likes) ?? null,
                dislike: Number(inner_comment.Community_likes[0]?.dataValues.total_dislikes) ?? null,
                prepareReply: false,
                userReaction: inner_userReactionForComment,
                createdAt: inner_comment.createdAt,
              };
            }),            
            createdAt: comment.createdAt,
          });
        });
      
        const FinalPost = {
          id: postObj.id,
          title: postObj.title,
          content: postObj.content,
          createdAt: postObj.createdAt,
          user_id: postObj.user_id,
          user_name: postObj.User.user_name,
          files: postObj.Community_files,
          comments: Comments,
          total_comments: postObj.total_comments,
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

    console.log(existingReaction);
  
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