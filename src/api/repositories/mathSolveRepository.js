const db = require("../database/dbContext");

const { Op } = require('sequelize');

const { Sequelize, DataTypes } = require('sequelize');

class UserRepository
{
    constructor(db)
    {
        this.Users = db.Users;

        this.Tokenz = db.Tokenz;

        this.User_customization = db.User_customization;
    }

    async registerUser(user) {
        const newUser = await this.Users.build(user);
        
        await newUser.save();
    
        const newUserCustomization = await this.addUserCustom(newUser.id);
        
        return newUser;
    }
    
    async addUserCustom(user_id) {
        const user_custom = {
            id: null,
            darkmode: false,
            profil_picture: null,
            user_id: user_id,
        };
        const newUser_custom = await this.User_customization.build(user_custom);

        await newUser_custom.save();
        
        return newUser_custom;
    }

    async checkUser(email, user_name)
    {
        try{
            const check_user = await this.Users.findOne({
                where: {
                    [Op.or]: [
                        { email: email },
                        { user_name: user_name }
                    ]
                }
            })

            return check_user;
        }
        catch(error){
            throw error;
        }
    }

    async uploadToken(tokenz)
    {
        const newToken = await this.Tokenz.build(tokenz);

        await newToken.save();
        
        return newToken;
    }

    async getToken(token,user_id)
    {
        return await this.Tokenz.findOne
        (
            {
                where: {
                    [Op.and]:{
                        token: String(token),
                        user_id: user_id,
                    }
                }
            }
        )
    }

    async getUseridThroughToken(token)
    {
        return await this.Tokenz.findOne
        (
            {
                where: {
                    [Op.and]:{
                        token: String(token),
                        type: 1,
                    }
                }
            }
        )
    }

    async SetNewPassword(user_id, new_password)
    {
        try {
            const user = await this.Users.findOne({
                where: {
                    id: user_id,
                }
            });
            if (!user) {
                throw new Error("Felhasználó nem található!");
            }

            user.password = new_password;
            await user.save();
    
            return { success: true, message: "Jelszó sikeresen frissítve!" };
        } catch (error) {
            console.error("Hiba történt a jelszó frissítésekor:", error);
            return { success: false, message: "Hiba történt a jelszó frissítésekor!", error };
        }
    }

    async getUsers()
    {
        return await this.Users.findAll();
    }

    async getUser(email)
    {
        return await this.Users.findOne
        (
            {
                where:
                {
                    email: email,
                }
            }
        )
    }

    async getUserAndCustomization(email) {
        try {
            const userWithCustomization = await this.Users.findOne({
                where: { email: email },
                include: [{
                    model: this.User_customization,
                    required: true,
                }],
            });

            return userWithCustomization;
        } catch (error) {
            console.error('Hiba történt a felhasználó és a testreszabás lekérése során:', error);
            throw error;
        }
    }

    async activateUser(id)
    {
        const User = await this.Users.findByPk(id);

        User.activated = 1; 

        await User.save();

        return User.activated == 1;
    }

}

module.exports = new UserRepository(db);