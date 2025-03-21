const db = require('../database/dbContext')
const {Users} = db;

const userDataRepository = {
    async getUserInfo(id) {
        return await Users.findOne({ where: { id } });
    },

   
};

module.exports = userDataRepository;
