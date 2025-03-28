import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'

const leaderBoard = async () => {
  const response = await axiosClient.get('http://localhost:3000/contest/leader-board'); 
  return response.data;
}

export const useLeaderboard = () => {
  return useMutation({
    mutationFn: leaderBoard,
    onSuccess(array) {
      
    },
    onError: (error: any) => {
      
    },
  })
}

const getChallange = async (data: {id: number, define: string, token: string | null}) => {
  const response = await axiosClient.get('http://localhost:3000/contest/challange',{
    params: data
  }); 
  return response.data;
}

export const useGetChallange = () => {
  return useMutation({
    mutationFn: getChallange,
    onSuccess(array) {
      
    },
    onError: (error: any) => {
      
    },
  })
}

const getPrevChallange = async (token: string | null) => {
  const response = await axiosClient.get('http://localhost:3000/contest/prev-challange',{
    params: { token }
  }); 
  return response.data;
}

export const useGetPrevChallange = () => {
  return useMutation({
    mutationFn: getPrevChallange,
    onSuccess(array) {
      
    },
    onError: (error: any) => {
      
    },
  })
}

const uploadSolution = async ({ data, token }: { data: {data: Array<{ id: number; solution: string; }>, comp_id: number }, token: string }) => {
  const response = await axiosClient.post('http://localhost:3000/contest/upload-solution', data,{
    headers:{
      token: token
    }
  }); 
  return response.data;
}

export const useUploadSolution = () => {
  return useMutation({
    mutationFn: uploadSolution,
    onSuccess(array) {
      
    },
    onError: (error: any) => {
      
    },
  })
}