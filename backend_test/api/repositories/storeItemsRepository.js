const db = require("../database/dbContext");
const {StoreItems} = db;

const StoreRepository = {
    async getItem() {
        return await StoreItems.findAll();
    }
}
module.exports = StoreRepository;