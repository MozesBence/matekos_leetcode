import { useMutation } from "@tanstack/vue-query";
import axios from "axios";
import { type Ref } from 'vue';

const purchaseItem = async (data: { userId: number, currency: string, itemId: number, amount: number, price: number }) => {
    try {
        const response = await axios.post('/api/transactions/purchaseitem', data);
        return response.data;
    } catch (error) {
        console.error(`Error a tranzakció végrehajtása közben! error: ${error}`);
        throw error;
    }
};

export const UsePurchaseItem = (data: Ref<{ userId: number, currency: string, itemId: number, amount: number, price: number }>) => {
    return useMutation({
        mutationFn: () => purchaseItem(data.value),
        mutationKey: ['purchase', data.value.itemId],
        onSuccess(data) {
            console.log('Purchase successful', data);
        },
        onError(error) {
            console.error('Purchase failed', error);
        }
    });
};
