<template>
  <!-- Taskbar -->
  <v-layout>
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Hasonlo feladat</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="$vuetify.display.mdAndUp">
        <v-btn icon="mdi-magnify" variant="text"></v-btn>
        <v-btn icon="mdi-filter" variant="text"></v-btn>
      </template>
      <v-btn icon="mdi-dots-vertical" variant="text" @click="back"></v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      temporary
    >
      <v-list :items="items"></v-list>
    </v-navigation-drawer>

    <v-main class="fill-height">
      <v-container fluid>
        <v-row>
          <v-col cols="5" style="border-right: 1px solid black;">
            <h3>{{ task?.task_title }}</h3>
            <v-row>
              <p>Nehezseg: {{task?.difficulty}}</p>
              <p>Tapasztalati pontok: {{task?.experience_points}}</p>
            </v-row>
            <p>{{ task?.task }}</p>
          </v-col>
          <v-col cols="7">
            <h3>Megoldas</h3>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { UseGetTaskData } from '@/api/taskSolving/taskSolvingQuery';

export default defineComponent({
  data: () => ({
    drawer: false,
    group: null,
    items: [
      { title: "Foo", value: "foo" },
      { title: "Bar", value: "bar" },
      { title: "Fizz", value: "fizz" },
      { title: "Buzz", value: "buzz" },
    ],
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  setup() {
    const task = ref(null);
    const isLoading = ref(false);
    const error = ref(null);
    const route = useRoute();

    const { mutate: GetTaskData } = UseGetTaskData();

    const fetchTaskData = (taskId: number) => {
      isLoading.value = true;
      GetTaskData(taskId, {
        onSuccess: (data) => {
          task.value = data;
          isLoading.value = false;
        },
        onError: (err) => {
          error.value = err;
          isLoading.value = false;
        },
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

    return {
      task,
      isLoading,
      error,
    };
  },
});
</script>
