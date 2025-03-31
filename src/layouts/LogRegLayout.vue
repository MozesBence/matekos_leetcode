/* log-reg layout */
<template>
  <div class="background-video-container">
    <video autoplay loop muted playsinline id="background-video">
      <source src="../components/background/logreg_background.mp4" type="video/mp4" />
    </video>
    <div class="background-overlay"></div>
  </div>

  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);">

    <div class="image-text-container">
      <h1 class="text" style="font-size: 3em; font-family: 'Orbitron', sans-serif;">Math Solve</h1>
      <h3 class="text" style="font-weight: normal; color: white;">Üdvözli önt az oldal!</h3>
    </div>

    <v-container fluid>
      <v-row justify="center">
        <v-col
          :style="{ maxWidth: '550px', minWidth: !isMobile ? '450px' : '310px', width: '100%' }"
        >
          <v-card
          class="mx-auto pa-10 pb-4"
          rounded="lg"
          >
            <v-expand-transition class="d-flex flex-column justify-center align-center">
              <div v-if="SuccessOpen">
                <v-icon :color="SuccessText.split(' ')[0] == 'Sikeres' ? 'green' : 'red'" size="120">
                  {{ SuccessText.split(' ')[0] == "Sikeres" ? 'mdi-check' : 'mdi-close' }}
                </v-icon>
                <h2 class="text-center">{{ SuccessText }}</h2>
                <div class="dropdown-content text-center" :style="{marginTop: isMobile ? '3vw' : '1vw'}">
                  <p :style="{fontSize: isMobile ? '3vw' : '.9vw'}">{{ SuccessMessage }}</p>
                </div>
              </div>
            </v-expand-transition>

            <div class="text-subtitle-1 text-medium-emphasis" v-if="route.name != 'set-new-password' && route.name != 'success-register'">Fiók</div>

            <v-text-field
              density="compact"
              placeholder="email cím"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              v-model="emailValue"
              v-if="route.name != 'set-new-password' && route.name != 'success-register'"
              :rules="[
                (v) => !!v || 'Kötelező ezt a mezőt kitölteni', (v) => (v && v.length <= 35) || 'Maximum 35 karakter lehet.']" 
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis" v-if="route.name == 'register'">Fiók név</div>

            <v-text-field
              density="compact"
              placeholder="Felhasználó név..."
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
              v-if="route.name == 'register'"
              v-model="RegdataRef.user_name"
              :rules="[(v) => !!v || 'Kötelező ezt a mezőt kitölteni', (v) => (v && v.length <= 24) || 'Maximum 24 karakter lehet.', (v) => v.length >= 6 || 'Minimum 6 karakteres név kell.']"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between" v-if="route.name == 'login' || route.name == 'register' || route.name == 'set-new-password'">
              {{ PasswordValue }}
                <a
                  class="text-caption text-decoration-none text-blue"
                  href="#"
                  rel="noopener noreferrer"
                  v-if="route.name == 'login'"
                  @click.prevent="router.push({ name: 'forget-password' })"
                >
                  Elfelejtette jelszavát?</a>
            </div>

            <v-text-field
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Írja be a jelszavát..."
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              v-model="passwordValue"
              v-if="route.name == 'login' || route.name == 'register' || route.name == 'set-new-password'"
              :rules="[(v) => !!v || 'Kötelező ezt a mezőt kitölteni', (v) => (v && v.length <= 30) || 'Maximum 30 karakter lehet.',  (v) => v.length >= 8 || 'Minimum 8 karakteres jelszó kell.',]"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between" v-if="route.name == 'register' || route.name == 'set-new-password'">
              {{ ConfPasswordValue }}
            </div>

            <v-text-field
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Erősítse meg a jelszavát..."
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              v-if="route.name == 'register' || route.name == 'set-new-password'"
              v-model="confirmPassword"
              :rules="[(v) => !!v || 'Kötelező ezt a mezőt kitölteni', (v) => (v && v.length <= 30) || 'Maximum 30 karakter lehet.', (v) => (v && confirmPassword == passwordValue) || 'Nem egyezik a két jelszó']"
            ></v-text-field>

            <v-checkbox
              v-model="rememberMe"
              :label="`Maradjak bejelentkezve`"
              v-if="route.name == 'login'"
              hide-details
            ></v-checkbox>

              <v-btn
                class="mb-4 mt-4"
                color="blue"
                size="large"
                variant="tonal"
                block
                v-if="route.name == 'login'"
                :disabled="!LogindataRef.password || !LogindataRef.email"
                :loading="loading"
                @click="handleLogin"
              >
                Bejelentkezés
              </v-btn>

          <v-btn
              class="mb-4 mt-4"
              color="blue"
              size="large"
              variant="tonal"
              block
              v-if="route.name == 'register'"
              :disabled="RegBtnValue == 'Email elküldve' || RegdataRef.password !== confirmPassword || !RegdataRef.password || !RegdataRef.email || !RegdataRef.user_name"
              @click="handleRegister"
              :loading="loading"
              >
              {{ RegBtnValue }}
          </v-btn>

          <v-btn
              class="mb-4 mt-4"
              color="blue"
              size="large"
              variant="tonal"
              block
              v-if="route.name == 'forget-password'"
              :disabled="!ForgetPassworddataRef.email"
              @click="handleForgetPassword"
              :loading="loading"
              >
              {{ ForgetBtnValue }}
          </v-btn>

          <v-btn
              class="mb-4 mt-4"
              color="blue"
              size="large"
              variant="tonal"
              block
              v-if="route.name == 'set-new-password'"
              :disabled="!SetNewPassworddataRef.password || !confirmPassword"
              @click="handSetNewPassword"
              :loading="loading"
              >
              {{ SetBtnValue }}
          </v-btn>

            <v-card-text class="text-center" @click="RegisterPushHandler" v-if="route.name == 'login'">
              <a
                class="text-blue text-decoration-none"
                rel="noopener noreferrer"
                :style="{ cursor: 'pointer' }"
              >
                Regisztrálás <v-icon icon="mdi-chevron-right"></v-icon>
              </a>
            </v-card-text>

            <h2 v-if="route.name == 'register'" class="text-center">Van már fiókod?</h2>
            <v-card-text class="text-center" @click="LoginPushHandler" v-if="route.name == 'register' || route.name == 'success-register'">
              <a
                class="text-blue text-decoration-none"
                rel="noopener noreferrer"
                :style="{ cursor: 'pointer' }"
              >
                Bejelentkezés <v-icon icon="mdi-chevron-right"></v-icon>
              </a>
            </v-card-text>

            <v-card-text class="text-center" @click="LoginPushHandler" v-if="route.name == 'forget-password' || route.name == 'set-new-password'">
              <a
                class="text-blue text-decoration-none"
                rel="noopener noreferrer"
                :style="{ cursor: 'pointer' }"
              >
              <v-icon icon="mdi-chevron-left"></v-icon> Bejelentkezés
              </a>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, inject, onMounted } from 'vue'
import type { RegisterData } from '@/api/register/register'
import { useRegisterUser, useUserActivation } from '@/api/register/registerQuery'
import type { LoginData } from '@/api/login/login'
import { useLoginUser } from '@/api/login/loginQuery'
import type { ForgetPasswordData } from '@/api/forget-password/ForgetPassword'
import { useForgetPassword } from '@/api/forget-password/ForgetPasswordQuery'
import type { SetNewPasswordData } from '@/api/set-new-password/SetNewPassword'
import { useSetNewPassword } from '@/api/set-new-password/SetNewPasswordQuery'
import { useDisplay, useTheme } from 'vuetify';

// Képernyő méret / eszköz
const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);

// Router és route hookok
const showError = inject<((msg: string) => void) | undefined>("showError");
const showSucces = inject<((msg: string) => void) | undefined>("showSucces");

const route = useRoute();
const router = useRouter();

// <------- Változók ------->

var RegBtnValue = ref("Regisztrálás");
var SuccessText = ref("");
var SuccessMessage = ref("");
var SuccessOpen = ref(false);
var RegisterToken = route.query.token ? (route.query.token as string) : 'null';
const theme = useTheme();
const loading = ref(false)
const visible = ref(false);
const confirmPassword = ref('');
const PasswordValue = ref("Jelszó");
const ConfPasswordValue = ref("Jelszó megerősítése");
const rememberMe = ref(false);
const ForgetBtnValue = ref("Email küldése");
const SetBtnValue = ref("Új jelszó beállítás");
const isSetNewPassword = route.name === 'set-new-password';
theme.global.name.value = 'lightTheme';
PasswordValue.value = isSetNewPassword ? "Új jelszó" : "Jelszó";
ConfPasswordValue.value = isSetNewPassword ? "Új jelszó megerősítése" : "Jelszó megerősítése";

// <------- Változók ------->

// <------- Api hívások ------->

// Api hívás - felhasználói aktiválás
const { mutate: UserActivation } = useUserActivation()

// Api hívás - regisztráció
const { mutate: registerUser } = useRegisterUser(loading, RegBtnValue)

// Api hívás - bejelentkezés
const { mutate: loginUser } = useLoginUser() 

// Api hívás - elfelejtett jelszó
const { mutate: forgetPassword } = useForgetPassword(loading, ForgetBtnValue)

// Api hívás - új jelszó beállítása
const { mutate: setNewPassword } = useSetNewPassword(loading, SetBtnValue)

// <------- Api hívások ------->

// <------- Függvények | figyelők ------->

const load = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 3000);
};

onMounted(async () => {
  if(getCookie('user')){
    deleteCookie('user');
  }

  if(RegisterToken != 'null' && route.name == 'success-register'){
    SuccessOpen.value = false;
    UserActivation({token: RegisterToken} ,{
        onSuccess: (response) => {
          SuccessText.value = "Sikeres regisztrálás!";
          SuccessMessage.value = response;
          SuccessOpen.value = true;
        },
        onError: (err: any) => {
          SuccessText.value = "Nem sikerült regisztrálás!";
          SuccessMessage.value = err.response.data;
          SuccessOpen.value = true;
        },
      }
    );
  }
  else if(RegisterToken == 'null' && route.name == 'success-register'){
    SuccessText.value = "Nem sikerült regisztrálás!";
    SuccessMessage.value = "Rossz az elérésí út!";
    SuccessOpen.value = true;
  }
})

const LoginPushHandler = () =>{
  SuccessOpen.value = false;
  router.push({ name: 'login' });
}

const RegisterPushHandler = () =>{
  SuccessOpen.value = false;
  router.push({ name: 'register' })
}

const handleRegister = async () => {
  const { user_name, email, password } = RegdataRef.value;
  if (user_name && email && password && user_name.length <= 12 && email.length <= 35 && password.length <= 30) {
    loading.value = true;
    registerUser(RegdataRef.value, {
      onSuccess: () => {
        loading.value = false;
        RegBtnValue.value = 'Email elküldve';
        showSucces ? showSucces("Sikeres regisztráció!") : console.log("Sikeres regisztráció!")
      },
      onError: (err : any) => showError ? showError(err.response.data) : console.log(err.response.data),
    });
  }
};

const handleLogin = () => {
  const { email, password } = LogindataRef.value;
  if (email && password) {
    LogindataRef.value.rememberMe = rememberMe.value;
    loginUser(LogindataRef.value, {
      onError: (err) => showError ? showError(err.response.data) : console.log(err.response.data),
      onSuccess: (token) => {
        if (rememberMe) {
          setCookieWithExpiry('user', token, 1);
        } else {
          setPersistentCookie('user', token);
        }
        showSucces ? showSucces("Sikeres bejelentkezés!") : console.log("Sikeres bejelentkezés!"),
        router.push({ name: 'home' });
      },
    });
  }
};

function setCookieWithExpiry(name: string, value: string, day: number) {
  const date = new Date();
  date.setDate(date.getDate() + day); 
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function setPersistentCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/`;
}

const handleForgetPassword = async () => {
  if (ForgetPassworddataRef?.value) {
    loading.value = true;
    forgetPassword(ForgetPassworddataRef.value, {
      onSuccess: () => {showSucces ? showSucces("Email elküldve!") : console.log("Email elküldve!")},
      onError: (err: any) => {showError ? showError(err.response.data) : console.log(err.response.data)}
    });
  }
};

const handSetNewPassword = () => {
  const { password } = SetNewPassworddataRef.value;
  if (password) {
    SetNewPassworddataRef.value.token = String(route.query.token) ?? 'null';
    loading.value = true;
    setNewPassword(SetNewPassworddataRef.value, {
      onSuccess: () => {showSucces ? showSucces("Sikeresen be lett állítva az új jelszó!") : console.log("Sikeresen be lett állítva az új jelszó!")},
      onError: (err : any) => showError ? showError(err.response.data) : console.log(err.response.data),
    });
  }
};

const LogindataRef = ref<LoginData>({
  email: '',
  password: '',
  rememberMe: false
})

const RegdataRef = ref<RegisterData>({
  user_name: '',
  email: '',
  password: ''
})

const ForgetPassworddataRef = ref<ForgetPasswordData>({
  email: '',
})

const SetNewPassworddataRef = ref<SetNewPasswordData>({
  token: '',
  password: '',
})

const emailValue = computed({
  get() {
    const routeMap: Record<string, string> = {
      'register': RegdataRef.value.email,
      'login': LogindataRef.value.email,
      'forget-password': ForgetPassworddataRef.value.email,
    };
    return routeMap[route.name as keyof typeof routeMap] || '';
  },
  set(newValue) {
    const dataMap: Record<string, any> = {
      'register': RegdataRef.value,
      'login': LogindataRef.value,
      'forget-password': ForgetPassworddataRef.value,
    };
    const currentRoute = route.name as keyof typeof dataMap;
    if (dataMap[currentRoute]) {
      dataMap[currentRoute].email = newValue;
    }
  }
});

const passwordValue = computed({
  get(): string {
    switch (route.name) {
      case 'register':
        return RegdataRef.value.password;
      case 'login':
        return LogindataRef.value.password;
      case 'set-new-password':
        return SetNewPassworddataRef.value.password;
      default:
        return '';
    }
  },
  set(newValue: string): void {
    switch (route.name) {
      case 'register':
        RegdataRef.value.password = newValue;
        break;
      case 'login':
        LogindataRef.value.password = newValue;
        break;
      case 'set-new-password':
        SetNewPassworddataRef.value.password = newValue;
        break;
    }
  }
});

function getCookie(name: string): string | null {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

function deleteCookie(name: string): void {
  document.cookie += `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
// <------- Függvények | figyelők ------->
</script>

<style scoped>
.my-box {
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  text-align: center;
}

.background-video-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

#background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
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

.image-text-container{
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  margin-bottom: 1.5vh;
}
.image-text-container h1{
  color: rgb(var(--v-theme-login_title));
  font-size: xx-large;
}
.image-text-container p{
  color: rgb(var(--v-theme-login_title));
  font-size: small;
}
</style>