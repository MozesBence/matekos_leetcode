import axiosClient from '@/lib/axios';
import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import { UseQuote } from '../quote/QuoteQuery';
import { type Ref } from 'vue';
const fetchThemes = async () => {
    try {
        const response = await axiosClient.get('/themes');
        return response.data;
    } catch (error) {
        console.error(`Error in theme store! Error ${error}`);
    }
}

export const UseThemes = () => {
    return useQuery({
        queryFn: fetchThemes,
        queryKey: ['allthemes'],
        onSuccess: (data) => {
            console.log('Fetched themes:', data);
        },
        onError: (error) => {
            console.log(`Error in theme store! Error ${error}`);
        }
    });
}

const getThemeById = async (theme_id:Number) => {
    try{
        const response = await axiosClient.get(`/getThemeById/${theme_id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}
export const UseGetThemeById = (id:Ref<Number>) => {
    return useQuery({
        queryFn: () => getThemeById(id.value),
        queryKey: ['currentTheme',id.value]
    })
}