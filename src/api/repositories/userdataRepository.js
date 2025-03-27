const db = require('../database/dbContext')
const {Users} = db;

const userDataRepository = {
    async getUserInfo(id) {
        return await Users.findOne({ where: { id } });
    },
    async getRollBackTokensCount(userId){
        return await Users.findOne({
            where:{
                id: userId
            },
            attributes:['roll_back_token']
        })
    },
    async getUserById(id){
        return await Users.findOne({
            where:{
                id:id
            },
            attributes:['user_name']
        })
    }
   
};

module.exports = userDataRepository;
