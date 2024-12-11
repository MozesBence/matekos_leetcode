<template>
    <v-card>
      <v-layout>
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
              <v-card elevation="0" :color="isHovering ? 'nav_btn_hover' :  'transparent'" v-bind="props" class='rounded-circle nav-right-btn'>
                <v-btn color="info" icon="mdi-account" class='rounded-circle' size="large" height="50" width="50" @click="currentRoute.name !== 'profile' && router.push({ name: 'profile' })"></v-btn>
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
  
        <v-main style="height: 100vh;">
          <RouterView></RouterView>
        </v-main>
      </v-layout>
    </v-card>
</template>


<script setup>
  import { useRouter } from 'vue-router';

  const { currentRoute } = useRouter()
  const router = useRouter()
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
        isMobile: false,
        fontSize: 'large'
      };
    },
    watch: {
      '$vuetify.display.mobile'(newValue) {
        this.isMobile = newValue;

        if (!this.isMobile) {
          this.performDesktopAction();
        }
      },
    },
    mounted() {
      this.typeAndSwitchFont();
      this.isMobile = this.$vuetify.display.mobile;

      if (!this.isMobile) {
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
      isMobile() {
        return this.$vuetify.display.mobile;
      },
      fontSize() {
        return this.isMobile ? 'x-large' : 'large'; // Ha mobil eszköz van, kisebb betűméret
      }
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