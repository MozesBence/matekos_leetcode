<template>
  <v-app>

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
                <v-list-item-avatar>
                  <v-img :src="contest.image"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ contest.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ contest.date }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn text color="primary">Virtual</v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-pagination v-model="page" :length="totalPages"></v-pagination>
          </v-card>
        </v-col>

        <!-- jobb -->
        <v-col cols="4">
          <v-card>
            <v-card-title>Leaderboard</v-card-title>
            <v-divider></v-divider>
            <v-list>
              <v-list>
                <v-list-item-avatar>
                  <v-img>ide a user kep</v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>ide a user neve</v-list-item-title>
                  <v-list-item-subtitle>
                    ide a helyezes <!--  rating / attend leetcodon -->
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

function hetiKihivasAtiranyit(){
  router.push({path: '/weekly-challange'});
}
function haviKihivasAtiranyit(){
  router.push({path: '/monthly-challange'});
}
</script>
<style>
.v-card {
  transition: transform 0.2s;
}
.v-card:hover {
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