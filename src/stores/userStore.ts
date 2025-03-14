import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';

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

