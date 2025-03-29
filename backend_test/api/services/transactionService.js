const transactionRepository = require('../repositories/transactionRepository');

class TransactionService {
    async purchaseItem({ userId, currency, itemId, amount, price }) {
        try {
            return await transactionRepository.purchaseItem({ userId, currency, itemId, amount, price });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TransactionService();
