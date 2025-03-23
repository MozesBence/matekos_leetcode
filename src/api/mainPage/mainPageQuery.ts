import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import {type Ref} from 'vue';
const getRollBackTokenCount = async(userId: Number) =>{
    console.log("tokenek szama: userid",userId)
    try{
        const response = await axios.get('/api/userdata/wayBackTokens',{
            params: {userId}
        });
        console.log('tokenek szama: ',response.data)
        return response.data;
    }catch(error){
        throw error;
    }
}

export const UsegetRollBackTokenCount = (userId:Ref<Number>) => {
    return useQuery({
        queryFn: () => getRollBackTokenCount(userId.value),
        queryKey:['rollBackTokenCount',userId.value]
    })
}