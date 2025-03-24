const transactionService = require('../services/transactionService');

const purchaseItem = async (req, res, next) => {
    try {
        console.log(req.body); 

        const { userId, currency, itemId, amount } = req.body;

        const resp = await transactionService.purchaseItem({ userId, currency, itemId, amount });

        if(!resp){
            const error = new Error("Nem sikerült megvásárolni az adott terméket!");

            error.status = 400;

            throw error;
        }
        
        res.status(201).json(resp);
    } catch (error) {
        next(error)
    }
};

const useRollBackToken = async(req,res,next) => {
    
}

module.exports = { purchaseItem };
