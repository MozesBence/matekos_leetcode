import axios from "axios";
import { defineStore } from "pinia";


export const useCardsStore = defineStore('cardsStore',{
    state: () => ({
        cards: [] as any[]
    }),
    actions:{
        async fetchCards(){
            try{
                const response = await axios.get('/api/tasks/get-cards-info');
                this.cards = response.data;
            }catch(error){
                console.log(`Error in cards store! Error: ${error}`)
            }
        },
    },
});