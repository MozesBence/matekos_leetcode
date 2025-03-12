const quoteService = require('../services/quoteService')

const getQuote = async (req,res) => {
    try{
        const quote = await quoteService.getQuote();
        res.status(200).json(quote);
    }catch(error){
        console.error('Error in controller:', error.message);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getQuote
}