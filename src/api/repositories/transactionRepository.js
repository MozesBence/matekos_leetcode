const db = require("../database/dbContext");

const TransactionRepository = {
    async purchaseItem({ userId, currency, itemId, amount }) {
        const t = await db.sequelize.transaction();
        try {
            const item = await db.StoreItems.findOne({
                where: { id: itemId },
                attributes: ['price', 'name'],
                transaction: t
            });
    
            if (!item) {
                throw new Error("Item not found.");
            }
            await this.deductCurrency({ userId, amount, price: item.price, transaction: t });

            await db.Transactions.create({
                UserId: userId,
                currency: currency,
                itemId: itemId,
                amount: amount
            }, { transaction: t });
    
            await this.AddItem({ userId, itemId, amount, transaction: t });
    
            await t.commit();
            return { success: true };
        } catch (error) {
            await t.rollback();
            throw error;
        }
    },
    
    async deductCurrency({ userId, amount, price, transaction }) {
        try {
            const user = await db.Users.findOne({
                where: { id: userId },
                attributes: ['currency_count'],
                lock: transaction.LOCK.UPDATE,
                transaction
            });
    
            if (!user) {
                throw new Error('Nincs ilyen user');
            }
    
            const newCurrencyCount = user.currency_count - price * amount;
            if (newCurrencyCount < 0) {
                throw new Error('Nincs elég pénz a tranzakció végrehajtásához!');
            }
    
            await db.Users.update(
                { currency_count: newCurrencyCount },
                { where: { id: userId }, transaction }
            );
    
            return { success: true, newCurrencyCount };
        } catch (error) {
            throw error;
        }
    },
    
    async AddItem({ userId, itemId, amount, transaction }) {
        const item = await db.StoreItems.findOne({
            where: { id: itemId },
            attributes: ['name'],
            transaction
        });
    
        if (!item) {
            throw new Error("Item not found.");
        }
    
        switch (item.name) {
            case "Időfordító Zseton":
                await db.Users.update(
                    { roll_back_token: db.sequelize.literal(`roll_back_token + ${amount}`) },
                    { where: { id: userId }, transaction }
                );
                break;
        }
    }    
};

module.exports = TransactionRepository;

