const storeRepository = require('../repositories/storeItemsRepository')

class StoreItemsServices {
    async getItems(){
        try{
            return await storeRepository.getItem();
        }catch(error){
            throw error;
        }
    }
}
module.exports = new StoreItemsServices();