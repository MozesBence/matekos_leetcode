import { defineStore } from "pinia";
import axios from 'axios';

export const useThemeStore = defineStore('themeStore',{
    state: () => (
        {
            themes: [] as any[],
        }
    ),
    actions: {
        async fetchThemes(){
            try{
                const response = await axios.get('/api/themes');
                this.themes = response.data;
            }catch(error){
                console.log(`Error in theme store! Error ${error}`)
            }
        },
    },
});