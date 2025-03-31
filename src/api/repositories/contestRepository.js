const db = require("../database/dbContext");

const { Op, where } = require('sequelize');

const { Sequelize, DataTypes } = require('sequelize');

class contestRepository
{
    constructor(db)
    {
        this.Users = db.Users;

        this.User_customization = db.User_customization;

        this.Competitions = db.Competitions;

        this.Tasks = db.Tasks;

        this.Competition_submissions = db.Competition_submissions;
    }

    async getLeaderBoard()
    {
        const userWithCustomization = await this.Users.findAll({
            order: [['experience_point', 'DESC']],
            limit: 10,
            include: [{
                model: this.User_customization,
                required: false,
            }],
            where:{
                activated: 1
            }
        });

        const UsersOnLeaderboard = [];

        var baseXP = 10;

        const experienceForNextLevel = () => {
            return baseXP * 5;
        };
        
        const totalXPForLevel = (level) => {
            let totalXP = 0;
            for (let i = 1; i < level; i++) {
                totalXP += experienceForNextLevel(i);
            }
            return totalXP;
        };
        
        const calculateLevel = (xp) => {
            let level = 1;
            while (xp >= totalXPForLevel(level + 1)) {
                level++;
            }
            return level;
        };
        
        userWithCustomization.forEach(user => {
            if (user && user.User_customization) {
                const profileProfPicBuffer = user.User_customization.profil_picture;
                const profileProfPicMimeType = user.User_customization.profil_picture_type || 'image/jpeg';
                if (profileProfPicBuffer) {
                    const base64Image = Buffer.from(profileProfPicBuffer).toString('base64');
                    user.User_customization.profil_picture = `data:${profileProfPicMimeType};base64,${base64Image}`;
                }
            }
        
            // Szint kiszámítása experience_point alapján
            const userLevel = calculateLevel(user.experience_point || 0);
        
            UsersOnLeaderboard.push({
                id: user.id,
                name: user.user_name,
                profil_picture: user.User_customization.profil_picture,
                level: userLevel // Itt az experience_point helyett a szintet adjuk meg
            });
        });        

        return UsersOnLeaderboard;
    }

    async getChallange(id, define, user_id){
        if(user_id){
            return await this.Competitions.findOne({
                where:{
                    identifier: id,
                    define: define
                },
                include: [
                    {
                        model: this.Tasks,
                    },
                    {
                        model: this.Competition_submissions,
                        where: {
                            user_id: user_id
                        },
                        required: false,
                    }
                ]
            })
        }else{
            return await this.Competitions.findOne({
                where:{
                    identifier: id,
                    define: define
                },
                include: [
                    {
                        model: this.Tasks,
                    },
                ]
            })
        }
    }

    async getPrevChallange(id){
        if (id) {
            return await this.Competitions.findAll({
                include: [{
                    model: this.Competition_submissions,
                    where: {
                        user_id: id
                    },
                    required: false,
                }]
            });
        } else {
            return await this.Competitions.findAll();
        }
    }

    async getSolutionResults(data){
        var points = 0;
        var experience_points = 0;
        for(const solution of data){
            const task = await this.Tasks.findOne({
                where: {
                    id: solution.id
                }
            })

            if(task.solution == solution.solution){
                points++;
                experience_points += task.experience_points;
            }
        }

        return {point: points, exp: experience_points}
    }

    async getUploadResults(get_results, id, comp_id){
        await this.Competition_submissions.create({
            experience_level: get_results.exp,
            point: get_results.point,
            competition_id: comp_id,
            user_id: id
        });

        const user = await this.Users.findOne({
            where:{
                id: id
            }
        })

        user.experience_point = Number(user.experience_point) + get_results.exp;

        user.experience_point = Number(user.currency_count) + 15;
        
        user.save();

        return 'OK'
    }
}

module.exports = new contestRepository(db);