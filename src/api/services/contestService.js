const contestRepository  = require("../repositories/contestRepository");

class contestService
{
    async getLeaderBoard(){
        return await contestRepository.getLeaderBoard();
    }

    async getChallange(id, define){
        return await contestRepository.getChallange(id, define);
    }

    async getPrevChallange(week){
        return await contestRepository.getPrevChallange(week);
    }
}

module.exports = new contestService();