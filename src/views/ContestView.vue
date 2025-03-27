<template>
  <div class="mt-2">
    <v-container class="hero" style="width: 95%;">
      <v-icon icon="mdi-trophy" color="amber" size="128" class="mb-4"></v-icon>
      <h1>MathSolve kihivás</h1>
      <p>Minden héten kihívás, oldd meg és nézd meg a ranglistán elfoglalt helyezésed!</p>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="kihivas" :disabled="!currentWeekChallange" @click="router.push({ name: 'challange', params: { id : getISOWeekNumber(), define: 'week'} })">
            <v-card-text class="pa-6 position-relaite align-center">
              
              <v-card-title>
                <v-icon icon="mdi-calendar" color="community_createpost_btn" class="mb-2"></v-icon>
                Heti kihivás
              </v-card-title>
              <v-card-subtitle style="color: rgb(var(--v-theme-text_color));">
                {{ weeklyCountdown }}
              </v-card-subtitle>
              <div
              v-if="currentWeekChallange && currentWeekChallange.CompetitionSubmissions && currentWeekChallange.CompetitionSubmissions.length != 0" 
              style="position: absolute; right: 0; top: 50%; transform: translate(-50%, -50%); background-color: rgb(var(--v-theme-success), .2);" 
              class="pa-3 rounded-lg">
                <h2 style="font-weight: normal; color: rgb(var(--v-theme-success));">Leadva</h2>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="kihivas" :disabled="!currentMonthChallange"  @click="router.push({ name: 'challange', params: { id : getMonthNumber(), define: 'month'} })">
            <v-card-text class="pa-6 position-relaite align-center">
              <v-card-title>
                <v-icon icon="mdi-calendar" color="community_createpost_btn" class="mb-2"></v-icon>

                Havi kihívás
              </v-card-title>
              <v-card-subtitle style="color: rgb(var(--v-theme-text_color));">
                {{ monthlyCountdown }}
              </v-card-subtitle>
              <div
              v-if="currentMonthChallange && currentMonthChallange.CompetitionSubmissions && currentMonthChallange.CompetitionSubmissions.length != 0" 
              style="position: absolute; right: 0; top: 50%; transform: translate(-50%, -50%); background-color: rgb(var(--v-theme-success), .2);" 
              class="pa-3 rounded-lg">
                <h2 style="font-weight: normal; color: rgb(var(--v-theme-success));">Leadva</h2>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <!-- Leaderboard (mobilon először jön) -->
        <v-col cols="12" md="4" class="order-1 order-md-2">
          <v-card>
            <v-card-title>Leaderboard</v-card-title>
            <v-divider></v-divider>
            <v-list v-for="(member, index) in LeaderboardArray" :key="index" v-if="LeaderboardArray.length > 0" class="pa-0">
              <v-list-item class="pa-0 px-2">
                <div class="d-flex flex-row align-center mb-1 pa-1 px-3 rounded justify-space-between mt-1" style="width: 100%; background-color: rgb(var(--v-theme-community_comment_bc));">
                  <div style="width: 20%;" class="d-flex justify-start">
                    <v-btn @click="router.push({ name: 'profile', params: { id: member.id } })" style="cursor: pointer; background-color: transparent !important;" icon elevation="0">
                      <div style="height: 3rem; width: 3rem; border-radius: 50%; overflow: hidden; position: relative;">
                        <img :src="member.profil_picture == null ? '/src/components/background/test_profile.jpg' : member.profil_picture" 
                            alt="" 
                            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; object-fit: cover;">
                      </div>
                    </v-btn>
                  </div>
                  <div style="width: 50%;" class="d-flex justify-center">
                    <v-btn @click="router.push({ name: 'profile', params: { id: member.id } })" style="cursor: pointer; background-color: transparent !important;"  elevation="0">
                      <h3 style="font-weight: normal; text-transform: none;">{{ member.name }}</h3>
                    </v-btn>
                  </div>
                  <div style="width: 30%;" class="d-flex justify-end">
                    <h3 style="font-weight: normal; text-align: right;">{{ member.level }}.szint</h3>
                  </div>
                </div>
              </v-list-item>
            </v-list>
            <div class="d-flex justify-center my-3" v-if="LeaderboardArray.length == 0">
              <h4 style="font-weight: normal;">Nincs még felhasználó aki regisztrált volna!</h4>
            </div>
          </v-card>
        </v-col>

        <!-- Kihívások -->
        <v-col cols="12" md="8" class="order-2 order-md-1">
          <v-card>
            <v-card-title>Előző kihívások</v-card-title>
            <v-divider></v-divider>
            <v-list>
              <v-list-item v-for="(contest, index) in prev_contest" :key="index" v-if="prev_contest && prev_contest.length != 0">
                <v-list-item class="pa-0">
                  <v-hover v-slot="{ isHovering, props }">
                    <v-card elevation="0" v-bind="props">
                      <v-btn style="background-color: rgb(var(--v-theme-community_comment_bc)); width: 100%;" class="position-relative pa-6 rounded d-flex justify-start" @click="router.push({ name: 'challange', params: { id : contest.identifier, define: contest.define } })">
                        <div>
                          <h2>{{ contest.identifier }}. - {{ contest.define == "week" ? "Heti" : "Havi" }} kihívás</h2>
                        </div>
                        <div
                          v-if="contest.CompetitionSubmissions && contest.CompetitionSubmissions.length != 0" 
                          style="position: absolute; right: 4rem; background-color: rgb(var(--v-theme-success), .2);" 
                          class="pa-1 px-3 rounded-lg">
                            <h3 style="font-weight: normal; color: rgb(var(--v-theme-success));">Leadva</h3>
                        </div>
                        <div style="position: absolute; right: 1rem;" v-if="!isMobile">
                          <v-slide-x-reverse-transition>
                            <v-icon v-if="isHovering" size="30">
                              mdi-arrow-right
                            </v-icon>
                          </v-slide-x-reverse-transition>
                        </div>
                        <div style="position: absolute; right: 1rem;" v-else>
                          <v-icon size="30">
                              mdi-arrow-right
                          </v-icon>
                        </div>
                      </v-btn>
                    </v-card>
                  </v-hover>
                </v-list-item>
              </v-list-item>
              <v-list-item v-else class="d-flex justify-center">
                <h2 style="font-weight: normal;">Eddig még nem történt egyelőre előző kihívás!</h2>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, computed} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useLeaderboard, useGetPrevChallange} from '@/api/contest/contestQuery';
import { useTheme, useDisplay } from 'vuetify';

// Router és route hookok
const router = useRouter();
const route = useRoute();

// Képernyő méret / eszköz
const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);

// <------- Változók ------->

var interval = null;
var get_user_by_token = (getCookie('user') != null && getCookie('user') != 'undefined' && typeof getCookie('user') != "object") ? getCookie('user') : null;
const LeaderboardArray = ref([]);
const weeklyCountdown = ref('');
const monthlyCountdown = ref('');
const prev_contest = ref(null);
const currentWeekChallange = ref(null);
const currentMonthChallange = ref(null);

// <------- Változók ------->

// <------- Api hívások ------->

//Api hívás - ranglista lekérése
const { mutate } = useLeaderboard();

//Api hívás - előző versenyek lekérése
const { mutate: getPrevChallange } = useGetPrevChallange();

// <------- Api hívások ------->

// <------- Függvények | figyelők ------->
function updateCountdowns() {
  weeklyCountdown.value = formatTimeDifference(getTimeUntilNextMonday());
  monthlyCountdown.value = formatTimeDifference(getTimeUntilNextMonth());
}

function getTimeUntilNextMonday() {
  const now = new Date();
  const nextMonday = new Date(now);
  nextMonday.setDate(now.getDate() + ((8 - now.getDay()) % 7 || 7));
  nextMonday.setHours(0, 0, 0, 0);
  return nextMonday - now;
}

function getTimeUntilNextMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1) - now;
}

function formatTimeDifference(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400), hours = Math.floor((totalSeconds % 86400) / 3600),
        minutes = Math.floor((totalSeconds % 3600) / 60), seconds = totalSeconds % 60;
  return `${days} nap ${hours} óra ${minutes} perc ${seconds} mp`;
}

const getISOWeekNumber = () => Math.ceil((((new Date()) - new Date(new Date().getFullYear(), 0, 4 - new Date().getDay() + 1)) / 604800000) + 1);

const getMonthNumber = () => new Date().getMonth() + 1;

onMounted(async () => {
  await getPrevChallange(get_user_by_token, {
    onSuccess: (response) => {
      const filterChallenges = response.filter(c => {
        if (c.identifier === getISOWeekNumber()) currentWeekChallange.value = c;
        else if (c.identifier === getMonthNumber()) currentMonthChallange.value = c;
        else return true;
      });
      prev_contest.value = filterChallenges;
    }
  });

  mutate(undefined, {
    onSuccess: (array) => LeaderboardArray.value = array,
    onError: (error) => console.log(error),
  });

  updateCountdowns();
  interval = setInterval(updateCountdowns, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});

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
.kihivas {
  transition: transform 0.2s;
}
.kihivas:hover {
  transform: translateY(-4px);
}

.hero {
  text-align: center;
  background: linear-gradient(120deg, #6a11cb, #2575fc, #00d2ff, #6a11cb, #2575fc, #00d2ff);
  background-size: 400% 400%;
  animation: gradient-animation 8s ease-in-out infinite;
  color: rgb(var(--v-theme-about_main_text_color));
  padding: 50px 20px;
  border-radius: 12px;
  margin-bottom: 30px;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 93% 50%;
  }
}

.hero h1 {
  font-size: 2.5rem;
  transition: font-family 0.5s ease, color 0.5s ease;
}

.kihivas{
  background-color: rgb(var(--v-theme-contest_cards_background));
  cursor: pointer;
}
</style>