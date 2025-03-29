const quoteService = require('../services/quoteService')

const getQuote = async (req,res,next) => {
    try{
        const quote = await quoteService.getQuote();

        if(!quote){
            const error = new Error("Nem sikerült lekérni a napi idézetet!");

            error.status = 400;

            throw error;
        }

        res.status(200).json(quote);
    }catch(error){
        next(error);
    }
}

module.exports = {
    getQuote
}