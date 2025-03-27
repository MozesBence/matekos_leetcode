<template>
  <v-layout   :style="{overflow: $vuetify.display.smAndDown ? 'auto' : 'hidden'}">
    <!-- Main Content -->
    <v-main>
      <v-row style="height: 100vh; padding: 0.5em;">
        <!-- Left Column: Task Details -->
        <v-col cols="12" md="6" style="background-color: rgb(var(--v-theme-task_solving_left_drawer))">
          <br>
          <div class="taskInfo" style="background-color: rgb(var(--v-theme-task_solving_right_drawer))">
            <h1 style="text-align: left; width: 100%;">
              {{ task?.id }}. {{ task?.task_title }}
            </h1>
            <v-row style="padding: 1em; gap: 1em; flex-wrap: nowrap; overflow-x: auto; width: 100%; display: flex; white-space: nowrap; ">
              <!-- Chip 1: Difficulty -->
              <v-chip
                :color="chipColor(task?.difficulty ?? 0)"
                outlined
                small
                style="min-width: 10rem; flex-shrink: 0;"
                class="d-flex align-center justify-center"
              >
                <p class="ma-0">{{ difficultyLabel(task?.difficulty ?? 0) }}</p>
              </v-chip>
              <!-- Chip 2 -->
              <v-chip
                :color="'blue'"
                outlined
                small
                style="min-width: 10rem; flex-shrink: 0;"
                class="d-flex align-center justify-center"
              >
                <p class="ma-0">{{theme.data.value?.theme}}</p>
              </v-chip>
              <!-- Chip 3 -->
              <v-chip
                outlined
                small
                style="min-width: 10rem; flex-shrink: 0; background-color: #95cdfc; color: blue"
                class="d-flex align-center justify-center"
                v-if="isDailyTaskValid"

              >
                <p class="ma-0"><v-icon>mdi-calendar</v-icon> Napi feladat</p>
              </v-chip>
              <!-- Chip 4 -->
              <v-chip
                outlined
                small
                style="min-width: 10rem; flex-shrink: 0; background-color: #FFE082; color: #FF6F00"
                class="d-flex align-center justify-center"
                v-if="task?.creator_id != null"
              >
                <p class="ma-0">👑 {{task?.creator_id}}</p>
              </v-chip>
            </v-row>
          </div>

          <div style="margin-top: 2em; background-color: rgb(var(--v-theme-task_solving_right_drawer))" class="taskDisplay">
            <h3>A feladat leírása:</h3>
            <div v-mathjax="task?.task"></div>
            <h3>Megoldás formatuma:</h3>
            <p>{{task?.solution_format}}</p>
          </div>
          
          <div style="margin-top: 2em; background-color: rgb(var(--v-theme-task_solving_right_drawer)" class="plusItems">
            <br>
            <v-expansion-panels style="border-radius: 15px;">
              <v-expansion-panel title="Hasonló feladatok">
                <v-expansion-panel-text>
                  <div v-for="card in similarCards.data.value" style="background-color: rgb(var(--v-theme-task_solving_similar_task)); border-radius:15px; width:100%; padding:10px;margin-bottom:1em">
                    <v-row style="vertical-align: middle; text-align:center; justify-content:center; display:flex;" @click="TaskView(card.id)"> 
                      <v-col cols="3"><v-chip
                        :color="chipColor(card?.difficulty)"
                        outlined
                        small
                        style="min-width: 5rem; flex-shrink: 0;"
                        class="d-flex align-center justify-center"
                      >
                        <p class="ma-0">{{ difficultyLabel(card?.difficulty) }}</p>
                      </v-chip></v-col>
                      <v-col cols="9" class="d-flex align-center justify-center">{{card.id}}. {{card.task_title}}</v-col>
                    </v-row>
              </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <br>
            <v-expansion-panels style="border-radius: 15px;">
              <v-expansion-panel>
                <template v-slot:title>
                  <v-icon class="mr-2">mdi-lightbulb</v-icon> Segítség 1.
                </template>
                <v-expansion-panel-text>
                  <div v-mathjax="task?.first_hint"></div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <br>
            <v-expansion-panels style="border-radius: 15px;">
              <v-expansion-panel>
                <template v-slot:title>
                  <v-icon class="mr-2">mdi-lightbulb</v-icon> Segítség 2.
                </template>
                <v-expansion-panel-text>
                  <div v-mathjax="task?.second_hint"></div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-row>
            </v-row>
            <br>
          </div>
        </v-col>

        <v-col cols="12" md="6" style="padding: 2em; background-color: rgb(var(--v-theme-task_solving_left_drawer))">
          <v-row style="margin-bottom: 1em;margin-top: 1em;">
            <h1 style="rgb(var(--v-theme-task_solving_right_drawer))">Megoldás:</h1>
          </v-row>
          <v-row style="margin-bottom: 1em;">
            <v-text-field label="Megoldás" variant="outlined" v-model="solution"></v-text-field>
          </v-row>
          <v-row style="margin-bottom: 1em;">
              <!-- Alert (Bottom Fixed Position) -->
              <v-alert
                v-if="alertMessage.type"
                :color="alertMessage.type"
                :icon="alertMessage.type === 'success' ? '$success' : '$error'"
                :title="alertMessage.text"
                class="alert-bottom"
              ></v-alert>
          
              <!-- Submit Button -->
              <v-btn
                width="100%"
                style="background-color: #0091EA; color: white"
                @click="SubmitTask"
              >
                Beadás
              </v-btn>
              <v-btn width="100%" style="margin-top: 1em;" @click="push('/')">
              Vissza a főoldalra
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-main>
  </v-layout>

</template>

<script lang="ts" setup>
import { ref, watch, onMounted,watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { UseGetTaskData,UsesubmitSolution } from "@/api/taskSolving/taskSolvingQuery";
import {UseGetSimilarCards,UseCheckIfDailyTask} from '@/api/cards/cardQuery'
import { useProfileGetUser } from '@/api/profile/profileQuery';
import {UseGetThemeById} from '@/api/themes/themeQuery'
//import {TaskView} from '@/stores/taskLoader'

interface Task {
  id: number;
  task_title: string;
  difficulty: number;
  creator_id?: number;
  task: string;
  solution_format: string;
  first_hint?: string;
  second_hint?: string;
  theme_id: number;
}

interface User {
  id: number;
  user_name: string;
}

const route = useRoute();
const router = useRouter(); // Type is inferred, but we can also explicitly type it
const theme_id = ref(0);
const task_id = ref(0);
const isDailyTaskValid = ref(false);
const push = (path: string) => {
  router.push(path);
};
// MathJax Directive
const mathjaxDirective = {
  mounted(el: HTMLElement, binding: any) {
    el.innerHTML = binding.value || "";
    if (window.MathJax) {
      window.MathJax.typesetPromise([el]).catch((err) => console.error("MathJax error:", err));
    }
  },
  updated(el: HTMLElement, binding: any) {
    el.innerHTML = binding.value || "";
    if (window.MathJax) {
      window.MathJax.typesetPromise([el]).catch((err) => console.error("MathJax error:", err));
    }
  }
};

const TaskView = (id: number) => {
  router.push({ name: 'task', params: { id } });
  //window.location.reload();
};

const solution = ref('')

//EZT JAVITANI KELL IDE TASKNAK A THEMEID-JE KELL NEM A SAJAT IDJE!!!!!!!!!!!!!!!!
// Reactive state
const drawer = ref(false);
const group = ref<string | null>(null);


const alertMessage = ref<{ type: "success" | "error" | null; text: string }>({
  type: null,
  text: "",
});


const getTaskData = UseGetTaskData(Number(route.params.id));
const task = ref<Task | null>(null);
const get_user_name = ref<string | null>(null);
const get_fullUser = ref<User | null>(null);
const isDailyTask = UseCheckIfDailyTask(Number(route.params.id));
const theme = UseGetThemeById(theme_id)
const similarCards = UseGetSimilarCards(task_id,theme_id);


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

// Watch group state
watch(group, () => {
  drawer.value = false;
});

watch(() => route.params.id, async (newId) => {
   const id = Number(newId);
   await getTaskData.refetch();
   task.value = getTaskData.data.value;
   
   if (task.value?.theme_id) {
     theme_id.value = task.value.theme_id;
     task_id.value = task.value.id;
     await theme.refetch();
   }
   
   await similarCards.refetch();
   solution.value = '';
  isDailyTaskValid.value = await DailyTaskCheck();
}, { immediate: true });

// Helper functions
const chipColor = (difficulty: number) => {
  return difficulty === 0 ? "green" : difficulty === 1 ? "orange" : "red";
};

const difficultyLabel = (difficulty: number) => {
  return difficulty === 0 ? "Könnyű" : difficulty === 1 ? "Közepes" : "Nehéz";
};



const showAlert = (type: "success" | "error", text: string) => {
  alertMessage.value = { type, text };
  setTimeout(() => {
    alertMessage.value = { type: null, text: "" };
  }, 5000);
};

const { mutate: submitSolution } = UsesubmitSolution();

const SubmitTask = () => {
  if (!get_fullUser.value) {
    showAlert("error", "Jelentkezz be a feladat megoldásához!");
    return;
  }
  if (!solution.value.trim()) {
    showAlert("error", "A megoldás mező üres! Add meg a megoldást a formátum szerint!");
    return;
  }

  const payload = `${get_fullUser.value?.id};${route.params.id};${solution.value}`;


  submitSolution(payload, {  
    onSuccess: (data) => {
      console.log(payload);
      console.log(data);  // Log the response data
      const state = data.state;  // Access the 'state' value
      console.log("State:", state);  // This will log the state (1 in your example)
      
      // Handle the state returned from the backend
      if (state === 1) {
        showAlert("success", "Feladat sikeresen megoldva!");
      } else if(state === 0){
        showAlert("error", "A feladat nem lett sikeresen megoldva.");
      } else {
        showAlert("error", "HIBA történt a megoldás feldolgozása közben.");
      }
    },
    onError: () => {
      showAlert("error", "Hibás megoldás! A megoldás hibás vagy nem egyezik meg a formátummal.");
    },
  });
};


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

  // Fetch user profile
  const get_user_by_token = getCookie('user') || null;
  if (get_user_by_token) {
    const { mutate: ProfileGetUser } = useProfileGetUser();
    await ProfileGetUser({ token: get_user_by_token, id: 0 }, {
      onSuccess: (get_user) => {
        get_user_name.value = get_user.user_name;
        get_fullUser.value = get_user;
      },
    });
  }

  // Fetch task data and then theme data
  await getTaskData.refetch();
  if (getTaskData.data.value && getTaskData.data.value.theme_id) {
    theme_id.value = getTaskData.data.value.theme_id;
    task_id.value = getTaskData.data.value.id;
    await theme.refetch();
  }
});
onMounted(async () => {
  isDailyTaskValid.value = await DailyTaskCheck();
});
const DailyTaskCheck = async() => {
  var currentDate = new Date();
  const taskDate = isDailyTask.data.value?.task_id
  console.log('date',currentDate.getDay())
  console.log('date',isDailyTask.data.value?.id)
  return isDailyTask.data.value != null && currentDate.getDay() == taskDate
}

</script>


<style scoped>
v-main {
  overflow-y: auto;
}

.solution_format{
  background-color: rgb(203, 207, 207);
  border-radius: 15px;
  padding: 2em;
}

.taskInfo{
  background-color: rgb(203, 207, 207);
  border-radius: 15px;
  padding: 2em;
}

.taskDisplay{
  background-color: rgb(203, 207, 207);
  border-radius: 15px;
  padding: 2em;
}

.plusItems{
  background-color: rgb(203, 207, 207);
  border-radius: 15px;
  padding: 2em;
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
