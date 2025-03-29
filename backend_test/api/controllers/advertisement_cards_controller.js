const advertisement_cards_service = require('../services/advertisement_cards_services')

const getAds = async (req,res,next) => {
    try{
        const data = await advertisement_cards_service.getAds();

        if(!data){
            const error = new Error("Nem sikerült lekérni a kártyák adatait!");

            error.status = 400;

            throw error;
        }

        res.status(200).json(data)
    }catch(error){
        next(error);
    }
}
module.exports = {
    getAds
}