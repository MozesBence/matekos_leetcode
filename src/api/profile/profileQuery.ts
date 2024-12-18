import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'
import { ref } from 'vue'
import type { ProfilPicdata } from "./profile"

const ProfileGetUser = async (email: string) => {
    const response = await axiosClient.get('http://localhost:3000/profile', {headers: {email: email}});
    return response.data;
}

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

    console.log(data);

    try {
        const response = await axiosClient.patch('http://localhost:3000/profile', formData);
        console.log('Server response:', response.data);
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
