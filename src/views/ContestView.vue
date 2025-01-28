<template>
  <v-app class="mt-2">
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
              
              <v-card-title><v-icon icon="mdi-calendar" color="white" class="mb-2"></v-icon>

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
              <v-card-title><v-icon icon="mdi-calendar" color="white" class="mb-2"></v-icon>

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
        <!-- bal -->
        <v-col cols="8">
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

        <!-- jobb -->
        <v-col cols="4">
          <v-card>
            <v-card-title>Leaderboard</v-card-title>
            <v-divider></v-divider>
            <v-list v-for="(member, index) in LeaderboardArray" :key="index" v-if="LeaderboardArray.length > 0">
              <v-list-item>
                <div class="d-flex flex-row align-center mb-3 pa-1 px-3 rounded justify-space-between" style="width: 100%; background-color: rgb(var(--v-theme-community_comment_bc));">
                  <b-btn @click="router.push({ name: 'profile', params: { id: member.id } })">
                    <div style="height: 2rem; width: 2rem; border-radius: 50%; overflow: hidden;">
                      <img :src="member.profil_picture == null ? '/src/components/background/test_profile.jpg' : member.profil_picture" alt="" style="width: 100%; position: relative;" :style="{ top: member.profil_picture === null ? '0rem' : '-1rem' }">
                    </div>
                  </b-btn>
                  <b-btn @click="router.push({ name: 'profile', params: { id: member.id } })">
                    <h3 style="font-weight: normal;">{{ member.name }}</h3>
                  </b-btn>
                  <h3 style="font-weight: normal;">{{ member.experience_point }}xp</h3>
                </div>
              </v-list-item>
            </v-list>
            <h2 v-if="LeaderboardArray.length == 0">Nincs még felhasználó aki regisztrált volna!</h2>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
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
<style>
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
  background-color: gray;
  cursor: pointer;
}
</style>