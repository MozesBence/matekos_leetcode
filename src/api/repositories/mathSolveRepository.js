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
            profil_picture_type: null,
            background_picture: null,
            background_picture_type: null,
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
            if (userWithCustomization && userWithCustomization.User_customization) {
                const profileProfPicBuffer = userWithCustomization.User_customization.profil_picture;
                const profileBackPicBuffer = userWithCustomization.User_customization.background_picture;
            
                const profileProfPicMimeType = userWithCustomization.User_customization.profil_picture_type || 'image/jpeg'; // Alapértelmezett MIME típus
                const profileBackPicMimeType = userWithCustomization.User_customization.background_picture_type || 'image/jpeg'; // Alapértelmezett MIME típus

                if (profileProfPicBuffer) {
                    // Blob fájl átalakítása Base64 formátumba
                    const base64Image = Buffer.from(profileProfPicBuffer).toString('base64');
                    userWithCustomization.User_customization.profil_picture = `data:${profileProfPicMimeType};base64,${base64Image}`;
                }
            
                if (profileBackPicBuffer) {
                    // Blob fájl átalakítása Base64 formátumba
                    const base64Image = Buffer.from(profileBackPicBuffer).toString('base64');
                    userWithCustomization.User_customization.background_picture = `data:${profileBackPicMimeType};base64,${base64Image}`;
                }
            }

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

    async ProfPicUpload(id, blob, type, mimeType)
    {
        try {
            const user = await this.User_customization.findOne({
                where: {
                    user_id: id,
                }
            });
            if (!user) {
                throw new Error("Felhasználó nem található!");
            }

            if(type == '0'){
                user.profil_picture = blob;
                user.profil_picture_type = mimeType;
            }else if(type == '1'){
                user.background_picture = blob;
                user.background_picture_type = mimeType;
            }
            await user.save();
    
            return { success: true, message: "Profilkép sikeresen frissítve!"};
        } catch (error) {
            console.error("Hiba történt a profilkép frissítésekor:", error);
            return { success: false, message: "Hiba történt a profilkép frissítésekor!", error };
        }
    }

    async DarkmodeUpload(id, darkmode){
        const User = await this.User_customization.findByPk(id);

        User.darkmode = darkmode; 

        await User.save();

        return "Felhasználónak firssült a kinézet!";
    }

}

module.exports = new UserRepository(db);