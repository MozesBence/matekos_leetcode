const storeService = require('../services/storeItemsServices')


const getItems = async (req, res, next) => {
    try {
        const items = await storeService.getItems();
        res.status(200).json(items);
    } catch (error) {
        console.error("Hiba a store elemeinek lekérése közben!");
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getItems };


module.exports = {getItems}