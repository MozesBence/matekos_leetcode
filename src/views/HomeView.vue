<template>
  <v-container fluid>
    <v-row class="d-flex justify-center align-center" style="overflow-x: auto; margin: 1vw 2vw;">
      <v-col v-for="(card, index) in cards" :key="index" class="pa-2" cols="12" sm="4" md="4" lg="3">
        <v-card style="position: relative; display: flex; flex-direction: column; overflow: hidden; padding: .5vw 1vw">
          <video autoplay loop muted playsinline style="width: 100%; height: 100%;top: 0; left: 0; position: absolute; z-index: -1; object-fit: fill;">
            <source src="http://localhost:3000/drive-video" type="video/mp4" />
          </video>

          <v-card-title class="text-h6 rounded-lg" style="background-color: rgba(107, 212, 234, 0.9); text-align: center; padding: .6rem; color: white">
            {{ card.title }}
          </v-card-title>
          <v-text class="text-body-2 text-center" style="margin: 16px 0; white-space: pre-wrap; word-wrap: break-word; color: white">
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

  <v-sheet class="mx-auto" max-width="100%">
    <v-slide-group show-arrows>
      <v-slide-group-item
        v-for="n in themeStore.themes"
        :key="n.theme"
        v-slot="{ isSelected, toggle }"
      >
        <v-btn
          :color="isSelected ? 'blue-lighten-1' : 'white'"
          class="ma-4"
          rounded
          width="350px"
          height="3em"
          style="font-size: small;"
          @click="toggle"
        >
          {{ n.theme }} 
        </v-btn>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
  

  <v-row 
  class="d-flex align-center justify-center" 
  style="padding: 10px; gap: 16px;"
>
<v-col cols="2" class="d-flex align-center justify-center">
  <v-select
    clearable
    label="Nehézség"
    :items="['Könnyű', 'Közepes', 'Nehéz']"
    variant="solo"
    class="responsive-item"
    theme="light"
  ></v-select>
</v-col>

<v-col cols="2" class="d-flex align-center justify-center">
  <v-select
    clearable
    label="Állapot"
    :items="['Megkezdetlen', 'Függőben lévő', 'Kész']"
    variant="solo"
    class="responsive-item"
    theme="light"
  ></v-select>
</v-col>


<v-col cols="3" class="d-flex align-center justify-start search-bar" style="vertical-align:middle">
 
      <v-text-field
        style="height: 4.5em;text-align:center; vertical-align:middle;"
        :loading="loading"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Feladat neve..."
        variant="solo"
        hide-details
        single-line
        @click:append-inner="onClick"
      ></v-text-field>
</v-col>


  <v-col cols="2" class="d-flex align-center justify-center" style="align-items: center; vertical-align:middle">
    <v-btn class="responsive-item bg-green" style="width: 100%; height:4em">
      Random feladat  <v-icon color="white">mdi-shuffle-variant</v-icon>
    </v-btn>
  </v-col>
</v-row>

  <v-layout class="rounded rounded-md" height="100em">
    <v-navigation-drawer 
    location="right" 
    width="400"  >
    <v-list>
      <v-list-item>
        <div
          style="border-radius: 15px; padding: 10px; width: 380px; margin-bottom:2em"
          class="d-flex flex-column align-center justify-center bg-grey-lighten-4"
        >
          <h1>Napi idézet</h1>
          <br>
          <p>{{quoteStore.quote}}</p>
        </div>
      </v-list-item>
      <v-list-item 
      class="d-flex flex-column align-center justify-center" 
      style="text-align: center; height: 10em; width:400px; margin-bottom:2em"
    >
      <div 
        style="border-radius: 15px; padding: 10px; width: 380px; height: 9em;" 
        class="d-flex flex-column align-center justify-center bg-grey-lighten-4"
      >
        <h1 >Fiók szintje: </h1>
    
        <v-progress-linear
          v-model="percentage"
          color="green-darken-2"
          height="25"
          style="width: 300px; border-radius: 15px; margin-top: 10px; background-color: lightgray;" 
        >
          <template v-slot:default="{value }">
            <strong>{{ Math.ceil(1) }}. szint</strong> <!-- Display 'level' -->
          </template>
        </v-progress-linear>
      </div>
    </v-list-item>

      <v-list-item class="d-flex flex-column align-center justify-center" 
      style="text-align: center;  width:400px; margin-top:2em margin-bottom:2em">
      <div 
        style="border-radius: 15px; padding: 10px; width: 380px; height: 100%;" 
        class="d-flex flex-column align-center justify-center bg-grey-lighten-4"
      >
      <div class="heatmap">
        <h1>Napi feladatok - {{ currentYear }}/{{ currentMonth }}</h1>
        <div class="heatmap-grid">
          <div
            v-for="(day, index) in days"
            :key="index"
            :style="{ backgroundColor: getClass(day.value) }"
            class="heatmap-cell"
          >
            {{ day.day }}
          </div>
        </div>
      </div>      
      </div>
      </v-list-item>
      <v-list-item class="d-flex flex-column align-center justify-center" 
      style="text-align: center; width:400px; margin-top:2em; margin-bottom:2em">
      <div 
        style="border-radius: 15px; padding: 10px; width: 380px; height: 100%;" 
        class="d-flex flex-column align-center justify-center bg-grey-lighten-4"
      >
        <h1>Teljesítési statisztika:</h1>
        <div id="chart">
          <apexchart type="radialBar" height="390" :options="chartOptions" :series="series"></apexchart>
        </div>
      </div>
      </v-list-item>
      </v-list>
    </v-navigation-drawer>
  
    <v-main class="d-block align-center justify-center">
      <v-row style="margin: 2em; border-bottom: 1px solid #ccc;">
        <v-col class="d-flex align-center justify-center" cols="2">
          <span>Státusz</span>
        </v-col>
        <v-col class="d-flex align-center justify-center" cols="6">
          <span>Cím</span>
        </v-col>
        <v-col class="d-flex align-center justify-center" cols="2">
          <span>Teljesítési arány</span>
        </v-col>
        <v-col class="d-flex align-center justify-center" cols="2">
          <span>Nehézség</span>
        </v-col>
      </v-row>
  
      <v-row 
      v-for="(card) in cardsStore.cards" 
      :key="card.id" 
      style="margin: 2em; border-bottom: 1px solid #ccc;"
    >
      <!-- Task Icon and Status -->
      <v-col class="d-flex align-center justify-center" cols="2">
        <v-icon 
          v-if="getTaskStateForCard(card.id)" 
          :color="getTaskStateForCard(card.id).state === 0 ? 'yellow' : 'green'" 
          small
        >
          {{ getTaskStateForCard(card.id).state === 0 ? 'mdi-clock-outline' : 'mdi-check-circle' }}
        </v-icon>
        <span v-else>&nbsp;</span> <!-- Space when no task state found -->
      </v-col>

      <!-- Task Title -->
      <v-col class="d-flex align-center justify-center" cols="6">
        <span class="text-h7">{{ card.id }} {{ card.task_title }}</span>
      </v-col>
      
      <!-- Completion Rate -->
      <v-col class="d-flex align-center justify-center" cols="2">
        {{ cardCompRate(cardsStore.completion_rates, card.id) }}%
      </v-col>

      <!-- Difficulty -->
      <v-col class="d-flex align-center justify-center" cols="2">
        <v-chip 
          :color="chipColor(card.difficulty)" 
          outlined 
          small
        >
          {{ difficultyLabel(card.difficulty) }}
        </v-chip>
      </v-col>
    </v-row>
    </v-main>
  </v-layout>
  
  <v-row style="display: flex; justify-content:center; vertical-align:middle;margin:1em;">
    <v-pagination :length="6"></v-pagination>
  </v-row>
  <v-footer class="bg-blue-darken-1">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        class="mx-2"
        color="white"
        rounded="xl"
        variant="text"
      >
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        Copyright © {{ new Date().getFullYear() }} — Math Solve{{get_fullUser}}
      </v-col>
    </v-row>
  </v-footer>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useThemeStore } from '@/stores/themeStore';
import { useCardsStore } from '@/stores/cardsStore';
import { useQuoteStore } from '@/stores/quoteStore';
import { useProfileGetUser } from '@/api/profile/profileQuery';

function getCookie(name: string): string | null {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

const get_user_name = ref<string | null>(null);
const get_user_email = ref<string | null>(null);
const get_fullUser = ref<any[]>([]);

export default defineComponent({
  name: 'ThemeComponent',
  setup() {
    const themeStore = useThemeStore();
    const cardsStore = useCardsStore();
    const quoteStore = useQuoteStore();

    // Assigning colors based on difficulty level
    const chipColor = (difficulty: number) => {
      if (difficulty === 0) return 'green';
      if (difficulty === 1) return 'orange';
      return 'red';
    };

    // Assigning labels based on difficulty
    const difficultyLabel = (difficulty: number) => {
      if (difficulty === 0) return 'Könnyű';
      if (difficulty === 1) return 'Közepes';
      return 'Nehéz';
    };

    // Getting task state based on task ID
    const getTaskStateForCard = (taskId: number) => {
      return cardsStore.task_state.find(task => task.task_id === taskId) || null;
    };

    // Getting task icon based on task state
    const getTaskIcon = (taskId: number) => {
      const taskState = getTaskStateForCard(taskId);
      if (taskState) {
        return taskState.state === 0 ? { icon: 'mdi-clock-outline', color: 'yellow' } 
                                     : { icon: 'mdi-check-circle', color: 'green' };
      }
      return { icon: '', color: '' };
    };

    // Calculate completion rate for cards
    const cardCompRate = (CompArray: { task_id: number; completionRate: number }[], cardId: number): number | "NaN" => {
      const found = CompArray.find((c) => c.task_id === cardId);
      return found ? found.completionRate : "NaN";
    };

    onMounted(async () => {
      const userCookie = getCookie('user'); // Retrieve the user token from the cookie
      if (userCookie) {
        try {
          const userData = JSON.parse(atob(userCookie.split('.')[1])); // Decode JWT payload
          get_user_name.value = userData.id;  // Assuming user `id` from JWT
        } catch (error) {
          console.error('Error parsing user cookie:', error);
        }
      }

      if (get_user_email.value) {
        const { mutate: ProfileGetUser } = useProfileGetUser();
        try {
          await ProfileGetUser(get_user_email.value, {
            onSuccess: (get_user) => {
              get_user_name.value = get_user.user_name;
              get_fullUser.value.push(get_user);
            },
          });
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }

      // Fetching data from various stores
      quoteStore.fetchQuote();
      themeStore.fetchThemes();
      cardsStore.fetchCards();
      cardsStore.fetchCompletionRate();
      cardsStore.fetchSolvedTaskRates(Number(get_user_name.value));
      cardsStore.fetchTaskState(Number(get_user_name.value)); 
    });

    return {
      themeStore,
      cardsStore,
      quoteStore,
      chipColor,
      difficultyLabel,
      getTaskStateForCard,
      getTaskIcon,
      cardCompRate,
      get_user_name,
      get_user_email,
      get_fullUser,
    };
  },
});
</script>








  <style>
    .listitem
    {
      background-color: black;
      border-radius: 15px;
    }
    .v-layout{
      overflow-y: auto;
      overflow-x: hidden;
    }
    .heatmap {
      font-family: Arial, sans-serif;
      text-align: center;
      margin: 20px;
    }
    .heatmap-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 5px;
      margin-top: 20px;
    }
    .heatmap-cell {
      padding: 10px;
      text-align: center;
      font-weight: bold;
      border-radius: 5px;
      color: white;
    }
    .red {
      background-color: rgb(185, 98, 98);
    }
    .light-blue {
      background-color: rgba(107, 212, 234, 0.9);;
    }
    .dark-blue {
      background-color: rgb(26, 26, 77);
    }
  </style>