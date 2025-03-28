import axiosClient from '@/lib/axios';
import { useQuery } from '@tanstack/vue-query';
import { computed, type Ref } from 'vue';
const fetchThemes = async () => {
    try {
        const response = await axiosClient.get('/api/themes');
        return response.data;
    } catch (error) {
        console.error(`Error in theme store! Error ${error}`);
    }
}

export const UseThemes = () => {
    return useQuery({
        queryFn: fetchThemes,
        queryKey: ['allthemes'],
    });
}

const getThemeById = async (theme_id:Number) => {
    try{
        const response = await axiosClient.get(`/api/getThemeById/${theme_id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}
export const UseGetThemeById = (id: Ref<number | null>) => {
    return useQuery({
        queryFn: () => id.value ? getThemeById(id.value) : Promise.resolve(null), 
        queryKey: ['currentTheme', id],
        enabled: computed(() => id.value !== null && id.value !== 0),
    });
};
