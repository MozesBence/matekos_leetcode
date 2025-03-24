<script setup lang="ts">
import { ref } from 'vue';

const currentMonth = ref(new Date().getMonth() + 1);

const tasks = ref([
  { id: 1, name: "Határozd meg a végeredményt!", description: "5 + 3", solution: "" },
  { id: 2, name: "Második feladat", description: "Mi a 10 * 2 eredménye?", solution: "" }
]);

const submitSolutions = () => {
  tasks.value.forEach(task => {
    console.log(`Feladat ${task.id} megoldása: ${task.solution}`);
  });
};
</script>

<template>
  <main>
    <v-container class="hero">
      <h1>{{ currentMonth }}. havi kihívás</h1>
    </v-container>

    <v-container>
      <v-row>
        <v-col v-for="task in tasks" :key="task.id" cols="12" md="6">
          <v-card class="task-card">
            <v-card-title class="task-title">{{ task.name }}</v-card-title>
            <v-card-subtitle class="task-subtitle">{{ task.description }}</v-card-subtitle>
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

      <v-row justify="center" class="mt-5">
        <v-btn color="primary" class="submit-btn" @click="submitSolutions">
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

.submit-btn {
  font-size: 1.2rem;
  padding: 10px 20px;
  border-radius: 8px;
  text-transform: uppercase;
  font-weight: bold;
}
</style>