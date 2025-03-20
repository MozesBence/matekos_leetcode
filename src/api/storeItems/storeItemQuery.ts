import { useMutation,useQuery } from "@tanstack/vue-query";
import axios from "axios";


const fetchStoreItems = async()=>{
    try{
        const response = await axios.get('/api/store/getItems')
        console.log(response.data)
        return response.data;
    }catch(error){
        throw error;
    }
}


export const UseFetchStoreItems = () => {
    return useQuery({
        queryFn: fetchStoreItems,
        queryKey:['storeItems'],
    })
}