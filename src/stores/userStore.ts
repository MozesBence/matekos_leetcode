import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { useProfileGetUser } from '@/api/profile/profileQuery';

export const get_fullUser = ref<any[]>([]);
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
