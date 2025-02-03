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
        order: [['createdAt', 'DESC']],
        attributes: {
          include: [
            [
              Sequelize.literal(`(
                SELECT COUNT(*) 
                FROM Community_comments 
                WHERE Community_comments.post_id = Community_posts.id
              )`),
              'total_comments'
            ]
          ]
        },
        include: [
          { model: this.Community_files },
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
          {
            model: this.Community_comments,
            required: false
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
        attributes: {
          include: [
            [
              Sequelize.literal(`(
                SELECT COUNT(*) 
                FROM Community_comments AS replies
                WHERE replies.parent_comment_id = Community_comments.id
              )`),
              'total_replies',
            ],
          ],
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
          {
            model: this.Community_comments,
            as: 'replies',
          },
        ],
      });

      const commentIds = comments.map(comment => comment.id);
      
      const replies = await this.Community_comments.findAll({
        where: {
          parent_comment_id: commentIds,
        },
        limit: 11,
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
        comment.replies = replies.filter(reply => reply.parent_comment_id === comment.id);
      }

      const postsWithComments = posts.map(post => {
        const postJSON = post.toJSON();
        
        postJSON.Community_comments = comments.filter(comment => comment.post_id === post.id);
      
        return postJSON;
      });

      const postsWithBase64Files = postsWithComments.map(postObj => {

        postObj.userReaction = null;
        postObj.newComment = "";
        postObj.showComments = false;
      
        postObj.images = [];
        postObj.files = [];
      
        if (postObj.Community_files && postObj.Community_files.length > 0) {
          postObj.Community_files.forEach(file => {
            const fileBuffer = file.file;
            const mimeType = file.file_type || 'application/octet-stream';
      
            const base64File = Buffer.from(fileBuffer).toString('base64');
            const base64Data = `data:${mimeType};base64,${base64File}`;
      
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
          
          const profileProfPicMimeType = postObj.User.User_customization.profil_picture_type || 'image/jpeg';
          
          if (profileProfPicBuffer) {
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

          if (comment.User.User_customization.profil_picture != null) {
            const profileProfPicBuffer = comment.User.User_customization.profil_picture;
            
            const profileProfPicMimeType = comment.User.User_customization.profil_picture_type || 'image/jpeg';
            
            if (profileProfPicBuffer) {
              const base64Image = Buffer.from(profileProfPicBuffer).toString('base64');
              comment.User.User_customization.profil_picture = `data:${profileProfPicMimeType};base64,${base64Image}`;
            }
          }

          Comments.push({
            id: comment.id,
            User: comment.User,
            user_name: comment.User.user_name,
            content: comment.content,
            user_id: comment.user_id,
            post_id: comment.post_id,
            parent_comment_id: comment.parent_comment_id,
            total_comments: comment.dataValues.total_replies,
            like: Number(comment.Community_likes[0]?.dataValues.total_likes) ?? null,
            dislike: Number(comment.Community_likes[0]?.dataValues.total_dislikes) ?? null,
            userReaction: userReactionForComment,
            limitedComments: 10,
            prepareReply: false,
            gotEdit: comment.gotEdit,
            editable: false,
            comments: comment.replies == undefined ? [] : comment.replies.map(inner_comment => {
              let inner_userReactionForComment = null;

              let inner_User = {};

              if (inner_comment.Community_likes && inner_comment.Community_likes.length > 0) {
                const userLike = inner_comment.Community_likes[0].dataValues.user_reacted;
                inner_userReactionForComment = userLike ? userLike : null;
              }

              let inner_prof = null;

              if (inner_comment.User.User_customization.profil_picture != null) {
                const profileProfPicBuffer = inner_comment.User.User_customization.profil_picture;
                
                const profileProfPicMimeType = inner_comment.User.User_customization.profil_picture_type || 'image/jpeg';

                
                if (profileProfPicBuffer) {
                  const base64Image = Buffer.from(profileProfPicBuffer).toString('base64');
                  inner_prof = `data:${profileProfPicMimeType};base64,${base64Image}`;
                }
              }

              inner_User = {id: inner_comment.User.id, user_name: inner_comment.User.user_name, User_customization : {profil_picture: inner_prof}};

              return {
                id: inner_comment.id,
                User: inner_User,
                user_name: inner_comment.User.user_name,
                content: inner_comment.content,
                user_id: inner_comment.user_id,
                post_id: inner_comment.post_id,
                linkAuthor: inner_comment.linkAuthor,
                parent_comment_id: inner_comment.parent_comment_id,
                like: Number(inner_comment.Community_likes[0]?.dataValues.total_likes) ?? null,
                dislike: Number(inner_comment.Community_likes[0]?.dataValues.total_dislikes) ?? null,
                prepareReply: false,
                gotEdit: inner_comment.gotEdit,
                editable: false,
                userReaction: inner_userReactionForComment,
                createdAt: inner_comment.createdAt,
              };
            }),
            createdAt: comment.createdAt,
            commentLimit: 10
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
          gotEdit: postObj.gotEdit,
          editable: false,
          files: postObj.files,
          limitedComments: 10,
          commentLimit: 10
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
    const existingReaction = await this.Community_likes.findOne({
      where: {
        entity_id: post_id,
        entity_type: upload_type,
        user_id: user_id
      }
    });
  
    if (existingReaction) {
      if (existingReaction.like_type === 'like') {
        await existingReaction.destroy();
        return { message: 'Like törölve' };
      } else if (existingReaction.like_type === 'dislike') {
        existingReaction.like_type = 'like';
        await existingReaction.save();
        return existingReaction;
      }
    }  else {
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
    const existingReaction = await this.Community_likes.findOne({
      where: {
        entity_id: post_id,
        entity_type: upload_type,
        user_id: user_id
      }
    });
  
    if (existingReaction) {
      if (existingReaction.like_type === 'dislike') {
        await existingReaction.destroy();
        return { message: 'Dislike törölve' };
      } else if (existingReaction.like_type === 'like') {
        existingReaction.like_type = 'dislike';
        await existingReaction.save();
        return existingReaction;
      }
    } else {
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

  async commentEdit(content, comment_id) {
    const comment = await this.Community_comments.findOne({
      where: { id: comment_id },
    });

    if (!comment) {
      throw new Error("A komment nem található!");
    }

    comment.content = content;
    comment.gotEdit = true;
  
    await comment.save();

    return comment;
  }  
}

module.exports = new communityRepository(db);