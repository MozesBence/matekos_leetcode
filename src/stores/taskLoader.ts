import axios from "axios";
import { defineStore } from "pinia";
import { useRoute, useRouter } from 'vue-router';
import router from '@/router';
const route = useRouter();
export const TaskView = (id: number) => {
  router.push({ name: 'task', params: { id } });
};
