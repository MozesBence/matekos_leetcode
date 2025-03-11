<script setup lang="ts">
import { ref } from 'vue';


const currentMonth = ref(new Date().getMonth() + 1);
// csak a kinezet miatt van itt
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
    <v-container class="hero" style="width: 95%;"><h1>{{currentMonth}}. havi kihívás</h1></v-container>
    <v-container>
      <v-row>
        <v-col v-for="task in tasks" :key="task.id" cols="12" md="6">
          <v-card class="pa-4">
            <v-card-title>{{ task.name }}</v-card-title>
            <v-card-subtitle>{{ task.description }}</v-card-subtitle>
            <v-card-text>
              <v-text-field
                v-model="task.solution"
                label="Írd be a megoldást"
                variant="outlined"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-4">
      </v-row>
      <v-row>
        <v-col v-for="task in tasks" :key="task.id" cols="12" md="6">
          <v-card class="pa-4">
            <v-card-title>{{ task.name }}</v-card-title>
            <v-card-subtitle>{{ task.description }}</v-card-subtitle>
            <v-card-text>
              <v-text-field
                v-model="task.solution"
                label="Írd be a megoldást"
                variant="outlined"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-4">
        <v-btn color="primary" @click="submitSolutions">
          Beadás
        </v-btn>
      </v-row>
    </v-container>
  </main>
</template>
<style scoped>
.hero {
  text-align: center;
  background: linear-gradient(120deg, #6a11cb, #2575fc, #00d2ff, #6a11cb, #2575fc, #00d2ff);
  background-size: 400% 400%;
  animation: gradient-animation 8s ease-in-out infinite;
  color: rgb(var(--v-theme-about_main_text_color));
  padding: 50px 20px;
  border-radius: 12px;
  margin-bottom: 30px;
}
.hero h1 {
  font-size: 2.5rem;
  transition: font-family 0.5s ease, color 0.5s ease;
}

@keyframes gradient-animation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>