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

  <v-sheet class="mx-auto" max-width="100%" style="">
    <v-slide-group show-arrows style="background-color: rgb(var(--v-theme-background));">
      <v-slide-group-item
        v-for="n in themeStore.themes"
        :key="n.theme"
        v-slot="{ isSelected, toggle }"
      >
        <v-btn
          :color="isSelected ? 'blue-lighten-1' : 'background-color: rgb(var(--v-theme-background));'"
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
    theme="background-color: rgb(var(--v-theme-background));"
  ></v-select>
</v-col>

<v-col cols="2" class="d-flex align-center justify-center">
  <v-select
    clearable
    label="Állapot"
    :items="['Megkezdetlen', 'Függőben lévő', 'Kész']"
    variant="solo"
    class="responsive-item"
    theme="background-color: rgb(var(--v-theme-background));"
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

  <v-layout class="rounded-md" height="100em">
    <v-navigation-drawer 
    location="right" 
    width="400"
    style="background-color: transparent; border: none;"
    >
    <v-list>
      <v-list-item 
      elevation="1" 
      class="rounded" 
      style="background-color: gray;">
        <div
          style="border-radius: 15px; padding: 10px; width: 380px; margin-bottom:2em"
          class="d-flex flex-column align-center justify-center"
        >
          <h1>Napi idézet</h1>
          <br>
          <p>{{quoteStore.quote}}</p>
        </div>
      </v-list-item>
      <v-list-item 
      v-if="get_fullUser.email"
      elevation="1" 
      class="d-flex flex-colum rounded align-center justify-center mt-2" 
      style="text-align: center; height: 10em; width:400px; background-color: gray"
    >
      <div 
        style="border-radius: 15px; padding: 10px; width: 380px; height: 9em;" 
        class="d-flex flex-column align-center justify-center "
      >
      <h1>Üdvözlünk, {{get_fullUser.user_name}}!</h1>
      <v-progress-linear
      v-model="progressPercentage"
      :color="progressColor"
      height="25"
      class="rounded-pill mt-2"
      style="width: 300px; background-color: rgb(var(--v-theme-background));"
      >
        <template v-slot:default="{ value }">
          <strong>{{ currentLevel }}. szint</strong>
        </template>
      </v-progress-linear>
        <h3 
          style="align-items: center; vertical-align:middle; text-align:center; display:flex;"
          >
          Aranyak száma: {{get_fullUser.currency_count}}
          <img height="20" src="../assets/coin.png">
        </h3>
      </div>
    </v-list-item>

      <v-list-item 
      class="d-flex flex-column align-center justify-center rounded mt-2" 
      elevation="1"
      style="width:400px; background-color: gray;">
        <div 
          class="d-flex flex-column align-center justify-center"
        >
          <div class="heatmap">
            <p><h1>Napi feladatok</h1><h3>({{ currentYear }} - {{ currentMonth }})</h3></p>
          <div class="heatmap-grid">
            <div
              v-for="(day, index) in days"
              :key="index"
              :style="{ backgroundColor: getClass(0), border: checkIfCurrent(day.day) }"
              class="heatmap-cell"
              @click="TaskView()"
            >
              {{ day.day }}
            </div>
          </div>

          </div>      
        </div>
      </v-list-item>
      <v-list-item 
      v-if="get_fullUser.email" 
      elevation="1" 
      class="d-flex flex-column align-center justify-center rounded mt-2" 
      style="text-align: center; width:400px; background-color: gray;">
      <div 
        style="border-radius: 15px; padding: 10px; width: 380px; height: 100%;" 
        class="d-flex flex-column align-center justify-center background-color: rgb(var(--v-theme-background));"
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
      @click="TaskView()"
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
      <v-col class="d-flex align-center justify-center" cols="6"  style="text-align: left;">
        <span class="text-h7">{{ card.id }}. {{ card.task_title }}</span>
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
    <v-pagination :length="Number(Math.ceil((cardsStore.cards.length+ 60)/15))"></v-pagination>
  </v-row>
  
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch } from 'vue';
import { useThemeStore } from '@/stores/themeStore';
import { useCardsStore } from '@/stores/cardsStore';
import { useQuoteStore } from '@/stores/quoteStore';
import { useProfileGetUser } from '@/api/profile/profileQuery';
import VueApexCharts from 'vue3-apexcharts'; // Import VueApexCharts
import { useRouter } from 'vue-router';



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

const currentYear = new Date().getFullYear();
const monthsNames = [
  'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
  'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
];
const currentMonth = monthsNames[new Date().getMonth()];
console.log('year', currentYear);
const get_user_name = ref<string | null>(null);
const get_user_email = ref<string | null>(null);
const get_fullUser = ref<any[]>([]);

export default defineComponent({
  name: 'ThemeComponent',
  components: {
    apexchart: VueApexCharts, // Register VueApexCharts as a component
  },
  setup() {
    const themeStore = useThemeStore();
    const cardsStore = useCardsStore();
    const quoteStore = useQuoteStore();
    const router = useRouter();

    const TaskView = () => {
      router.push({ path: '/task' });
    };

    const getDaysInMonth = (year: number, month: number): number => {
      return new Date(year, month + 1, 0).getDate();
    };

    const generateDays = (year: number, month: number) => {
      const daysInMonth = getDaysInMonth(year, month);
      const daysArray = [];
      for (let day = 1; day <= daysInMonth; day++) {
        daysArray.push({ day, value: day });
      }
      return daysArray;
    };

    const days = ref<{ day: number, value: number }[]>([]);

    const progressColor = computed(() => {
      const percentage = progressPercentage.value;
      if (percentage < 33) return 'green';
      if (percentage < 66) return 'orange';
      return 'red';
    });

    const baseXP = 100;

    const experienceForNextLevel = (level: number): number => {
      return baseXP * Math.pow(level, 2);
    };

    const totalXPForLevel = (level: number): number => {
      let totalXP = 0;
      for (let i = 1; i < level; i++) {
        totalXP += experienceForNextLevel(i);
      }
      return totalXP;
    };

    const currentLevel = computed(() => {
      let level = 1;
      let xp = get_fullUser.value.experience_point || 0;

      while (xp >= totalXPForLevel(level + 1)) {
        level++;
      }

      return level;
    });

    const progressPercentage = computed(() => {
      const xp = get_fullUser.value.experience_point || 0;
      const level = currentLevel.value;

      const xpForCurrentLevel = totalXPForLevel(level);
      const xpForNextLevel = totalXPForLevel(level + 1);

      const progress = ((xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;

      return Math.min(Math.max(progress, 0), 100);
    });

    const chipColor = (difficulty: number) => {
      if (difficulty === 0) return 'green';
      if (difficulty === 1) return 'orange';
      return 'red';
    };

    const difficultyLabel = (difficulty: number) => {
      if (difficulty === 0) return 'Könnyű';
      if (difficulty === 1) return 'Közepes';
      return 'Nehéz';
    };

    const getTaskStateForCard = (taskId: number) => {
      return cardsStore.task_state.find(task => task.task_id === taskId) || null;
    };

    const getTaskIcon = (taskId: number) => {
      const taskState = getTaskStateForCard(taskId);
      if (taskState) {
        return taskState.state === 0 ? { icon: 'mdi-clock-outline', color: 'yellow' } 
                                     : { icon: 'mdi-check-circle', color: 'green' };
      }
      return { icon: '', color: '' };
    };

    const cardCompRate = (CompArray: { task_id: number; completionRate: number }[], cardId: number): number | "NaN" => {
      const found = CompArray.find((c) => c.task_id === cardId);
      return found ? found.completionRate : "NaN";
    };

    const getClass = (value: number) => {
      if (value == -1) return '#E57373';
      if (value == 1) return '#A5D6A7';
      return '#00A1FF';
    };
    
    const checkIfCurrent = (value: any) => {
    if (value == new Date().getDate()) {
      return '2px solid black';
    }
    return ''; // Fixed the 'return' typo
  };
    // ApexCharts Data and Chart Options
    const series = ref([0, 0, 0]);
    const chartOptions = ref({
      chart: {
        height: 390,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '30%',
            background: 'transparent',
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            }
          },
          barLabels: {
            enabled: true,
            useSeriesColors: true,
            offsetX: -8,
            fontSize: '16px',
            formatter: function (seriesName, opts) {
              return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
            },
          },
        }
      },
      colors: ['#4CAF50', '#FF9800', '#F44336'],
      labels: ['Könnyű', 'Közepes', 'Nehéz'],
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            show: false
          }
        }
      }]
    });

    onMounted(() => {
      days.value = generateDays(currentYear, new Date().getMonth());
    });

    onMounted(async () => {
      const userCookie = getCookie('user');
      if (userCookie) {
        try {
          const userData = JSON.parse(atob(userCookie.split('.')[1]));
          get_user_name.value = userData.id;
        } catch (error) {
          console.error('Error parsing user cookie:', error);
        }
      }

      const get_user_by_token = getCookie('user') != null && getCookie('user') != 'undefined' && typeof getCookie('user') != "object" ? getCookie('user') : null;

      if (get_user_by_token) {
        const { mutate: ProfileGetUser } = useProfileGetUser();
        try {
          await ProfileGetUser(get_user_by_token, {
            onSuccess: (get_user) => {
              get_user_name.value = get_user.user_name;
              get_fullUser.value = get_user;
              console.log(get_fullUser.experience_point);
            },
          });
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }

      quoteStore.fetchQuote();
      themeStore.fetchThemes();
      cardsStore.fetchCards();
      cardsStore.fetchCompletionRate();
      cardsStore.fetchSolvedTaskRates(Number(get_user_name.value));
      cardsStore.fetchTaskState(Number(get_user_name.value));

      watch(() => cardsStore.solved_task_rates, (newRates) => {
        series.value = newRates.countpercenct;
      });
    });

    return {
      progressColor,
      themeStore,
      cardsStore,
      quoteStore,
      chipColor,
      difficultyLabel,
      getTaskStateForCard,
      getTaskIcon,
      cardCompRate,
      getClass,
      get_user_name,
      get_user_email,
      get_fullUser,
      currentLevel,
      progressPercentage,
      experienceForNextLevel,
      series,
      chartOptions,
      currentYear,
      currentMonth,
      days,
      checkIfCurrent,
      TaskView
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
