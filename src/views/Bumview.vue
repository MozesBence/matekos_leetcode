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
    <div>
  
    </div>
    <v-sheet class="mx-auto" max-width="100%">
      <v-slide-group 
        show-arrows 
        multiple
        style="background-color: rgb(var(--v-theme-background));"
      >
      <v-slide-group-item
      v-for="n in themeStore.themes"
      :key="n.theme"
      v-slot="{ isSelected, toggle }"
    >
      <v-btn
        :color="isSelected ? 'blue-lighten-1' : 'background-color: rgb(var(--v-theme-background));'"
        class="ma-4"
        rounded
        width="auto"
        height="3em"
        style="font-size: small;"
        @click="() => handleToggle(n.theme, isSelected, toggle)"
      >
        {{ n.theme }}
      </v-btn>
    </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
    
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
  
  
    <v-layout class="rounded-md" height="min-content">
      <v-navigation-drawer 
      location="right" 
      width="400"
      style="background-color: transparent; border: none;"
      >
      <v-list>
        <v-list-item class="rounded" style="background-color: rgb(var(--v-theme-home_rightdrawer_card));">
          <div
            style="border-radius: 15px; padding: 10px; width: 380px; margin-bottom:2em"
            class="d-flex flex-column align-center justify-center"
          >
            <h1>Napi idézet</h1>
            <br>
            <p>{{quoteStore.quote}}</p>
          </div>
        </v-list-item>
          <v-list-item v-if="get_fullUser.email"
          class="d-flex flex-colum rounded align-center justify-center mt-2" 
          style="text-align: center; height: 10em; width:400px; background-color: rgb(var(--v-theme-home_rightdrawer_card));"
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
  
          <v-list-item class="d-flex flex-column align-center justify-center rounded mt-2" 
          style="width:400px; background-color: rgb(var(--v-theme-home_rightdrawer_card));">
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
                  @click="LoadDailyTask(day.day)"
                >
                  {{ day.day }}
                </div>
              </div>
  
              </div>      
            </div>
          </v-list-item>
          <v-list-item 
          v-if="get_fullUser.email" 
          class="d-flex flex-column align-center justify-center rounded mt-2" 
          style="text-align: center; width:400px; background-color: rgb(var(--v-theme-home_rightdrawer_card));">
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
      
      <v-main class="d-block align-center justify-center" style="height: auto;">
        <v-row style="margin: 0 2em; border-bottom: 1px solid #ccc;" class="mx-8 px-3" v-if="!$vuetify.display.mobile">
          <v-col class="d-flex align-center justify-center" cols="1">
            <span>Státusz</span>
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="6">
            <span>Cím</span>
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="4">
            <span>Teljesítési arány</span>
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="1">
            <span>Nehézség</span>
          </v-col>
        </v-row>
    
        <v-row 
        class="task_card mx-8 pa-3"
        v-for="(card) in cardsArray" 
        :key="card.id" 
        style="border-bottom: 1px solid #ccc;"
        @click="TaskView(card.id)"
      >
        <!-- Task Icon and Status -->
        <v-col class="d-flex align-center justify-center" cols="2" style="min-height: 100%;">
    <v-icon 
      v-if="getTaskStateForCard(card.id)" 
      :color="getTaskStateForCard(card.id).state === 0 ? 'yellow' : 'green'" 
      small
    >
      {{ getTaskStateForCard(card.id).state === 0 ? 'mdi-clock-outline' : 'mdi-check-circle' }}
    </v-icon>
    <span v-else>&nbsp;</span>
  </v-col>
  
  
        <!-- Task Title -->
        <v-col class="d-flex align-center justify-center" cols="10" sm="6"  style="text-align: left;">
          <span class="text-h7">{{ card.id }}. {{ card.task_title }}</span>
        </v-col>
        
        <!-- Completion Rate -->
        <v-col class="d-flex align-center justify-center" cols="6" sm="2">
          {{ cardCompRate(cardsStore.completion_rates, card.id) }}% 
        </v-col>
  
        <!-- Difficulty -->
        <v-col class="d-flex align-center justify-center" cols="6" sm="2">
          <v-chip 
            :color="chipColor(card.difficulty)" 
            outlined 
            small
            style="width: 5rem;"
            class="d-flex align-center justify-center"
          >
            <p class="ma-0">{{ difficultyLabel(card.difficulty) }}</p>
          </v-chip>
        </v-col>
      </v-row>
      </v-main>
    </v-layout>
    <!--javitani kell!-->
     <!--
  Pagination a lapozashoz, tanstackel chacebe tarolas
  https://laravel.com/docs/11.x/pagination#main-content
  https://laravel-news.com/laravel-pagination
  
  -->
  <v-pagination 
    v-model="pageNumber" 
    :length="Math.ceil(cardsStore.cards.length / 15)" 
    @update:modelValue="UpdatePage">
  </v-pagination>
  
  
  
  </template> 
  <script lang="ts">
  import { defineComponent, onMounted, ref, computed, watch } from 'vue';
  import { useThemeStore } from '@/stores/themeStore';
  import { useCardsStore } from '@/stores/cardsStore';
  import { useQuoteStore } from '@/stores/quoteStore';
  import { useProfileGetUser } from '@/api/profile/profileQuery';
  import VueApexCharts from 'vue3-apexcharts';
  import { useRouter } from 'vue-router';
  import { number } from 'zod';
  import { useRoute } from 'vue-router';
  import {useCards,useCompletionRates} from '@/api/cards/cardQuery'
  
  
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
  const get_user_name = ref<string | null>(null);
  const get_user_email = ref<string | null>(null);
  const get_fullUser = ref<any[]>([]);
  
  export default defineComponent({
    name: 'ThemeComponent',
    components: {
      apexchart: VueApexCharts,
    },
    setup() {
      
     // sessionStorage.setItem('offset','0');
     const route = useRoute();
      const themeStore = useThemeStore();
      const cardsStore = useCardsStore();
      const quoteStore = useQuoteStore();
      const router = useRouter();
      const pageNumber = ref(1);
      const cardsPerPage = 15;
      const difficulty_Query = ref<string | null>(null)
      const state_Query = ref<string | null>(null)
      const task_Theme_Query = ref<string[]>([]);
      const cardsArray = ref([]);
      const completion_rates = ref([]);
  
          const UpdatePage = (newPage: number) => {
            window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
  
          console.log(newPage)
          pageNumber.value = newPage;
          console.log(pageNumber)
          const offset = (newPage - 1) * 15;
          console.log(offset)
          sessionStorage.setItem('pageNumber', newPage.toString());
          sessionStorage.setItem('offset', offset.toString());
          console.log(sessionStorage)
          console.log(`Page: ${newPage}, Offset: ${offset}`);
          cardsStore.fetchCards();
          console.log('cards got fetched')
          
  };
      /*Szuresesk*/
      /*const filterTasksByCharacters = (characters: any) => {
        if(characters.length == 0){
          cardsStore.fetchCards();
        }else{
          cardsStore.fetchTaskWithSearch(characters);
        }
      }
      //localba letarolni
      //https://tanstack.com/query/v4/docs/framework/vue/guides/paginated-queries
      router.push({query:{page: 1,per_page:15}})
      const filterByDifficulty = (difficulty: any) => {
        switch (difficulty) {
          case 'Könnyű':
          cardsStore.fetchTaskByDifficulty(0);
            break
          case 'Közepes':
          cardsStore.fetchTaskByDifficulty(1);
            break
          case 'Nehéz':
          cardsStore.fetchTaskByDifficulty(2);
            break
          default:
            cardsStore.fetchCards();
      }  
    }
    watch(difficulty_Query, (newVal) => {
          filterByDifficulty(newVal)
    })*/
     const filterByState = (state: any) => {
      const userCookie = getCookie('user');
      switch (state) {
          case 'Megkezdetlen':
         cardsStore.fetchTaskByState(2,JSON.parse(atob(userCookie.split('.')[1])).id)
            break
          case 'Függőben lévő':
          cardsStore.fetchTaskByState(0,JSON.parse(atob(userCookie.split('.')[1])).id)
            break
          case 'Kész':
          cardsStore.fetchTaskByState(1,JSON.parse(atob(userCookie.split('.')[1])).id)
            break
          default:
            cardsStore.fetchCards();
      }  
     }
     watch(state_Query, (newVal) =>{
        filterByState(newVal);
     })
     
     const handleToggle = (theme: string, isSelected: boolean, toggle: Function) => {
      if (isSelected) {
        task_Theme_Query.value = task_Theme_Query.value.filter(t => t !== theme);
      } else {
        task_Theme_Query.value.push(theme);
      }
      toggle();
      if(task_Theme_Query.value.length == 0){
        cardsStore.fetchCards();
      }else{
        cardsStore.fetchCardsByThemes(task_Theme_Query.value)
      }
    };
  
      const TaskView = (id: any) => {
        console.log(id)
        router.push({ name: 'task', params: { id } });
      };
  
      const LoadRandomTask = async () => {
          cardsStore.fetchRandomTask();
          TaskView(cardsStore.randomTaskId.id);
      };
  
      const LoadDailyTask = async (day: any) => {
        await cardsStore.fetchSpecificTask(day);
        TaskView(cardsStore.specificTask.task_id)
      } 
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
  
      const cardCompRate = (CompArray: { task_id: number; completionRate: number }[], cardId: number): number | "Na" => {
        const found = CompArray.find((c) => c.task_id === cardId);
        return found ? found.completionRate : "Na";
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
      return '';
    };
  
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
            await ProfileGetUser({token: get_user_by_token, id: 0}, {
              onSuccess: (get_user) => {
                get_user_name.value = get_user.user_name;
                get_fullUser.value = get_user;
              },
            });
          } catch (error) {
            console.error('Error fetching user profile:', error);
          }
        }
     
        const page = computed(() => Number(route.query.page) || 1);
      const perPage = computed(() => Number(route.query.per_page) || 15); 
    
      const offset = computed(() => (page.value - 1) * perPage.value);
  
        
       //cardsArray.value = useCards(number(offset.value)).data;
  
  
        quoteStore.fetchQuote();
        themeStore.fetchThemes();
      
        cardsStore.getAllTaskCount();
        cardsStore.fetchCards();
        cardsStore.fetchCompletionRate();
        cardsStore.fetchSolvedTaskRates(Number(get_user_name.value));
        cardsStore.fetchTaskState(Number(get_user_name.value));
        cardsStore.fetchCards();
        cardsStore.fetchRandomTask();
        
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
        TaskView,
        UpdatePage,
        LoadRandomTask,
        LoadDailyTask,
        filterTasksByCharacters,
        filterByDifficulty,
        difficulty_Query,
        state_Query,
        filterByState,
        handleToggle,
        task_Theme_Query,
        cardsArray,
        completion_rates
      };
    },
  });
  </script>
  