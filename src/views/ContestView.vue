<template>
  <div class="mt-2">
    <v-container class="hero">
      <v-icon icon="mdi-trophy" color="amber" size="128" class="mb-4"></v-icon>
      <h1>MathSolve kihivás</h1>
      <p>Minden héten kihívás, oldd meg és nézd meg a ranglistán elfoglalt helyezésed!</p>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="kihivas" @click="hetiKihivasAtiranyit()">
            <v-card-text class="pa-6">
              
              <v-card-title>
                <v-icon icon="mdi-calendar" color="community_createpost_btn" class="mb-2"></v-icon>

                Heti kihivás
              </v-card-title>
              <v-card-subtitle>
                <!-- Visszaszámláló hogy mennyi idő van még az aktuális challengből -->
              </v-card-subtitle>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="kihivas" @click="haviKihivasAtiranyit()">
            <v-card-text class="pa-6">
              <v-card-title>
                <v-icon icon="mdi-calendar" color="community_createpost_btn" class="mb-2"></v-icon>

                Havi kihívás
              </v-card-title>
              <v-card-subtitle class="text-grey-lighten-1 pa-0">
                <!-- Visszaszámláló hogy mennyi idő van még a kihívásból -->
              </v-card-subtitle>
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
            <v-list v-for="(member, index) in LeaderboardArray" :key="index" v-if="LeaderboardArray.length > 0">
              <v-list-item>
                <div class="d-flex flex-row align-center mb-3 pa-1 px-3 rounded justify-space-between" 
                    style="width: 100%; background-color: rgb(var(--v-theme-community_comment_bc));">
                  <b-btn @click="router.push({ name: 'profile', params: { id: member.id } })" style="cursor: pointer;">
                    <div style="height: 2rem; width: 2rem; border-radius: 50%; overflow: hidden; position: relative;">
                      <img :src="member.profil_picture == null ? '/src/components/background/test_profile.jpg' : member.profil_picture" 
                          alt="" 
                          style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; object-fit: cover;">
                    </div>
                  </b-btn>
                  <b-btn @click="router.push({ name: 'profile', params: { id: member.id } })" style="cursor: pointer;">
                    <h3 style="font-weight: normal;">{{ member.name }}</h3>
                  </b-btn>
                  <h3 style="font-weight: normal; width: 4em; text-align: right;">{{ member.level }}.szint</h3>
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
              <v-list-item v-for="(contest, index) in contests" :key="index">
                <v-list-item>
                  <v-img :src="contest.image"></v-img>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>{{ contest.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ contest.date }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item-action>
                  <v-btn text color="primary">Virtual</v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-pagination v-model="page" :length="0"></v-pagination>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

import { useLeaderboard } from '@/api/contest/contestQuery'

const LeaderboardArray = ref([]);

onMounted(() => {
  const { mutate } = useLeaderboard();

  mutate(undefined, {
    onSuccess: (array) => {
      LeaderboardArray.value = array;
    },
    onError: (error) => {
      console.log(error);
    },
  });
});

function hetiKihivasAtiranyit(){
  router.push({path: '/weekly-challange'});
}
function haviKihivasAtiranyit(){
  router.push({path: '/monthly-challange'});
}
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
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: rgb(var(--v-theme-about_main_text_color));
  padding: 50px 20px;
  border-radius: 12px;
  margin-bottom: 30px;
}
.hero h1 {
  font-size: 3rem;
  transition: font-family 0.5s ease, color 0.5s ease;
}
.kihivas{
  background-color: rgb(var(--v-theme-contest_cards_background));
  cursor: pointer;
}
</style>