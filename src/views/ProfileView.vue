/* Profile */
<template>
  <div class="background-video-container">
    <video autoplay loop muted playsinline id="background-video">
      <source src="../components/background/profile_background.mp4" type="video/mp4" />
    </video>
    <div class="background-overlay"></div>
  </div>
  <main 
  style="height: auto; background-color: transparent; position: relative; z-index: 2;" 
  class="d-flex justify-center align-center"
  :style="{overflow: $vuetify.display.smAndDown ? 'auto' : 'hidden'}"
  >
    <div style="height: 100vh; width: 75%; background-color: transparent; position: relative;" class="rounded-lg">
      <v-btn icon @click="goBack" style="position: absolute; top: .2rem; left: .4rem; z-index: 5; pointer-events: visible;">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="dialog = true"
        style="position: absolute; top: .2rem; right: .4rem; z-index: 5; pointer-events: visible;"
      >
        <v-icon>mdi-account-cog</v-icon>
      </v-btn>
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
        style="pointer-events: none;"
        :style="{top: $vuetify.display.smAndDown ? '-11rem' : '-14.5rem'}"
        >
          <v-btn 
            icon
            elevation="0"
            class="elevation-2"
            :style="{
              borderRadius: '50%',
              width: '23vh',
              height: '23vh',
              padding: 0,
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
              />
            </template>
            <template v-else>
              <v-icon size="64" color="black">mdi-account</v-icon>
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
      style="background-color: transparent; position: relative; top: -21vh;"
      :style="{overflow: $vuetify.display.smAndDown ? 'auto' : 'hidden'}"
      >
        <v-container>
          <v-row justify="space-evenly">
            <v-col
              v-for="elevation in 6"
              :key="elevation"
              cols="12"
              md="6"
            >
              <v-sheet
                class="pa-2 rounded-lg"
                color="profile_cardsColor"
                height="220"
              >
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>

        <div class="pa-4 text-center">
          <v-dialog
            v-model="dialog"
            max-width="700"
          >
            <v-card>
              <v-card-title>
                <span class="text-h6">{{ get_UserName }} felhasználó beállításai</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <!-- Felhasználónév -->
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="userName"
                        :label="get_UserName"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <!-- E-mail -->
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="email"
                        :label="get_fullUser.email"
                        outlined
                        type="email"
                      ></v-text-field>
                    </v-col>
                    <!-- Jelszó -->
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="password"
                        label="Új Jelszó"
                        outlined
                        type="password"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="confpassword"
                        label="Új Jelszó megerősítés"
                        outlined
                        type="confpassword"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text="Bezárás"
                  variant="plain"
                  @click="dialog = false"
                ></v-btn>
                <v-btn
                  color="primary"
                  text="Mentés"
                  variant="tonal"
                  @click="saveSettings"
                >Mentés</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, shallowRef } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProfilePicUpload } from '@/api/profile/profileQuery';
import { useProfileGetUser } from '@/api/profile/profileQuery';
import imageCompression from 'browser-image-compression';
import { useTheme } from 'vuetify';

const dialog = shallowRef(false)

// Definiáld az adat típust
interface ProfilPicdata {
  id: number
  pic: Blob
  type: number
}

// Router és Route hook-ok
const router = useRouter();
const route = useRoute();
const theme = useTheme();

// Cookie lekérdezés
const getCookie = (name: string) => {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

const get_user_email: string | null = route.query.email as string | null;

const get_fullUser = ref<any>(null);

const get_UserName = ref<string>('Betöltés...');

const get_fullUser_customs = ref<any>(null);

const { mutate: ProfileGetUser } = useProfileGetUser();

onMounted(async () => {
  if (get_user_email) {
    try {
      await ProfileGetUser(get_user_email, {
        onSuccess: (get_user: any) => {
          get_fullUser.value = get_user;
          get_UserName.value = get_fullUser.value.user_name;
          get_fullUser_customs.value = get_user.User_customization;
        },
        onError: (error: any) => {
          console.error('Hiba történt a felhasználó lekérésekor:', error);
        },
      });
    } catch (error) {
      console.error('Hiba történt a felhasználó lekérésekor:', error);
    }
  }
});

const DarkmodeChange = ref(false);

// Változó figyelése
watch(get_fullUser, (newUser: any | null) => {
  if (newUser) {
    DarkmodeChange.value = newUser.User_customization.darkmode;
    theme.global.name.value = DarkmodeChange.value ? 'darkTheme' : 'lightTheme';
    handlePtofilPicters();
  }
});

const profileImage = ref<string>('hibas-kep-url.jpg');
const backImage = ref<string>('hibas-kep-url.jpg');

const handlePtofilPicters = () => {
  const base64ImageProf = get_fullUser_customs.value.profil_picture;
  const base64ImageBack = get_fullUser_customs.value.background_picture;

  if (base64ImageProf && base64ImageProf != null) {
    profileImage.value = base64ImageProf; // Közvetlenül beállítjuk a Base64 kódolt képet
    isProfImageAvailable.value = true;
  }

  if (base64ImageBack && base64ImageBack != null) {
    backImage.value = base64ImageBack; // Közvetlenül beállítjuk a Base64 kódolt képet
    isBackImageAvailable.value = true;
  }
};


// Állapotok
const compressedImageBlob = ref<Blob | null>(null);
const isProfImageAvailable = ref(true);
const isBackImageAvailable = ref(true);

// Kép hiba kezelése
const handleProfImageError = () => {
  isProfImageAvailable.value = false;
};

// Alapértelmezett háttér beállítása
const setDefaultBackground = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.style.backgroundColor = '#333';
  target.style.display = 'none';
  isBackImageAvailable.value = false;
};

// Rejtett fájl input hivatkozás
const fileProfPicInput = ref<HTMLInputElement | null>(null);

const fileBackPicInput = ref<HTMLInputElement | null>(null);

// API hívás
const { mutate: ProfilePicUpload } = useProfilePicUpload();

// Fájl feltöltési kezelő
const handleProfPicUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files ? input.files[0] : null;

  if (file) {
    try {
      // Kép tömörítése
      const options = {
        maxSizeMB: 0.1,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      // Frissítjük a profilképet a tömörített fájl URL-jével
      profileImage.value = URL.createObjectURL(compressedFile);
      isProfImageAvailable.value = true;
      compressedImageBlob.value = compressedFile; // Tárolhatjuk a blob fájlt későbbi használatra

      // Tömörített fájl adatainak továbbítása
      var ProfPicUploaddata: ProfilPicdata = {
        id: Number(get_fullUser.value.id),
        pic: compressedFile,
        type: Number(0)
      };

      console.log("Frontendről: ",ProfPicUploaddata);

      // Profilkép feltöltése
      ProfilePicUpload(ProfPicUploaddata);

    } catch (error) {
      console.error("Képtömörítési hiba:", error);
    }
  }
};

// Fájl input triggerelése
const triggerProfPicFileInput = () => {
  fileProfPicInput.value?.click();
};

const handlebackPicUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files ? input.files[0] : null;

  if (file) {
    try {
      // Ellenőrizzük, hogy GIF fájl
      if (file.type === 'image/gif') {
        // Fájl bináris adatként történő beolvasása

          // GIF fájl adatainak továbbítása bináris formátumban
          var ProfBackUploaddata: ProfilPicdata = {
            id: Number(get_fullUser.value.id),
            pic: file, // A bináris adat Blob formátumban
            type: 1,
          };

          // Profilkép feltöltése
          ProfilePicUpload(ProfBackUploaddata);

          // A GIF fájl URL-jének létrehozása és megjelenítése
          backImage.value = URL.createObjectURL(file);
          isBackImageAvailable.value = true;
          compressedImageBlob.value = file; // Tárolhatjuk a blob fájlt későbbi használatra
      } else {
        // Ha nem GIF, akkor alkalmazunk tömörítést
        const options = {
          maxSizeMB: 0.1,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        // Tömörített fájl adatainak Blob-ként történő elküldése
        var ProfBackUploaddata: ProfilPicdata = {
          id: Number(get_fullUser.value.id),
          pic: compressedFile,  // A tömörített fájl Blob formátumban
          type: 1,
        };

        // Profilkép feltöltése
        ProfilePicUpload(ProfBackUploaddata);

        // Frissítjük a profilképet a tömörített fájl URL-jével
        backImage.value = URL.createObjectURL(compressedFile);
        isBackImageAvailable.value = true;
        compressedImageBlob.value = compressedFile; // Tárolhatjuk a blob fájlt későbbi használatra
      }
    } catch (error) {
      console.error("Képtömörítési hiba:", error);
    }
  }
};


const triggerBackPicFileInput = () => {
  fileBackPicInput.value?.click();
};
</script>

<script lang="ts">
export default {
  data() {
    return {
      dialog: false, // Dialógus vezérlés
      userName: '', // Felhasználónév
      email: '', // E-mail cím
      password: '', // Jelszó
      confpassword: '',
    };
  },
  methods: {
      goBack() {
        this.$router.back();
      },
      saveSettings() {
        // Mentési logika
        console.log("Felhasználónév:", this.userName);
        console.log("E-mail:", this.email);
        console.log("Jelszó:", this.password);
        this.dialog = false; // Dialógus bezárása
      },
    },
  computed: {
    get_UserName() {
      return "PéldaFelhasználó"; // Cseréld le a valódi logikád szerint
    },
  },
  }
</script>

<style>
.background-video-container {
  position: absolute;
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
  object-fit: cover;
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
  background-color: #333;
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
