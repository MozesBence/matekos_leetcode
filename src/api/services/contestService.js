const contestRepository  = require("../repositories/contestRepository");

class contestService
{
    async getLeaderBoard(){
        return await contestRepository.getLeaderBoard();
    }

    async getChallange(id, define){
        return await contestRepository.getChallange(id, define);
    }
}

module.exports = new contestService();