import axiosClient from '../../lib/axios';
import { useMutation, useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import type { Ref } from 'vue';


const GetTaskData = async (id: number) => {
    try{
        const response = await axiosClient.get(`/api/tasks/get-one-card/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const UseGetTaskData = (id: number | null) => {
    return useQuery({
        queryKey: ['TaskData', id], 
        queryFn: () => GetTaskData(id??0), 
        enabled: !!id,
        staleTime: 0,
        refetchOnMount: true, 
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
    });
};



const submitSolution = async (data: string) => {
    const response = await axios.post(`/api/task_solution/submit-solution/${data}`);
    return response.data;
};

export const UsesubmitSolution = () => {
    return useMutation({
        mutationFn: submitSolution,
        mutationKey: ['submitSolution']
    });
};
