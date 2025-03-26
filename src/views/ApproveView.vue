<template>
    <v-container>
        <div class="hero">
          <h1 ref="rotatingText">Feladat validálás</h1>
        </div>
        <v-row class="task_data_element" style="background-color: rgb(var(--v-theme-task_solving_left_drawer))">
            <h2>Cím: {{ task.data.value?.task_title }}</h2>
        </v-row>
        <v-row class="task_data_element" style="background-color: rgb(var(--v-theme-task_solving_left_drawer))">
            <h2>Téma: {{ theme.data.value?.theme }}</h2>
        </v-row>
        <v-row class="task_data_element" style="background-color: rgb(var(--v-theme-task_solving_left_drawer))">
            <h2>Készítő: {{ task.data.value?.creator_id }}</h2>
        </v-row>
        <v-row class="task_data_element" style="background-color: rgb(var(--v-theme-task_solving_left_drawer))">
            <h2>Nehézség: {{ difficultyLabel(task.data.value?.difficulty) }}</h2>
        </v-row>
        <v-row class="task_data_element" style="background-color: rgb(var(--v-theme-task_solving_left_drawer))">
            <h2>A megoldás formátuma: {{ task.data.value?.solution_format }}</h2>
        </v-row>
        <v-row class="task_data_element" style="background-color: rgb(var(--v-theme-task_solving_left_drawer))">
            <div v-mathjax="task.data.value?.task"></div>
        </v-row>
        <v-row class="task_data_element" style="background-color: rgb(var(--v-theme-task_solving_left_drawer))">
            <v-row class="task_data_elemet"><h2>Első segítség</h2></v-row>
            <v-row class="task_data_elemet">
                <div v-mathjax="task.data.value?.first_hint"></div>
            </v-row>
        </v-row>
        <v-row class="task_data_element" style="background-color: rgb(var(--v-theme-task_solving_left_drawer))">
            <v-row class="task_data_elemet">
                <h2>Második segítség:</h2>
            </v-row>
            <v-row class="task_data_elemet">
                <div v-mathjax="task.data.value?.second_hint"></div>
            </v-row>
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
                            <v-textarea label="" variant="outlined" placeholder="Az oka a következő..."></v-textarea>
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
    <v-alert
v-if="alertMessage.type"
:color="alertMessage.type"
:icon="alertMessage.type === 'success' ? '$success' : '$error'"
:title="alertMessage.text"
class="center-alert"
></v-alert>
    
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import {UseGetSpecificTaskData} from '../api/cards/cardQuery'
import {ref} from 'vue'
import { watch } from "vue";
import { onMounted } from "vue";
import {UseGetThemeById} from '@/api/themes/themeQuery'
import {UseValidateTask} from '@/api/approveTask/approveQuery'

const router = useRouter();
const route = useRoute();
const taskId = ref(Number(route.params.taskid) || null);
const task = UseGetSpecificTaskData(taskId)
const themeId = ref<number | null>(null);
const theme = UseGetThemeById(themeId)
const data = ref({
    taskId: task.data.value?.id,
    validity:0
})
const alertMessage = ref<{ type: "success" | "warning" | "error" | null; text: string }>({
    type: null,
    text: "",
});
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

watch(() => task.data.value?.theme_id, (newThemeId) => {
    if (newThemeId && newThemeId !== 0) {
        themeId.value = newThemeId;
    }
}, { immediate: true });



const difficultyLabel = (difficulty: number) => {
  return difficulty === 0 ? "Könnyű" : difficulty === 1 ? "Közepes" : "Nehéz";
};
const { mutate: Validation } = UseValidateTask(data);

const ApproveTask = async () => {
    data.value.validity = 1;
    Validation(undefined, {
        onSuccess: () => {
            showAlert("success", "A feladatot sikeresen validálta!");
        },
        onError: (error) => {
            showAlert("error", `Error: ${error.message || "Hiba validálás közben!"}`);
        }
    });
};

const DenyTask = async () => {
    data.value.validity = 0;
    Validation(undefined, {
        onSuccess: () => {
            showAlert("success", "A feladatot sikeresen visszautasította!");
           
          },
        onError: (error) => {
            showAlert("error", `Error: ${error.message || "Hiba validálás közben!"}`);
          }
    });
};

const showAlert = (type: "success" | 'warning' | "error", text: string) => {
  alertMessage.value = { type, text };
  setTimeout(() => {
    alertMessage.value = { type: null, text: "" };
  }, 5000);
};

watch(taskId, () => {
    task.refetch();
})

onMounted(() =>{
    console.log(route.params.taskid)
    task.refetch();
})
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

  .task_data_element{
    border-radius: 12px;
    padding: 1em;
    margin: 0.01em;
    margin-bottom: 1.2em;
    height: auto;
  }
</style>