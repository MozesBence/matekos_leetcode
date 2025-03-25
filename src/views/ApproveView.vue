<template>
    <h1>keszito id: {{task.data.value?.creator_id}}</h1>
    <h1>Cím: {{ task.data.value?.task_title }}</h1>
    <h1>Nehézség: {{task.data.value?.difficulty}}</h1>
    <h1>Téma id: {{task.data.value?.theme_id}}</h1>
    <h1>Solution format: {{task.data.value?.solution_format}}</h1>
    <h1>Hint 1: {{task.data.value?.first_hint}}</h1>
    <h1>Hint 2: {{task.data.value?.second_hint}}</h1>
    <v-btn @click="ApproveTask()">Jóváhagy</v-btn>
    <v-btn>Visszautasít</v-btn>

    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Open Dialog"
            variant="flat"
          ></v-btn>
        </template>
      
        <template v-slot:default="{ isActive }">
          <v-card title="Dialog">
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </v-card-text>
      
            <v-card-actions>
              <v-spacer></v-spacer>
      
              <v-btn
                text="Close Dialog"
                @click="isActive.value = false"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import {UseGetSpecificTaskData} from '../api/cards/cardQuery'
import {ref} from 'vue'
import { watch } from "vue";
import { onMounted } from "vue";

const router = useRouter();
const route = useRoute();
const taskId = ref(Number(route.params.taskid) || null);
const task = UseGetSpecificTaskData(taskId)

const ApproveTask = async () => {

    router.push('/')
}

watch(taskId, () => {
    task.refetch();
})

onMounted(() =>{
    console.log(route.params.taskid)
    task.refetch();
})
</script>