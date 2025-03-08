<template>
  <v-layout>
    <!-- App Bar -->
    <v-app-bar color="primary" :absolute="false">
      <v-spacer></v-spacer>
      <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
    </v-app-bar>
    <!-- Main Content -->
    <v-main style="padding-top: 64px;">
      <v-row style="height: 100vh; padding: 0.5em;">
        <!-- Left Column: Task Details -->
        <v-col cols="12" md="6" style="background-color: rgb(var(--v-theme-home_rightdrawer_card));">
          <br>
          <div class="taskInfo">
            <h1 style="text-align: left; width: 100%;">
              {{ task?.id }}. {{ task?.task_title }}
            </h1>
            <v-row style="padding: 1em; gap: 1em; flex-wrap: nowrap; overflow-x: auto; width: 100%; display: flex; white-space: nowrap;">
              <!-- Chip 1: Difficulty -->
              <v-chip
                :color="chipColor(task?.difficulty)"
                outlined
                small
                style="min-width: 10rem; flex-shrink: 0;"
                class="d-flex align-center justify-center"
              >
                <p class="ma-0">{{ difficultyLabel(task?.difficulty) }}</p>
              </v-chip>
              <!-- Chip 2 -->
              <v-chip
                :color="'blue'"
                outlined
                small
                style="min-width: 10rem; flex-shrink: 0;"
                class="d-flex align-center justify-center"
              >
                <p class="ma-0">Exponenciális és logaritmusos feladatok</p>
              </v-chip>
              <!-- Chip 3 -->
              <v-chip
                outlined
                small
                style="min-width: 10rem; flex-shrink: 0; background-color: #95cdfc; color: blue"
                class="d-flex align-center justify-center"
              >
                <p class="ma-0"><v-icon>mdi-calendar</v-icon> Napi feladat</p>
              </v-chip>
              <!-- Chip 4 -->
              <v-chip
                outlined
                small
                style="min-width: 10rem; flex-shrink: 0; background-color: #FFE082; color: #FF6F00"
                class="d-flex align-center justify-center"
              >
                <p class="ma-0">👑 Creator: @Jozsi</p>
              </v-chip>
            </v-row>
          </div>

          <div style="margin-top: 2em;" class="taskDisplay">
            <h3>A feladat leírása:</h3>
            <div v-mathjax="task?.task"></div>
            <h3>Megoldás formatuma:</h3>
            <p>x = 1</p>
          </div>
          
          <div style="margin-top: 2em;" class="plusItems">
            <br>
            <v-expansion-panels style="border-radius: 15px;">
              <v-expansion-panel
                title="Hasonló feladatok"
                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
              >
              </v-expansion-panel>
            </v-expansion-panels>
            <br>
            <v-expansion-panels style="border-radius: 15px;">
              <v-expansion-panel>
                <template v-slot:title>
                  <v-icon class="mr-2">mdi-lightbulb</v-icon> Segítség 1.
                </template>
                <v-expansion-panel-text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima.
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima.
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-row>
            </v-row>
            <br>
          </div>
        </v-col>

        <v-col cols="12" md="6" style="padding: 2em;">
          <v-row style="margin-bottom: 1em;margin-top: 1em;">
            <h1>Megoldás:</h1>
          </v-row>
          <v-row style="margin-bottom: 1em;">
            <v-text-field label="Megoldás" variant="outlined" v-model="solution"></v-text-field>
          </v-row>
          <v-row style="margin-bottom: 1em;">
            <input type="file" name="Megoldás" id="" />
          </v-row>
          <v-row style="margin-bottom: 1em;">
            <v-btn width="100%" style="background-color: #0091EA; color: white" @click="SubmitTask">
              Beadás
            </v-btn>              
            <v-btn width="100%" style="margin-top: 1em;" @click="back">
              Vissza a főoldalra
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { UseGetTaskData } from "@/api/taskSolving/taskSolvingQuery";


// MathJax Directive
const mathjaxDirective = {
  mounted(el: HTMLElement, binding: any) {
    el.innerHTML = binding.value || "";
    if (window.MathJax) {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, el]);
    }
  },
  updated(el: HTMLElement, binding: any) {
    el.innerHTML = binding.value || "";
    if (window.MathJax) {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, el]);
    }
  }
};

const solution = ref('')

// Reactive state
const drawer = ref(false);
const group = ref<string | null>(null);

// Watch group state
watch(group, () => {
  drawer.value = false;
});

// Task Data
const isLoading = ref(false);
const error = ref<any>(null);
const route = useRoute();
const router = useRouter();
const getTaskData = UseGetTaskData(Number(route.params.id));
var task = ref([]);
const get_user_name = ref<string | null>(null);
const get_user_email = ref<string | null>(null);
const get_fullUser = ref<any[]>([]);
const userId = ref(get_fullUser.value.id);

watch(() => getTaskData.data.value, (newVal) => {
  console.log(newVal);
  task.value = newVal;
  console.log(task.value)
});

// Helper functions
const chipColor = (difficulty: number) => {
  return difficulty === 0 ? "green" : difficulty === 1 ? "orange" : "red";
};

const difficultyLabel = (difficulty: number) => {
  return difficulty === 0 ? "Könnyű" : difficulty === 1 ? "Közepes" : "Nehéz";
};

const SubmitTask = () => {
  if (!solution.value.trim()) {
    alert("Kérlek, írj be egy megoldást!"); 
    return;
  }

  const payload = `${get_fullUser.value.id};${route.params.id};${solution.value}`;
  const { mutate: submitSolution } = useSubmitSolution();
  submitSolution(payload, {
    onSuccess: () => {
      alert("Megoldás sikeresen beküldve!");
      solution.value = ""; 
    },
    onError: (err) => {
      alert("Hiba történt a megoldás beküldésekor: " + err.message);
    },
  });
};

const back = () => {
  router.go(-1);
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
</style>
