<template>
    <v-card>
      <v-layout style="background-color: rgb(var(--v-theme-background)); position: relative; padding-bottom: 3vw;">
        <v-app-bar
          color="primary"
          prominent
          elevation="0"
        >
          <v-app-bar-nav-icon v-if="$vuetify.display.smAndDown"  variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

          <div class="site-title">
            <span class="title"  style="color: rgb(var(--v-theme-site_title));" :style="{ fontFamily: currentFont, fontSize: fontSize }">{{ displayedText }}</span>
          </div>

          <v-container max-width="auto" v-if="$vuetify.display.mdAndUp">
            <v-row justify="space-evenly" style="background-color: transparent;">
              <v-hover v-slot="{ isHovering, props }">
                <div class="text-center">
                  <v-col
                    cols="auto"
                    sm="0"
                    md="0"
                  >
                    <v-card elevation="0" :color="isHovering ? 'nav_btn_hover' :  'transparent'" v-bind="props" class="rounded-pill" block>
                      <v-btn
                        prepend-icon="mdi-home"
                        size="large"
                        @click="currentRoute.name !== 'home' && router.push({ name: 'home' })"
                        :class="{'btn-active': currentRoute.name === 'home'}"
                      >
                        <template v-slot:prepend>
                          <v-icon color="info"></v-icon>
                        </template>
                        Home
                      </v-btn>
                    </v-card>
                  </v-col>
                </div>
              </v-hover>
              <v-hover v-slot="{ isHovering, props }">
              <div class="text-center">
                <v-col
                    cols="auto"
                    sm="0"
                    md="0"
                  >
                  <v-card elevation="0" :color="isHovering ? 'nav_btn_hover' :  'transparent'" v-bind="props" class="rounded-pill" block>
                    <v-btn
                      prepend-icon="mdi-information"
                      size="large"
                      @click="currentRoute.name !== 'about' && router.push({ name: 'about' })"
                      :class="{'btn-active': currentRoute.name === 'about'}"
                    >
                      <template v-slot:prepend>
                        <v-icon color="info"></v-icon>
                      </template>
                      About
                    </v-btn>
                  </v-card>
                </v-col>
              </div>
            </v-hover>
            <v-hover v-slot="{ isHovering, props }">
              <div class="text-center">
                <v-col
                    cols="auto"
                    sm="0"
                    md="0"
                  >
                  <v-card elevation="0" :color="isHovering ? 'nav_btn_hover' :  'transparent'" v-bind="props" class="rounded-pill" block>
                    <v-btn
                      prepend-icon="mdi-trophy"
                      size="large"
                      @click="currentRoute.name !== 'contest' && router.push({ name: 'contest' })"
                      :class="{'btn-active': currentRoute.name === 'contest'}"
                    >
                      <template v-slot:prepend>
                        <v-icon color="info"></v-icon>
                      </template>
                      Contest
                    </v-btn>
                  </v-card>
                </v-col>
              </div>
            </v-hover>
            <v-hover v-slot="{ isHovering, props }">
              <div class="text-center">
                <v-col
                    cols="12"
                    sm="0"
                    md="0"
                  >
                  <v-card elevation="0" :color="isHovering ? 'nav_btn_hover' :  'transparent'" v-bind="props" class="rounded-pill" block>
                    <v-btn
                      prepend-icon="mdi-account-group"
                      size="large"
                      @click="currentRoute.name !== 'community' && router.push({ name: 'community' })"
                      :class="{'btn-active': currentRoute.name === 'community'}"
                      >
                        <template v-slot:prepend>
                          <v-icon color="info"></v-icon>
                        </template>
                        Community
                      </v-btn>
                    </v-card>
                  </v-col>
                </div>
              </v-hover>
            </v-row>
          </v-container>

          <div class="nav-right-content">
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                elevation="0"
                :color="isHovering ? 'nav_btn_hover' : 'transparent'"
                v-bind="props"
                class="rounded-circle nav-right-btn"
              >
                <v-btn
                    color="info"
                    class="rounded-circle"
                    size="large"
                    height="50"
                    width="50"
                    icon
                    @click="handleDarkmodeSwitch"
                  >
                  <v-icon>{{ DarkmodeChange ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
                </v-btn>
              </v-card>
            </v-hover>
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                elevation="0"
                :color="isHovering ? 'nav_btn_hover' : 'transparent'"
                v-bind="props"
                class="rounded-circle nav-right-btn"
                v-if="get_user_name != null"
              >
                <v-menu
                  activator="parent" 
                  transition="scale-transition"
                  v-if="get_user_name != null"
                  offset-y
                >
                  <template #activator="{ props }">
                    <v-btn
                      v-bind="props"
                      color="info"
                      icon="mdi-account"
                      class="rounded-circle"
                      size="large"
                      height="50"
                      width="50"
                    ></v-btn>
                  </template>
                  <v-card class="pa-4 d-flex flex-column justify-center align-center" elevation="1" width="auto">
                    <div style="position: relative; display: inline-block;">
                      <v-btn
                        icon
                        elevation="0"
                        class="elevation-2"
                        @click="router.push({ name: 'profile'})"
                        :style="{
                          borderRadius: '50%',
                          width: '8vh',
                          height: '8vh',
                          padding: 0,
                          overflow: 'hidden',
                        }"
                      >
                        <!-- Ha van kép az src-ben, azt mutatja -->
                        <template v-if="profileImage">
                          <img
                            :src="profileImage"
                            alt="Profil"
                            style="width: 100%; height: 100%; object-fit: cover;"
                          />
                        </template>
                        <template v-else>
                          <v-icon size="48">mdi-account</v-icon>
                        </template>
                      </v-btn>
                      <v-tooltip bottom>
                        Profil
                      </v-tooltip>
                    </div>

                    <h2 class="mb-3"> {{ get_user_name }}</h2>

                    <v-btn 
                      block 
                      color="secondary" 
                      elevation="0" 
                      class="mb-3 rounded"
                      min-width="180" 
                      @click="dialog = true"
                      prepend-icon="mdi-account-cog"
                      height="40"
                    >
                      Beállítások
                    </v-btn>

                    <v-btn 
                      block 
                      color="error" 
                      elevation="0" 
                      class="mb-3 rounded"
                      min-width="180" 
                      @click="deleteCookie('user')"
                      prepend-icon="mdi-logout"
                      height="40"
                    >
                      Kijelentkezés
                    </v-btn>
                  </v-card>
                </v-menu>
              </v-card>
            </v-hover>
          </div>
        </v-app-bar>

        <v-navigation-drawer
          v-model="drawer"
          :location="$vuetify.display.mobile ? 'left' : undefined"
          temporary
        >
          <v-list>
            <v-container max-height="auto" class="pa-0" v-if="$vuetify.display.smAndDown">
              <v-col justify="space-between" class="mobil-nav-view">
                <div class="text-center">
                  <v-btn
                    prepend-icon="mdi-home"
                    size="large"
                    elevation="0"
                    class="d-flex justify-space-between align-center rounded-lg"
                    style="width: 100%;"
                    @click="currentRoute.name !== 'home' && router.push({ name: 'home' })"
                    :class="{'btn-active': currentRoute.name === 'home'}"
                  >
                    <template v-slot:prepend>
                      <v-icon color="info"></v-icon>
                    </template>
                    <p style="width: 20vw;">Home</p>
                  </v-btn>
                </div>
                <div class="text-center">
                  <v-btn
                    prepend-icon="mdi-information"
                    size="large"
                    elevation="0"
                    class="d-flex justify-space-between align-center rounded-lg"
                    style="width: 100%;"
                    @click="currentRoute.name !== 'about' && router.push({ name: 'about' })"
                    :class="{'btn-active': currentRoute.name === 'about'}"
                  >
                    <template v-slot:prepend>
                      <v-icon color="info"></v-icon>
                    </template>
                    <p style="width: 20vw;">About</p>
                  </v-btn>
                </div>
                <div class="text-center">
                  <v-btn
                    prepend-icon="mdi-trophy"
                    size="large"
                    elevation="0"
                    class="d-flex justify-space-between align-center rounded-lg"
                    style="width: 100%;"
                    @click="currentRoute.name !== 'contest' && router.push({ name: 'contest' })"
                    :class="{'btn-active': currentRoute.name === 'contest'}"
                  >
                    <template v-slot:prepend>
                      <v-icon color="info"></v-icon>
                    </template>
                    <p style="width: 20vw;">Contest</p>
                  </v-btn>
                </div>
                <div class="text-center">
                  <v-btn
                    prepend-icon="mdi-account-group"
                    size="large"
                    elevation="0"
                    class="d-flex justify-space-between align-center rounded-lg"
                    style="width: 100%;"
                    @click="currentRoute.name !== 'community' && router.push({ name: 'community' })"
                    :class="{'btn-active': currentRoute.name === 'community'}"
                  >
                    <template v-slot:prepend>
                      <v-icon color="info"></v-icon>
                    </template>
                    <p style="width: 20vw;">Community</p>
                  </v-btn>
                </div>
              </v-col>
            </v-container>
          </v-list>
        </v-navigation-drawer>
  
        <v-main style="background: rgb(var(--v-theme-background)); overflow: hidden;">
          <v-container
              fluid
              class="d-flex justify-center full-width align-center pt-2 pb-2 pr-0 pl-0 mx-0"
              style="border-bottom: .3vh solid rgb(var(--v-theme-secondary));"
              v-if="get_user_name == null"
            >
              <v-btn
                class="rounded-pill"
                prepend-icon="mdi-login"
                size="large"
                elevation="0"
                :style="loginButtonStyles"
                @mouseover="isLoginHovering = true"
                @mouseleave="isLoginHovering = false"
                @click="router.push({ name: 'login' })"
                >
                <template v-slot:prepend>
                  <v-icon color="info"></v-icon>
                </template>
                <p class="mx-0" style="font-size: medium;">Bejelentkezés</p>
              </v-btn>

            <span class="align-self-center mr-4 ml-4" style="font-size: .8rem;"> || </span>

            <v-btn
              class="rounded-pill"
                prepend-icon="mdi-account-edit"
                size="large"
                elevation="0"
                :style="registerButtonStyles"
                @mouseover="isRegisterHovering = true"
                @mouseleave="isRegisterHovering = false"
                @click="router.push({ name: 'register' })"
                >
                <template v-slot:prepend>
                  <v-icon color="info"></v-icon>
                </template>
                <p class="mx-0" style="font-size: medium;">Regisztrálás</p>
            </v-btn>
          </v-container>

          <div class="pa-4 text-center" :style="{position: dialog ? 'relativ': 'absolute'}">
            <v-dialog
              v-model="dialog"
              max-width="700"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h6">{{ get_user_name }} felhasználó beállításai</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <!-- Felhasználónév -->
                      <v-col cols="12" md="12">
                        <v-text-field
                          v-model="userName"
                          :label="get_user_name"
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

          <RouterView></RouterView>

          <v-footer style="background: rgb(var(--v-theme-secondary)); position: absolute; bottom: 0; width: 100%;">
            <v-row justify="center" no-gutters>
              <v-col class="text-center mt-4" cols="12">
                Copyright © {{ new Date().getFullYear() }} — Math Solve
              </v-col>
            </v-row>
          </v-footer>
        </v-main>
      </v-layout>
    </v-card>
</template>

<script setup>
import { onMounted, ref, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileGetUser } from '@/api/profile/profileQuery'
import { useProfileDarkmodeSwitch } from '@/api/profile/profileQuery'
import { useTheme } from 'vuetify';

const { mutate : ProfileGetUser} = useProfileGetUser()

const { currentRoute } = useRouter()

const router = useRouter()

const dialog = shallowRef(false)

var get_user_by_token = getCookie('user') != null && getCookie('user') != 'undefined' && typeof getCookie('user') != "object" ? getCookie('user') : null;

var get_fullUser = ref(null);
var get_fullUser_customs = ref(null);
var get_user_name = ref(null);

const theme = useTheme();

// A useProfileDarkmodeSwitch hook a setup() részben
const { mutate: ProfileDarkMode } = useProfileDarkmodeSwitch();
const DarkmodeChange = ref(false);

onMounted(async () => {
  if (get_user_by_token != null) {
    try {
      await ProfileGetUser(get_user_by_token, {
        onSuccess: (get_user) => {
          get_user_name.value = get_user.user_name;
          get_fullUser.value = get_user;
          get_fullUser_customs.value = get_user.User_customization;
        },
        onError: (error) => {
          if(getCookie('user') != null){
            deleteCookie('user');
          }
        },
      });
    } catch (error) {
      console.error('Hiba történt a felhasználó lekérésekor:', error);
    }
  }
});
watch(get_fullUser, (newUser) => {
  if (newUser) {
    DarkmodeChange.value = newUser.User_customization.darkmode;
    theme.global.name.value = DarkmodeChange.value ? 'darkTheme' : 'lightTheme';
    handleProfilePic();
  }
});

// A sötét mód váltásának kezelése
const handleDarkmodeSwitch = async () => {
  DarkmodeChange.value = !DarkmodeChange.value;

  // Téma módosítása
  theme.global.name.value = DarkmodeChange.value ? 'darkTheme' : 'lightTheme';

  // API hívás a sötét mód változtatásához
  if(get_fullUser.value != null){
    try {
      await ProfileDarkMode({id: get_fullUser.value.id, darkmode: DarkmodeChange.value, type: 4 });
    } catch (error) {
      console.error('Hiba történt a sötét mód váltásakor:', error);
    }
  }
};

const profileImage = ref("");

const handleProfilePic = () => {
  const base64Image = get_fullUser_customs.value.profil_picture;

  if (base64Image && base64Image != null) {
    profileImage.value = base64Image; // Közvetlenül beállítjuk a Base64 kódolt képet
  }
};

// Cookie-k kezelése
function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  window.location.reload();
}
</script>

<script>
import { ref, watch } from 'vue'

const drawer = ref(false)
const group = ref(null)

watch(group, () => {
  drawer.value = false
});
export default {
    data() {
      return {
        textList: ["Math Solve", "A megoldásod", "Tanulj matematikát", "Újragondolt matematika", "A számok nem hazudnak", "Gyors megoldás", "Mesteri matematika", "Matematika mágia"],
        fonts: ["Roboto", "Montserrat", "Poppins", "Pacifico", "Lato", "Open Sans", "Oswald", "Raleway", "Playfair Display", "Merriweather", "Ubuntu", "Roboto Slab", "Slabo 27px", "Fira Sans"],
        currentFont: "Roboto",
        currentTextIndex: 0,
        displayedText: "",
        IsMobile: false,
        FontSize: 'large',
        isLoginHovering: false,
        isRegisterHovering: false,
        dialog: false,
        userName: '', // Felhasználónév
        email: '', // E-mail cím
        password: '', // Jelszó
        confpassword: '',
        DarkmodeChange: false,
      };
    },
    watch: {
      '$vuetify.display.mobile'(newValue) {
        this.IsMobile = newValue;

        if (!this.IsMobile) {
          this.performDesktopAction();
        }
      },
    },
    mounted() {
      this.typeAndSwitchFont();
      this.IsMobile = this.$vuetify.display.mobile;

      if (!this.IsMobile) {
        this.performDesktopAction();
      }
    },
    methods: {
      async typeAndSwitchFont() {
        while (true) {
          const text = this.textList[this.currentTextIndex];
          this.displayedText = "";

          for (let i = 0; i < text.length; i++) {
            this.displayedText += text[i];
            await this.sleep(100);
          }

          await this.sleep(2000);

          for (let i = text.length; i >= 0; i--) {
            this.displayedText = text.substring(0, i);
            await this.sleep(100);
          }
          this.currentTextIndex = (this.currentTextIndex + 1) % this.textList.length;
          this.currentFont = this.fonts[Math.floor(Math.random() * this.fonts.length)];
        }
      },
      sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      },
      performDesktopAction() {
        drawer.value = false;
      },
    },
    computed: {
      fontSize() {
        return this.IsMobile ? 'x-large' : 'large'; // Ha mobil eszköz van, kisebb betűméret
      },
      loginButtonStyles() {
        return {
          backgroundColor: this.isLoginHovering ? 'rgb(var(--v-theme-nav_btn_hover))' : 'transparent',
          //color: this.isLoginHovering ? 'white' : 'rgb(var(--v-theme-primary))',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        };
      },
      registerButtonStyles() {
        return {
          backgroundColor: this.isRegisterHovering ? 'rgb(var(--v-theme-nav_btn_hover))' : 'transparent',
          //color: this.isRegisterHovering ? 'white' : 'rgb(var(--v-theme-primary))',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        };
      },
    }
  };
</script>

<style scoped>
.site-title{
  display: flex;
  align-items: start;
  align-content: center;
  margin: 0vw -10vw 0vw 1vw;
  white-space: nowrap;
  width: 10vw;
  overflow-x: visible;
}

.nav-right-content{
  position: fixed;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-around;
  right: .2vw;
}

.mobil-nav-view{
  display: flex;
  flex-direction: column;
  gap: 2vw;
}

.btn-active{
  background-color: rgb(var(--v-theme-nav_btn_active));
  color: rgb(var(--v-theme-primary)) !important;
}

.btn-active .v-icon{
  color: rgb(var(--v-theme-primary)) !important;
}

.nav-right-btn{
  transition: height 0.6s ease all;
}

@media (max-width: 600px) {
  .nav-btn {
    height: 20% !important;
  }
}

@media (min-width: 600px) {
  .nav-btn {
    height: 40%;
  }
}

.typing-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2rem;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
}
.typing-container span {
  border-right: 2px solid #333;
  animation: blink 0.7s step-end infinite;
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
</style>