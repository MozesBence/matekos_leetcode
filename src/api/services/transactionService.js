const transactionRepository = require('../repositories/transactionRepository');

class TransactionService {
    async purchaseItem({ userId, currency, itemId, amount }) {
        try {
            return await transactionRepository.purchaseItem({ userId, currency, itemId, amount });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TransactionService();
