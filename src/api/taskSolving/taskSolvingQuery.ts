import axiosClient from '../../lib/axios';
import { useMutation } from '@tanstack/vue-query';
import type { Ref } from 'vue';

const GetTaskData = async (id: number) => {
    const response = await axiosClient.get(`http://localhost:5173/api/tasks/get-one-card/${id}`);
    return response.data;
}

export const UseGetTaskData = () => {
    return useMutation({
        mutationFn: (id: number) => GetTaskData(id), // Ensure the id is passed here
        onSuccess: (data) => {
            console.log('Task data:', data);
        },
        onError: (error: any) => {
            console.error('Error occurred while fetching task data:', error);
        },
    });
}
