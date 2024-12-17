/* Profile */
<template>
  <div class="background-video-container">
    <video autoplay loop muted playsinline id="background-video">
      <source src="../components/background/logreg_background.mp4" type="video/mp4" />
    </video>
    <div class="background-overlay"></div>
  </div>
  <main style="height: auto; overflow: hidden; background-color: transparent; position: relative; z-index: 2;" class="d-flex justify-center align-center">
    <div style="height: 100vh; overflow: hidden; width: 75%; background-color: rgb(var(--v-theme-profile_bc)); position: relative;" class="rounded-lg">
      <v-btn icon @click="goBack" style="position: absolute; top: .2vh; left: .2vw; z-index: 3;">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <header>
        <div class="profile-header rounded-t-lg">
          <img 
            :src="backgroundImage" 
            @error="setDefaultBackground"
            class="background"
            ref="backgroundImg"
          />
        </div>
        <div class="d-flex flex-column justify-center align-center mt-4 overlay-div">
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
              position: 'relative'
              }"
            @click="triggerFileInput"
            >
            <template v-if="isImageAvailable">
              <img
                :src="profileImage"
                class="profile-image"
                @error="handleImageError"
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
         <body style="overflow: hidden; width: 75%; background-color: rgb(var(--v-theme-profile_bc)); position: relative;" class="rounded-b-lg">
          
         </body>

        <input
          type="file"
          ref="fileInput"
          style="display: none;"
          @change="handleFileUpload"
        />
      </header>
      
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProfilePicUpload } from '@/api/profile/profileQuery';
import { useProfileGetUser } from '@/api/profile/profileQuery';
import imageCompression from 'browser-image-compression';

// Definiáld az adat típust
interface ProfilPicdata {
  id: number;
  pic: Blob;
}

// Router és Route hook-ok
const router = useRouter();
const route = useRoute();

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

// Változó figyelése
watch(get_fullUser, (newUser: any | null) => {
  if (newUser) {
    handleProfilePic();
  }
});

const profileImage = ref<string>('hibas-kep-url.jpg');

const handleProfilePic = () => {
  const base64Image = get_fullUser_customs.value.profil_picture;

  if (base64Image) {
    profileImage.value = base64Image; // Közvetlenül beállítjuk a Base64 kódolt képet
    isImageAvailable.value = true;
  } else {
    console.error("Hiba történt a képadat betöltésekor.");
  }
};


// Állapotok
const backgroundImage = ref('hibas-kep-url.jpg');
const compressedImageBlob = ref<Blob | null>(null);
const isImageAvailable = ref(true);

// Kép hiba kezelése
const handleImageError = () => {
  isImageAvailable.value = false;
};

// Alapértelmezett háttér beállítása
const setDefaultBackground = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.style.backgroundColor = '#333';
  target.style.display = 'none';
};

// Rejtett fájl input hivatkozás
const fileInput = ref<HTMLInputElement | null>(null);

// API hívás
const { mutate: ProfilePicUpload } = useProfilePicUpload();

// Fájl feltöltési kezelő
const handleFileUpload = async (event: Event) => {
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
      isImageAvailable.value = true;
      compressedImageBlob.value = compressedFile; // Tárolhatjuk a blob fájlt későbbi használatra

      // Tömörített fájl adatainak továbbítása
      const ProfPicUploaddata: ProfilPicdata = {
        id: Number(get_fullUser.value.id),
        pic: compressedFile
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
const triggerFileInput = () => {
  fileInput.value?.click();
};
</script>

<script lang="ts">
  export default {
    methods: {
      goBack() {
        this.$router.back();
      }
    }
  }
</script>

<style>
template{
  overflow: hidden;
}

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
  overflow: hidden;
}

.background {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay-div {
  position: relative;
  top: -20vh;
  z-index: 3;
  text-align: center;
}

.profile-image{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>