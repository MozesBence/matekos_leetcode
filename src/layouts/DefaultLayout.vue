<template>
    <v-card style="background-color: rgb(var(--v-theme-background)); box-shadow: none;">
      <v-layout style="position: relative; box-shadow: none;" elevation="0">
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
                        @click="currentRoute.name !== 'home' && router.push({ name: 'home', params: {id: 1} })"
                        :class="{'btn-active': currentRoute.name === 'home'}"
                      >
                        <template v-slot:prepend>
                          <v-icon color="info"></v-icon>
                        </template>
                        Főoldal
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
                      Rólunk
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
                      Versenyek
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
                        Közösség
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
            <v-speed-dial
              location="bottom center"
              transition="slide-y-transition"
              v-if="get_user_name"
            >
              <template v-slot:activator="{ props: activatorProps }" class="nav-right-btn">
                <v-btn
                  v-bind="activatorProps"
                  color="info"
                  class="rounded-circle"
                  size="large"
                  height="50"
                  width="50"
                  icon
                >
                  <v-avatar size="40">
                    <template v-if="ProfImage">
                      <img
                        :src="ProfImage"
                        class="profile-image"
                        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; object-fit: cover;"
                      />
                    </template>
                    <template v-else>
                      <v-icon size="25" color="info">mdi-account</v-icon>
                    </template>
                  </v-avatar>
                </v-btn>
              </template>

              <v-btn key="1" @click="router.push({ name: 'profile', params: { id: get_fullUser.id } })" icon>
                <v-icon color="default_btn_bc">mdi-account</v-icon>
              </v-btn>
              <v-btn key="2" @click="dialog = true" icon>
                <v-icon color="default_btn_bc">mdi-account-cog  </v-icon>
              </v-btn>
              <v-btn key="3" @click="Logout()" icon style="background-color: red;">
                <v-icon color="white">mdi-logout</v-icon>
              </v-btn>
            </v-speed-dial>
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
                    <p style="width: 20vw;">Főoldal</p>
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
                    <p style="width: 20vw;">Rólunk</p>
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
                    <p style="width: 20vw;">Versenyek</p>
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
                    <p style="width: 20vw;">Közösségi</p>
                  </v-btn>
                </div>
              </v-col>
            </v-container>
          </v-list>
        </v-navigation-drawer>
  
        <v-main style="background: rgb(var(--v-theme-background)); overflow: hidden; --v-layout-left: 0px !important;" elevation="0">
          <v-container
              v-if="!get_fullUser"
              fluid
              class="d-flex justify-center full-width align-center pt-2 pb-2 pr-0 pl-0 mx-0"
              style="border-bottom: .3vh solid rgb(var(--v-theme-secondary));"
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
              max-width="1200"
              persistent
            >
              <v-card style="display: flex; flex-direction: column;">
                <v-layout>
                  <div
                    style="max-width: 50%; border-radius: 0 !important; height: min-content; background-color: gray;"
                    class="d-flex flex-column position-relative"
                    >
                  <div>
                      <div class="my-2 d-flex justify-center">
                        <v-icon color="custom_drawer_icon" class="mx-2">mdi-cog</v-icon>
                        <h3 style="font-weight: normal;">Beállítások</h3>
                      </div>
                      <v-divider color="default_btn_bc" style="transition: .3s;"></v-divider>
                      <v-expand-transition>
                        <div class="w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" style="border-radius: 0;" @click="ProfSettingsActive">
                          <v-icon style="flex: 0; text-align: center;" size="20">mdi-account</v-icon>
                          <h4
                            style="flex: 1; text-align: center; margin: 0; text-transform: capitalize; font-weight: normal;"
                          >
                            fiók
                          </h4>
                          <v-slide-x-reverse-transition hide-on-leave>
                            <div 
                            v-if="ProfSettingDraw" 
                            style="background-color: rgb(var(--v-theme-surface)); position: absolute; max-width: 2rem; max-height: 2rem; width: 100%; height: 100%; right: 0; border-top-left-radius: 20px; border-bottom-left-radius: 20px; transition: .3s;"
                            class="d-flex align-center"
                            >
                              <v-icon color="custom_drawer_icon" class="ml-1">mdi-radiobox-marked</v-icon>
                            </div>
                          </v-slide-x-reverse-transition>
                        </div>
                      </v-expand-transition>
                      <v-divider inset color="default_btn_bc" style="transition: .3s;"></v-divider>
                      <v-expand-transition>
                        <div class="rounded-0 w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" @click="EmailSettingsActive">
                          <v-icon style="flex: 0; text-align: center;" size="20">mdi-email</v-icon>
                          <h4 style="flex: 1; text-align: center; margin: 0; text-transform: capitalize; font-weight: normal;">
                            email
                          </h4>
                          <v-slide-x-reverse-transition hide-on-leave>
                            <div 
                            v-if="EmailSettingDraw" 
                            style="background-color: rgb(var(--v-theme-surface)); position: absolute; max-width: 2rem; max-height: 2rem; width: 100%; height: 100%; right: 0; border-top-left-radius: 20px; border-bottom-left-radius: 20px; transition: .3s;"
                            class="d-flex align-center"
                            >
                              <v-icon color="custom_drawer_icon" class="ml-1">mdi-radiobox-marked</v-icon>
                            </div>
                          </v-slide-x-reverse-transition>
                        </div>
                      </v-expand-transition>
                      <v-divider inset color="default_btn_bc" style="transition: .3s;"></v-divider>
                      <v-expand-transition>
                        <div class="rounded-0 w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" @click="PassSettingsActive">
                          <v-icon style="flex: 0; text-align: center;" size="20">mdi-lock</v-icon>
                          <h4 style="flex: 1; text-align: center; margin: 0; text-transform: capitalize; font-weight: normal;">
                            jelszó
                          </h4>
                          <v-slide-x-reverse-transition hide-on-leave>
                            <div 
                            v-if="PassSettingDraw" 
                            style="background-color: rgb(var(--v-theme-surface)); position: absolute; max-width: 2rem; max-height: 2rem; width: 100%; height: 100%; right: 0; border-top-left-radius: 20px; border-bottom-left-radius: 20px; transition: .3s;"
                            class="d-flex align-center"
                            >
                              <v-icon color="custom_drawer_icon" class="ml-1">mdi-radiobox-marked</v-icon>
                            </div>
                          </v-slide-x-reverse-transition>
                        </div>
                      </v-expand-transition>

                      <v-divider inset color="default_btn_bc" style="transition: .3s;"></v-divider>
                      
                      <v-expand-transition>
                        <div class="rounded-0 w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" @click="NotifActive">
                          <v-icon style="flex: 0; text-align: center;" size="20">mdi-bell</v-icon>
                          <h4 style="flex: 1; text-align: center; margin: 0; text-transform: capitalize; font-weight: normal;">
                            értesítések
                          </h4>
                          <v-slide-x-reverse-transition hide-on-leave>
                            <div 
                            v-if="NotifDraw" 
                            style="background-color: rgb(var(--v-theme-surface)); position: absolute; max-width: 2rem; max-height: 2rem; width: 100%; height: 100%; right: 0; border-top-left-radius: 20px; border-bottom-left-radius: 20px; transition: .3s;"
                            class="d-flex align-center"
                            >
                              <v-icon color="custom_drawer_icon" class="ml-1">mdi-radiobox-marked</v-icon>
                            </div>
                          </v-slide-x-reverse-transition>
                        </div>
                      </v-expand-transition>
                      <v-divider color="default_btn_bc" style="transition: .3s;"></v-divider>

                      <div class="my-2 d-flex justify-center">
                        <v-icon color="custom_drawer_icon" class="mx-2">mdi-crown</v-icon>
                        <h3 style="font-weight: normal;">VIP cuccok talán</h3>
                      </div>

                      <v-divider color="default_btn_bc" style="transition: .3s;"></v-divider>

                      <v-expand-transition>
                        <div class="w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" style="border-radius: 0;" @click="LeaderBoardActive">
                          <v-icon style="flex: 0; text-align: center;" size="20">mdi-podium</v-icon>
                          <h4
                            style="flex: 1; text-align: center; margin: 0; text-transform: capitalize; font-weight: normal;"
                          >
                            ranglista
                          </h4>
                          <v-slide-x-reverse-transition hide-on-leave>
                            <div 
                            v-if="LeaderBoardDraw" 
                            style="background-color: rgb(var(--v-theme-surface)); position: absolute; max-width: 2rem; max-height: 2rem; width: 100%; height: 100%; right: 0; border-top-left-radius: 20px; border-bottom-left-radius: 20px; transition: .3s;"
                            class="d-flex align-center"
                            >
                              <v-icon color="custom_drawer_icon" class="ml-1">mdi-radiobox-marked</v-icon>
                            </div>
                          </v-slide-x-reverse-transition>
                        </div>
                      </v-expand-transition>

                      <v-divider inset color="default_btn_bc" style="transition: .3s;"></v-divider>

                      <v-expand-transition>
                        <div class="w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" style="border-radius: 0;" @click="PostActive">
                          <v-icon style="flex: 0; text-align: center;" size="20">mdi-newspaper</v-icon>
                          <h4
                            style="flex: 1; text-align: center; margin: 0; text-transform: capitalize; font-weight: normal;"
                          >
                          Posztbeállítások 
                          </h4>
                          <v-slide-x-reverse-transition hide-on-leave>
                            <div 
                            v-if="PostDraw" 
                            style="background-color: rgb(var(--v-theme-surface)); position: absolute; max-width: 2rem; max-height: 2rem; width: 100%; height: 100%; right: 0; border-top-left-radius: 20px; border-bottom-left-radius: 20px; transition: .3s;"
                            class="d-flex align-center"
                            >
                              <v-icon color="custom_drawer_icon" class="ml-1">mdi-radiobox-marked</v-icon>
                            </div>
                          </v-slide-x-reverse-transition>
                        </div>
                      </v-expand-transition>

                      <v-divider color="default_btn_bc" style="transition: .3s;"></v-divider>
                      
                      <div class="my-2 d-flex justify-center">
                        <v-icon color="custom_drawer_icon" class="mx-2">mdi-shield</v-icon>
                        <h3 style="font-weight: normal;">Admin panel</h3>
                      </div>

                      <v-divider color="default_btn_bc" style="transition: .3s;"></v-divider>

                      <v-expand-transition>
                        <div class="w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" style="border-radius: 0;" @click="UsersActive">
                          <v-icon style="flex: 0; text-align: center;">mdi-account-multiple</v-icon>
                          <h4
                            style="flex: 1; text-align: center; margin: 0; text-transform: capitalize; font-weight: normal;"
                          >
                          felhasználók 
                          </h4>
                          <v-slide-x-reverse-transition hide-on-leave>
                            <div 
                            v-if="UsersDraw" 
                            style="background-color: rgb(var(--v-theme-surface)); position: absolute; max-width: 2rem; max-height: 2rem; width: 100%; height: 100%; right: 0; border-top-left-radius: 20px; border-bottom-left-radius: 20px; transition: .3s;"
                            class="d-flex align-center"
                            >
                              <v-icon color="custom_drawer_icon" class="ml-1"  size="20">mdi-radiobox-marked</v-icon>
                            </div>
                          </v-slide-x-reverse-transition>
                        </div>
                      </v-expand-transition>

                      <v-divider inset color="default_btn_bc" style="transition: .3s;"></v-divider>

                      <v-expand-transition>
                        <div class="w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" style="border-radius: 0;" @click="AdminNotifActive">
                          <v-icon style="flex: 0; text-align: center;">mdi-alert-circle</v-icon>
                          <h4
                            style="flex: 1; text-align: center; margin: 0; text-transform: capitalize; font-weight: normal;"
                          >
                          admin értesítések 
                          </h4>
                          <v-slide-x-reverse-transition hide-on-leave>
                            <div 
                            v-if="AdminNotifDraw" 
                            style="background-color: rgb(var(--v-theme-surface)); position: absolute; max-width: 2rem; max-height: 2rem; width: 100%; height: 100%; right: 0; border-top-left-radius: 20px; border-bottom-left-radius: 20px; transition: .3s;"
                            class="d-flex align-center"
                            >
                              <v-icon color="custom_drawer_icon" class="ml-1"  size="20">mdi-radiobox-marked</v-icon>
                            </div>
                          </v-slide-x-reverse-transition>
                        </div>
                      </v-expand-transition>

                      <v-divider color="default_btn_bc" style="transition: .3s;"></v-divider>
                    </div>

                    <div style="width: 100%; height: max-content; justify-content: center;" class="d-flex flex-column align-center justfiy-center mt-5">
                      <div style="height: 100%; border-radius: 50%; width: 5rem; height: 5rem; overflow: hidden; position: relative;">
                        <img :src="get_fullUser.User_customization.profil_picture == null ? '/src/components/background/test_profile.jpg' : get_fullUser.User_customization.profil_picture"
                          alt="profil_kep"
                          style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; object-fit: cover; cursor: pointer;"
                          @click="router.push({ name: 'profile', params: { id: get_fullUser.id } })"
                          >
                        </div>
                        <h2 
                        style="font-weight: normal; text-decoration: none; cursor: pointer;" 
                        class="mt-1" @click="router.push({ name: 'profile', params: { id: get_fullUser.id } })"
                        >{{ get_user_name }}</h2>
                    </div>

                  </div>

                  <v-main class="d-flex align-center justify-center" style="height: 100%;">
                    Main Content
                  </v-main>
                </v-layout>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    text="Bezárás"
                    variant="plain"
                    @click="dialog = false"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>

          <RouterView></RouterView>

        </v-main>
      </v-layout>
    </v-card>
</template>

<script setup>
import { onMounted, ref, shallowRef, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProfileGetUser } from '@/api/profile/profileQuery'
import { useProfileDarkmodeSwitch } from '@/api/profile/profileQuery'
import { useTheme } from 'vuetify';

const { mutate : ProfileGetUser} = useProfileGetUser()

const { currentRoute } = useRouter()

const router = useRouter();
const route = useRoute();

const dialog = shallowRef(false)

var get_user_by_token = (getCookie('user') != null && getCookie('user') != 'undefined' && typeof getCookie('user') != "object") ? getCookie('user') : null;

const ProfSettingDraw = ref(true);
const EmailSettingDraw = ref(false);
const PassSettingDraw = ref(false);
const NotifDraw = ref(false);
const LeaderBoardDraw = ref(false);
const PostDraw = ref(false);
const UsersDraw = ref(false);
const AdminNotifDraw = ref(false);

function ProfSettingsActive(){
  ProfSettingDraw.value = true;
  EmailSettingDraw.value = false;
  PassSettingDraw.value = false;
  NotifDraw.value = false;
  LeaderBoardDraw.value = false;
  PostDraw.value = false;
  UsersDraw.value = false;
  AdminNotifDraw.value = false;
}

function EmailSettingsActive(){
  ProfSettingDraw.value = false;
  EmailSettingDraw.value = true;
  PassSettingDraw.value = false;
  NotifDraw.value = false;
  LeaderBoardDraw.value = false;
  PostDraw.value = false;
  UsersDraw.value = false;
  AdminNotifDraw.value = false;
}

function PassSettingsActive(){
  ProfSettingDraw.value = false;
  EmailSettingDraw.value = false;
  PassSettingDraw.value = true;
  NotifDraw.value = false;
  LeaderBoardDraw.value = false;
  PostDraw.value = false;
  UsersDraw.value = false;
  AdminNotifDraw.value = false;
}

function NotifActive(){
  ProfSettingDraw.value = false;
  EmailSettingDraw.value = false;
  PassSettingDraw.value = false;
  NotifDraw.value = true;
  LeaderBoardDraw.value = false;
  PostDraw.value = false;
  UsersDraw.value = false;
  AdminNotifDraw.value = false;
}

function LeaderBoardActive(){
  ProfSettingDraw.value = false;
  EmailSettingDraw.value = false;
  PassSettingDraw.value = false;
  NotifDraw.value = false;
  LeaderBoardDraw.value = true;
  PostDraw.value = false;
  UsersDraw.value = false;
  AdminNotifDraw.value = false;
}

function PostActive(){
  ProfSettingDraw.value = false;
  EmailSettingDraw.value = false;
  PassSettingDraw.value = false;
  NotifDraw.value = false;
  LeaderBoardDraw.value = false;
  PostDraw.value = true;
  UsersDraw.value = false;
  AdminNotifDraw.value = false;
}

function UsersActive(){
  ProfSettingDraw.value = false;
  EmailSettingDraw.value = false;
  PassSettingDraw.value = false;
  NotifDraw.value = false;
  LeaderBoardDraw.value = false;
  PostDraw.value = false;
  UsersDraw.value = true;
  AdminNotifDraw.value = false;
}

function AdminNotifActive(){
  ProfSettingDraw.value = false;
  EmailSettingDraw.value = false;
  PassSettingDraw.value = false;
  NotifDraw.value = false;
  LeaderBoardDraw.value = false;
  PostDraw.value = false;
  UsersDraw.value = false;
  AdminNotifDraw.value = true;
}

const get_fullUser = ref(null);
const get_fullUser_customs = ref(null);
const get_user_name = ref(null);
const ProfImage = ref(null);

const theme = useTheme();

// A useProfileDarkmodeSwitch hook a setup() részben
const { mutate: ProfileDarkMode } = useProfileDarkmodeSwitch();
const DarkmodeChange = ref(false);

onMounted(async () => {
  if(get_user_by_token){
    try {
      await ProfileGetUser({token: get_user_by_token, id: 0}, {
        onSuccess: (get_user) => {
          get_fullUser.value = get_user;
          get_user_name.value = get_user.user_name;
          get_fullUser_customs.value = get_user.User_customization;
          if(get_fullUser_customs.value.profil_picture != null){
            ProfImage.value = get_fullUser_customs.value.profil_picture;
          }
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
function getCookie(name){
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

function Logout(){
  deleteCookie('user');
  window.location.reload();
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
</script>

<script>
import { ref, watch } from 'vue'

const drawer = ref(false);
const group = ref(null);

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

.custom-drawer-btn{
  transition: .3s;
}
.custom-drawer-btn:hover{
  background-color: rgb(var(--v-theme-custom_drawer_btn), .3);
}

.v-dialog > .v-overlay__content > .v-card,
.v-dialog > .v-overlay__content > .v-sheet,
.v-dialog > .v-overlay__content > form > .v-card,
.v-dialog > .v-overlay__content > form > .v-sheet {
    --v-scrollbar-offset: 0px;
    border-radius: 4px;
    overflow-y: auto;
    flex: none !important;
    height: inherit !important; /* vagy adj meg egy kívánt magasságot */
}
</style>