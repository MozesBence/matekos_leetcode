<template>
    <v-container class="d-flex flex-column ga-2">
      <div class="hero">
        <h1 ref="rotatingText">Feladat validálás</h1>
      </div>
      <v-row class="align-center py-1 px-2 rounded mx-auto" style="background-color: rgb(var(--v-theme-task_solving_left_drawer)); width: 100%;">
        <h2>Cím </h2> <v-divider vertical class="mx-2"></v-divider> <h3 style="font-weight: normal;">{{ task.data.value?.task_title }}</h3>
      </v-row>
      <v-row class="align-center py-1 px-2 rounded mx-auto" style="background-color: rgb(var(--v-theme-task_solving_left_drawer)); width: 100%;">
        <h2>Téma</h2> <v-divider vertical class="mx-2"></v-divider> <h3 style="font-weight: normal;">{{ theme.data.value?.theme }}</h3>
      </v-row>
      <v-row class="align-center py-1 px-2 rounded mx-auto" style="background-color: rgb(var(--v-theme-task_solving_left_drawer)); width: 100%;">
        <h2>Készítő</h2> <v-divider vertical class="mx-2"></v-divider>  
        <div class="d-flex flex-row ga-2 align-center">
          <div 
          class="d-flex flex-row align-center pa-1 pr-3 rounded-xl" 
          style="width: max-content; background-color: rgb(var(--v-theme-community_posts_bc)); cursor: pointer;" 
          @click="router.push({ name: 'profile', params: { id: task.data.value?.creator.id } })">
            <img v-if="task.data.value?.creator.User_customization.profil_picture" :src="task.data.value?.creator.User_customization.profil_picture"  alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
            <v-icon v-else style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; object-fit: cover;">mdi-account</v-icon>
            <h3 style="font-weight: normal;">{{ task.data.value?.creator.user_name }}</h3>
          </div>
        </div>
      </v-row>
      <v-row class="align-center py-1 px-2 rounded mx-auto" style="background-color: rgb(var(--v-theme-task_solving_left_drawer)); width: 100%;">
        <h2>Nehézség</h2> <v-divider vertical class="mx-2"></v-divider> <h3 style="font-weight: normal;"> {{ difficultyLabel(task.data.value?.difficulty) }}</h3>
      </v-row>
      <v-row class="align-center py-1 px-2 rounded mx-auto" style="background-color: rgb(var(--v-theme-task_solving_left_drawer)); width: 100%;">
        <h2>A megoldás formátuma </h2><v-divider vertical class="mx-2"></v-divider> <h3 style="font-weight: normal;"> {{ task.data.value?.solution_format }}</h3>
      </v-row>
      <v-row class="align-center py-1 px-2 rounded mx-auto" style="background-color: rgb(var(--v-theme-task_solving_left_drawer)); width: 100%;">
        <h2>A feladat szövege </h2><v-divider vertical class="mx-2"></v-divider> <h3 style="font-weight: normal;" v-mathjax="task.data.value?.task"></h3>
      </v-row>
      <v-row class="align-center py-1 px-2 rounded mx-auto" style="background-color: rgb(var(--v-theme-task_solving_left_drawer)); width: 100%;">
        <h2>Első segítség</h2> <v-divider vertical class="mx-2"></v-divider> <h3 style="font-weight: normal;" v-mathjax="task.data.value?.first_hint"></h3>
      </v-row>
      <v-row class="align-center py-1 px-2 rounded mx-auto" style="background-color: rgb(var(--v-theme-task_solving_left_drawer)); width: 100%;">
        <h2>Második segítség</h2> <v-divider vertical class="mx-2"></v-divider> <h3 style="font-weight: normal;" v-mathjax="task.data.value?.second_hint"></h3>
      </v-row>
      <v-row>
        <v-col>
            <v-btn @click="ApproveTask()" style="width: 100%;">Jóváhagy</v-btn>
        </v-col>
        <v-col>
          <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                text="Visszautasít"
                style="width: 100%;"
              ></v-btn>
            </template>
          
            <template v-slot:default="{ isActive }">
              <v-card title="Az elutasítás oka:" subtitle="Az indoklás maximum 250 karakter legyen!">
                <v-card-text>
                    <v-textarea v-model="messageArea" label="" variant="outlined" placeholder="Az oka a következő..."></v-textarea>
                </v-card-text>
          
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    text="A feladat visszautasítása"
                    @click="DenyTask()"
                    style="background-color: #C62828;"
                  ></v-btn>
                  <v-btn
                    text="Mégse"
                    @click="isActive.value = false"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import {UseGetSpecificTaskData} from '../api/cards/cardQuery'
import {ref, watch, onMounted, inject} from 'vue'
import {UseGetThemeById} from '@/api/themes/themeQuery'
import {UseValidateTask} from '@/api/approveTask/approveQuery'

// Router és route hookok
const showError = inject<((msg: string) => void) | undefined>("showError");
const showSucces = inject<((msg: string) => void) | undefined>("showSucces");

const router = useRouter();
const route = useRoute();
const taskId = ref(Number(route.params.taskid) || null);
const task = UseGetSpecificTaskData(taskId)
const themeId = ref<number | null>(null);
const theme = UseGetThemeById(themeId)
const messageArea = ref('');

const difficultyLabel = (difficulty: number) => {
  return difficulty === 0 ? "Könnyű" : difficulty === 1 ? "Közepes" : "Nehéz";
};
const { mutate: Validation } = UseValidateTask();

const ApproveTask = async () => {
  Validation({taskId: task.data.value.id, validity: 1, user_id: task.data.value.creator_id, from_user_id: Number(route.params.adminid), message: "Jóvá lett hagyva a feladat!"}, {
    onSuccess: () => {
      showSucces ? showSucces("A feladatot sikeresen validálta!") : console.log("A feladatot sikeresen validálta!")
      setTimeout(() => {
        router.push({ name: "home" });
      }, 1000);
    },
    onError: (error) => {
      showError ? showError(error.message || "Hiba validálás közben!") : console.log(error.message || "Hiba validálás közben!")
    }
  });
};

const DenyTask = async () => {
  Validation({taskId: task.data.value.id, validity: 0, user_id: task.data.value.creator_id, from_user_id: Number(route.params.adminid), message: messageArea.value}, {
    onSuccess: () => {
      showSucces ? showSucces("A feladatot sikeresen visszautasította!") : console.log("A feladatot sikeresen visszautasította!")
      setTimeout(() => {
        router.push({ name: "home" });
      }, 1000);
    },
    onError: (error) => {
      showError ? showError(error.message || "Hiba validálás közben!") : console.log(error.message || "Hiba validálás közben!")
    }
  });
};
</script>


<style scoped>
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
    background-position: 84% 50%;
  }
}
</style>