<template>
  <main class="pa-2">
    <v-container class="hero" :style="{borderBottomRightRadius: get_user_by_token && (currentWeek == getISOWeekNumber() || currentWeek == getMonthNumber()) ? '0px' : '12px'}">
      <h1>{{ ( route.params.id ) }}. {{ (route.params.define == "month" ? "Havi" : "Heti") }} kihívás</h1>
    </v-container>

    <v-container class="ma-auto mb-5 pa-0 position-relative">
      <v-btn class="d-flex align-center rounded-0 rounded-b-lg" elevation="0" @click="router.back()">
        <v-icon class="mr-2">mdi-arrow-left</v-icon>
        Versenyekhez
      </v-btn>
      <v-btn 
      class="d-flex align-center rounded-0 rounded-b-lg position-absolute" 
      style="right: 0; top: 0;" 
      elevation="0" 
      v-if="get_user_by_token && !Uploaded && (currentWeek == getISOWeekNumber() || currentWeek == getMonthNumber()) && tasks.data != null"
      @click="UploadSolution()"
      >
        <v-icon class="mr-2">mdi-arrow-up</v-icon>
        Beadás
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
        <v-col v-for="task in tasks.data" :key="task.id" cols="12" md="6">
          <v-card class="pa-2 d-flex flex-column ga-1">
            <v-card-title><h1>{{ task.task_title }}</h1></v-card-title>
            <div style="color: rgb(var(--v-theme-text_color));" class="mx-3">
              <h2 style="font-weight: normal; width: 100%; height: auto;" v-mathjax="task.task"></h2>
            </div>
            <v-card-text>
              <v-text-field
                v-model="task.solution"
                :label="(currentWeek == getISOWeekNumber() || currentWeek == getMonthNumber()) && !Uploaded ? 'Megoldásod' : 'Megoldás'"
                variant="outlined"
                class="task-input"
                :disabled="!get_user_by_token || Uploaded || (currentWeek != getISOWeekNumber() && currentWeek != getMonthNumber())"
              />

              <v-expansion-panels class="rounded" v-if="get_user_by_token && !Uploaded &&(currentWeek == getISOWeekNumber() || currentWeek == getMonthNumber())">
                <v-expansion-panel
                elevation="0"
                color="contest_challange_card"
                bg-color="contest_challange_card"
                >
                <template v-slot:title>
                    <v-icon class="mr-2">mdi-lightbulb</v-icon> Segítség 1.
                  </template>
                  <v-expansion-panel-text>
                    <h3 style="font-weight: normal;" v-mathjax="task.first_hint"></h3>
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
                    <h3 style="font-weight: normal;" v-mathjax="task.second_hint"></h3>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script setup>
import { ref, onMounted, watch, inject, reactive } from 'vue';
import { useGetChallange, useUploadSolution } from '@/api/contest/contestQuery';
import { useDisplay, useTheme } from 'vuetify';
import { useRouter, useRoute } from 'vue-router';
import { useProfileGetUser} from '@/api/profile/profileQuery'

// Üzenetkezelés
const showError = inject("showError");
const showSucces = inject("showSucces");

const router = useRouter();
const route = useRoute();

var get_user_by_token = (getCookie('user') != null && getCookie('user') != 'undefined' && typeof getCookie('user') != "object") ? getCookie('user') : null;
const currentWeek = route.params.id;
const Competition_id = ref(null);
const theme = useTheme();
const isLoading = ref(true);
const tasks = reactive({ data: [] });
const Uploaded = ref(false);

// <------- Api hívások ------->

// Api hívás - felhasználói profil lekérése
const { mutate: ProfileGetUser } = useProfileGetUser()

// Api hívás - verseny feladatok lekérdezése
const { mutate: getChallange } = useGetChallange()

// Api hívás - megoldások feltöltése lekérdezése
const { mutate: uploadSolution } = useUploadSolution()

// <------- Api hívások ------->

// <------- Függvények | figyelők ------->

const getISOWeekNumber = () => Math.ceil((((new Date()) - new Date(new Date().getFullYear(), 0, 4 - new Date().getDay() + 1)) / 604800000) + 1);

const getMonthNumber = () => new Date().getMonth() + 1;

onMounted(async ()=>{
  if (get_user_by_token) {
    await ProfileGetUser({ token: get_user_by_token, id: 0 }, {
      onSuccess: (get_user) => {
        theme.global.name.value = get_user.User_customization.darkmode ? 'darkTheme' :'lightTheme';
      },
      onError: (error) =>{
        showError ? showError(error.response.data) : console.log(error.response.data)
        deleteCookie('user')
      }
    });
  }

  try {
      await getChallange({ id: route.params.id, define: route.params.define, token: get_user_by_token}, {
        onSuccess: (response) => {
          if(response.CompetitionSubmissions){
            Uploaded.value = response.CompetitionSubmissions.length == 1;
          }
          isLoading.value = false;
          Competition_id.value = response.id;
          if((getISOWeekNumber() == response.identifier || getMonthNumber() == response.identifier) && !Uploaded.value){
            response.Tasks.forEach(c => c.solution = "")
          }
          tasks.data = response.Tasks;
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

const UploadSolution = async () =>{
  if(getISOWeekNumber() == currentWeek || getMonthNumber() == currentWeek){
    await uploadSolution({data: { data: tasks.data.map(c => ({ id: c.id, solution: c.solution })), comp_id: Competition_id.value}, token: get_user_by_token},{
      onSuccess: () =>{
        Uploaded = true;
        showSucces ? showSucces("Sikeresen fel lettek töltve az eredmények!") : console.log("Sikeresen fel lettek töltve az eredmények!")
      },
      onError: (error) =>{
        showError ? showError("Nem sikerült feltölteni az eredményeket!") : console.log("Nem sikerült feltölteni az eredményeket!")
      }
    })
  }
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
