const { where } = require("sequelize");
const db = require("../database/dbContext");

const TokenRedeemRepository = {
    async useWayBackToken(userId, taskId) {
        try {
            const hasTokens = await this.CheckUsersTokens(userId);
            if (!hasTokens) {
                return null;
            }

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
    }
    
};

module.exports = TokenRedeemRepository;



