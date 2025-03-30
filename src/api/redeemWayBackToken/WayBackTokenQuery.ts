import { useMutation, useQuery } from "@tanstack/vue-query";
import axios from "axios";
import {type Ref} from 'vue'

const wayBackToken = async (userId: number, taskId: number) => {
    try {
        const response = await axios.post('/api/handle-way-back-token/useWayBackToken', null, {
            params: {
                userId: userId,
                taskId: taskId
            }
        });
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


const deactivateToken = async (userId: number, taskId: number) => {
    try {
        const response = await axios.put('/api/handle-way-back-token/deactivate-token', null, {
            params: {
                userId: userId,
                taskId: taskId
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const UsedeactivateToken = (userId: Ref<number | null>, taskId: Ref<number>) => {
    return useMutation({
        mutationFn: () => deactivateToken(userId.value ?? 0, taskId.value),
        mutationKey: ['redeemWayBackToken', userId.value, taskId.value],
    });
};



const checkToken = async(userId:Number,taskId:Number) => {
    try{
        const response = await axios.get('/api/handle-way-back-token/check-token',{
            params:
            {
                userId:userId,
                taskId:taskId
            }
    });
    return response.data;
    }catch(error){
        throw error;
    }
}

export const UseCheckToken = (userId: Ref<number | null>, taskId: Ref<number>) =>{
    return useQuery({
        queryFn: () => checkToken(userId.value??0,taskId.value),
        queryKey:['checkedToken',userId.value,taskId.value],
        enabled:false
    })
}