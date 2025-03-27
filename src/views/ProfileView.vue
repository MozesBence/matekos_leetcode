/* Profile */
<template>
  <div class="background-video-container">
    <video autoplay loop muted playsinline id="background-video">
      <source src="../components/background/profile_background.mp4" type="video/mp4"/>
    </video>
    <div class="background-overlay"></div>
  </div>
  <main 
  style="height: auto; background-color: transparent; position: relative; z-index: 2;" 
  class="d-flex justify-center align-center"

  >
    <div style="height: 100vh; width: 75%; background-color: transparent; position: relative;" class="rounded">
      <div class="position-absolute" style="width: max-content; left: .5rem; top: .1vw;">
        <v-btn 
        icon
        @click="router.back()" 
        style="z-index: 5; pointer-events: visible;">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </div>
      <div class="d-flex justify-center position-absolute" style="width: max-content; right: .5rem; top: .1vw;">
        <v-btn
        v-if="settingsShow"
        icon
        @click="handleDarkmodeSwitch"
        style="z-index: 5; pointer-events: visible;"
        >
          <v-icon>{{ DarkmodeChange ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
        </v-btn>
      </div>
      <header>
        <div class="profile-header rounded-lg" style="height: 22vh; width: 100%; position: relative; overflow: hidden;">
          <v-btn
            class="rounded-lg"
            elevation="0"
            :style="{
              position: 'absolute',
              top: '0',
              left: '0',
              zIndex: '3',
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              backgroundColor: 'transparent'
            }"
            @click="triggerBackPicFileInput">
            <template v-if="isBackImageAvailable" style="height: 100%;">
              <img 
                :src="backImage"
                @error="setDefaultBackground"
                class="background"
                ref="backgroundImg"
                style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; object-fit: cover;"
                />
            </template>
          </v-btn>
          <input
            type="file"
            ref="fileBackPicInput"
            style="display: none;"
            @change="handlebackPicUpload"
          />
        </div>
        <div 
        class="d-flex flex-column justify-center align-center mt-4 overlay-div" 
        style="pointer-events: none; top: -13vh;"
        >
          <v-btn 
            icon
            elevation="0"
            class="elevation-2"
            :style="{
              borderRadius: '50%',
              width: '13rem',
              height: '13rem',
              overflow: 'hidden',
              position: 'relative',
              pointerEvents: 'visible'
              }"
            @click="triggerProfPicFileInput"
            >
            <template v-if="isProfImageAvailable">
              <img
                :src="profileImage"
                class="profile-image"
                @error="handleProfImageError"
                style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; object-fit: cover;"
              />
            </template>
            <template v-else>
              <img src="/src/components/background/test_profile.jpg"  alt="" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; object-fit: cover;">
            </template>
          </v-btn>
          <h1 style="position: relative; color: rgb(var(--v-theme-profile_textColor)); font-size: xx-large;">
            {{ get_UserName }}
          </h1>
        </div>
        <input
          type="file"
          ref="fileProfPicInput"
          style="display: none;"
          @change="handleProfPicUpload"
        />
      </header>
      <div 
      style="background-color: transparent; position: relative; top: -12vh;"
      >
      <v-row justify="space-evenly">
        <v-col
          v-for="elevation in 1"
          :key="elevation"
          cols="12"
        >
          <v-sheet
            class="pa-2 rounded-lg"
            color="profile_cardsColor"
            height="420"
            style="transition: .3s;"
          >
          <div id="chart">
            <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
          </div>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row justify="space-evenly">
        <v-col
          cols="12"
          md="6"
        >
          <v-sheet
            class="pa-2 rounded-lg"
            color="profile_cardsColor"
            height="420"
            style="transition: .3s;"
          >
           <h1>Rang:</h1>
           
          </v-sheet>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-sheet
            class="pa-2 rounded-lg"
            color="profile_cardsColor"
            height="420"
            style="transition: .3s;"
            
          >
          <h2>Legutóbb megkezdett feladat</h2>
          <v-card>
            <v-card
            class="mx-auto"
          >
            <v-card-item>
              <div>
                <div class="text-overline mb-1">
                </div>
                <div class="text-h6 mb-1" v-if="mostRecTriedTask.data.value">
                  {{mostRecTriedTask.data.value.id}} {{mostRecTriedTask.data.value.task_title}}
                </div>
                <div class="text-h6 mb-1" v-if="!mostRecTriedTask.data.value">
                  <p>Jelenleg minden próbálkozásod sikeres volt, vagy még nem volt! A gombra kattintva kaphatsz
                    egy random feladatot.</p>
                  
                </div>
              </div>
            </v-card-item>
    
            <v-card-actions>
              <v-btn  v-if="!mostRecTriedTask.data.value" @click="LoadRandomTask">
                Random task
              </v-btn>
              <v-btn  v-if="mostRecTriedTask.data.value" @click="TaskView(mostRecTriedTask.data.value.id)">
                Folytatás
              </v-btn>
            </v-card-actions>
          </v-card>
          </v-card>
          </v-sheet>
        </v-col>
      </v-row>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, watch, inject ,watchEffect, computed  } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTheme, useDisplay } from 'vuetify';
import imageCompression from 'browser-image-compression';
import { useProfileDarkmodeSwitch, UseGetMonthlySolvingRate, UseGetMostRecentlyTriedTask, useProfileGetUser, useProfilePicUpload } from '@/api/profile/profileQuery'
import VueApexCharts from 'vue3-apexcharts';
import {useRandomTask} from '@/api/cards/cardQuery'

// Üzenetkezelés
const showError = inject("showError");
const showSucces = inject("showSucces");

// Router és route hookok
const router = useRouter();
const route = useRoute();

// Képernyő méret / eszköz
const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);

// Cookie kezelés
const getCookie = (name) => document.cookie.split('; ').reduce((res, cookie) => {
  const [key, value] = cookie.split('=');
  return key === name ? decodeURIComponent(value) : res;
}, null);

// <------- Változók ------->

var get_user_by_token = getCookie('user') != null && getCookie('user') != 'undefined' && typeof getCookie('user') != "object" ? getCookie('user') : null;
const get_fullUser = ref(null);
const get_UserName = ref('Betöltés...');
const get_fullUser_customs = ref(null);
const settingsShow = ref(false);
const profileImage = ref('hibas-kep-url.jpg');
const backImage = ref('hibas-kep-url.jpg');
const userId = route.params.id;
const mostRecTriedTask = UseGetMostRecentlyTriedTask(Number(userId))
const solvingRates = UseGetMonthlySolvingRate(Number(userId));
const apexchart = VueApexCharts;
const randomTask = useRandomTask();
const series = ref([]);
const DarkmodeChange = ref(false);
const isProfImageAvailable = ref(true);
const isBackImageAvailable = ref(true);
const fileProfPicInput = ref(null);
const fileBackPicInput = ref(null);
const theme = useTheme();
const chartOptions = ref({
  chart: { height: 350, type: 'line', zoom: { enabled: false }, toolbar: { show: false } },
  dataLabels: { enabled: false },
  stroke: { curve: 'straight' },
  title: { text: 'Megoldott feladatok', align: 'left' },
  grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 } },
  xaxis: { categories: ['Jan', 'Feb', 'Már', 'Ápr', 'May', 'Jún', 'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'] },
  yaxis: { labels: { formatter: (val) => val.toFixed(0) } }
});

// <------- Változók ------->

// <------- API hívások ------->

// API hívás - felhasználó profiljának adatainak lekérése
const { mutate: ProfileGetUser } = useProfileGetUser();

// API hívás - felhasználó profiljának sötétmódra váltása
const { mutate: ProfileDarkMode } = useProfileDarkmodeSwitch();

// API hívás - felhasználó profil- és háttérképének feltöltése
const { mutate: ProfilePicUpload } = useProfilePicUpload();

// <------- API hívások -------> 

// <------- Függvények | figyelők ------->

watchEffect(() => {
  if (solvingRates.value?.data?.value) {
    series.value = [{
      name: "Solved tasks",
      data: solvingRates.value.data.value.map(x => x.solutionCount)
    }];
  }
});

const LoadRandomTask = async () => {
  const task = await randomTask.refetch();
  task?.data?.value?.id && router.push({ name: 'task', params: { id: task.data.value.id } });
};

const TaskView = (id) => router.push({ name: 'task', params: { id } });

onMounted(async () => {
  try {
    await ProfileGetUser({ token: get_user_by_token, id: Number(userId) }, {
      onSuccess: (get_user) => {
        get_UserName.value = get_user.user_name || get_user.name;
        get_fullUser.value = get_user;
        get_fullUser_customs.value = get_user.User_customization;
        settingsShow.value = get_fullUser.value.id == userId;
        handlePtofilPicters({
          profil_picture: get_user.User_customization?.profil_picture || get_user.profil_picture,
          background_picture: get_user.User_customization?.background_picture || get_user.background_picture
        });
      },
      onError: () => showError ? showError(error.response.data) : console.log(error.response.data)
    });
  } catch (error) {
    showError ? showError(error.response) : console.log(error.response);
  }
});

const handleDarkmodeSwitch = async () => {
  DarkmodeChange.value = !DarkmodeChange.value;
  theme.global.name.value = DarkmodeChange.value ? 'darkTheme' : 'lightTheme';

  if (get_fullUser.value) {
    try {
      await ProfileDarkMode({ id: get_fullUser.value.id, darkmode: DarkmodeChange.value, type: 4 });
    } catch (error) {
      showError ? showError(error.response.data) : console.log(error.response.data);
    }
  }
};

watch(get_fullUser, (newUser) => {
  if (newUser) {
    DarkmodeChange.value = newUser.User_customization?.darkmode ?? newUser.darkmode;
    theme.global.name.value = DarkmodeChange.value ? 'darkTheme' : 'lightTheme';
  }
});

const handlePtofilPicters = ({ profil_picture, background_picture }) => {
  if (profil_picture) {
    profileImage.value = profil_picture;
    isProfImageAvailable.value = true;
  }
  if (background_picture) {
    backImage.value = background_picture;
    isBackImageAvailable.value = true;
  }
};

const handleProfImageError = () => isProfImageAvailable.value = false;

const setDefaultBackground = ({ target }) => {
  target.style.display = 'none';
  isBackImageAvailable.value = false;
};

const handleProfPicUpload = async (event) => {
  const input = event.target;
  const file = input.files?.[0];

  if (file) {
    try {
      const options = { maxSizeMB: 0.1, useWebWorker: true };
      const compressedFile = file.type === 'image/gif' ? file : await imageCompression(file, options);

      const ProfPicUploaddata = { id: Number(get_fullUser.value.id), pic: compressedFile, type: 0 };
      ProfilePicUpload(ProfPicUploaddata);

      profileImage.value = URL.createObjectURL(compressedFile);
      isProfImageAvailable.value = true;

      showSucces ? showSucces("Profilkép sikeresen feltöltve!") : console.log("Profilkép sikeresen feltöltve!");
    } catch (error) {
      showError ? showError(error) : console.log(error);
    }
  }
};

const triggerProfPicFileInput = () => {
  if (get_fullUser.value && userId == get_fullUser.value.id) {
    fileProfPicInput.value?.click();
  }
};

const handlebackPicUpload = async (event) => {
  const input = event.target;
  const file = input.files?.[0];

  if (file) {
    try {
      const isGif = file.type === 'image/gif';
      const options = { maxSizeMB: 0.1, useWebWorker: true };
      const compressedFile = isGif ? file : await imageCompression(file, options);

      const ProfBackUploaddata = { id: Number(get_fullUser.value.id), pic: compressedFile, type: 1 };
      ProfilePicUpload(ProfBackUploaddata);

      backImage.value = URL.createObjectURL(compressedFile);
      isBackImageAvailable.value = true;
      
      showSucces ? showSucces("Háttérkép sikeresen feltöltve!") : console.log("Háttérkép sikeresen feltöltve!");
    } catch (error) {
      showError ? showError(error) : console.log(error);
    }
  }
};

const triggerBackPicFileInput = () => {
  if (get_fullUser.value && userId == get_fullUser.value.id) {
    fileBackPicInput.value?.click();
  }
};

// <------- Függvények | figyelők ------->
</script>

<style>
.background-video-container {
  position: fixed;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

#background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  overflow: hidden;
}

#background-video source {
  width: 100%;
  height: 100%;
  object-fit:fill;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  z-index: -1;
}

.profile-header {
  position: relative;
  width: 100%;
  height: 11vw;
  background-color: rgb(var(--v-theme-profile_header_bc));
}

.profile-header img{
  background-attachment: fixed;
  background-size: cover;
  height: 100%;
}

.background {
  width: 100%;
  height: 100%;
}

.overlay-div {
  position: relative;
  z-index: 3;
  text-align: center;
}

.profile-image{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
