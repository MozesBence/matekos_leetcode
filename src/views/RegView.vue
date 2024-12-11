/* reg */
<template> 
  <div class="background-video-container">
    <video autoplay loop muted playsinline id="background-video">
      <source src="../components/background/login_background.mp4" type="video/mp4" />
    </video>
    <div class="background-overlay"></div>
  </div>

  <div style="position: absolute; top: 46%; left: 50%; transform: translate(-50%,-50%);">

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

      <div class="text-subtitle-1 text-medium-emphasis">Fiók</div>

      <v-text-field
        density="compact"
        placeholder="Email cím"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Fiók név</div>

      <v-text-field
        density="compact"
        placeholder="Felhasználó név..."
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Jelszó
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Írja be a jelszavát..."
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Jelszó megerősítése
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Erősítse meg a jelszavát..."
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn
        class="mb-4 mt-4"
        color="blue"
        size="large"
        variant="tonal"
        block
      >
        Regisztrálás
      </v-btn>
    </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      visible: false,
    }),
    name: "CenteredDivExample",
    name: "BackgroundVideo",
  }

</script>

<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter()
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
  backdrop-filter: blur(4px);
  z-index: -1;
}
.image-text-container{
  width: 100%;
  height: max-content;
  margin-bottom: 1vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
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