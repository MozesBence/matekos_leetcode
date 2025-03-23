<template>
  <!-- Kártyák kezdete -->
  <v-container fluid style="overflow-x: auto;">
    <v-row 
      class="d-flex align-center flex-nowrap overflow-x-auto"
      style="gap: 1rem; padding: 1vw 2vw; white-space: nowrap;"
    >
      <v-col 
        v-for="(card, index) in cards" 
        :key="index" 
        class="pa-2"
        cols="12" sm="6" md="3" lg="3"
        :style="$vuetify.display.xs ? 'flex: 0 0 auto; min-width: 80vw; max-width: 80vw;' : ''"
      >
        <v-card 
          class="hero" 
          style="position: relative; display: flex; flex-direction: column; overflow: hidden; padding: .5vw 1vw; min-height: 15em; border-radius:30px;"
        >
          <v-card-title 
            class="text-h6" 
            style="background-color: rgba(69, 10, 118, 0.3); text-align: center; padding: .6rem; color: white; border-radius:30px"
          >
            <h4 style="text-transform: uppercase;">{{ card.title }}</h4>
          </v-card-title>
          <v-text 
            class="text-center" 
            style="margin: 16px 0; white-space: pre-wrap; word-wrap: break-word; color: white;"
          >
            <h4 style="font-weight: normal;">{{ card.content }}</h4>
          </v-text>
          <v-card-actions class="d-flex justify-center" style="margin-top: auto;">
            <v-btn
              append-icon="mdi-chevron-right"
              color="white"
              :text="card.button_title"
              variant="outlined"
              block
              style="width: 4rem;"
              class="rounded-pill"
              @click="navigate(card.redirect)"
            >
              <h3>{{ card.button_title }}</h3>
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

  <!--Szűrések menüszalag
      Tartalmazza:
        - Nehézség szerinti szűrés
        - Állapot szetinti szűrés
        - Keresés szerinti szűrés
        - Random feladat
  -->
  <v-row 
  class="d-flex align-center my-1"
  style="min-width: 100%; height: min-content; white-space: nowrap; padding: 1em; justify-content: center;">
  
<!--Nehézség szerinti szűrés kezdete-->
  <v-col cols="6" md="3" class="d-flex align-center justify-center">
    <v-select 
  v-model="filterData.difficulty"
  clearable
  label="Nehézség"
  :items="[
    { text: 'Könnyű', value: 0 },
    { text: 'Közepes', value: 1 },
    { text: 'Nehéz', value: 2 }
  ]"
  item-title="text" 
  item-value="value" 
  variant="solo"
  class="responsive-item"
  hide-details
  style="height: 56px;"
  
></v-select>
  </v-col>
<!--Nehézség szerinti szűrés vége-->

<!--Állapot szetinti szűrés kezdete-->
<v-col cols="6" md="3" class="d-flex align-center justify-center">
  <v-select
    v-model="filterData.state"
    clearable
    label="Állapot"
    :items="[
      { text: 'Megkezdetlen', value: 2 },
      { text: 'Függőben lévő', value: 0 },
      { text: 'Kész', value: 1 }
    ]"
    item-title="text" 
    item-value="value" 
    variant="solo"
    class="responsive-item"
    hide-details
    style="height: 56px;"
    :disabled="!get_fullUser.email"
  ></v-select>
</v-col>


<!--Állapot szetinti szűrés vége-->

<!-- Keresés szerinti szűrés kezdete-->
  <v-col cols="9" md="3" class="d-flex align-center justify-center">
    <v-text-field
  v-model="filterData.search"
  prepend-inner-icon="mdi-magnify"
  clear-icon="mdi-close"
  hide-details
  label="Feladat neve"
  type="text"
  variant="outlined"
  clearable
  @input="filterTasksByCharacters(filterData.search)"
  style="height: 56px;"
></v-text-field>
  </v-col>
<!-- Keresés szerinti szűrés vége-->

<!--Random feladat kezdete-->
  <v-col cols="3" md="1" class="d-flex align-center justify-center">
    <v-btn class="responsive-item bg-green" style="height: 56px; width: 10em;" @click="LoadRandomTask">
      <v-icon color="white">mdi-shuffle-variant</v-icon>
    </v-btn>
  </v-col>
</v-row>
<!--Random feladat vége-->
<!--Szűrések menüszalag vége-->
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
        <p>{{quote.data}}</p>
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
              :style="{ backgroundColor: checkIfCurrent(day.day) , cursor: day.day == new Date().getDate() ? 'pointer' : 'default'}"
              style="opacity: .6;"
              :class="{ hoverable: day.day == new Date().getDate() }"
              class="heatmap-cell rounded pa-4 text-center"
              @click="LoadDailyTask(day.day)"
            >
              {{ day.day }}
            </div>
          </div>
          <div style="align-items:start; display:flex; margin-top:1em; vertical-align:middle;" >
            <img src="../assets/rollback.png" alt="" height="24px">
            <h3>{{roll_back_token_count.data.value.roll_back_token}} db</h3>
            <h3 style="vertical-align: middle; display:flex;"><img src="../assets/fire.png" alt="" height="30" width="30">3 napos sorozat!</h3>
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
    class="task_card mx-8 pa-3 cursor-pointer tasks"
    v-for="(card) in cardsQuery.data.value" 
    :key="card.id" 
    style="border-bottom: 1px solid #ccc; transition: .3s !important;"
    @click="TaskView(card.id)"
  >
    <!-- Task Icon and Status -->
    <v-col v-if="task_state.data" class="d-flex align-center justify-center" cols="2" style="min-height: 100%;">
      <v-icon 
        v-if="getTaskStateForCard(card.id)" 
        :color="getTaskStateForCard(card.id)?.state === 0 ? 'yellow' : 'green'" 
        small
      >
        {{ getTaskStateForCard(card.id)?.state === 0 ? 'mdi-clock-outline' : 'mdi-check-circle' }}
      </v-icon>
      <span v-else>&nbsp;</span>
    </v-col>
    

    

<!-- Task Title -->
<v-col class="d-flex align-center justify-center" cols="10" sm="6"  style="text-align: left;">
  <span class="text-h7">{{ card.id }}. {{ card.task_title }}</span>
</v-col>

<v-col class="d-flex align-center justify-center" cols="6" sm="2">
  {{ cardCompRate(completion_rates.data?.value ?? [], Number(card.id)) !== "Na" 
      ? `${cardCompRate(completion_rates.data?.value ?? [], Number(card.id))}%` 
      : "N/A" 
  }}
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

<v-pagination 
v-model="pageNumber" 
:length="Math.ceil((allTaskCountQuery.data.value) / 15)" 
@update:modelValue="UpdatePage">
</v-pagination>
<v-dialog v-model="dialog" width="auto">
  <v-card max-width="800">
    <!-- Custom Title Slot -->
    <template v-slot:title>
      <div class="d-flex align-center">
        <img
          src="../assets/late.png"
          alt="Rollback Icon"
          style="width: 30px; height: 30px; margin-right: 8px;"
        />
        <span>Sajnos lejárt az idő!</span>
      </div>
    </template>

    <!-- Card Content -->
    <v-card-text>
      De van egy megoldás... Használj egy roll back tokent, hogy megoldhasd ezt a feladatot! Ha ezzel a feladattal szakadt meg a sorozatod vissza kaphatod. Fontos 1 hónapban csak 3-at tudsz használni!
      <br>
      <br>
      <div style="display:flex; vertical-align:middle; text-align:left;">
        <img src="../assets/rollback.png" alt="" height="20" style="margin-right:5px"> 2 db tokened van.
      </div>
    </v-card-text>

    <!-- Action Button -->
    <template v-slot:actions>
      <v-btn class="ms-auto" text="Vissza" @click="dialog = false"></v-btn>
      <v-btn>Token felhasználása</v-btn>
    </template>
  </v-card>
</v-dialog>


</template>

<script setup lang="ts">
// Redirect to page 1 on load
router.push({ query: { page: 1, per_page: 15 } });

// Imports
import { useAllTaskCount, useRandomTask, useTaskWithSearch, useTaskByDifficulty,useTaskState,useTaskByState,useSpecificTask,useSolvedTaskRates,useCompletionRates,UseFetchCards } from '@/api/cards/cardQuery';
import {UseQuote} from '@/api/quote/QuoteQuery'
import { UseThemes } from '@/api/themes/themeQuery';
import { useProfileGetUser } from '@/api/profile/profileQuery';
import router from '@/router';
import { ref, computed, watch, onMounted,watchEffect } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import {useGetAllAds} from '@/api/adcards/adcardQuery'
import { any, date, number } from 'zod';
import { useRoute, useRouter } from 'vue-router';
import {UsegetRollBackTokenCount} from '../api/mainPage/mainPageQuery'



// Query hooks
const get_fullUser = ref<any[]>([]);
const userId = ref(get_fullUser.value.id);
const offset = ref<number>(0);
  const filterData = ref({
  difficulty: null,
  state: null,
  themes: '',
  search: '',
  UserId: userId.value,
  offset: 0
});

const themesQuery = UseThemes();
const themes = computed(() => themesQuery.data.value || []);
const cardsQuery = UseFetchCards(filterData);
const completion_rates = useCompletionRates();
const allTaskCountQuery = useAllTaskCount(filterData);
const taskCount = ref(0);
const quote = UseQuote();
const { data: cards, isLoading, error } = useGetAllAds();
var dialog = ref(false);
//----
const route = useRoute();
const apexchart = VueApexCharts;
const selectedThemes = ref<string[]>([]);
const get_user_name = ref<string | null>(null);
const get_user_email = ref<string | null>(null);
const currentYear = new Date().getFullYear();
const user_id = ref<string | null>(null);
const solvedTaskStatesQuery = useSolvedTaskRates(user_id);
const monthsNames = [
  'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
  'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
];
const currentMonth = monthsNames[new Date().getMonth()];
const roll_back_token_count = UsegetRollBackTokenCount(user_id);

const navigate = (redirect: string) => {
  if (!redirect) return; // Safety check

  if (redirect.startsWith("/")) {
    router.push(redirect);
  } else {
    window.open(redirect, "_blank");
  }
};


const handleToggle = async (theme: string, isSelected: boolean, toggle: Function) => {
  if (!themesQuery.data.value) {
    await themesQuery.refetch();
  }

  let selectedThemes = filterData.value.themes ? filterData.value.themes.split(';') : [];

  if (isSelected) {
    selectedThemes = selectedThemes.filter(t => t !== theme);
  } else {
    selectedThemes.push(theme);
  }

  filterData.value.themes = selectedThemes.join(';');

  toggle();

  await cardsQuery.refetch();
  await allTaskCountQuery.refetch();
};



// Filter by search query
const searchQuery = ref('');
const taskWithSearch = useTaskWithSearch(searchQuery);
const filterTasksByCharacters = (chars: string) => {
  if(chars.length > 0){
    searchQuery.value = chars;
    taskWithSearch.refetch();
  }else{
    cardsQuery.refetch();
    allTaskCountQuery.refetch();
  }
};

//-------- Filter by difficulty ---------------
  
const difficulty_param = ref('');
const taskByDifficulty = useTaskByDifficulty(difficulty_param);

watch(filterData, () => {
  cardsQuery.refetch(); 
  allTaskCountQuery.refetch();
}, { deep: true });


function HandleDifficultyChange(newVal: string | null){
  if(newVal == null){
    difficulty_param.value = ''
    cardsQuery.refetch();
  }else{
    taskByDifficulty.refetch();
  }
}


//-------- End filter by difficulty ---------------

//-------- Filter by completionrate ---------------
const state_Query = ref(null);
const state_param = ref('');
const taskByState = useTaskByState(state_param, Number(user_id.value));

watch(() => get_fullUser.value, (newUser) => {
  if (newUser?.id) {
    user_id.value = String(newUser.id);
    taskByState.refetch();
  }
}, { immediate: true });

watch(state_Query, (newVal) => {
  HandleStateChange(newVal);
});

function HandleStateChange(newVal: string | null) {
  if (newVal == null) {
    state_param.value = '';
    console.log(user_id.value);
    cardsQuery.refetch();
    allTaskCountQuery.refetch();
  } else {
    console.log(user_id.value);
    taskByState.refetch();
    allTaskCountQuery.refetch();
  }
  cardsQuery.refetch();
  allTaskCountQuery.refetch();
}

//-------- End filter by completionrate ---------------

// Random task handling
const randomTaskId = ref<number | null>(null);
const randomTask = useRandomTask();

const LoadRandomTask = async () => {
  await randomTask.refetch();
  if (randomTaskId.value !== null) {
    TaskView(randomTaskId.value);
  }
};
var dailytask_day = ref('');

const specificTaskquery = useSpecificTask(dailytask_day);

const LoadDailyTask = async (day: string) => {
    if(CheckIfCurrentTask(day)){
      dailytask_day.value = day;
      console.log(dailytask_day.value);
      await specificTaskquery.refetch();
      TaskView(Number(specificTaskquery.data.value.task_id));
    }else{
      dialog.value = true;
    }
    
};

const CheckIfCurrentTask =  (day: string) => {
  if(Number(day) == new Date().getDate()){
    return true;
  }else{
    return false;
  }
}

const TaskView = (id: number) => {
  router.push({ name: 'task', params: { id } });
};

watch(() => randomTask.data.value, (newVal) => {
  if (newVal?.id) {
    randomTaskId.value = newVal.id;
  } else {
    randomTaskId.value = null;
  }
});

//--------------------
const series = ref<number[]>([0, 0, 0]);
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
        },
      },
      barLabels: {
        enabled: true,
        useSeriesColors: true,
        offsetX: -8,
        fontSize: '16px',
        formatter: (seriesName: string, opts: any) => {
          return seriesName + ': ' + opts.w.globals.series[opts.seriesIndex];
        },
      },
    },
  },
  colors: ['#4CAF50', '#FF9800', '#F44336'],
  labels: ['Könnyű', 'Közepes', 'Nehéz'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          show: false,
        },
      },
    },
  ],
});

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

    const baseXP = 10;

    const experienceForNextLevel = (level: number): number => {
      return Math.ceil(baseXP * 5);
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
    // Get the user's ID reactively


// Fetch task state based on user ID
const task_state = useTaskState(ref(get_fullUser.value.id));

// Watch for changes in the fetched task state
watchEffect(() => {
  if (task_state.data.value) {
    console.log('Task state has been updated:', task_state.data.value);
  }
});

const getTaskStateForCard = (taskId: number) => {
  console.log(`taskId: ${taskId}`);
  console.log(`taskstate data ${task_state.data.value}`)
  if (!task_state.data || !task_state.data.value) {
    console.log('Task state data is not available yet.');
    return null;
  }

  const task = task_state.data.value.find((task) => task.task_id === taskId);
  if (task) {
    console.log(`Found task state for taskId ${taskId}:`, task);
  } else {
   // console.log(`No task found for taskId ${taskId}`);
  }

  return task || null;
};



// Computed property to handle async task state for icons
const getTaskIcon = (taskId: number) => {
  const taskState = task_state.data.value?.find(task => task.task_id === taskId);
  if (taskState) {
    return taskState.state === 0
      ? { icon: 'mdi-clock-outline', color: 'yellow' }
      : { icon: 'mdi-check-circle', color: 'green' };
  }
  return { icon: '', color: '' };
};

    const cardCompRate = (
  CompArray: { task_id: number; completionRate: number }[] | undefined,
  cardId: number
): number | "Na" => {
  if (!Array.isArray(CompArray)) {
    console.error("CompArray is not defined or not an array");
    return "Na";
  }
  const found = CompArray.find((c) => c.task_id === cardId);
  return found ? found.completionRate : "Na";
};



    const getClass = (value: number) => {
      if (value == -1) return '#E57373';
      if (value == 1) return '#A5D6A7';
      return '#00A1FF';
    };
    
    const checkIfCurrent = (value: any) => {
    if (value == new Date().getDate()) {0
      return 'rgb(var(--v-theme-heatmap_bc))';
    }
    return 'rgb(var(--v-theme-heatmap_bc), .3)';
  };

// Watch for changes in task count
watch(() => allTaskCountQuery.data.value, (newVal) => {
  console.log("Watch triggered - New Value:", newVal);
  console.log("Query Data:", allTaskCountQuery.data.value);
  if (newVal !== undefined) {
    taskCount.value = newVal;
    console.log("Updated taskCount:", taskCount.value);
  }
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
});

// Refetch cards on mount
onMounted(async () => {
  await cardsQuery.refetch();
});

onMounted(async () => {
  await quote.refetch();
})

onMounted(async ()=>{
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
});


const UpdatePage = (newPage: number) => {
  filterData.value.offset = 15 *(newPage - 1);
  console.log('teherbebeaszott offset',offset.value)
  router.push({ query: { page: newPage, per_page: 15 } });
  cardsQuery.refetch();
  window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth'
});
};


onMounted(async () => {
  watch(() => get_fullUser.value, (newUser) => {
    if (newUser && newUser.id) {
      user_id.value = String(newUser.id);
      solvedTaskStatesQuery.refetch();
    }
  }, { immediate: true });

  watch(() => solvedTaskStatesQuery.data, (newData) => {
    if (newData) {
      console.log('New task rates:', newData.value);
      series.value = newData.value.countpercenct;
    }
  }, { deep: true });
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
    font-weight: bold;
    color: white;
    transition: .3s;
  }
  .hoverable:hover {
    opacity: 1 !important;
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

  .task{
    transition: .3s !important;
  }
  .tasks:hover{
    background-color: rgb(var(--v-theme-home_task_card_hover));
  }
</style>