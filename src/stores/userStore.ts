// src/stores/userStore.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null as { name: string; email: string } | null,
  }),
  actions: {
    fetchUser() {
      // Simulate a fetch or use real API integration
      const userCookie = document.cookie.split('; ').find((row) => row.startsWith('user='));
      if (userCookie) {
        try {
          this.user = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
        } catch (error) {
          console.error('Error parsing user cookie:', error);
        }
      } else {
        console.log('No user cookie found');
      }
    },
  },
});
