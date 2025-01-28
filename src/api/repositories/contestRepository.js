const db = require("../database/dbContext");

const { Op } = require('sequelize');

const { Sequelize, DataTypes } = require('sequelize');

class contestRepository
{
    constructor(db)
    {
        this.Users = db.Users;

        this.User_customization = db.User_customization;
    }

    async getLeaderBoard()
    {
        const userWithCustomization = await this.Users.findAll({
            order: [['experience_point', 'DESC']],
            limit: 10,
            include: [{
                model: this.User_customization,
                required: true,
            }],
        });

        const UsersOnLeaderboard = [];

        userWithCustomization.forEach(user => {
            if (user && user.User_customization) {
                const profileProfPicBuffer = user.User_customization.profil_picture;
                const profileProfPicMimeType = user.User_customization.profil_picture_type || 'image/jpeg';
                if (profileProfPicBuffer) {
                    const base64Image = Buffer.from(profileProfPicBuffer).toString('base64');
                    user.User_customization.profil_picture = `data:${profileProfPicMimeType};base64,${base64Image}`;
                }
            }

            UsersOnLeaderboard.push({id: user.id, name: user.user_name, profil_picture: user.User_customization.profil_picture, experience_point: user.experience_point});
        });

        

        return UsersOnLeaderboard;
    }
}

module.exports = new contestRepository(db);