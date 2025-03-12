const db = require("../database/dbContext");
const { Sequelize } = require("../database/dbContext");

const quoteRepository = {
    async getQuote(){
        try{
            return await db.DailyQuote.findOne();
        }catch(error){
            console.error('Hiba idéyet fetchelése közben! Error:', error);
            throw error;  
        }
    }

}

module.exports = quoteRepository;