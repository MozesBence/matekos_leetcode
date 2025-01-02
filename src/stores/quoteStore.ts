import { defineStore } from "pinia";
import axios from "axios";

export const useQuoteStore = defineStore('quoteStore',{
    state: () =>({
        quote: '' as string,
    }),
    actions:{
        async fetchQuote(){
            try{
                const response = await axios.get('/api/quotes');
                this.quote = response.data.quote;
            }catch(error){
                console.log(`Error in quote store! Error: ${error}`)
            }
        },
    },
});