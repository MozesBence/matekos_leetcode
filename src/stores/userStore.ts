import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { useProfileGetUser } from '@/api/profile/profileQuery';

export const get_fullUser = ref<{ id: number; user_name: string,email:string,currency_count:number,roll_back_token:number,experience_point:number }>({ id: 0, user_name: '',email:'',currency_count:0,roll_back_token:0,experience_point:0 });
export const userId = ref(get_fullUser.value.id);
export const get_user_name = ref<string | null>(null);
export const get_user_email = ref<string | null>(null);

export const getCookie = (name: string): string | null => {
const cookies = document.cookie.split('; ');
for (const cookie of cookies) {
  const [key, value] = cookie.split('=');
  if (key === name) {
    return decodeURIComponent(value);
  }
}
return null;
}

export const fetchUserData = async () => {
  const userCookie = getCookie('user');
  if (userCookie) {
    try {
      const userData = JSON.parse(atob(userCookie.split('.')[1]));
      get_user_name.value = userData.id;
    } catch (error) {
      console.error('Error parsing user cookie:', error);
    }
  }

  const get_user_by_token =
    getCookie('user') != null &&
    getCookie('user') != 'undefined' &&
    typeof getCookie('user') != 'object'
      ? getCookie('user')
      : null;

  if (get_user_by_token) {
    const { mutate: ProfileGetUser } = useProfileGetUser();
    try {
      await ProfileGetUser(
        { token: get_user_by_token, id: 0 },
        {
          onSuccess: (get_user) => {
            get_user_name.value = get_user.user_name;
            get_fullUser.value = get_user;
          },
        }
      );
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }
};
