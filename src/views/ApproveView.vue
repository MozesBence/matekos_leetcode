<template>
    {{task.data.value}}
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import {UseGetSpecificTaskData} from '../api/cards/cardQuery'
import {ref} from 'vue'
import { watch } from "vue";
import { onMounted } from "vue";
const route = useRoute();
const taskId = ref(Number(route.params.taskid) || null);
const task = UseGetSpecificTaskData(taskId)

watch(taskId, () => {
    task.refetch();
})

onMounted(() =>{
    console.log(route.params.taskid)
    task.refetch();
})
</script>