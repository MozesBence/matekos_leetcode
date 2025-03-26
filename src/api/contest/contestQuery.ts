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

const getChallange = async (data: {id: number, define: string}) => {
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

const getPrevChallange = async (week: number) => {
  const response = await axiosClient.get('http://localhost:3000/contest/prev-challange',{
    params: { week }
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