import { useMutation } from "@tanstack/vue-query";
import axios from "axios";

const Quote = async () => {
    try{
        const response = await axios.get('/api/quotes');
        return response.data.quote;
    }catch(error){
        console.log(`Error in quote store! Error: ${error}`)
    }
}
export const UseQuote = () => {
    return useMutation({
        mutationFn: Quote,
        onSuccess:(data)=> {
            console.log(data.quote)
        },
        onError:(error)=>{
            console.log(`Error in quote store! Error: ${error}`)
        }
    })
}