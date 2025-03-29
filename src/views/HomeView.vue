<template>
  <!--Hirdető kártyák kezdete -->
  <v-container fluid style="overflow-x: auto;">
    <v-row 
      class="d-flex align-center flex-nowrap overflow-x-auto cardStyle align-scretch pb-3"
      style="white-space: nowrap;"
    >
      <v-col 
      v-for="(card, index) in cards" 
      :key="index" 
      class="pa-2 mx-2"
      cols="12" sm="6" md="3"
      style="max-width: max-content;"
      :style="$vuetify.display.xs ? 'flex: 0 0 auto; min-width: 80vw; max-width: 80vw;' : ''"
      >
        <v-card 
          class="hero d-flex flex-column pa-2 rounded"
          style="overflow: hidden; height: 100%; min-height: 17rem;"
        >
          <v-card-title 
            class="text-h6 text-center py-1 px-2 rounded" 
            style="background-color: rgba(69, 10, 118, 0.3);"
          >
            <h4 style="text-transform: uppercase;">{{ card.title }}</h4>
          </v-card-title>
          <div
            class="pt-5 d-flex align-center justify-center" 
            style="white-space: pre-wrap; word-wrap: break-word; color: white;"
          >
            <h4 style="font-weight: normal;">{{ card.content }}</h4>
          </div>
          <v-card-actions class="d-flex justify-center mt-auto">
            <v-btn
              append-icon="mdi-chevron-right"
              color="white"
              :text="card.button_title"
              variant="outlined"
              block
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
  <!-- Hirdető kártyák vége -->

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

  <!--
    - Szűrések menüszalag:
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

<!---->
<v-layout class="rounded-md" height="min-content">
  <v-navigation-drawer 
  location="right" 
  width="400"
  style="background-color: transparent; border: none; height: 100rem;"
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
      style="text-align: center; height: 13em; width:400px; background-color: rgb(var(--v-theme-home_rightdrawer_card));"
      >
        <div 
          style="width: 380px; height: max-content;" 
          class="d-flex flex-column align-center justify-center rounded pa-2"
        >
          <h1>Üdvözlünk, {{get_fullUser.user_name}}!</h1>
          <div class="my-2">
            <v-progress-linear
            v-model="progressPercentage"
            :color="progressColor"
            height="25"
            class="rounded-pill"
            style="width: 300px; background-color: rgb(var(--v-theme-background));"
            >
              <template v-slot:default="{ value }">
                <strong>{{ currentLevel }}. szint</strong>
              </template>
            </v-progress-linear>
          </div>
          <div class="d-flex align-center">
            <img height="20px" src="../assets/coin.png" class="mr-1">
            <h4>Aranyak száma: {{formatCurrency(get_fullUser.currency_count)}}</h4> 
          </div>
          <h4 class=" d-flex align-center mt-1">
            <img src="../assets/rollback.png" alt="" height="20px" class="mr-1">
            Tokenek szama: {{roll_back_token_count_query.data.value?.roll_back_token}}
          </h4>
        </div>
      </v-list-item>

      <v-list-item class="d-flex flex-column align-center justify-center rounded mt-2" 
      style="width:400px; background-color: rgb(var(--v-theme-home_rightdrawer_card));">
        <div 
          class="d-flex flex-column align-center justify-center"
        >
        <div class="heatmap">
            <div>
              <h1>Napi feladatok</h1>
              <h3>({{ currentYear }} - {{ currentMonth }})</h3>
            </div>
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
          <div class="d-flex align-center justify-center mt-2" v-if="get_fullUser.email">            
            <div class="d-flex align-center justify-center">
              <img src="../assets/fire.png" alt="" height="25" width="25" class="mr-1">
              <h3>{{dailyStreak.data.value?.streak}} napos sorozat!</h3>
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
  
  <v-main class="align-center justify-center" style="height: 145vh">
    <v-row style="margin: 0 2em; border-bottom: 1px solid #ccc;" class="mx-8 px-3" v-if="!$vuetify.display.mobile">
      <v-col class="d-flex align-center justify-center" cols="2">
        <span>Státusz</span>
      </v-col>
      <v-col class="d-flex align-center justify-center" cols="10" sm="6">
        <span>Cím</span>
      </v-col>
      <v-col class="d-flex align-center justify-center" cols="6" sm="2">
        <span>Teljesítési arány</span>
      </v-col>
      <v-col class="d-flex align-center justify-center" cols="6" sm="2">
        <span>Nehézség</span>
      </v-col>
    </v-row>
    <v-row 
    v-if="cardsQuery.data && cardsQuery.data.value && cardsQuery.data.value.length > 0"
    class="task_card mx-8 pa-3 cursor-pointer tasks"
    v-for="(card) in cardsQuery.data.value" 
    :key="card.id" 
    style="border-bottom: 1px solid #ccc; transition: .3s !important;"
    @click="TaskView(card.id)"
  >
    <!-- Task Icon and Status -->
    <v-col 
      class="d-flex align-center justify-center" 
      cols="2" 
      style="min-height: 100%;"
    >
      <template v-if="taskStateMap[card.id]">
        <v-icon 
          :color="taskStateMap[card.id].state === 0 ? 'yellow' : 'green'" 
          small
        >
          {{ taskStateMap[card.id].state === 0 ? 'mdi-clock-outline' : 'mdi-check-circle' }}
        </v-icon>
      </template>
      <span v-else>&nbsp;</span>
    </v-col>
    
    <!-- Task Title -->
    <v-col class="d-flex align-center justify-center text-center" cols="10" sm="6">
      <span class="text-h7">{{ card.id }}. {{ card.task_title }}</span>
    </v-col>
  
    <!-- Completion Rate -->
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
  
  <v-row v-else style="display: flex; vertical-align:middle;justify-content:center;">
    <h4>A megadott szűrési feltételekkel nem található feladat!</h4>
  </v-row>
  </v-main>
</v-layout>

<v-pagination 
:length="allTaskCountQuery.data.value ? Math.ceil(allTaskCountQuery.data.value / 15) : 1" 
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
        <img src="../assets/rollback.png" alt="" height="20" style="margin-right:5px"> {{roll_back_token_count_query.data.value?.roll_back_token}} tokened van.
      </div>
    </v-card-text>

    <!-- Action Button -->
    <template v-slot:actions>
      <v-btn class="ms-auto" text="Vissza" @click="dialog = false"></v-btn>
      <v-btn @click="UseToken" :disabled="roll_back_token_count_query.data.value?.roll_back_token == 0">Token felhasználása</v-btn>
    </template>
  </v-card>
</v-dialog>

<v-alert
  v-if="alertMessage.type"
  :key="alertMessage.text"
  :color="alertMessage.type"
  :icon="alertMessage.type === 'success' ? '$success' : '$error'"
  :title="alertMessage.text"
  class="alert-bottom"
></v-alert>


</template>

<script setup lang="ts">
// Redirect to page 1 on load
router.push({ query: { page: 1, per_page: 15 } });

// Imports
import { useAllTaskCount, useRandomTask,useTaskState,useSpecificTask,useSolvedTaskRates,useCompletionRates,UseFetchCards } from '@/api/cards/cardQuery';
import {UseQuote} from '@/api/quote/QuoteQuery'
import { UseThemes } from '@/api/themes/themeQuery';
import { useProfileGetUser } from '@/api/profile/profileQuery';
import router from '@/router';
import { ref, computed, watch, onMounted,watchEffect } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import {useGetAllAds} from '@/api/adcards/adcardQuery'
import { useRoute, useRouter } from 'vue-router';
import {UsegetRollBackTokenCount,UseGetDailyStreak} from '../api/mainPage/mainPageQuery'
import {get_fullUser,getCookie} from '../stores/userStore'
import {UsewayBackToken} from '@/api/redeemWayBackToken/WayBackTokenQuery'
// Query hooks

const userId = ref(get_fullUser.value.id);
const user_id = ref<number | null>(null);
const offset = ref<number>(0);
  const filterData = ref({
  difficulty: null,
  state: null,
  themes: '',
  search: '',
  userId: userId,
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

const apexchart = VueApexCharts;
const get_user_name = ref<string | null>(null);
const currentYear = new Date().getFullYear();
const dailyStreak = UseGetDailyStreak(user_id);
const solvedTaskStatesQuery = useSolvedTaskRates(user_id);
const roll_back_token_count_query = UsegetRollBackTokenCount(user_id);
const task_state = useTaskState(user_id);
const taskStateMap = computed(() => {
  if (!Array.isArray(task_state.data.value)) return {};
  return task_state.data.value.reduce((acc, task) => ({
    ...acc,
    [task.task_id]: task
  }), {});
});
const monthsNames = [
  'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
  'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
];
const currentMonth = monthsNames[new Date().getMonth()];


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


watch(filterData, () => {
  filterData.value.userId = Number(user_id.value)
  cardsQuery.refetch(); 
  allTaskCountQuery.refetch();
}, { deep: true });


const navigate = (redirect: string) => {
  if (!redirect) return; // Safety check

  if (redirect.startsWith("/")) {
    router.push(redirect);
  } else {
    window.open(redirect, "_blank");
  }
};


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
var dailytask_dayNum = ref(0);
const specificTaskquery = useSpecificTask(dailytask_day);

const LoadDailyTask = async (day: number) => {
  console.log(day)
    var tasksDate: any = CheckIfCurrentTask(day.toString());

    switch (tasksDate) {
        case 0:
            dailytask_day.value = day.toString();
            await specificTaskquery.refetch();
            TaskView(Number(specificTaskquery.data.value.task_id));
            break; // Prevent falling through

        case 1:
            alert("Ez a feladat még nem érhető el");
            break; // Prevent falling through

        case 2:
            dailytask_day.value = day.toString();
            dialog.value = true;
            await specificTaskquery.refetch();
            dailytask_dayNum.value = Number(specificTaskquery.data.value.task_id);
            break; 
        default:
          alert('varatlan hiba')
          break;
    }
};


const CheckIfCurrentTask =  (day: string) => {
  if(Number(day) == new Date().getDate()){
    return 0;
  }else if(Number(day) > new Date().getDate()){
    return 1;
  }else{
    return 2;
  }
}

const TaskView = (id: number) => {
  router.push({ name: 'task', params: { id } });
//  window.location.reload();
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

const alertMessage = ref<{ type: "success" | "error" | null; text: string }>({
  type: null,
  text: "",
});

const showAlert = (type: "success" | "error", text: string) => {
  alertMessage.value = { type, text };
  setTimeout(() => {
    alertMessage.value = { type: null, text: "" };
  }, 5000);
};

const {mutate:SpendToken} = UsewayBackToken(user_id,dailytask_dayNum)

const UseToken = () => {
    SpendToken(undefined, {
      onSuccess: (data: any) => {
    console.log("Token spent, response:", data);
    if (data != null) {
        TaskView(dailytask_dayNum.value);
    } else {
      dialog.value = false;
        console.log("Triggering alert...");
        showAlert("error", "Sajnos a hónapban már elhasznált 3 tokent!");
        console.log("Alert triggered:", alertMessage.value);
    }
},

    });
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

    function formatCurrency(currency: number): string {
  if(currency == 0){
    return '0';
  }
  const units = ['E', 'M', 'MLRD'];
  let index = -1;

  while (currency >= 1000 && index < units.length - 1) {
    currency /= 1000;
    index++;
  }

  return index >= 0 ? `${currency.toFixed(1)}${units[index]}` : currency.toString();
}

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

    
    const checkIfCurrent = (value: any) => {
    if (value == new Date().getDate()) {0
      return 'rgb(var(--v-theme-heatmap_bc))';
    }
    return 'rgb(var(--v-theme-heatmap_bc), .3)';
  };

// Watch for changes in task count
watch(() => allTaskCountQuery.data.value, (newVal) => {
  if (newVal !== undefined) {
    taskCount.value = newVal;
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


watch(user_id, async (newUserId) => {
  if (newUserId) {
    await roll_back_token_count_query.refetch();
    await dailyStreak.refetch()
    //console.log('streak',dailyStreak.data.value?.streak)
  }
});
const UpdatePage = (newPage: number) => {
  filterData.value.offset = 15 *(newPage - 1);
  router.push({ query: { page: newPage, per_page: 15 } });
  cardsQuery.refetch();
  window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth'
});
};
onMounted(async () => {
  days.value = generateDays(currentYear, new Date().getMonth());
  const initializeUser = async () => {
    const userCookie = getCookie('user');
    if (!userCookie) return;

    try {
      const userData = JSON.parse(atob(userCookie.split('.')[1]));
      get_user_name.value = userData.id;
      const { mutate: ProfileGetUser } = useProfileGetUser();
      await ProfileGetUser({ token: userCookie, id: 0 }, {
        onSuccess: (user) => {
          get_fullUser.value = user;
          user_id.value = user.id;
        }
      });
    } catch (error) {
      console.error('Initialization error:', error);
    }
  };

  await initializeUser();
});

watch(user_id, async (newVal) => {
  if (newVal) {
    await Promise.all([
      cardsQuery.refetch(),
      task_state.refetch(),
      roll_back_token_count_query.refetch(),
      dailyStreak.refetch()
    ]);
  }
}, { immediate: true });



onMounted(() => {
  watch(
    () => get_fullUser.value, 
    (newUser) => {
      if (newUser && typeof newUser === "object" && "id" in newUser) {
        user_id.value = Number(newUser.id);
        solvedTaskStatesQuery.refetch();
      } else {
        console.warn("Invalid user detected:", newUser);
      }
    },
    { immediate: true }
  );

  watch(
    () => solvedTaskStatesQuery.data, 
    (newData) => {
      if (newData && typeof newData === "object" && "value" in newData) {
        if (newData.value && "countpercenct" in newData.value) {
          series.value = newData.value.countpercenct;
        }
      } else {
        console.warn("Invalid solved task states data:", newData);
      }
    },
    { deep: true }
  );
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

  .cardStyle::-webkit-scrollbar {
    width: 3px;
    height: 8px;
  }

  .cardStyle::-webkit-scrollbar-track {
    background: transparent; /* Háttérszín */
    border-radius: 10px;
  }

  .cardStyle::-webkit-scrollbar-thumb{
    background: rgb(var(--v-theme-scrollar_color)); /* Görgetősáv színe */
    border-radius: 10px;
  }

  .cardStyle::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.7);
  }
  .alert-bottom {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    max-width: 400px;
    z-index: 1000;
  }
</style>