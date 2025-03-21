const db = require("../database/dbContext");

const TransactionRepository = {
    async purchaseItem({ userId, currency, itemId, amount,price }) {
        try {
            await this.deductCurrency({ userId, amount, price });
            this.AddItem({userId,itemId,amount,price});
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

    async deductCurrency({ userId, amount,price }) {
        try {
            const user = await db.Users.findOne({
                where: { id: userId },
                attributes: ['currency_count']
            });

            if (!user) {
                throw new Error('Nincs ilyen user');
            }

            const newCurrencyCount = user.currency_count - price * amount;

            
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
    },
    async AddItem({ userId, itemId, amount }) {
        const item = await db.StoreItems.findOne({
            where: {
                id: itemId
            },
            attributes: ['name']
        });
    
        if (!item) {
            throw new Error("Item not found.");
        }
    
        switch (item.name) {
            case "Időfordító Zseton":
                await db.Users.update(
                    {
                        roll_back_token: db.sequelize.literal(`roll_back_token + ${amount}`)
                    },
                    {
                        where: {
                            id: userId
                        }
                    }
                );
                break;
        }
    }
};

module.exports = TransactionRepository;

