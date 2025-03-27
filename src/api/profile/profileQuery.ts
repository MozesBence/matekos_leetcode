import axiosClient from '../../lib/axios'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'
import type { ProfilPicdata } from "./profile"
import { userId } from '@/stores/userStore';
import axios from 'axios';
import { type Ref } from 'vue';

const ProfileGetUser = async (data: { token: string | null; id: number }): Promise<any> => {
    try {
        const response = await axiosClient.get('http://localhost:3000/profile', {
        headers: {
            token: data.token,
            id: data.id,
        },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        throw error; // Ha hiba van, továbbítjuk, hogy a hívó kezelhesse
    }
};

export const useProfileGetUser = () => {
    return useMutation({
        mutationFn: ProfileGetUser,
        onSuccess: (user) => {

        },
        onError: (error: any) => {
            console.error('Hiba történt a felhasználó lekérésekor:', error);
        },
        }
    );
}

const ProfilePicUpload = async (data: ProfilPicdata) => {
    const formData = new FormData();
    formData.append('blob', data.pic);  // A fájl blob néven
    formData.append('id', data.id.toString());  // ID
    formData.append('type', data.type.toString());  // type

    try {
        const response = await axiosClient.patch('http://localhost:3000/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data
    } catch (error: any) {
        console.error('Request failed:', error.response ? error.response.data : error.message);
    }
};

export const useProfilePicUpload = () => {
    return useMutation({
        mutationFn: ProfilePicUpload,
        onSuccess: (user) => {
            
        },
        onError: (error: any) => {
            console.error('Hiba történt a profilkép feltöltése közben :', error);
        },
        }
    );
}


const ProfileDarkMode = async (data: Object) => {
    try {
        const response = await axiosClient.patch('http://localhost:3000/profile', data);
    } catch (error: any) {
        console.error('Request failed:', error.response ? error.response.data : error.message);
    }
};

export const useProfileDarkmodeSwitch = () => {
    return useMutation({
        mutationFn: ProfileDarkMode,
        onSuccess: (user) => {

        },
        onError: (error: any) => {
            console.error('Hiba történt a darkmode feltöltése közben :', error);
        },
        }
    );
}

const getMonthlySolvingRate = async (userId: Number) => {
    try {
        const response = await axiosClient.get('/api/task_solution/monthlySolvingRate', {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const UseGetMonthlySolvingRate = (userId: Number) => {
    return useQuery({
        queryFn: () => getMonthlySolvingRate(userId),
        queryKey: ['monthlysolverate', userId],
    });
};

const getMostRecentlyTriedTask = async(userId:Number) => {
    try{
        const response = await axiosClient.get('/api/task_solution/mostRecentlyTriedTask',{ params: { userId }})
        return response.data;
    }catch(error)
    {
        console.error(error);
        return null;
    }
}


export const UseGetMostRecentlyTriedTask = (userId: Number) => {
    return useQuery({
        queryFn: () => getMostRecentlyTriedTask(userId),
        queryKey: ['mostRecentlyTriedTask', userId],
    });
}


const getUserById = async (userId: Number) => {
    console.log('userId',userId)
    try{
        const response = await axiosClient.get(`/api/userData/getUserById/${userId}`);
        console.log(response.data)
        return response.data;
    }catch(error){
        throw error;
    }
}


export const UseGetUserById = (userId:Ref<Number>) => {
    return useQuery({
        queryFn: () => getUserById(userId.value),
        queryKey:['creator_name',userId.value]
    })
}