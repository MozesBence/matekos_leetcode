import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'
import type { CommunityData } from './community'

const CommunityPostUpload = async (data: CommunityData) => {

    const baseData = {
        id: data.id,
        title: data.title,
        content: data.content,
        type: "alap_post",
    };
    
      // Első POST kérés a base adatokkal
    const response = await axiosClient.post('http://localhost:3000/community', baseData);
      
    /*for (const file of data.files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('postId', response.data.id); // Kapcsolat az alap adatokkal

        const fileResponse = await axiosClient.post('http://localhost:3000/community/files', formData);
        console.log('File response:', fileResponse.data);
    }*/

    return response.data;
}

export const useCommunityPost = () => {
  return useMutation({
    mutationFn: CommunityPostUpload,
    onSuccess(response) {
      
    },
    onError: (error: any) => {
      
    },
  })
}
