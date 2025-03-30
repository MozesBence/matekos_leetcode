<template>
  <v-layout  :style="{overflow: $vuetify.display.smAndDown ? 'auto' : 'hidden'}">
    <!-- Main Content -->
    <v-main>
      <v-row style="height: 100vh; padding: 0.5em;">
        <!-- Bal oldali rész, feladat infói -->
        <v-col cols="12" md="6" style="background-color: rgb(var(--v-theme-task_solving_left_drawer))">
          <br>
          <div class="taskInfo" style="background-color: rgb(var(--v-theme-task_solving_right_drawer))">
            <!--Feladat sorszáma és címe-->
            <h1 style="text-align: left; width: 100%;">
              {{ task?.id }}. {{ task?.task_title }}
            </h1>
            <v-row style="padding: 1em; gap: 1em; flex-wrap: nowrap; overflow-x: auto; width: 100%; display: flex; white-space: nowrap; ">
              <!-- Chip 1: Nehézség -->
              <v-chip
                :color="chipColor(task?.difficulty ?? 0)"
                outlined
                small
                style="min-width: 10rem; flex-shrink: 0;"
                class="d-flex align-center justify-center"
              >
                <p class="ma-0">{{ difficultyLabel(task?.difficulty ?? 0) }}</p>
              </v-chip>
              <!-- Chip 2 Téma-->
              <v-chip
                :color="'blue'"
                outlined
                small
                style="min-width: 10rem; flex-shrink: 0;"
                class="d-flex align-center justify-center"
              >
                <p class="ma-0">{{theme.data.value?.theme}}</p>
              </v-chip>
              <!-- Chip 3 ha napi task akkor ennek kijelzése-->
              <v-chip
                outlined
                small
                style="min-width: 10rem; flex-shrink: 0; background-color: #95cdfc; color: blue"
                class="d-flex align-center justify-center"
                v-if="isDailyTaskValid">
                <p class="ma-0"><v-icon>mdi-calendar</v-icon> Napi feladat</p>
              </v-chip>
              <!-- Chip 4 ha a feladatot egy user küldte be, akkor annak a usernek a neve-->
              <v-chip
                outlined
                small
                style="min-width: 10rem; flex-shrink: 0; background-color: #FFE082; color: #FF6F00"
                class="d-flex align-center justify-center"
                v-if="task?.creator_id != null"
              >
                <p class="ma-0">👑 {{creator_name.data.value?.user_name}}</p>
              </v-chip>
            </v-row>
          </div>
          <!--A feladat leírása-->
          <div style="margin-top: 2em; background-color: rgb(var(--v-theme-task_solving_right_drawer))" class="taskDisplay">
            <h3>A feladat leírása:</h3>
            <!--Megolás formátumának kijelzése, mathjax használata-->
            
            <div v-mathjax="task?.task"></div>
            <h3>Megoldás formatuma:</h3>
            <p>{{task?.solution_format}}</p>
          </div>
          
          <!--Hasonló feladatok kártyáinak megjelenítése-->
          <div style="margin-top: 2em; background-color: rgb(var(--v-theme-task_solving_right_drawer))" class="plusItems">
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
                        <!--Adott feladat nehézsége-->
                        <p class="ma-0">{{ difficultyLabel(card?.difficulty) }}</p>
                      </v-chip></v-col>
                      <!--Adott feladat sorszáma és címe-->
                      <v-col cols="9" class="d-flex align-center justify-center">{{card.id}}. {{card.task_title}}</v-col>
                    </v-row>
              </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <br>
            <!--1. Segítség kijelzése-->
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
            <!--2. Segítség kijelzése-->
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
        <!--Jobb oldali rész melzben a megoldás mezeje helyezkedik el-->
        <v-col cols="12" md="6" style="padding: 2em; background-color: rgb(var(--v-theme-task_solving_left_drawer))">
          <v-row style="margin-bottom: 1em;margin-top: 1em;">
            <h1 style="color:rgb(var(--v-theme-task_solving_right_drawer))">Megoldás:</h1>
          </v-row>
          <v-row style="margin-bottom: 1em;">
            <v-text-field label="Megoldás" variant="outlined" v-model="solution"></v-text-field>
          </v-row>
          <v-row style="margin-bottom: 1em;">
              <!-- Alert -->
              <v-alert
                v-if="alertMessage.type"
                :color="alertMessage.type"
                :icon="alertMessage.type === 'success' ? '$success' : '$error'"
                :title="alertMessage.text"
                class="alert-bottom"
              ></v-alert>
          
              <!-- Beadés gombja -->
              <v-btn
                width="100%"
                style="background-color: #0091EA; color: white"
                @click="SubmitTask"
              >
                Beadás
              </v-btn>
              <!--Vissza a főoldalra gomb-->
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

/*--- Importok kezdete ---*/
import { ref, watch, onMounted,watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { UseGetTaskData,UsesubmitSolution } from "@/api/taskSolving/taskSolvingQuery";
import {UseGetSimilarCards,UseCheckIfDailyTask} from '@/api/cards/cardQuery'
import { useProfileGetUser,UseGetUserById } from '@/api/profile/profileQuery';
import {UseGetThemeById} from '@/api/themes/themeQuery'
import {getCookie, get_fullUser,get_user_name, userId} from '@/stores/userStore'
import {UseCheckToken,UsedeactivateToken} from '@/api/redeemWayBackToken/WayBackTokenQuery'
/*--- Importok vége ---*/

//Intefacek kezdete
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
//Interfacek vége

//változók kezdete
const route = useRoute();
const router = useRouter();
const theme_id = ref(0);
const task_id = ref(0);
const isDailyTaskValid = ref(false);
const solution = ref('')
const drawer = ref(false);
const group = ref<string | null>(null);
const alertMessage = ref<{ type: "success" | "error" | null; text: string }>({
  type: null,
  text: "",
});
const getTaskData = UseGetTaskData(Number(route.params.id));
const task = ref<Task | null>(null);
const isDailyTask = UseCheckIfDailyTask(Number(route.params.id));
const theme = UseGetThemeById(theme_id)
const similarCards = UseGetSimilarCards(task_id,theme_id);
const creator_id = ref(0)
const creator_name = UseGetUserById(creator_id);
const checkIfLateTask = UseCheckToken(ref(get_fullUser.value.id),task_id)
//változók vége

//push létrehuzása
const push = (path: string) => {
  router.push(path);
};


// MathJax behúzása
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

//Átirányítás másik taskra
const TaskView = (id: number) => {
  router.push({ name: 'task', params: { id } });
};

//Nehézség szerint eldöntjük a színt (könnyű - zöld, közepes - narancssárga, nehéz - piros)
const chipColor = (difficulty: number) => {
  return difficulty === 0 ? "green" : difficulty === 1 ? "orange" : "red";
};

/*
  Nehézség eldöntése a kapott difficulty alapján ami lehet
    - 0, könnyű,
    - 1, közepes,
    - 2, nehéz
*/
const difficultyLabel = (difficulty: number) => {
  return difficulty === 0 ? "Könnyű" : difficulty === 1 ? "Közepes" : "Nehéz";
};

//Kijelzi az adott alertet ami, succes vagy error type-el rendelkezik, illetve adott textet helyez az alertbe, 5mp után bezáródik automatikusan
const showAlert = (type: "success" | "error", text: string) => {
  alertMessage.value = { type, text };
  setTimeout(() => {
    alertMessage.value = { type: null, text: "" };
  }, 5000);
};

//Válasz beküldés query
const { mutate: submitSolution } = UsesubmitSolution();

//Token levonás query
const {mutate: minusToken} = UsedeactivateToken(ref(get_fullUser.value.id),task_id);

//Válasz beküldés kezelése
const SubmitTask = async() => {
  await checkIfLateTask.refetch()
  //Ha nincs bejelentkezve a user jelezzük, hogy jelentkezzen be vagy regisztráljon
  if (!get_fullUser.value) {
    showAlert("error", "Jelentkezz be vagy regisztrálj a feladat megoldásához!");
    return;
  }
  //Ha nincs kitöltve a megoldás mező jelezzük a user felé alertel
  if (!solution.value.trim()) {
    showAlert("error", "A megoldás mező üres! Add meg a megoldást a formátum szerint!");
    return;
  }
  //A megolás amit beküldünki itt kerül formázásra userId;taskId;válasz sorrendben
  const payload = `${get_fullUser.value?.id};${route.params.id};${solution.value}`;

  //Beadás befejezése
  Complete_Submission(payload);
};

//Ha minden megfelelt SubmitTaskban végrehajtjuk a beküldést, ennek eredményét alertel jelezzük
const Complete_Submission = (payload:string) =>{
  submitSolution(payload, {  
    onSuccess: (data) => {
      const state = data.state;
      if (state === 1) {
        if(checkIfLateTask){
            //Ez akkor szükséges ha tokennel lett kiváltva a napi task és sikeres a megoldás
            minusToken(undefined,{});
      }
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
}

//checkolja, hogy a task az az adott napon daily task-e
const DailyTaskCheck = async() => {
  var currentDate = new Date();
  const taskDate = isDailyTask.data.value?.task_id
  return isDailyTask.data.value != null && currentDate.getDay() == taskDate
}

//trigger eventek
watch(group, () => {
  drawer.value = false;
});

//Ha változik a paramsban az id (ez a task idje) akkor frissíti az adatokat
watch(
  () => route.params.id,
  async (newId) => {
    const id = Number(newId);

    await getTaskData.refetch();
    const taskData = getTaskData.data.value;

    if (!taskData) return;

    task.value = taskData;
    task_id.value = taskData.id;
    theme_id.value = taskData.theme_id ?? null;

    if (theme_id.value) {
      await theme.refetch();
    }
    await similarCards.refetch();
    solution.value = "";
    isDailyTaskValid.value = await DailyTaskCheck();
  },
  { immediate: true }
);



//Oldal betöltésekor lefutó kérések, függvények...
//Ellenőrzi, hogy napi feladat-e az adott napra vonatkozóan
onMounted(async () => {
  isDailyTaskValid.value = await DailyTaskCheck();
});

onMounted(async () => {
  //cookieből user infók
  const userCookie = getCookie('user');
  if (userCookie) {
    try {
      const userData = JSON.parse(atob(userCookie.split('.')[1]));
      get_user_name.value = userData.id;
    } catch (error) {
      console.error('Error parsing user cookie:', error);
    }
  }
  // Fetcheli user adatait
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
  await handleTaskData();
});
//Feladat lekérése és ujrafetchelése onMountdeben helper funct.
const handleTaskData = async() => {
  await getTaskData.refetch();
  if (getTaskData.data.value && getTaskData.data.value.theme_id) {
    theme_id.value = getTaskData.data.value.theme_id;
    task_id.value = getTaskData.data.value.id;
    creator_id.value = getTaskData.data.value.creator_id
    await creator_name.refetch();
    await theme.refetch();
  }
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
