<template>
    <v-container>
    <v-row style="display: flex; vertical-align: middle; text-align: center; justify-content: center; margin-top: 20px; margin-bottom: 20px;">
        <h1>Feladat beküldés</h1>
    </v-row>

        <!-- feladat cime -->
        <v-row style="vertical-align: middle; display: flex; align-items: center; background-color: #B3E5FC; border-radius: 10px; height: 3em; padding: 5px; margin-bottom: 10px;">
            <h3>A feladat címe</h3>
            <!--Iconra nyilo dialog kezdete-->
            <v-dialog max-width="500">
                <template v-slot:activator="{ props: taskTitleDialog }">
                    <img src="../assets/info.png" alt="" width="20px" height="20" style="margin-left: 5px;" v-bind="taskTitleDialog">
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card title="Feladat címe:">
                    <v-card-text>
                        A feladat címe legyen egyértelmű, jelölje pontosan a lényeget. A cím ne tartallmazzon sorszámot, mivel az automatikusan
                        kerül kiosztásra. Ne legyen túlságosan hosszú sem maximum 30 karakter. Ha külsős forrásból származik akkor a cím azt jelezze,
                        például 2020 e. érettségi 1/b vagy 2020 k. érettségi 1.
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                        text="Bezár"
                        @click="isActive.value = false"
                        ></v-btn>
                    </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
            <!--Iconra nyilo dialog vege-->
        </v-row>
        <v-row>
            <v-text-field label="Feladat cím" variant="outlined" v-model="Feladat_data.taskTitle"></v-text-field>
        </v-row>
        <!--feladat cime vege-->

        <!--feladat leirasa-->
        <v-row style="vertical-align: middle; display: flex; align-items: center; background-color: #B3E5FC; border-radius: 10px; height: 3em; padding: 5px; margin-bottom: 10px;">
            <h3>A feladat leírása</h3>
            <!--Iconra nyilo dialog kezdete-->
            <v-dialog max-width="500">
                <template v-slot:activator="{ props: taskDescDialog }">
                    <img src="../assets/info.png" alt="" width="20px" height="20" style="margin-left: 5px;" v-bind="taskDescDialog">
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card title="Feladat címe:">
                    <v-card-text>
                       A feladat leírása csupán a feladat szövege legyen a címet NEM ide kell írni. Ha bármilyen matekos kifejelzés szerepel a 
                       beírni kívánt szövegben egyenlőre külsős oldalhoz kell fordulni. (https://asciimath.org/) A szövegben az itt összeállított
                       kifejezést következő képpen kell megadni:<br> 
                       <li>$kifejezés$ - ha a szövegben szerepeljen folyamatosan,</li>
                       <li>$$kifejezés$$ - ha legyen egy sortörés az előtte, illetve utánna lévő szöveg között.</li>
                       Ezen felül itt már nem kell megjelölni, ha külsős forrrásból származik, elég a címben. Ha saját a feladat, legyen érthető,
                       egyértelmű a lényeg/kérdés. A feladatmegírásánál kérjük figyelembe venni azt, hogy csak olyan feladat legyen amelyre lehet közelítőértékekkel,
                       igaz vagy hamissal vagy ehhez hasonló módon válaszolni. A szöveges válasz megadása majd csak a későbbiekben lesz elérhető.
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                        text="Bezár"
                        @click="isActive.value = false"
                        ></v-btn>
                    </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
            <!--Iconra nyilo dialog vege-->
        </v-row>
        <v-row>
            <v-textarea label="A feladat szövege" variant="outlined"></v-textarea>
        </v-row>
        <!--feladat leirasanak vege-->

        <!-- feladat megoldasa -->
        <v-row style="vertical-align: middle; display: flex; align-items: center; background-color: #B3E5FC; border-radius: 10px; height: 3em; padding: 5px; margin-bottom: 10px;">
            <h3>A feladat megoldása</h3>
            <!--Iconra nyilo dialog kezdete-->
            <v-dialog max-width="500">
                <template v-slot:activator="{ props: taskSolution }">
                    <img src="../assets/info.png" alt="" width="20px" height="20" style="margin-left: 5px;" v-bind="taskSolution">
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card title="Feladat megoldása:">
                    <v-card-text>
                       A feladat megoldása legyen egyértelmű utalás arra, hogy a végeredményt, hogyan kell megadni. Ne legyen szöveges a válasz, legyen olyan hogy,
                       egy egész szám, x = 7, x= 8 vagy 7,8 vagy igaz... Fontos, hogy nem lesz figyelembe véve a szóköz szóval előnyö annak használata nélkül megadni.
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                        text="Bezár"
                        @click="isActive.value = false"
                        ></v-btn>
                    </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
            <!--Iconra nyilo dialog vege-->
        </v-row>
        <v-row>
            <v-text-field label="Megoldás" variant="outlined" v-model="Feladat_data.solution"></v-text-field>
        </v-row>
        <!--feladat megoldasa-->

        <!-- nehezseg valaszto választó -->
        <v-row style="vertical-align: middle; display: flex; align-items: center; background-color: #B3E5FC; border-radius: 10px; height: 3em; padding: 5px; margin-bottom: 10px;">
            <h3>A feladat nehézsége</h3>
            <!--Iconra nyilo dialog kezdete-->
            <v-dialog max-width="500">
                <template v-slot:activator="{ props: taskDifficulty }">
                    <img src="../assets/info.png" alt="" width="20px" height="20" style="margin-left: 5px;" v-bind="taskDifficulty">
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card title="Feladat megoldása:">
                    <v-card-text>
                       Ez a mező mindenkinek egyedi és szubbjektív ezért gondoltuk adunk egy kis segítséget:<br> 
                       <li>A közép szintű matek érettségi feladatok nehézségével megegyező vagy az alattiak, könnyűnek számítanak.</li>
                       <li>Az emelt matek érettségi szintű feladatok nehézségével megegyező feladatok ide sorolhatóak, illetve a közép szintűek közül a nehezebbek.</li>
                       <li>Ide jöhetnek az igazán elgondolkodtató emelt szintű feladatok nehézségével megegyező, oktv. szintű versenyfeladatok, egyetemi szintet megütő feladatok</li>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                        text="Bezár"
                        @click="isActive.value = false"
                        ></v-btn>
                    </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
            <!--Iconra nyilo dialog vege-->
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
        <v-row style="vertical-align: middle; display: flex; align-items: center; background-color: #B3E5FC; border-radius: 10px; height: 3em; padding: 5px; margin-bottom: 10px;">
            <h3>A feladat témája</h3>
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
      <!-- tema valszto vege-->
    <v-row>
        <v-col cols="6">
            <v-btn style="width: 100%;">Beküldés</v-btn>
        </v-col>
        <v-col cols="6">
            <v-btn style="width: 100%;"@click="push('/')">Vissza a főoldalra</v-btn>
        </v-col>
    </v-row>
</v-container>

</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { UseThemes } from "@/api/themes/themeQuery";
import {useRouter} from "vue-router"
const themes = UseThemes();
const {push} = useRouter();
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
