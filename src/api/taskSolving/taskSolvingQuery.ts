import axiosClient from '../../lib/axios';
import { useMutation } from '@tanstack/vue-query';
import type { TaskData } from '../taskSolving/taskSolving';

const GetTaskData = async (id: number) => {
    const response = await axiosClient.get(`http://localhost:5173/api/tasks/get-one-card/${id}`);
    console.log(`Response for tasks:`, response.data);
    return response.data;
}

export const useGetTaskData = () => {
    return useMutation({
        mutationFn: GetTaskData,
        onSuccess: (task: TaskData) => {
        },
        onError: (error: any) => {
            console.error('Hiba történt a felhasználó lekérésekor:', error);
        }
    });
};


