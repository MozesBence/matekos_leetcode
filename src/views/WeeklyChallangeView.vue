<script setup lang="ts">
import { ref } from 'vue';

// csak a kinezet miatt van itt
const tasks = ref([
  { id: 1, name: "Első feladat", description: "Mi az 5 + 3 értéke?", solution: "" },
  { id: 2, name: "Második feladat", description: "Mi a 10 * 2 eredménye?", solution: "" }
]);

const submitSolutions = () => {
  tasks.value.forEach(task => {
    console.log(Feladat ${task.id} megoldása: ${task.solution});
  });
};
</script>

<template>
  <main>
    <h1>18. heti kihívás</h1>
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
        <v-btn color="primary" @click="submitSolutions">
          Beadás
        </v-btn>
      </v-row>
    </v-container>
  </main>
</template>