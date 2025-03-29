const db = require("../database/dbContext");
const { Sequelize } = require("../database/dbContext");

const quoteRepository = {
    async getQuote(){
        return await db.DailyQuote.findOne();
    }
}

module.exports = quoteRepository;