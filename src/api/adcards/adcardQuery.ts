import axiosClient from "@/lib/axios";
import { useQueries, useQuery } from "@tanstack/vue-query";
import axios from "axios";


const getAllAds = async() => {
    try{
    const response = await axios.get('/api/ads/get-ads-for-mainpage')
    return response.data
    }catch(error){
        console.log('Error az adcardQueryben!',error);
    }
}
export const useGetAllAds = () => {
    return useQuery({
        queryFn: getAllAds,
        queryKey:['adcards'],        
    })
}
