const db = require("../database/dbContext");

const { Op } = require('sequelize');

const { Sequelize, DataTypes } = require('sequelize');

class contestRepository
{
    constructor(db)
    {
        this.Users = db.Users;
    }

    async getLeaderBoard()
    {
        return await this.Users.findAll({
            order: [['experience_point', 'DESC']],
            limit: 10
        });
    }
}

module.exports = new contestRepository(db);