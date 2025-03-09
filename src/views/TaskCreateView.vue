<template>
    <h1>Task Creation</h1>
    <v-container>

        <!-- feladat cime -->
        <v-row>
            <h3>A feladat címe:</h3>
        </v-row>
        <v-row>
            <v-text-field label="Feladat cím" variant="outlined" v-model="Feladat_data.taskTitle"></v-text-field>
        </v-row>
        <!--feladat cime vege-->

        <!--feladat leirasa-->
        <v-container fluid>
            <v-textarea
              label="A feladat leírása"
              v-model="Feladat_data.task"
              name="input-7-1"
              variant="filled"
              auto-grow
            ></v-textarea>
          </v-container>
        <!--feladat leirasanak vege-->

        <!-- feladat megoldasa -->
        <v-row>
            <h3>Megoldás</h3>
        </v-row>
        <v-row>
            <v-text-field label="Megoldás" variant="outlined" v-model="Feladat_data.solution"></v-text-field>
        </v-row>
        <!--feladat megoldasa-->

        <!-- nehezseg valaszto választó -->
        <v-row>
            <h3>A feladat nehézsége:</h3>
        </v-row>
        <v-row>
            <v-select
                clearable
                label="Nehézség"
                :items="difficultyLevels"
                item-title="text"
                item-value="value"
                variant="outlined"
                v-model="Feladat_data.difficulty"
            ></v-select>
        </v-row>
        <!--nehezseg valaszto vege-->

        <!-- tema valszto -->
        <v-row>
            <h3>A feladat témája:</h3>
        </v-row>
        <v-row>
            <v-select
                clearable
                label="Téma"
                :items="themesSelector"
                item-title="text"
                item-value="value"
                variant="outlined"
                v-model="Feladat_data.themeId"
            ></v-select>
        </v-row>
    </v-container>
      <!-- tema valszto vege-->
    <v-row>
        <v-btn>Bekuldes</v-btn>
    </v-row>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { UseThemes } from "@/api/themes/themeQuery";

const themes = UseThemes();

const Feladat_data = ref({
    themeId: null,
    solution: null,
    creatorId: null,
    difficulty: null,
    experiencePoints: null,
    taskTitle: null,
    task: null
});

const themesSelector = computed(() =>
  themes.data.value ? themes.data.value.map((theme: string) => ({
    text: theme.theme,
    value: theme.id || theme.theme,
  })) : []
);

// Difficulty selector options
const difficultyLevels = [
  { text: "Könnyű", value: 1 },
  { text: "Közepes", value: 2 },
  { text: "Nehéz", value: 3 }
];
</script>
