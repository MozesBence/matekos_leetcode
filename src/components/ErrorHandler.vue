<template>
    <v-snackbar v-model="visible" :timeout="5000" color="error">
      <span>{{ errorMessage }}</span>
    </v-snackbar>
</template>

<script setup>
import { ref } from "vue";

// A hibaüzenet és annak láthatósága
const visible = ref(false);
const errorMessage = ref("");

// A showError metódus, amit a szülő komponenstől hívhatunk
const showError = (message) => {
    errorMessage.value = message;
    visible.value = true;
};

defineExpose({
    showError,
});
</script>
