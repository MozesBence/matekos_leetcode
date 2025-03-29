const { where } = require("sequelize");
const db = require("../database/dbContext");
const themes = require("../models/themes");

const TokenRedeemRepository = {
    async useWayBackToken(userId, taskId) {
        try {
            const hasTokens = await this.CheckUsersTokens(userId);
            if (!hasTokens) {
                return null;
            }
            if(await this.CheckMonthlySpend(userId) < 3)
            {
                const [tokenRedeem, created] = await db.TokenRedeems.findOrCreate({
                    where: { user_id: userId, task_id: taskId },
                    defaults: {
                        state: 'active',
                        submission_date: new Date()
                    }
                });
                if (created) {
                    await this.DeductWayBackToken(userId);
                }
    
                return { success: true, data: tokenRedeem, created };
            }else{
                return null;
            }
        } catch (error) {
           
            throw error;
        }
    },

    async CheckUsersTokens(userId) {
        const user = await db.Users.findOne({
            where: { id: userId },
            attributes: ['roll_back_token']
        });

        return user && user.roll_back_token > 0;
    },

    async CheckMonthlySpend(userId) {
        try {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
    
            return await db.TokenRedeems.count({
                where: {
                    user_id: userId,
                    submission_date: {
                        [db.Sequelize.Op.gte]: new Date(currentYear, currentMonth, 1),
                        [db.Sequelize.Op.lt]: new Date(currentYear, currentMonth + 1, 1)
                    },
                }
            });
        } catch (error) {
            throw error;
        }
    },
    

    async DeductWayBackToken(userId) {
        return await db.Users.decrement('roll_back_token', {
            by: 1,
            where: { id: userId }
        });
    },

    async deactivateToken(userId, taskId) {
        try {
            const [updatedRows] = await db.TokenRedeems.update(
                { state: 'inactive' },
                { where: { user_id: userId, task_id: taskId } }
            );
            return updatedRows > 0;
        } catch (error) {
            throw error;
        }
    },

    async checkToken(userId,taskId){
        try{
            const isExists = await db.TokenRedeems.findOne({
                where:{
                    user_id:userId,
                    task_id:taskId,
                    state: "active"
                },
            });
            return !!isExists;
        }catch(error){
            throw error;
        }
    }
    
};

module.exports = TokenRedeemRepository;



