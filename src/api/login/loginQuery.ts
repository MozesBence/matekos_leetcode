import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'
import type { LoginData } from './login'
import { useRouter } from 'vue-router'

const loginUser = async (data: LoginData) => {
  try {
    const response = await axiosClient.post('http://localhost:3000/login', data); 
    return response.data; // Sikeres válasz
  } catch (error: any) {
    // Ha hiba van, elkapjuk és továbbítjuk a hibaüzenetet
    if (error.response) {
      // A backend válaszából jövő hiba (pl. 400, 404)
      throw new Error(error.response.data || 'Valami hiba történt');
    } else if (error.request) {
      // A kérés nem ment el a backendig
      throw new Error('Nem sikerült kapcsolatba lépni a szerverrel');
    } else {
      // Egyéb hiba (pl. nem valid JSON válasz)
      throw new Error('Ismeretlen hiba történt');
    }
  }
}

export const useLoginUser = () => {
  const { push } = useRouter()
  return useMutation({
    mutationFn: loginUser,
    onSuccess(user) {
      push({ name: 'home' })
    },
    onError: (error: any) => {
      
    },
  })
}
