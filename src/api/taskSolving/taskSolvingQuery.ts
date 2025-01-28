import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'
import type { Ref } from 'vue'

const ProfileGetUser = async (id: number) => {
    const response = await axiosClient.get('http://localhost:3000/task/', {headers: {id: id}});
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
