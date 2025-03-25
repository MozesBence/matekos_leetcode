import { userId } from "@/stores/userStore";
import { useMutation } from "@tanstack/vue-query";
import axios from "axios";
import {type Ref} from 'vue'
const validateTask = async(taskId:Number,validity:Number) =>{
    try{
        const response = await axios.get('/api/tasks/validateTask/',{
            params:{taskId:taskId,validity:validity}
        });
        return response.data;
    }catch(error){
        throw error;
    }
}

export const UseValidateTask = (data:Ref<{taskId:Number,validity:Number}>) => {
    return useMutation({
        mutationFn: () => validateTask(data.value.taskId,data.value.validity),
        mutationKey:['validatetask']
    })
}