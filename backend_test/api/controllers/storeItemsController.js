const storeService = require('../services/storeItemsServices')


const getItems = async (req, res, next) => {
    try {
        const items = await storeService.getItems();

        if(!items){
            const error = new Error("Nem sikerült lekérni az áruház termékeit!");

            error.status = 400;

            throw error;
        }

        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
};

module.exports = { getItems };
