const db = require("../database/dbContext");

const { Op } = require('sequelize');

const { Sequelize, DataTypes } = require('sequelize');

class settingsConfirmRepository
{
    constructor(db)
    {
        this.Tokenz = db.Tokenz;

        this.Users = db.Users;
    }

    async setConfirmCode(token) {
        const existingToken = await this.Tokenz.findOne({
            where: { user_id: token.user_id }
        });
    
        if (existingToken) {
            // Ha az új token ugyanaz, de más mező változna (pl. expires), töröljük és újat hozunk létre
            if (existingToken.expires !== token.expires) {
                await existingToken.destroy();
                return await this.Tokenz.create(token);
            }
    
            // Ha csak a "token" mezőt kell módosítani, akkor frissítjük
            existingToken.token = token.token;
            await existingToken.save();
            return existingToken;
        }
    
        // Ha nincs még ilyen user_id, akkor új rekordot hozunk létre
        return await this.Tokenz.create(token);
    }

    async codeConfirm(code, id){
        const CodeChecker =  await this.Tokenz.findOne({
            where: { 
                token: code,
                user_id: id,
                type: 'beállítások'
            }
        });

        return CodeChecker;
    }

    async setNewUsername(id,content){
        const user =  await this.Users.findOne({
            where: { 
                id: id,
            }
        });

        user.user_name = content;

        user.save();

        return "Felhasználó neve meglett változtatva!";
    }
}

module.exports = new settingsConfirmRepository(db);