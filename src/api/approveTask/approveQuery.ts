import { userId } from "@/stores/userStore";
import { useMutation } from "@tanstack/vue-query";
import axios from "axios";

const validateTask = async(data: {taskId: number, validity: number, user_id: number, from_user_id:number, message: string}) =>{
    try{
        const response = await axios.post('/api/tasks/validateTask/', data);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const UseValidateTask = () => {
    return useMutation({
        mutationFn: validateTask,
        onSuccess(response) {
          
        },
        onError: (error: any) => {
          
        },
    })
}