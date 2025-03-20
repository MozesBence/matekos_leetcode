const transactionService = require('../services/transactionService');

const purchaseItem = async (req, res, next) => {
    try {
        console.log(req.body); 
        const { userId, currency, itemId, amount } = req.body;
        const resp = await transactionService.purchaseItem({ userId, currency, itemId, amount });
        res.status(201).json(resp);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Hiba a tranzakció végrehajtása közben: ${error.message}`);
    }
};

module.exports = { purchaseItem };
