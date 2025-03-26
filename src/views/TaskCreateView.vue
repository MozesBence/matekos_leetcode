<template>
    <v-container>
    <v-row style="display: flex; vertical-align: middle; text-align: center; justify-content: center; margin-top: 20px; margin-bottom: 20px; height:auto; max-height:40em; min-height:10em;vertical-align:middle;display:flex; justify-content:center; align-items:center;" class="hero">
        <h1>Feladat beküldés</h1>
    </v-row>

        <!-- feladat cime -->
        <v-row style="vertical-align: middle; display: flex; align-items: center; background-color: rgb(var(--v-theme-info_label_background)); border-radius: 10px; height: 3em; padding: 5px; margin-bottom: 10px;">
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
            <v-text-field label="Feladat cím" variant="outlined" v-model="Task_Data.taskTitle"></v-text-field>
        </v-row>
        <!--feladat cime vege-->

        <!--feladat leirasa-->
        <v-row class="titleRow">
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
            <v-textarea label="A feladat szövege" variant="outlined" v-model="Task_Data.task"></v-textarea>
        </v-row>
        <!--feladat leirasanak vege-->

        <!-- feladat megoldasa -->
        <v-row class="titleRow">
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
            <v-text-field label="Megoldás" variant="outlined" v-model="Task_Data.solution"></v-text-field>
        </v-row>
        <!--feladat megoldasa vege-->

         <!-- feladat megoldasanak formatuma -->
         <v-row class="titleRow">
            <h3>A feladat megoldásának formátuma</h3>
            <!--Iconra nyilo dialog kezdete-->
            <v-dialog max-width="500">
                <template v-slot:activator="{ props: taskSolutionFormat }">
                    <img src="../assets/info.png" alt="" width="20px" height="20" style="margin-left: 5px;" v-bind="taskSolutionFormat">
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card title="Feladat megoldása:">
                    <v-card-text>
                      A formátum egyértelmű utalás legyen arra, hogy hogyan adja meg a megoldó a feladat végeredményét! Fontos, hogy egyenlőre nem lehet
                      szöveges választ megadni ami nem (igaz/hamis), ha mégis megszegésre kerül ezen kérés a feladat el lesz utasítva!<br>
                      Példák erre:<br>
                      <li>A megoldás egy egész szám</li>
                      <li>A megoldás fromátuma x = 3</li>
                      <li>A megoldást két tizedes jegyre kerekítse, például 3,14</li>
                      <li>A megoldás igaz/hamis</li>
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
            <v-text-field label="Formátum" variant="outlined" v-model="Task_Data.solutionFormat"></v-text-field>
        </v-row>
        <!--feladat megoldasanak formatuma vege-->

        <!-- nehezseg valaszto választó -->
        <v-row class="titleRow">
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
                v-model="Task_Data.difficulty"
            ></v-select>
        </v-row>
        <!--nehezseg valaszto vege-->

        <!-- tema valszto -->
        <v-row class="titleRow">
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
                v-model="Task_Data.themeId"
            ></v-select>
        </v-row>
      <!-- tema valszto vege-->

      <!-- feladathoz tartozó segítség (1) -->
      <v-row class="titleRow">
        <h3>Első segítség a feladat megoldásához</h3>
        <!--Iconra nyiló dialog kezdete-->
        <v-dialog max-width="500">
            <template v-slot:activator="{ props: taskHint1 }">
                <img src="../assets/info.png" alt="" width="20px" height="20" style="margin-left: 5px;" v-bind="taskHint1">
            </template>

            <template v-slot:default="{ isActive }">
                <v-card title="Feladat megoldása:">
                <v-card-text>
                  A segítség arra szolgál, hogy rávezesse a megoldót a megoldásra. A lényeg az, hogy a megoldás ne szerepeljen itt.
                  A megoldót segíthetjük összefüggésekkel, egy lépés megmutatásával, egy megoldási módszer megnevezésével... <br>
                  Ha a megoldás szerepel ebben a mezőben akkor a feladat nem lesz jóváhagyva!
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
        <!--Iconra nyiló dialog vége-->
    </v-row>
    <v-row>
        <v-text-field label="Segítség 1" variant="outlined" v-model="Task_Data.hint1"></v-text-field>
    </v-row>
    <!--feladathoz tartozó segítség (1) vége-->

     <!-- feladathoz tartozó segítség (2) -->
     <v-row class="titleRow">
        <h3>Második segítség a feladat megoldásához</h3>
        <!--Iconra nyiló dialog kezdete-->
        <v-dialog max-width="500">
            <template v-slot:activator="{ props: taskHint1 }">
                <img src="../assets/info.png" alt="" width="20px" height="20" style="margin-left: 5px;" v-bind="taskHint1">
            </template>

            <template v-slot:default="{ isActive }">
                <v-card title="Feladat megoldása:">
                <v-card-text>
                  A segítség arra szolgál, hogy rávezesse a megoldót a megoldásra. A lényeg az, hogy a megoldás ne szerepeljen itt.
                  A megoldót segíthetjük összefüggésekkel, egy lépés megmutatásával, egy megoldási módszer megnevezésével... <br>
                  Ha a megoldás szerepel ebben a mezőben akkor a feladat nem lesz jóváhagyva!
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
        <!--Iconra nyiló dialog vége-->
    </v-row>
    <v-row>
        <v-text-field label="Segítség 2" variant="outlined" v-model="Task_Data.hint2"></v-text-field>
    </v-row>
    <!--feladathoz tartozó segítség (2) vége-->

    <v-row>
        <v-col cols="6">
            <v-btn style="width: 100%;" @click="SendTask">Beküldés</v-btn>
        </v-col>
        <v-col cols="6">
            <v-btn style="width: 100%;" @click="push('/')">Vissza a főoldalra</v-btn>
        </v-col>
    </v-row>


<v-alert
v-if="alertMessage.type"
:color="alertMessage.type"
:icon="alertMessage.type === 'success' ? '$success' : '$error'"
:title="alertMessage.text"
class="center-alert"
></v-alert>
</v-container>

</template>

<script lang="ts" setup>
import { ref, computed, watchEffect,onMounted } from "vue";
import { UseThemes } from "@/api/themes/themeQuery";
import {useRouter} from "vue-router"
import { useProfileGetUser } from '@/api/profile/profileQuery';
import {UseSubmitTask} from '@/api/taskSubmit/taskSubmit'


import {get_fullUser, getCookie, userId,get_user_email,get_user_name} from '@/stores/userStore'
import router from "@/router";
const themes = UseThemes();
const {push} = useRouter();
const Task_Data = ref({
  taskTitle: '',
  task: '',
  themeId: 0,
  solution: '',
  difficulty: 0,
  creatorId: 0,
  experiencePoints: 10,
  solutionFormat: '',
  hint1: '',
  hint2: '',
  validated: 0,
});


const alertMessage = ref<{ type: "success" | "warning" | "error" | null; text: string }>({
    type: null,
    text: "",
});


const showAlertForEmptyData = ref(false);
watchEffect(() => {
    Task_Data.value.experiencePoints = Task_Data.value.difficulty === 0 ? 10 :
                                          Task_Data.value.difficulty === 1 ? 15 : 25;
});

const themesSelector = computed(() =>
  themes.data.value ? themes.data.value.map((theme: { id: number, theme: string }) => ({
    text: theme.theme,
    value: theme.id,
  })) : []
);

// Difficulty selector options
const difficultyLevels = [
  { text: "Könnyű", value: 0 },
  { text: "Közepes", value: 1 },
  { text: "Nehéz", value: 2 }
];



onMounted(async ()=>{
  const userCookie = getCookie('user');
        if (userCookie) {
          try {
            const userData = JSON.parse(atob(userCookie.split('.')[1]));
            get_user_name.value = userData.id;
          } catch (error) {
            console.error('Error parsing user cookie:', error);
          }
        }
  
        const get_user_by_token = getCookie('user') != null && getCookie('user') != 'undefined' && typeof getCookie('user') != "object" ? getCookie('user') : null;
  
        if (get_user_by_token) {
          const { mutate: ProfileGetUser } = useProfileGetUser();
          try {
            await ProfileGetUser({token: get_user_by_token, id: 0}, {
              onSuccess: (get_user) => {
                get_user_name.value = get_user.user_name;
                get_fullUser.value = get_user;
                Task_Data.value.creatorId = get_fullUser.value.id
              },
            });
          } catch (error) {
            console.error('Error fetching user profile:', error);
          }
        }
});

const { mutate: submitTask } = UseSubmitTask(Task_Data);

const SendTask = () => { 
    if (!CheckData()) {
        showAlert("warning", "Töltsön ki minden mezőt, hogy feladata beküldésre kerüljön!");
    } else {
        submitTask(undefined, {
            onSuccess: () => {
                showAlert("success", "A feladatot sikeresen beküldte! Az bevizsgálás eredményét az oldalon üzenetben kapja meg!");
            },
            onError: (error) => {
                showAlert("error", `Error: ${error.message || "Hiba a feltöltés közben!"}`);
            }
        });
    }
};


const showAlert = (type: "success" | 'warning' | "error", text: string) => {
  alertMessage.value = { type, text };
  setTimeout(() => {
    alertMessage.value = { type: null, text: "" };
  }, 5000);
};


    function CheckData(){
    const hasNull = Object.values(Task_Data.value).some(value => value === null);
    if (hasNull) {
        return false;
    }
    return true;
};

</script>


<style scoped>
.center-alert {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
  }

  
  .hero {
    background: linear-gradient(120deg, #6a11cb, #2575fc, #00d2ff, #6a11cb, #2575fc, #00d2ff);
    background-size: 400% 400%;
    animation: gradient-animation 8s ease-in-out infinite;
    color: white;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 30px;
    text-align: center;
  }

  @keyframes gradient-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  .titleRow{
    vertical-align: middle; display: flex; align-items: center; background-color: rgb(var(--v-theme-info_label_background)); border-radius: 10px; height: 3em; padding: 5px; margin-bottom: 10px; padding-left:1em;
  }
</style>