const db = require("../database/dbContext");

const TransactionRepository = {
    async purchaseItem({ userId, currency, itemId, amount }) {
        try {
            await this.deductCurrency({ userId, amount });
            return await db.Transactions.create({
                UserId: userId,
                currency: currency,
                itemId: itemId,
                amount: amount
            });
        } catch (error) {
            throw error;
        }
    },

    async deductCurrency({ userId, amount }) {
        try {
            const user = await db.Users.findOne({
                where: { id: userId },
                attributes: ['currency_count']
            });

            if (!user) {
                throw new Error('Nincs ilyen user');
            }

            const newCurrencyCount = user.currency_count - amount;

            
            if (newCurrencyCount < 0) {
                throw new Error('Nincs elég pénz a tranzakció végrehajtásához!');
            }

            return await db.Users.update(
                {
                    currency_count: newCurrencyCount
                },
                {
                    where: { id: userId }
                }
            );
        } catch (error) {
            throw error;
        }
    }
};

module.exports = TransactionRepository;

