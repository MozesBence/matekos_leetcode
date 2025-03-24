<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { UseGetTaskData } from '@/api/taskSolving/taskSolvingQuery';
import type { TaskData } from '@/api/taskSolving/taskSolving';

const getISOWeekNumber = () => {
  const now = new Date();
  const yearStart = new Date(now.getFullYear(), 0, 1);
  const firstThursday = new Date(now.getFullYear(), 0, (4 - yearStart.getDay()) + 1);
  const weekMilliseconds = 7 * 24 * 60 * 60 * 1000;
  return Math.ceil(((now.getTime() - firstThursday.getTime()) / weekMilliseconds) + 1);
};

const currentWeek = ref(getISOWeekNumber());
const tasks = ref<TaskData[]>([]);

// A hook, hogy adatokat töltsünk be
const { data, isLoading, isError } = UseGetTaskData(2);  // Például 2-es ID-t kérünk le

// Ha a data változik, akkor frissítjük a tasks tömböt
watch(data, (newData) => {
  console.log('newData:', newData);  // Ellenőrizd, hogy mi érkezik vissza

  // Ha a válasz nem tömb, de egyetlen objektumot ad vissza, akkor egy tömbbe tesszük
  if (newData) {
    tasks.value = Array.isArray(newData) ? newData : [newData];
  }
}, { immediate: true });  // immediate: true biztosítja, hogy azonnal frissüljön
</script>

<template>
  <main>
    <v-container class="hero">
      <h1>{{ currentWeek }}. heti kihívás</h1>
    </v-container>

    <v-container>
      <v-row v-if="isLoading">
        <v-col cols="12" class="text-center">
          <v-spinner></v-spinner> <!-- Töltés animáció -->
        </v-col>
      </v-row>

      <v-row v-else-if="isError">
        <v-col cols="12" class="text-center">
          <v-alert type="error">Hiba történt a feladatok betöltésekor.</v-alert>
        </v-col>
      </v-row>

      <!-- Két feladat egymás mellett -->
      <v-row v-else>
        <v-col v-for="task in tasks" :key="task.id" cols="12" md="6">
          <v-card class="task-card">
            <v-card-title class="task-title">{{ task.task_title }}</v-card-title>
            <v-card-subtitle class="task-subtitle">{{ task.task }}</v-card-subtitle>
            <v-card-text>
              <v-text-field
                v-model="task.solution"
                label="Írd be a megoldást"
                variant="outlined"
                class="task-input"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Beadás gomb -->
      <v-row justify="center" class="mt-5">
        <v-btn color="primary" class="submit-btn">
          Beadás
        </v-btn>
      </v-row>
    </v-container>
  </main>
</template>

<style scoped>
.hero {
  text-align: center;
  background: linear-gradient(120deg, #6a11cb, #2575fc, #00d2ff);
  background-size: 200% 200%;
  animation: gradient-animation 6s ease infinite;
  color: white;
  padding: 50px 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.hero h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

@keyframes gradient-animation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.task-card {
  padding: 20px;
  border-radius: 12px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.task-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.task-title {
  font-size: 1.4rem;
  font-weight: bold;
}

.task-subtitle {
  font-size: 1rem;
  margin-bottom: 10px;
}

.task-input {
  margin-top: 10px;
}
</style>
