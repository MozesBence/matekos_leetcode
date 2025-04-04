import { useMutation, useQuery } from "@tanstack/vue-query";
import axios from "axios";

const Quote = async () => {
    try{
        const response = await axios.get('/api/quotes/request-quote');
        return response.data.quote;
    }catch(error){
        console.log(`Error in quote store! Error: ${error}`)
    }
}
export const UseQuote = () => {
    return useQuery({
        queryFn: Quote,
        queryKey:["quote"],
    })
}