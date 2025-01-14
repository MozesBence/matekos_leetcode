import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'
const CommunityPostUpload = async (data: Object) => {
    console.log(data);
    const response = await axiosClient.post('http://localhost:3000/community', data); 
    return response.data;
}

export const useCommunityPost = () => {
  return useMutation({
    mutationFn: CommunityPostUpload,
    onSuccess(user) {
      
    },
    onError: (error: any) => {
      
    },
  })
}
