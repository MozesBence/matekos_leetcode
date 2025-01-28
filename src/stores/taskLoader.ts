import axios from "axios";
import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    task: null as Task | null,
    error: null as string | null,
    isLoading: false,
  }),
  actions: {
    async loadTask(id: number) {
      if (this.task?.id === id) return; // Avoid re-fetching if the task is already loaded
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(
          `http://localhost:5173/api/tasks/get-one-card/${id}`
        );
        this.task = response.data;
      } catch (error) {
        this.error = `Failed to load task: ${error}`;
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

interface Task {
  id: number;
  theme_id: number;
  solution: string;
  creator_id: number | null;
  difficulty: number;
  experience_points: number;
  task_title: string;
  task: string;
  task_comments_id: number | null;
}
