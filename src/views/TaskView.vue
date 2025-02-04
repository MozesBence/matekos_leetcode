<template>
  <v-app>
    <v-layout>
      <!-- App Bar -->
      <v-app-bar color="primary" :absolute="false">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Hasonló feladatok</v-toolbar-title>
        <v-spacer></v-spacer>
        <template v-if="$vuetify.display.mdAndUp">
          <!-- Additional toolbar items if needed -->
        </template>
        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>

      <!-- Navigation Drawer -->
      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <v-list :items="items"></v-list>
      </v-navigation-drawer>

      <!-- Main Content -->
      <v-main style="padding-top: 64px;">
        <v-row style="height: 100vh; padding: 0.5em;">
          <!-- Left Column: Task Details -->
          <v-col cols="12" md="6" style="background-color: rgb(var(--v-theme-home_rightdrawer_card));">
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

            <div style="margin-top: 2em;">
              <h3>A feladat leírása:</h3>
              <div v-mathjax="task?.task"></div>
            </div>

            <h3>A releváns community postok</h3>
            <v-row>
            </v-row>
          </v-col>

          <v-col cols="12" md="6">
            <h1>Megoldás:</h1>
            <br>
            <input type="file" name="Megoldás" id="" />
            <br>
            <v-text-field label="Megoldás" variant="outlined"></v-text-field>
            <br>
            <v-btn width="100%" style="background-color: #0091EA; color: white">
              Beadás
            </v-btn>
            <v-btn width="100%" style="margin-top: 1em;" @click="back">
              Vissza a fooldalra
            </v-btn>
          </v-col>
        </v-row>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router"; // Import useRouter
import { UseGetTaskData } from "@/api/taskSolving/taskSolvingQuery";

const mathjaxDirective = {
  mounted(el: HTMLElement, binding: any) {
    el.innerHTML = binding.value || "";
    if (window.MathJax) {
      window.MathJax.typesetPromise([el]).catch((err: any) =>
        console.error("MathJax error:", err)
      );
    }
  },
  updated(el: HTMLElement, binding: any) {
    el.innerHTML = binding.value || "";
    if (window.MathJax) {
      window.MathJax.typesetPromise([el]).catch((err: any) =>
        console.error("MathJax error:", err)
      );
    }
  }
};

export default defineComponent({
  name: "TaskComponent",
  directives: {
    mathjax: mathjaxDirective
  },
  data: () => ({
    drawer: false,
    group: null,
    items: [
      { title: "Foo", value: "foo" },
      { title: "Bar", value: "bar" },
      { title: "Fizz", value: "fizz" },
      { title: "Buzz", value: "buzz" }
    ]
  }),
  watch: {
    group() {
      this.drawer = false;
    }
  },
  setup() {
    const task = ref<any>(null);
    const isLoading = ref(false);
    const error = ref(null);
    const route = useRoute();
    const router = useRouter(); 

    const { mutate: GetTaskData } = UseGetTaskData();

    const fetchTaskData = (taskId: number) => {
      isLoading.value = true;
      GetTaskData(taskId, {
        onSuccess: (data: any) => {
          task.value = data;
          isLoading.value = false;
        },
        onError: (err: any) => {
          error.value = err;
          isLoading.value = false;
        }
      });
    };

    watch(
      () => route.params.id,
      (id) => {
        const taskId = Number(id);
        if (!isNaN(taskId)) {
          fetchTaskData(taskId);
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      const id = Number(route.params.id);
      if (!isNaN(id)) {
        fetchTaskData(id);
      }
    });

    const chipColor = (difficulty: number) => {
      if (difficulty === 0) return "green";
      if (difficulty === 1) return "orange";
      return "red";
    };

    const difficultyLabel = (difficulty: number) => {
      if (difficulty === 0) return "Könnyű";
      if (difficulty === 1) return "Közepes";
      return "Nehéz";
    };

    const back = () => {
      router.go(-1);
    };

    return {
      task,
      isLoading,
      error,
      chipColor,
      difficultyLabel,
      back
    };
  }
});
</script>
