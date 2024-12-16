import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'

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
