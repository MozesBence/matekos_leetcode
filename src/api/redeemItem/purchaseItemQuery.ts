import { useMutation } from "@tanstack/vue-query";
import axios from "axios";
import {type Ref} from 'vue'
const purchaseItem = async(data:{userId:Number,currency:String, itemId:Number, amount:Number}) => {
    try{
        const response = await axios.post('/api/transactions/purchaseitem',data);
        return response.data;
    }catch(error){
        console.error(`Error a tranzakció végrehajtása közben! error:${error}`)
    }
}

export const UsePurchaseItem = (data:Ref<{userId:Number,currency:String,itemId:Number, amount:Number}>) => {
    return useMutation({
        mutationFn: () => purchaseItem(data.value),
        mutationKey:['purchase',data.value.itemId],
        onSuccess(data) {
            console.log('Purchase successful', data);
          },
          onError(error) {
            console.error('Purchase failed', error);
          }
    })
}