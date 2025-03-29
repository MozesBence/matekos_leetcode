import { useMutation, useQuery } from "@tanstack/vue-query";
import axios from "axios";
import {type Ref} from 'vue'

const wayBackToken = async (userId: number, taskId: number) => {
    console.log("Sending request with:", userId, taskId);
    try {
        const response = await axios.post('/api/handle-way-back-token/useWayBackToken', null, {
            params: {
                userId: userId,
                taskId: taskId
            }
        });
        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in wayBackToken:", error);
        throw error;
    }
};

export const UsewayBackToken = (userId: Ref<number | null>, taskId: Ref<number>) => {
    return useMutation({
        mutationFn: () => wayBackToken(userId.value ?? 0, taskId.value),
        mutationKey: ['redeemWayBackToken', userId.value, taskId.value]
    });
};


const deactivateToken = async (userId:Number,taskId:Number) => {
    try{
        const response = await axios.put('/api/handle-way-back-token/deactivate-token',{
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

export const UsedeactivateToken = (userId:Ref<Number>,taskId:Ref<Number>) => {
    return useMutation({
        mutationFn: () => deactivateToken(userId.value,taskId.value),
        mutationKey:['redeemWayBackToken',userId.value,taskId.value]
    })
}