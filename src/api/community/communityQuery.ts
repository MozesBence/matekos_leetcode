import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'
import type { CommunityData } from './community'

const CommunityPostUpload = async (data: CommunityData) => {
  const formData = new FormData();
  formData.append('id', data.id.toString());
  formData.append('title', data.title);
  formData.append('content', data.content);
   // Ha a files objektum tényleges fájlokat tartalmaz, először Blob vagy File típusra kell alakítani
  Object.keys(data.files).forEach(key => {
    const file = data.files[key];

    // Ellenőrizd, hogy a fájl Blob típusú-e, vagy szükséges-e átalakítani
    if (file instanceof File || file instanceof Blob) {
      formData.append('files', file); // Hozzáadjuk a fájlt a FormData-hoz
    } else {
      // Ha nem fájl, logold az objektumot
      console.error("Nem fájl objektum:", file);
    }
  });

  const response = await axiosClient.post('http://localhost:3000/community', formData,{
                                                                                        headers: { 'Content-Type': 'multipart/form-data' },
                                                                                    });
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

const CommunityGetLimitedPosts = async (limit: number) => {
  const response = await axiosClient.get(`http://localhost:3000/community/${limit}`)
  return response.data;
}

export const useGetCommunityPost = () => {
  return useMutation({
    mutationFn: CommunityGetLimitedPosts,
    onSuccess(response) {
      
    },
    onError: (error: any) => {
      
    },
  })
}
