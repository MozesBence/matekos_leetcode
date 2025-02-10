import { useMutation, useQuery } from "@tanstack/vue-query";
import axios from "axios";

const Themes = async() => {
    try{
        const response = await axios.get('/api/themes');
        return response.data;
    }catch(error){
        console.log(`Error in theme store! Error ${error}`)
    }
}

export const UseThemes = async () => {
    return useQuery({
        queryFn: Themes,
        onSuccess:(data)=>{
            console.log(data)
        },
        onError:(error)=>{
            console.log(`Error in theme store! Error ${error}`)
        }
    }) 
}
