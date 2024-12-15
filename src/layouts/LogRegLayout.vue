/* log-reg layout */
<template>
  <div class="background-video-container">
    <video autoplay loop muted playsinline id="background-video">
      <source src="../components/background/logreg_background.mp4" type="video/mp4" />
    </video>
    <div class="background-overlay"></div>
  </div>

  <div style="position: absolute; top: 42%; left: 50%; transform: translate(-50%,-50%);" :style="{ top: route.name === 'login' ? '42%' : '46%' }">

    <div class="image-text-container">
      <img src="../components/icons/logo.png" alt="Example Image" class="image">
      <h1 class="text">Math Solve</h1>
      <p class="text">Üdvözli önt az oldal!</p>
    </div>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      min-width="420"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis" v-if="route.name != 'set-new-password'">Fiók</div>

      <v-text-field
        density="compact"
        placeholder="email cím"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="emailValue"
        v-if="route.name != 'set-new-password'"
        :rules="[(v) => !!v || 'Kötelező ezt a mezőt kitölteni']"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis" v-if="route.name == 'register'">Fiók név</div>

      <v-text-field
        density="compact"
        placeholder="Felhasználó név..."
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        v-if="route.name == 'register'"
        v-model="RegdataRef.user_name"
        :rules="[(v) => !!v || 'Kötelező ezt a mezőt kitölteni']"
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
        :rules="[(v) => !!v || 'Kötelező ezt a mezőt kitölteni']"
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
        :rules="[(v) => !!v || 'Kötelező ezt a mezőt kitölteni']"
      ></v-text-field>

      <v-checkbox
        v-model="rememberMe"
        :label="`Maradjak bejelentkezve`"
        v-if="route.name == 'login'"
      ></v-checkbox>

        <v-btn
          class="mb-4 mt-4"
          color="blue"
          size="large"
          variant="tonal"
          block
          v-if="route.name == 'login'"
          :disabled="!LogindataRef.password || !LogindataRef.email"
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

      <v-card-text class="text-center" @click="router.push({ name: 'register' })" v-if="route.name == 'login'">
        <a
          class="text-blue text-decoration-none"
          rel="noopener noreferrer"
          :style="{ cursor: 'pointer' }"
        >
          Regisztrálás <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>

      <h2 v-if="route.name == 'register'" class="text-center">Van már fiókod?</h2>
      <v-card-text class="text-center" @click="router.push({ name: 'login' })" v-if="route.name == 'register'">
        <a
          class="text-blue text-decoration-none"
          rel="noopener noreferrer"
          :style="{ cursor: 'pointer' }"
        >
          Bejelentkezés <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>

      <v-card-text class="text-center" @click="router.push({ name: 'login' })" v-if="route.name == 'forget-password' || route.name == 'set-new-password'">
        <a
          class="text-blue text-decoration-none"
          rel="noopener noreferrer"
          :style="{ cursor: 'pointer' }"
        >
        <v-icon icon="mdi-chevron-left"></v-icon> Bejelentkezés
        </a>
      </v-card-text>
    </v-card>
  </div>

  <v-snackbar
    v-model="snackbar"
    :timeout="2000"
    color="white"
    :location="dynamicLocation"
    :style="dynamicStyle"
    justify-space-between
    :max-width="'15vw'"
  >
    <div class="d-flex justify-space-between align-center w-auto" style="gap: 1.2vw;">
      <span style="font-size: 1.5vh;" class="text-center">{{ errorMessage }}</span>
      <v-btn
        color="red"
        @click="snackbar = false"
        icon="mdi-close" 
        class="rounded-circle"
        size="x-small"
      >
      </v-btn>
    </div>
  </v-snackbar>

</template>

<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router';
  import { ref, computed  } from 'vue'

  import type { RegisterData } from '@/api/register/register'
  import { useRegisterUser } from '@/api/register/registerQuery'

  import type { LoginData } from '@/api/login/login'
  import { useLoginUser } from '@/api/login/loginQuery'

  import type { ForgetPasswordData } from '@/api/forget-password/ForgetPassword'
  import { useForgetPassword } from '@/api/forget-password/ForgetPasswordQuery'

  import type { SetNewPasswordData } from '@/api/set-new-password/SetNewPassword'
  import { useSetNewPassword } from '@/api/set-new-password/SetNewPasswordQuery'

  import { useDisplay } from 'vuetify';

  const route = useRoute()
  const router = useRouter()
  
  const loading = ref(false)

  var RegBtnValue = ref("Regisztrálás");

  const PasswordValue = ref("Jelszó");
  const ConfPasswordValue = ref("Jelszó megerősítése");
  
  const { mutate: registerUser } = useRegisterUser(loading, RegBtnValue) //, isPending

  const handleRegister = async () => {
  if (RegdataRef.value.user_name && RegdataRef.value.email && RegdataRef.value.password) {
      loading.value = true;
      registerUser(RegdataRef.value, {
          onError: (err: any) => {
            errorMessage.value = err.response.data || "Hiba történt a bejelentkezés során.";
            snackbar.value = true;
          },
        }
      );
    }
  };

  const errorMessage = ref('');
  
  const snackbar = ref(false);
   
  const { mutate : loginUser} = useLoginUser() //, isPending
  
  const rememberMe = ref(false);

  const handleLogin = () => {
      if (LogindataRef.value.email && LogindataRef.value.password) {
        LogindataRef.value.token = route.query.token ? (route.query.token as string) : 'null';
        loginUser(LogindataRef.value, {
          onError: (err: any) => {
            errorMessage.value = err.message || "Hiba történt a bejelentkezés során.";
            snackbar.value = true;
          },
          onSuccess:(user) =>{
            if (rememberMe) {
              setCookieWithExpiry('user', user.user_name, 1);
            } else {
              setPersistentCookie('user', user.user_name);
            }
          }
        }
      );
    }
  };

  function setCookieWithExpiry(name: string, value: string, years: number) {
    const date = new Date();
    date.setFullYear(date.getFullYear() + years);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  }

  function setPersistentCookie(name: string, value: string) {
    document.cookie = `${name}=${value}; path=/`;
  }

  const ForgetBtnValue = ref("Email küldése");

  const { mutate: forgetPassword} = useForgetPassword(loading, ForgetBtnValue) //, isPending

  const handleForgetPassword = async () => {
  if (ForgetPassworddataRef) {
      loading.value = true
      forgetPassword(ForgetPassworddataRef.value, {
          onError: (err: any) => {
            errorMessage.value = err.response.data || "Hiba történt a bejelentkezés során.";
            snackbar.value = true;
          },
        }
      );
    }
  };

  const SetBtnValue = ref("Új jelszó beállítás");

  const { mutate: setNewPassword} = useSetNewPassword(loading, SetBtnValue) //, isPending


  const handSetNewPassword = () => {
    if (SetNewPassworddataRef.value.password) {
      SetNewPassworddataRef.value.token = route.query.token ? (route.query.token as string) : 'null';
      loading.value = true
      setNewPassword(SetNewPassworddataRef.value, {
          onError: (err: any) => {
            errorMessage.value = err.message || "Hiba történt a bejelentkezés során.";
            snackbar.value = true;
          },
        }
      );
    }
  };

  if(route.name == 'set-new-password'){
    PasswordValue.value = "Új jelszó"
    ConfPasswordValue.value = "Új jelszó megerősítése"
  }else{
    PasswordValue.value = "Jelszó"
    ConfPasswordValue.value = "Jelszó megerősítése"
  }

  const LogindataRef = ref<LoginData>({
    token: '',
    email: '',
    password: ''
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
      if (route.name == 'register') {
        return RegdataRef.value.email;
      } 
      else if (route.name == 'login') {
        return LogindataRef.value.email;
      }
      else if (route.name == 'forget-password') {
        return ForgetPassworddataRef.value.email;
      }

      return '';
    },
    set(newValue) {
      if (route.name == 'register') {
        RegdataRef.value.email = newValue;
      } 
      else if (route.name == 'login') {
        LogindataRef.value.email = newValue;
      }
      else if (route.name == 'forget-password') {
        ForgetPassworddataRef.value.email = newValue;
      }
    }
  });
  const passwordValue = computed({
    get() {
      if (route.name == 'register') {
        return RegdataRef.value.password;
      } 
      else if (route.name == 'login') {
        return LogindataRef.value.password;
      }
      else if (route.name == 'set-new-password') {
        return SetNewPassworddataRef.value.password;
      }
      return '';
    },
    set(newValue) {
      if (route.name == 'register') {
        RegdataRef.value.password = newValue;
      } 
      else if (route.name == 'login') {
        LogindataRef.value.password = newValue;
      }
      else if (route.name == 'set-new-password') {
        SetNewPassworddataRef.value.password = newValue;
      }
    }
  });

  const dynamicLocation = computed(() => {
    return route.name === 'register' ? 'center' : 'bottom';
  });

  const { smAndDown } = useDisplay();
  
  const dynamicStyle = computed(() => {
    const baseStyle: any = {};

    if (dynamicLocation.value === 'bottom') {
      baseStyle.bottom = smAndDown.value ? '10vh' : '15vh';
      if(smAndDown.value){
        baseStyle.bottom = '5rem';
      }
      else{
        baseStyle.bottom = '10rem';
      }
    } else if (dynamicLocation.value === 'center') {
      if(smAndDown.value){
        baseStyle.top = '-30rem';
      }
      else{
        baseStyle.left = '50rem';
      }
    }
    return baseStyle;
  });

  const visible = ref(false);
  const confirmPassword = ref('');
</script>

<script lang="ts">

export default {
  data() {
    return {
      loading: false, 
      visible: false,
      rememberMe: false,
    }
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  },
}
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
.image-text-container img{
  height: 25vh;
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