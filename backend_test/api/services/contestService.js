const contestRepository  = require("../repositories/contestRepository");

class contestService
{
    async getLeaderBoard(){
        return await contestRepository.getLeaderBoard();
    }

    async getChallange(id, define, user_id){
        return await contestRepository.getChallange(id, define, user_id);
    }

    async getPrevChallange(id){
        return await contestRepository.getPrevChallange(id);
    }

    async getSolutionResults(data){
        return await contestRepository.getSolutionResults(data);
    }
    
    async getUploadResults(get_results,id, comp_id){
        return await contestRepository.getUploadResults(get_results, id, comp_id);
    }
}

module.exports = new contestService();