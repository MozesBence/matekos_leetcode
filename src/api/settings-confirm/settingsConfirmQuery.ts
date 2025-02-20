import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'
import type { Ref } from 'vue'

const getSettingsConfirm = async (data: {email: string, user_name: string, id: number}) => {
    const response = await axiosClient.get('http://localhost:3000/get-confirm-code', {
        params: data,
    });
    return response.data
}

export const useGetSettingsConfirm = () => {
    return useMutation({
        mutationFn: getSettingsConfirm,
        onMutate: () => {

        },
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}

const setNewSettings = async (data: {content: string[], code: number, id: number, type: string}) => {
    const response = await axiosClient.patch('http://localhost:3000/set-settings', data);
    return response.data
}

export const useSetSettings = () => {
    return useMutation({
        mutationFn: setNewSettings,
        onMutate: () => {

        },
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}
