<template>
  <!-- Kártyák kezdete -->
  <v-container fluid style="display: flex; vertical-align:middle">
    <v-row class="d-flex justify-center align-center" style="overflow-x: auto; margin: 1vw 2vw;">
      <v-col v-for="(card, index) in cards" :key="index" class="pa-2" cols="12" sm="4" md="4" lg="3">
        <v-card class="hero" style="position: relative; display: flex; flex-direction: column; overflow: hidden; padding: .5vw 1vw; height:13.5em">
          <v-card-title class="text-h6 rounded-lg" style="background-color: rgba(69, 10, 118, 0.3); text-align: center; padding: .6rem; color: white;">
            {{ card.title }}
          </v-card-title>
          <v-text class="text-body-2 text-center" style="margin: 16px 0; white-space: pre-wrap; word-wrap: break-word; color: white;">
            {{ card.description }}
          </v-text>
          <v-card-actions class="d-flex justify-center" style="margin-top: auto;">
            <v-btn append-icon="mdi-chevron-right" color="white" text="Program megkezdése" variant="outlined" block style="width: 4rem;">
              Program megkezdése
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- Kártyák vége -->

  <!-- Téma választó szalag kezdete -->
  <v-sheet class="mx-auto" max-width="100%" style="background-color: transparent;">
    <v-slide-group show-arrows multiple>
      <v-slide-group-item v-for="n in themes" :key="n.theme" v-slot="{ isSelected, toggle }">
        <v-btn
          :color="isSelected ? 'blue-lighten-1' : 'background-color: rgb(var(--v-theme-background));'"
          class="ma-4"
          rounded
          width="auto"
          height="3em"
          style="font-size: small;"
          @click="handleToggle(n.theme, isSelected, toggle)"
        >
          {{ n.theme }}
      </v-btn>

      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
  <!-- Téma választó szalag vége -->

  <!---->
  <v-row 
  class="d-flex align-center my-1"
  style="min-width: 100%; height: min-content; white-space: nowrap; padding: 1em; justify-content: center;">
  
  <!-- Nehézség (Difficulty) Select -->
  <v-col cols="6" md="3" class="d-flex align-center justify-center">
    <v-select 
      v-model="difficulty_Query"
      clearable
      label="Nehézség"
      :items="['Könnyű', 'Közepes', 'Nehéz']"
      variant="solo"
      class="responsive-item"
      hide-details
      style="height: 56px;"
    ></v-select>
  </v-col>

  <!-- Állapot (State) Select -->
  <v-col cols="6" md="3" class="d-flex align-center justify-center">
    <v-select
      v-model="state_Query"
      clearable
      label="Állapot"
      :items="['Megkezdetlen', 'Függőben lévő', 'Kész']"
      variant="solo"
      class="responsive-item"
      hide-details
      style="height: 56px;"
    ></v-select>
  </v-col>

  <!-- Search Input -->
  <v-col cols="9" md="3" class="d-flex align-center justify-center">
    <v-text-field
      v-model="searchQuery"
      prepend-inner-icon="mdi-magnify"
      clear-icon="mdi-close"
      hide-details
      label="Feladat neve"
      type="text"
      variant="outlined"
      clearable
      @input="filterTasksByCharacters(searchQuery)"
      style="height: 56px;"
    ></v-text-field>
  </v-col>

  <!-- Random Button (Only Icon) -->
  <v-col cols="3" md="1" class="d-flex align-center justify-center">
    <v-btn class="responsive-item bg-green" style="height: 56px; width: 10em;" @click="LoadRandomTask">
      <v-icon color="white">mdi-shuffle-variant</v-icon>
    </v-btn>
  </v-col>
</v-row>
  <!---->

  {{ tasks }}
  {{ taskCount }}
</template>

<script setup lang="ts">
// Importok kezdete
import { useAllTaskCount, useCards, useCardsByThemes, useTaskByDifficulty, useTaskByState, useTaskWithSearch, useRandomTask } from '@/api/cards/cardQuery';
import { UseThemes } from '@/api/themes/themeQuery';
import router from '@/router';
import { ref, computed, watch, onMounted } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
// Importok vége

// Query hookok
const themesQuery = UseThemes();
const themes = computed(() => themesQuery.data.value || []); // Use themes fetched by the hook

const cardsQuery = useCards();

const difficulty_Query = ref<string | null>(null);
const state_Query = ref<string | null>(null);
const searchQuery = ref('');

// A feladatok számának összesítése
const allTaskCountQuery = useAllTaskCount();
const taskCount = ref(0);

// Statikus kártyák adatok
const cards = ref([
  {
    title: 'Gyűjts aranyat!',
    description: 'Heti és havi versenyeinkkel növelheted aranyaid számát, melyek segítségével értékes ajándékokra vagy az oldalon megjelenő kozmetikumokra tehetsz szert!'
  },
  {
    title: 'Napi feladat!',
    description: 'A napi feladat teljesítésével 10 arany ütheti a markod, és folytathatod a streaket!'
  },
  {
    title: 'Vajon mi folyik a közösségi részen?',
    description: 'A közösségi rész teret ad a segítségkeresre, megoldasok megosztasara, és akár barátokra is szert tehetsz.'
  },
  {
    title: 'Szeretsz zenét hallgatni?',
    description: 'Csapatunk összeválogatta azokat a zenéket, amelyeket a legtöbbet hallgatunk tanulás közben. Hallgass bele!'
  }
]);

const selectedThemes = ref<string[]>([]);

const { data: filteredTasks, refetch: refetchFilteredTasks, isFetching } = useCardsByThemes(selectedThemes.value);

const tasks = computed(() => {
  if (selectedThemes.value.length === 0) {
    return cardsQuery.data.value || [];
  } else {
    return filteredTasks.value || [];
  }
});

// Handling theme toggle
const handleToggle = async (theme: string, isSelected: boolean, toggle: Function) => {
  if (!themesQuery.data.value) {
    await themesQuery.refetch(); 
  }

  if (isSelected) { 
    selectedThemes.value = selectedThemes.value.filter(t => t !== theme);
  } else {
    selectedThemes.value.push(theme);
  }

  console.log("Selected Themes: ", selectedThemes.value); 
  toggle();
  if (selectedThemes.value.length === 0) {
    cardsQuery.refetch();
    console.log(tasks.value)
  } else {
    refetchFilteredTasks();
    console.log(tasks.value)
  }
};

onMounted(() => {
  cardsQuery.refetch();
});

// Random task handling
var randomTaskId = ref<number | null>(null);
const randomTask = useRandomTask();

const LoadRandomTask = async () => {
  await randomTask.refetch();

  if (randomTaskId.value !== null) {
    TaskView(randomTaskId.value);
  } else {
    console.error('No random task ID found.');
  }
};

const TaskView = (id: number) => {
  console.log(id);
  router.push({ name: 'task', params: { id } });
};

watch(() => randomTask.data.value, (newVal) => {
  console.log(newVal);
  if (newVal?.id) {
    randomTaskId.value = newVal.id;
  } else {
    randomTaskId.value = null;
  }
});

watch(() => allTaskCountQuery.data.value, (newVal) => {
  if (newVal) {
    taskCount.value = newVal;
  }
});
</script>


<style scoped>
  .hero {
    background: linear-gradient(120deg, #6a11cb, #2575fc, #00d2ff, #6a11cb, #2575fc, #00d2ff);
    background-size: 400% 400%;
    animation: gradient-animation 8s ease-in-out infinite;
    color: white;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 30px;
    text-align: center;
  }

  @keyframes gradient-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>