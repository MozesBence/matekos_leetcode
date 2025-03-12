const quoteRepository = require('../repositories/quoteRepository');

class QuoteService{

    async getQuote() {
        try{
            return await quoteRepository.getQuote();
        }catch(error){
            throw error;
        }
    }
}
module.exports = new QuoteService();