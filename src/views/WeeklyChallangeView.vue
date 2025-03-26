<template>
  <main class="pa-2">
    <v-container class="hero">
      <h1>{{ currentWeek }}. heti kihívás</h1>
    </v-container>

    <v-container class="ma-auto mb-5 pa-0">
      <v-btn class="d-flex align-center rounded-0 rounded-b-lg" elevation="0" @click="router.back()">
        <v-icon class="mr-2">mdi-arrow-left</v-icon>
        Versenyekhez
      </v-btn>
    </v-container>

    <v-container>
      <v-row v-if="isLoading">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-col>
      </v-row>

      <!-- Két feladat egymás mellett -->
      <v-row v-if="!isLoading">
        <v-col v-for="task in tasks" :key="task.id" cols="12" md="6">
          <v-card class="pa-2 d-flex flex-column ga-1">
            <v-card-title><h1>{{ task.task_title }}</h1></v-card-title>
            <div style="color: rgb(var(--v-theme-text_color));" class="mx-3">
              <h2 style="font-weight: normal; width: 100%; height: auto;" v-mathjax="task.task"></h2>
            </div>
            <v-card-text>
              <v-text-field
                :v-model="getSolution(task)"
                label="Megoldásod"
                variant="outlined"
                class="task-input"
                :disabled="!get_user_by_token"
              ></v-text-field>

              <v-expansion-panels class="rounded" v-if="get_user_by_token">
                <v-expansion-panel
                elevation="0"
                color="contest_challange_card"
                bg-color="contest_challange_card"
                >
                <template v-slot:title>
                    <v-icon class="mr-2">mdi-lightbulb</v-icon> Segítség 1.
                  </template>
                  <v-expansion-panel-text>
                    <div v-mathjax="task.first_hint"></div>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel
                elevation="0"
                color="contest_challange_card"
                bg-color="contest_challange_card"
                >
                  <template v-slot:title>
                    <v-icon class="mr-2">mdi-lightbulb</v-icon> Segítség 2.
                  </template>
                  <v-expansion-panel-text>
                    <div v-mathjax="task.second_hint"></div>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Beadás gomb -->
      <v-row justify="center" class="mt-5" v-if="get_user_by_token">
        <v-btn color="primary" class="submit-btn">
          Beadás
        </v-btn>
      </v-row>
    </v-container>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useGetChallange } from '@/api/contest/contestQuery';
import { useDisplay, useTheme } from 'vuetify';
import { useRouter, useRoute } from 'vue-router';
import { useProfileGetUser, useProfileDarkmodeSwitch } from '@/api/profile/profileQuery'

const getISOWeekNumber = () => {
  const now = new Date();
  const yearStart = new Date(now.getFullYear(), 0, 1);
  const firstThursday = new Date(now.getFullYear(), 0, (4 - yearStart.getDay()) + 1);
  const weekMilliseconds = 7 * 24 * 60 * 60 * 1000;
  return Math.ceil(((now.getTime() - firstThursday.getTime()) / weekMilliseconds) + 1);
};

const router = useRouter();
const route = useRoute();

const currentWeek = ref(getISOWeekNumber());
const tasksWeek = ref(null);
const theme = useTheme();
var get_user_by_token = (getCookie('user') != null && getCookie('user') != 'undefined' && typeof getCookie('user') != "object") ? getCookie('user') : null;
const isLoading = ref(true);
const tasks = ref([]);

// <------- Api hívások ------->

// Api hívás - felhasználói profil lekérése
const { mutate: ProfileGetUser } = useProfileGetUser()

// Api hívás - versenyek lekérdezése
const { mutate: getChallange } = useGetChallange()

// <------- Api hívások ------->

// <------- Függvények | figyelők ------->

onMounted(async ()=>{
  if (get_user_by_token) {
    try {
      await ProfileGetUser({ token: get_user_by_token, id: 0 }, {
        onSuccess: (get_user) => {
          theme.global.name.value = get_user.User_customization.darkmode ? 'darkTheme' :'lightTheme';
        },
        onError: () => getCookie('user') && deleteCookie('user'),
      });
    } catch (error) {
      console.error('Hiba történt a felhasználó lekérésekor:', error);
    }
  }

  try {
      await getChallange({ id: currentWeek.value, define: "week" }, {
        onSuccess: (response) => {
          isLoading.value = false;
          console.log(response);
          tasksWeek.value = response.id;
          tasks.value = response.Tasks;
        },
        onError: () => {
          isLoading.value = false;
          getCookie('user') && deleteCookie('user')
        }
      });
    } catch (error) {
      console.error('Hiba történt a felhasználó lekérésekor:', error);
    }
})

function getSolution(task){
  task.solution = currentWeek == tasksWeek ? "" : task.solution;
}

function getCookie(name){
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// <------- Függvények | figyelők ------->
</script>

<style scoped>
.hero {
  text-align: center;
  background: linear-gradient(120deg, #6a11cb, #2575fc, #00d2ff);
  background-size: 200% 200%;
  animation: gradient-animation 6s ease infinite;
  color: white;
  padding: 50px 20px;
  border-radius: 12px;
  border-bottom-left-radius: 0px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.hero h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

@keyframes gradient-animation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
