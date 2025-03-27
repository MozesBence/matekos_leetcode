import { useMutation, useQuery } from "@tanstack/vue-query";
import axios from "axios";
import {type Ref} from 'vue'

const wayBackToken = async (userId:Number,taskId:Number) => {
    try{
        const response = await axios.post('/api/handle-way-back-token/deactivate-token',{
            params:
            {
                userId:userId,
                taskId:taskId
            }
    });
    console.log(response.data)
    return response.data;
    }catch(error){
        throw error;
    }
}

export const UsewayBackToken = (userId:Ref<Number>,taskId:Ref<Number>) => {
    return useMutation({
        mutationFn: () => wayBackToken(userId.value,taskId.value),
        mutationKey:['redeemWayBackToken',userId.value,taskId.value]
    })
}