<template>
    <v-card style="background-color: rgb(var(--v-theme-background)); box-shadow: none;">
      <v-layout 
      style="position: relative; box-shadow: none;"
      :style="{height: drawer ? '100vh' : ''}" 
      elevation="0">
        <v-app-bar
          color="primary"
          elevation="0"
        >
          <v-app-bar-nav-icon v-if="isMobile"  variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

          <div class="site-title">
            <span class="title"  style="color: rgb(var(--v-theme-site_title)); font-size: larger;" :style="{ fontFamily: currentFont,}">{{ displayedText }}</span>
          </div>

          <div style="width: 70%; margin: auto;">
            <v-row justify="space-around" style="background-color: transparent;" v-if="!isMobile">
              <v-hover v-slot="{ isHovering, props }">
                <div class="text-center">
                  <v-col
                    md="12"
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
                    md="12"
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
                    md="12"
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
                    md="12"
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
          </div>

          <div class="d-flex position-fixed ga-1" style="right: .2em">
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
        :location="isMobile ? 'left' : undefined"
        scrim="rgba(0, 0, 0, 1)"
        class="pt-2"
        v-if="isMobile"
        style="transition: all .3s;"
        >
          <div
          class="d-flex align-center rounded py-2 px-4 mx-4 my-1"
          @click="router.push({ name: 'home' })"
          :class="{'btn-active': currentRoute.name === 'home'}"
          >
            <div style="width: 20%;">
              <v-icon color="info" size="32">mdi-home</v-icon>
            </div>
            <h2 style="font-weight: normal; width: 80%;" class="text-center">Főoldal</h2>
          </div>

          <div
          class="d-flex align-center rounded py-2 px-4 mx-4 my-1"
          @click="currentRoute.name !== 'about' && router.push({ name: 'about' })"
          :class="{'btn-active': currentRoute.name === 'about'}"
          >
            <div style="width: 20%;">
              <v-icon color="info" size="32"> mdi-information</v-icon>
            </div>
            <h2 style="font-weight: normal; width: 80%;" class="text-center">Rólunk</h2>
          </div>

          <div
          class="d-flex align-center rounded py-2 px-4 mx-4 my-1"
          @click="currentRoute.name !== 'contest' && router.push({ name: 'contest' })"
          :class="{'btn-active': currentRoute.name === 'contest'}"
          >
            <div style="width: 20%;">
              <v-icon color="info" size="32">mdi-trophy</v-icon>
            </div>
            <h2 style="font-weight: normal; width: 80%;" class="text-center">Versenyek</h2>
          </div>

          <div
            class="d-flex align-center rounded py-2 px-4 mx-4 my-1"
            @click="currentRoute.name !== 'community' && router.push({ name: 'community' })"
            :class="{'btn-active': currentRoute.name === 'community'}"
          >
            <div style="width: 20%;">
              <v-icon color="info" size="32">mdi-account-group</v-icon>
            </div>
            <h2 style="font-weight: normal; width: 80%;" class="text-center">Közösségi</h2>
          </div>
        </v-navigation-drawer>
  
        <v-main style="background: rgb(var(--v-theme-background)); overflow: hidden; --v-layout-left: 0px !important;" elevation="0">
          <v-container
              v-if="!get_user_by_token"
              fluid
              class="d-flex justify-center full-width align-center pt-2 pb-2 pr-0 pl-0 mx-0"
              style="border-bottom: .3vh solid rgb(var(--v-theme-secondary));"
            >
              
            <v-hover v-slot:default="{ isHovering, props }">
              <div class="text-center">
                <v-col
                  md="12"
                  class="pa-0"
                >
                  <v-card elevation="0" :color="isHovering ? 'nav_btn_hover' :  'transparent'" v-bind="props" class="rounded-pill" block>
                    <v-btn
                      prepend-icon="mdi-login"
                      size="large"
                      @click="router.push({ name: 'login' })"
                      style="background-color: transparent;"
                      :style="{color: isHovering ? 'rgb(var(--v-theme-background))' : 'rgb(var(--v-theme-text_color))'}"
                    >
                      <template v-slot:prepend>
                        <v-icon color="info"></v-icon>
                      </template>
                      Bejelentkezés
                    </v-btn>
                  </v-card>
                </v-col>
              </div>
            </v-hover>

            <span class="align-self-center mr-4 ml-4" style="font-size: .8rem;"> || </span>

            <v-hover v-slot="{ isHovering, props }">
              <div class="text-center">
                <v-col
                md="12"
                class="pa-0"
                >
                <v-card elevation="0" :color="isHovering ? 'nav_btn_hover' :  'transparent'" v-bind="props" class="rounded-pill" block>
                  <v-btn
                    prepend-icon="mdi-account-edit"
                    size="large"
                    @click="router.push({ name: 'register' })"
                    style="background-color: transparent;"
                    :style="{color: isHovering ? 'rgb(var(--v-theme-background))' : 'rgb(var(--v-theme-text_color))'}"
                    >
                      <template v-slot:prepend>
                        <v-icon color="info"></v-icon>
                      </template>
                      Regisztrálás
                    </v-btn>
                  </v-card>
                </v-col>
              </div>
            </v-hover>
          </v-container>

          <div class="pa-4 text-center" :style="{position: dialog ? 'relativ': 'absolute'}">
            <v-dialog
              v-model="dialog"
              max-width="1200"
            >
              <v-card style="display: flex; flex-direction: column; height: auto; overflow: hidden;">
                <v-layout>
                  <div
                  style="max-width: max-content; border-radius: 0 !important; background-color: rgb(var(--v-theme-settings_drawer_bc)); min-height: max-content; height: auto; transition: .3s; z-index: 5;"
                  class="d-flex flex-column position-relative"
                  :style="{left: SettingsMenu ? '-60rem' : '0vw'}"
                  >
                    <div>
                      <div class="my-2 mx-16 d-flex justify-center">
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
                      
                      <div class="my-2 d-flex justify-center" v-if="get_fullUser.admin && get_fullUser.user_role == 'admin'">
                        <v-icon color="custom_drawer_icon" class="mx-2">mdi-shield</v-icon>
                        <h3 style="font-weight: normal;">Admin panel</h3>
                      </div>

                      <v-divider color="default_btn_bc" style="transition: .3s;" v-if="get_fullUser.admin && get_fullUser.user_role == 'admin'"></v-divider>

                      <v-expand-transition>
                        <div class="w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" style="border-radius: 0;" @click="UsersActive" v-if="get_fullUser.admin && get_fullUser.user_role == 'admin'">
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

                      <v-divider inset color="default_btn_bc" style="transition: .3s;" v-if="get_fullUser.admin && get_fullUser.user_role == 'admin'"></v-divider>

                      <v-expand-transition>
                        <div class="w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" style="border-radius: 0;" @click="AdminNotifActive" v-if="get_fullUser.admin && get_fullUser.user_role == 'admin'">
                          <v-icon style="flex: 0; text-align: center;">mdi-alert-circle</v-icon>
                          <h4
                            style="flex: 1; text-align: center; margin: 0; text-transform: capitalize; font-weight: normal;"
                          >
                          bejelentések
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

                      <v-divider inset color="default_btn_bc" style="transition: .3s;" v-if="get_fullUser.admin && get_fullUser.user_role == 'admin'"></v-divider>
                    
                      <v-expand-transition>
                        <div class="w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" style="border-radius: 0;" @click="AdminValidateActive" v-if="get_fullUser.admin && get_fullUser.user_role == 'admin'">
                          <v-icon style="flex: 0; text-align: center;">mdi-format-list-bulleted</v-icon>
                          <h4
                            style="flex: 1; text-align: center; margin: 0; text-transform: capitalize; font-weight: normal;"
                          >
                          Feladatok
                          </h4>
                          <v-slide-x-reverse-transition hide-on-leave>
                            <div 
                            v-if="AdminValidateDraw" 
                            style="background-color: rgb(var(--v-theme-surface)); position: absolute; max-width: 2rem; max-height: 2rem; width: 100%; height: 100%; right: 0; border-top-left-radius: 20px; border-bottom-left-radius: 20px; transition: .3s;"
                            class="d-flex align-center"
                            >
                              <v-icon color="custom_drawer_icon" class="ml-1"  size="20">mdi-radiobox-marked</v-icon>
                            </div>
                          </v-slide-x-reverse-transition>
                        </div>
                      </v-expand-transition>

                      <v-divider color="default_btn_bc" style="transition: .3s;" v-if="get_fullUser.admin && get_fullUser.user_role == 'admin'"></v-divider>
                    </div>

                    <div style="width: 100%; height: max-content; justify-content: center;" class="d-flex flex-column align-center justfiy-center mt-5 position-absolute bottom-0">
                      <div style="border-radius: 50%; width: 5rem; height: 5rem; overflow: hidden; position: relative;">
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

                    <div style="height: 9rem;"></div>
                  </div>

                  <v-main 
                  class="d-flex flex-column justify-center py-4 px-2 position-relative" 
                  style="height: auto; z-index: 3;"
                  :style="{left: SettingsMenu ? '-16.25em' : '0vw', width: isMobile ? '100%' : ''}"
                  >
                  <div v-if="isMobile" style="height: max-content; width: 100%;" class="pl-2">
                    <v-icon size="30" icon @click="SettingsMenu = !SettingsMenu">
                      mdi-menu
                    </v-icon>
                  </div>
                  <div style="height: 100%;">
                    <v-slide-y-transition mode="out-in">
                      <div :key="activePanel" class="w-100" style="height: auto;">
                        <v-fade-transition mode="out-in">
                          <div v-if="activePanel == 'ProfSettingDraw'" class="d-flex flex-column justify-center">
                            <h1 class="text-center">Fiók név változtatás</h1>

                            <div 
                              class="d-flex"
                              :class="{
                                'flex-column mt-1': isMobile, 
                                'mt-5 ga-5 align-center': !isMobile
                              }"
                            >
                              <v-text-field
                                clearable
                                v-model="userNameInput"
                                :label="get_fullUser.user_name"
                                variant="outlined"
                                :disabled="ProfInputDisabled || ConfirmCode"
                                placeholder="Felhasználó név..."
                                :rules="[ 
                                  (v) => (!v || v.length >= 6) || 'Minimum 6 karakteres név kell.', 
                                  (v) => (!v || v.length <= 24) || 'Maximum 24 karakter lehet.' 
                                ]"
                              />
                              <div 
                              class="d-flex ga-2 position-relative" 
                              :class="{
                                'justify-space-around': isMobile, 
                              }"
                              :style="{top: !isMobile ? '-1rem' : ''}">
                                <v-btn variant="flat" @click="ProfInputDisabled = false" :disabled="!ProfInputDisabled">Módosítás</v-btn>
                                <v-expand-transition>
                                  <v-btn
                                    :disabled="ProfInputDisabled || !userNameInput || userNameInput === get_user_name || userNameInput.length < 6 || userNameInput.length > 24"
                                    :loading="loading"
                                    variant="flat"
                                    @click="SendConfirmCode"
                                    v-if="!ConfirmCode"
                                  >
                                    Mentés
                                  </v-btn>
                                </v-expand-transition>
                              </div>
                            </div>
                          </div>
                        </v-fade-transition>

                        <v-fade-transition mode="out-in">
                          <div v-if="activePanel == 'EmailSettingDraw'" class="w-100">
                            <h1 class="text-center">Email változtatás</h1>

                            <div 
                              class="d-flex"
                              :class="{
                                'flex-column mt-1': isMobile, 
                                'mt-5 ga-5 align-center': !isMobile
                              }"
                            >
                              <v-text-field
                              v-model="userEmailInput"
                              clearable
                              :label="get_fullUser.email"
                              variant="outlined"
                              :disabled="EmailInputDisabled || ConfirmCode"
                              placeholder="Email cím..."
                              ></v-text-field>
                              <div 
                              class="d-flex ga-2 position-relative" 
                              :class="{
                                'justify-space-around mt-2': isMobile, 
                              }"
                              :style="{top: !isMobile ? '-1rem' : ''}">
                                <v-btn variant="flat" @click="EmailInputDisabled = false" :disabled="!EmailInputDisabled">Módosítás</v-btn>
                                <v-btn
                                :disabled="EmailInputDisabled || !userEmailInput || userNameInput === get_fullUser.email"
                                :loading="loading"
                                variant="flat"
                                @click="SendConfirmCode"
                                v-if="!ConfirmCode"
                                >
                                Mentés
                                </v-btn>
                              </div>
                            </div>
                          </div>
                        </v-fade-transition>

                        <v-fade-transition mode="out-in">
                          <div v-if="activePanel == 'PassSettingDraw'" class="w-100">
                            <h1 class="text-center">Jelszó változtatás</h1>

                            <div class="d-flex flex-column align-center my-5 ga-5 w-100">
                              <v-text-field
                              v-model="CurrentPasswordInput"
                              clearable
                              variant="outlined"
                              label="Jelenlegi jelszó"
                              style="width: 80%;"
                              ></v-text-field>
                              <v-text-field
                              v-model="NewPasswordInput"
                              clearable
                              variant="outlined"
                              label="Új jelszó"
                              style="width: 80%;"
                              :rules="[
                                (v) => (CurrentPasswordInput == '' || v != CurrentPasswordInput) || 'Nem lehet ugyan az a jelszó!',
                                (v) => (!v || v.length >= 8) || 'Minimum 8 karakteres jelszó kell.',
                                (v) => (!v || v.length <= 30) || 'Maximum 30 karakter lehet.'
                              ]"
                              ></v-text-field>
                              <v-text-field
                              v-model="NewPasswordConfirmInput"
                              clearable
                              variant="outlined"
                              label="Új jelszó megerősítése"
                              style="width: 80%;"
                              :rules="[
                                (v) => (!v || !NewPasswordInput || v == NewPasswordInput) || 'A jelszavak nem egyeznek.',
                              ]"
                              ></v-text-field>
                              <v-btn
                                :disabled="!CurrentPasswordInput || !NewPasswordInput || !NewPasswordConfirmInput || CurrentPasswordInput == NewPasswordInput || NewPasswordInput != NewPasswordConfirmInput || NewPasswordInput.length < 8 || NewPasswordInput.length > 30"
                                :loading="loading"
                                variant="flat"
                                @click="SendConfirmCode"
                                >
                                Mentés
                                </v-btn>
                            </div>
                          </div>
                        </v-fade-transition>

                        <v-fade-transition mode="out-in">
                          <div v-if="activePanel == 'NotifDraw'" class="h-100 d-flex flex-column justify-center">
                            <h1 class="text-center">Értesítések</h1>
                            <div style="border: .1vw solid rgb(var(--v-theme-text_color)); height: auto; min-height: 40vh; max-height: 40vh; overflow: auto;" class="rounded mb-5 mt-2 pt-2 px-2 ga-2 d-flex flex-column">
                              
                              <div v-for="notif in AllNotifs" v-bind:key="notif.id">
                                <div 
                                style="background-color: rgb(var(--v-theme-profile_bc));"
                                class="rounded py-2 px-2 d-flex align-center">
                                  <div style="width: 100%;" class="d-flex align-center mr-2">
                                    <v-icon size="25" class="mr-2">mdi-bell-badge-outline</v-icon>
                                    <h3 style="font-weight: normal;">{{ notif.notif_content }}</h3>
                                  </div>
                                  <v-divider vertical></v-divider>
                                  <div style="width: max-content;" class="ml-2"> 
                                    <div class="d-flex flex-row ga-2 align-center">
                                      <div 
                                      class="d-flex flex-row align-center pa-1 pr-3 rounded-xl" 
                                      style="width: max-content; background-color: rgb(var(--v-theme-community_posts_bc)); cursor: pointer;" 
                                      @click="router.push({ name: 'profile', params: { id: notif.ReportedUser.id } })">
                                        <img :src="notif.ReportedUser.User_customization.profil_picture == null ? '/src/components/background/test_profile.jpg' : notif.ReportedUser.User_customization.profil_picture"  alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                                        <h3 style="font-weight: normal;">{{ notif.ReportedUser.user_name }}</h3>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <v-slide-y-transition mode="out-in">
                                <div class="d-flex justify-center align-center"  v-if="AllNotifs.length == 0">
                                  <h2 style="font-weight: normal;" class="text-center">Jelenleg egy értesítésed sincs!</h2>
                                  <v-icon size="45" class="ml-4">mdi-emoticon-excited</v-icon>
                                </div>
                              </v-slide-y-transition>
                              <div class="d-flex justify-center mx-3 my-5" v-if="NotifsLoading">
                                <v-progress-circular indeterminate></v-progress-circular>
                              </div>
                            </div>
                          </div>
                        </v-fade-transition>

                        <v-fade-transition mode="out-in">
                          <div v-if="activePanel == 'UsersDraw'" class="w-100 h-100">
                            <h1 class="text-center mb-2">Felhasználók</h1>
                            <div 
                              class="d-flex"
                              :class="{
                                'flex-column mt-1': isMobile, 
                                'mt-5 ga-5 align-center': !isMobile
                              }"
                            >
                              <v-text-field
                                v-model="searchQuery"
                                label="Keresés"
                                clearable
                                icon="mdi-magnify"
                                variant="outlined"
                                :style="{width: isMobile ? '100%' : '40%'}"
                              >
                              </v-text-field>
                              <div
                              class="d-flex ga-2 position-relative" 
                              :class="{
                                'justify-space-around mb-2': isMobile, 
                              }"
                              :style="{top: !isMobile ? '-1rem' : ''}">
                                <v-btn elevation="0" @click="AdminType()" :style="{backgroundColor: adminTypeButton == 1 ? 'gray' : 'transparent'}">admin</v-btn>
                                <v-btn elevation="0" @click="ActivatedType(2)" :style="{backgroundColor: activatedTypeButton == 2 ? 'gray' : 'transparent'}">bannolt</v-btn>
                                <v-btn elevation="0" @click="ActivatedType(0)" :style="{backgroundColor: activatedTypeButton == 0 ? 'gray' : 'transparent'}">nem aktivált</v-btn>
                              </div>
                            </div>

                            <div style="border: .1vw solid rgb(var(--v-theme-text_color)); height: auto; min-height: 40vh; max-height: 40vh; overflow: auto;" class="rounded mb-5 mt-2 pt-2 px-2 d-flex flex-column adminUsers">
                              
                              <v-expansion-panels v-for="(user, index) in AllUsers" class="d-flex" elevation="0" style="position: relative;" @update:modelValue="handlePanelToggle">
                                <v-slide-y-transition mode="out-in">
                                  <v-expansion-panel style="background-color: rgb(var(--v-theme-profile_bc)); position: relative;" class="mb-2">
                                    <v-expansion-panel-title class="px-4 py-2">
                                      <div class="w-100 rounded position-relative align-center d-flex">
                                        <div class="d-flex flex-row ga-2 my-1 align-center">
                                          <v-tooltip location="right">
                                            <template v-slot:activator="{ props }">
                                              <div 
                                                v-bind="props" 
                                                class="d-flex flex-row align-center pa-1 pr-3 rounded-pill" 
                                                style="width: max-content; cursor: pointer; background-color: rgb(var(--v-theme-community_posts_bc));" 
                                              >
                                                <img 
                                                  :src="user.User_customization.profil_picture == null ? '/src/components/background/test_profile.jpg' : user.User_customization.profil_picture"  
                                                  alt="" 
                                                  style="height: 3rem; width: 3rem; border-radius: 50%;" 
                                                  class="mr-3"
                                                >
                                                <h2 style="font-weight: normal;">{{ user.user_name }}</h2>
                                              </div>
                                            </template>
                                            <span>{{ user.user_role }}</span>
                                          </v-tooltip>
                                        </div>
                                        <div style="position: absolute; right: 2vw; background-color: rgb(var(--v-theme-error), .2);" class="pa-2 rounded-pill" v-if="user.activated == 2">
                                          <h3 style="color: rgb(var(--v-theme-error));">KITíLTVA</h3>
                                        </div>
                                        <div style="position: absolute; right: 2vw; background-color: rgb(var(--v-theme-warning), .2);" class="pa-2 rounded-pill" v-if="user.activated == 0">
                                          <h3 style="color: rgb(var(--v-theme-warning));">NEM AKTIVÁLVA</h3>
                                        </div>
                                        <div style="position: absolute; right: 2vw; background-color: rgb(var(--v-theme-admin_bc), .2);" class="pa-2 rounded-pill" v-if="user.admin">
                                          <h3 style="color: rgb(var(--v-theme-admin_bc));">ADMIN</h3>
                                        </div>
                                      </div>
                                    </v-expansion-panel-title>
                                    <v-expansion-panel-text style="position: relative;">
                                      <h4 style="font-weight: normal;" class="mt-1 ml-2">Név megváltoztatás (A felhasználó névnek min. 6 és max. 24 karakter lehet!):</h4>
                                      <div 
                                      class="d-flex align-center ga-2 my-2"
                                      :class="{
                                        'flex-column mt-1': isMobile
                                      }"
                                      >
                                        <v-text-field v-model="users_UserName" :label="user.user_name" variant="outlined" hide-details :style="{width: isMobile ? '100%' : ''}"></v-text-field>
                                        <v-btn variant="flat" @click="setNewSetting(user,user.id, users_UserName, 1)" :disabled="!users_UserName">változtatás</v-btn>
                                      </div>
                                      <h4 style="font-weight: normal;" class="mt-1 ml-2">Email megváltoztatás (A felhasználó eamil címe max. 35 karakter lehet!):</h4>
                                      <div 
                                      class="d-flex align-center ga-2 my-2"
                                      :class="{
                                        'flex-column mt-1': isMobile
                                      }"
                                      >
                                        <v-text-field v-model="users_UserEmail" :label="user.email" variant="outlined" hide-details :style="{width: isMobile ? '100%' : ''}"></v-text-field>
                                        <v-btn variant="flat" @click="setNewSetting(user,user.id, users_UserEmail, 2)" :disabled="!users_UserEmail">változtatás</v-btn>
                                      </div>
                                      <h4 style="font-weight: normal;" class="ml-2">Jelszó megváltoztatás (A felhasználó jelszava min. 8 és max. 24 karakter lehet!):</h4>
                                      <div 
                                      class="d-flex align-center ga-2 my-2"
                                      :class="{
                                        'flex-column mt-1': isMobile
                                      }"
                                      >
                                        <v-text-field v-model="users_UserPassword" label="új jelszó..."variant="outlined" hide-details :style="{width: isMobile ? '100%' : ''}"></v-text-field>
                                        <v-btn variant="flat" @click="setNewSetting(user,user.id, users_UserPassword, 3)" :disabled="!users_UserPassword">változtatás</v-btn>
                                      </div>


                                      <div class="d-flex ga-5 pl-1 mt-10 position-relative">
                                        <v-tooltip location="top">
                                          <template v-slot:activator="{ props }">
                                            <div v-if="user.activated == 0" v-bind="props">
                                              <v-btn variant="flat" @click="setUserRoles(user, user.id, 1)">
                                                <v-icon size="25">mdi-account-check</v-icon>
                                              </v-btn>
                                            </div>
                                          </template>
                                          <span>AKTIVÁLÁS</span>
                                        </v-tooltip>

                                        <v-tooltip location="top">
                                          <template v-slot:activator="{ props }">
                                            <div v-if="user.activated != 2" v-bind="props">
                                              <v-btn variant="flat" @click="setUserRoles(user, user.id, 2)">
                                                <v-icon size="25">mdi-account-lock</v-icon>
                                              </v-btn>
                                            </div>
                                          </template>
                                          <span>KITILTÁS</span>
                                        </v-tooltip>

                                        <v-tooltip location="right">
                                          <template v-slot:activator="{ props }">
                                            <div v-if="user.activated == 2" v-bind="props">
                                              <v-btn variant="flat" @click="setUserRoles(user, user.id, 3)">
                                                <v-icon size="25">mdi-account-lock-open</v-icon>
                                              </v-btn>
                                            </div>
                                          </template>
                                          <span>KITILTÁS VISSZAVONÁSA</span>
                                        </v-tooltip>

                                        <v-tooltip location="right">
                                          <template v-slot:activator="{ props }">
                                            <div v-if="!user.admin && user.activated == 1" v-bind="props">
                                              <v-btn variant="flat" @click="setUserRoles(user, user.id, 4)">
                                                <v-icon size="25">mdi-key</v-icon>
                                              </v-btn>
                                            </div>
                                          </template>
                                          <span>ADMINNÁ AVATÁS</span>
                                        </v-tooltip>

                                        <v-tooltip location="right">
                                          <template v-slot:activator="{ props }">
                                            <div v-if="user.admin" v-bind="props">
                                              <v-btn variant="flat" @click="setUserRoles(user, user.id, 5)">
                                                <v-icon size="25">mdi-key-remove</v-icon>
                                              </v-btn>
                                            </div>
                                          </template>
                                          <span>ADMIN MEGVONÁS</span>
                                        </v-tooltip>

                                      </div>
                                    </v-expansion-panel-text>
                                  </v-expansion-panel>
                                </v-slide-y-transition>
                              </v-expansion-panels>
                              
                              <div class="d-flex justify-center mx-3 my-5" v-if="UsersLoading">
                                <v-progress-circular indeterminate></v-progress-circular>
                              </div>
                            </div>
                          </div>
                        </v-fade-transition>
                        
                        <v-fade-transition mode="out-in">
                          <div v-if="activePanel == 'AdminNotifDraw'" class="w-100 h-100">
                            <h1 class="text-center mt-2">Bejelentések</h1>

                            <div style="border: .1vw solid rgb(var(--v-theme-text_color)); height: auto; min-height: 45.9vh; max-height: 45.9vh; overflow: auto;" class="rounded mb-5 mt-2 pt-2 px-2 d-flex flex-column adminNotif">
                              
                              <v-slide-y-transition mode="out-in">
                                <div class="d-flex justify-center align-center"  v-if="AllReports.length == 0">
                                  <h2 style="font-weight: normal;" class="text-center">Jelenleg egy bejelentés sincs!</h2>
                                  <v-icon size="45" class="ml-4">mdi-emoticon-excited</v-icon>
                                </div>
                              </v-slide-y-transition>
                              
                              <v-expansion-panels v-for="(report, index) in AllReports" class="d-flex" elevation="0" style="position: relative;">
                                <v-slide-y-transition mode="out-in">
                                  <v-expansion-panel style="background-color: rgb(var(--v-theme-profile_bc)); position: relative;" class="mb-2" :disabled="report.closed != 0">
                                    <v-expansion-panel-title class="px-4 py-2">
                                      <div class="w-100 rounded position-relative align-center d-flex">
                                        <div>
                                          <div class="d-flex mb-2">
                                            <v-icon size="20" class="mr-2">mdi-flag-outline</v-icon>
                                            <h2 style="font-weight: normal;">{{ report.notif_content }}</h2>
                                          </div>
                                          <div class="d-flex align-center">
                                            <v-icon>mdi-gavel</v-icon>
                                            <div class="d-flex flex-row ga-2 pl-3 align-center">
                                              <div 
                                              class="d-flex flex-row align-center pa-1 pr-3 rounded-xl" 
                                              style="width: max-content; background-color: rgb(var(--v-theme-community_posts_bc)); cursor: pointer;" 
                                              @click="router.push({ name: 'profile', params: { id: report.ReportedUser.id } })">
                                                <img :src="report.ReportedUser.User_customization.profil_picture == null ? '/src/components/background/test_profile.jpg' : report.ReportedUser.User_customization.profil_picture"  alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                                                <h3 style="font-weight: normal;">{{ report.ReportedUser.user_name }}</h3>
                                              </div>
                                            </div>
                                            <v-icon class="ml-2">mdi-arrow-right</v-icon>
                                            <div class="d-flex flex-row ga-2 pl-3 align-center">
                                              <div 
                                              class="d-flex flex-row align-center pa-1 pr-3 rounded-xl" 
                                              style="width: max-content; background-color: rgb(var(--v-theme-community_posts_bc)); cursor: pointer;" 
                                              @click="router.push({ name: 'profile', params: { id: report.Reporter.id } })">
                                                <img :src="report.Reporter.User_customization.profil_picture == null ? '/src/components/background/test_profile.jpg' : report.Reporter.User_customization.profil_picture"  alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                                                <h3 style="font-weight: normal;">{{ report.Reporter.user_name }}</h3>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div style="position: absolute; right: 2vw;" v-if="report.closed != 0">
                                          <h3 style="color: rgb(var(--v-theme-success));">LEZÁRVA</h3>
                                        </div>
                                      </div>
                                    </v-expansion-panel-title>
                                    <v-expansion-panel-text style="position: relative;" v-if="!report.closed">
                                      <v-list style="background-color: transparent;" class="pa-0" v-if="report.reportedPost">
                                        <div>
                                          <div class="px-2 my-1 d-flex">
                                            <h3 class="mr-1">Poszt címe / létrehozási dátuma: </h3>
                                            <h3 style="font-weight: normal;">{{ report.reportedPost.title }}</h3>
                                            <v-divider vertical class="mr-2 ml-3"></v-divider>
                                            <h3 style="font-weight: normal;">{{ report.reportedPost.createdAt }}</h3>
                                            <v-divider vertical class="mx-2 ml-3" v-if="report.reportedPost.gotEdit"></v-divider>
                                            <h3 style="font-weight: normal;" v-if="report.reportedPost.gotEdit">[Szerkeztve]</h3>
                                          </div>

                                          <v-divider></v-divider>

                                          <div class="px-2 my-1">
                                            <h3>Poszt kontent: </h3>
                                            <div v-html="report.reportedPost.content" style="background-color: rgb(var(--v-theme-community_posts_bc));" class="py-2 px-2 mx-4 rounded"></div>
                                          </div>

                                          <v-divider v-if="report.reportedPost.tags.length > 0"></v-divider>

                                          <div class="px-2 my-2" v-if="report.reportedPost.tags.length > 0">
                                            <div class="d-flex flex-row align-items-center mr-2">
                                              <v-icon icon="mdi-label-multiple" class="mr-1" color="community_primary_color"></v-icon>
                                              <h3 class="font-weight-normal">Címkék</h3>
                                            </div>
                                            <div class="text-center d-flex flex-row flex-wrap align-center">
                                              <v-chip
                                                v-for="tag in report.reportedPost.tags"
                                                :key="tag"  
                                                class="mx-1 my-2"
                                                color="community_primary_color"
                                                variant="outlined"
                                              >
                                                <v-icon icon="mdi-tag-multiple" start></v-icon>
                                                <h3 style="font-weight: normal;">{{ tag }}</h3>
                                              </v-chip>
                                            </div>
                                          </div>

                                          <v-divider v-if="report.reportedPost.files.length > 0"></v-divider>

                                          <div class="mt-2" v-if="report.reportedPost.files.length > 0">
                                            <div class="d-flex flex-row align-items-center mr-2">
                                              <v-icon icon="mdi-file-multiple" class="mr-1" color="community_primary_color"></v-icon>
                                              <h3 class="font-weight-normal">Fájlok</h3>
                                            </div>
                                            <div v-for="(file, index) in report.reportedPost.files" :key="index">
                                              <v-card-text>
                                                <div class="d-inline-flex flex-column justify-center align-center">
                                                  <v-btn 
                                                    icon 
                                                    elevation="0" 
                                                    size="50"
                                                    @click="downloadFile(file.file)"
                                                    color="transparent"
                                                  >
                                                    <v-icon size="30">mdi-file</v-icon>
                                                  </v-btn>
                                                  <h3 style="font-weight: normal;">
                                                    {{ (file.dataValues.file_name) }}
                                                  </h3>
                                                  <h5 style="font-weight: normal;">
                                                    Méret: {{ formatFileSize(file.dataValues.file_size ) }}
                                                  </h5>
                                                </div>
                                              </v-card-text>
                                            </div>
                                          </div>

                                          <div class="d-flex justify-space-around my-3">
                                            <v-tooltip location="top">
                                              <template v-slot:activator="{ props }">
                                                <v-btn 
                                                  elevation="0" 
                                                  icon 
                                                  small
                                                  style="background-color: transparent;"
                                                  v-bind="props"
                                                  @click="ReportCloseOpen('ReportDelete')"
                                                >
                                                  <v-icon size="35">mdi-close-outline</v-icon>
                                                </v-btn>
                                              </template>
                                              <span style="font-size: larger;">Törlés</span>
                                            </v-tooltip>

                                            <v-tooltip location="top">
                                              <template v-slot:activator="{ props }">
                                                <v-btn 
                                                  elevation="0" 
                                                  icon 
                                                  small
                                                  style="background-color: transparent;"
                                                  v-bind="props"
                                                  @click="ReportCloseOpen('ReportAccept')"
                                                >
                                                  <v-icon size="35">mdi-check-circle-outline</v-icon>
                                                </v-btn>
                                              </template>
                                              <span style="font-size: larger;">Engedélyezés</span>
                                            </v-tooltip>
                                          </div>

                                          <v-expand-transition>
                                            <div v-if="ReportAccept || ReportDelete">
                                              <div>
                                                <v-text-field v-model="CloseMessage" label="Üzenet" variant="outlined" style="width: 100%;"></v-text-field>
                                              </div>
                                              <div class="d-flex justify-center">
                                                <v-slide-y-transition mode="out-in">
                                                  <v-btn 
                                                    elevation="0" 
                                                    text 
                                                    small
                                                    style="background-color: transparent; width: 40%;"
                                                    variant="flat"
                                                    :disabled="!CloseMessage"
                                                    v-if="ReportAccept"
                                                    @click="ReportClose(report, report.id, report.Reporter.id, report.reportedPost.id, report.content_type)"
                                                  >
                                                  Engedélyezés véglegesítése
                                                  </v-btn>

                                                  <v-btn 
                                                    elevation="0" 
                                                    text 
                                                    small
                                                    style="background-color: transparent; width: 40%;"
                                                    variant="flat"
                                                    :disabled="!CloseMessage"
                                                    v-if="ReportDelete"
                                                    @click="ReportClose(report, report.id, report.ReportedUser.id, report.reportedPost.id, report.content_type)"
                                                  >
                                                    Törlés véglegesítése
                                                  </v-btn>
                                                </v-slide-y-transition>
                                              </div>
                                            </div>
                                          </v-expand-transition>

                                        </div>
                                      </v-list>
                                      <v-list style="background-color: transparent;" class="pa-0" v-if="report.reportedComment">
                                        <div class="px-2 my-1 d-flex">
                                          <h3 class="mr-1">Poszt címe / létrehozási dátuma: </h3>
                                          <h3 style="font-weight: normal;">{{ report.reportedComment.title }}</h3>
                                          <v-divider vertical class="mr-2 ml-3"></v-divider>
                                          <h3 style="font-weight: normal;">{{ report.reportedComment.createdAt }}</h3>
                                          <v-divider vertical class="mx-2 ml-3" v-if="report.reportedComment.gotEdit"></v-divider>
                                          <h3 style="font-weight: normal;" v-if="report.reportedComment.gotEdit">[Szerkeztve]</h3>
                                        </div>

                                        <v-divider></v-divider>

                                        <div class="px-2 my-1">
                                          <h3>Comment kontent: </h3>
                                          <div v-html="report.reportedComment.content" style="background-color: rgb(var(--v-theme-community_posts_bc));" class="py-2 px-2 mx-4 rounded"></div>
                                        </div>

                                        <div class="d-flex justify-space-around my-3">
                                          <v-tooltip location="top">
                                            <template v-slot:activator="{ props }">
                                              <v-btn 
                                                elevation="0" 
                                                icon 
                                                small
                                                style="background-color: transparent;"
                                                v-bind="props"
                                                @click="ReportCloseOpen('ReportDelete')"
                                              >
                                                <v-icon size="35">mdi-close-outline</v-icon>
                                              </v-btn>
                                            </template>
                                            <span style="font-size: larger;">Törlés</span>
                                          </v-tooltip>

                                          <v-tooltip location="top">
                                            <template v-slot:activator="{ props }">
                                              <v-btn 
                                                elevation="0" 
                                                icon 
                                                small
                                                style="background-color: transparent;"
                                                v-bind="props"
                                                @click="ReportCloseOpen('ReportAccept')"
                                              >
                                                <v-icon size="35">mdi-check-circle-outline</v-icon>
                                              </v-btn>
                                            </template>
                                            <span style="font-size: larger;">Engedélyezés</span>
                                          </v-tooltip>
                                        </div>

                                        <v-expand-transition>
                                          <div v-if="ReportAccept || ReportDelete">
                                            <div>
                                              <v-text-field v-model="CloseMessage" label="Üzenet" variant="outlined" style="width: 100%;"></v-text-field>
                                            </div>
                                            <div class="d-flex justify-center">
                                              <v-slide-y-transition mode="out-in">
                                                <v-btn 
                                                  elevation="0" 
                                                  text 
                                                  small
                                                  style="background-color: transparent; width: 40%;"
                                                  variant="flat"
                                                  :disabled="!CloseMessage"
                                                  v-if="ReportAccept"
                                                  @click="ReportClose(report, report.id, report.Reporter.id, report.reportedComment.id, report.content_type)"
                                                >
                                                Engedélyezés véglegesítése
                                                </v-btn>

                                                <v-btn 
                                                  elevation="0" 
                                                  text 
                                                  small
                                                  style="background-color: transparent; width: 40%;"
                                                  variant="flat"
                                                  :disabled="!CloseMessage"
                                                  v-if="ReportDelete"
                                                  @click="ReportClose(report, report.id, report.ReportedUser.id, report.reportedComment.id, report.content_type)"
                                                >
                                                  Törlés véglegesítése
                                                </v-btn>
                                              </v-slide-y-transition>
                                            </div>
                                          </div>
                                        </v-expand-transition>
                                      </v-list>
                                      <div class="d-flex justify-center mx-3 my-5" v-if="ReportLoading">
                                        <v-progress-circular indeterminate></v-progress-circular>
                                      </div>
                                    </v-expansion-panel-text>
                                  </v-expansion-panel>
                                </v-slide-y-transition>
                              </v-expansion-panels>       
                            </div>

                          </div>
                        </v-fade-transition>
                                                                                
                        <v-fade-transition mode="out-in">
                          <div v-if="activePanel == 'AdminValidateDraw'" class="h-100 d-flex flex-column justify-center">
                            <h1 class="text-center">Feladatok</h1>
                            <div style="border: .1vw solid rgb(var(--v-theme-text_color)); height: auto; min-height: 40vh; max-height: 40vh; overflow: auto;" class="rounded mb-5 mt-2 pt-2 px-2 ga-2 d-flex flex-column">
                              
                              <div v-for="validate in AllValidate" v-bind:key="validate.id">
                                {{ validate }}
                              </div>

                              <v-slide-y-transition mode="out-in">
                                <div class="d-flex justify-center align-center" v-if="AllValidate.length == 0">
                                  <h2 style="font-weight: normal;" class="text-center">Jelenleg egy feladat se vár ellenőrzésre!</h2>
                                  <v-icon size="45" class="ml-4">mdi-emoticon-excited</v-icon>
                                </div>
                              </v-slide-y-transition>
                              <div class="d-flex justify-center mx-3 my-5" v-if="ValidateLoading">
                                <v-progress-circular indeterminate></v-progress-circular>
                              </div>
                            </div>
                          </div>
                        </v-fade-transition>

                        <v-expand-transition mode="out-in">
                          <div v-if="ConfirmCode && ResponseContent == null" class="text-center mt-4">
                            <h4 style="font-weight: normal;">A megerősítő kód el lett küldve email-ben!</h4>
                            <v-otp-input v-model="otpCode" length="6"></v-otp-input>
                          </div>
                        </v-expand-transition>

                        <v-expand-transition mode="out-in">
                          <div v-if="ResponseContent != null" class="text-center mt-4">
                            <h2>{{ ResponseContent }}</h2>
                          </div>
                        </v-expand-transition>

                        <v-expand-transition mode="out-in">
                          <div v-if="ResponseError != null" class="text-center my-4">
                            <v-icon size="50" color="red">mdi-alert</v-icon>
                            <h2 style="color: red;">{{ ResponseError }}</h2>
                          </div>
                        </v-expand-transition>

                      </div>
                    </v-slide-y-transition>
                  </div>
                  </v-main>
                </v-layout>
                <v-divider></v-divider>
                <v-card-actions>
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
import { onMounted, ref, shallowRef, computed, inject, watch  } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProfileGetUser, useProfileDarkmodeSwitch } from '@/api/profile/profileQuery'
import { useGetSettingsConfirm, useSetSettings, useGetAllReports, useCloseReport, useGetAllUser, useSetUserNewSettings, useSetUserRoles, useGetAllNotifs } from '@/api/settings-confirm/settingsConfirmQuery'
import { useTheme, useDisplay } from 'vuetify';

// Képernyő méret / eszköz
const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);
watch(isMobile, async (newValue) => {
  SettingsMenu.value = newValue;
});

// Router és route hookok
const { currentRoute } = useRouter()
const router = useRouter();
const route = useRoute();

// Üzenetkezelés
const showError = inject("showError");
const showSucces = inject("showSucces");

// <------- Változók ------->
const dialog = shallowRef(false)
var get_user_by_token = (getCookie('user') != null && getCookie('user') != 'undefined' && typeof getCookie('user') != "object") ? getCookie('user') : null;
const ProfSettingDraw = ref(true);
const EmailSettingDraw = ref(false);
const PassSettingDraw = ref(false);
const NotifDraw = ref(false);
const UsersDraw = ref(false);
const AdminNotifDraw = ref(false);
const AdminValidateDraw = ref(false);
const activePanel = ref('ProfSettingDraw');
const ProfInputDisabled = ref(true);
const EmailInputDisabled = ref(true);
const ConfirmCode = ref(false);
const userNameInput = ref('');
const userEmailInput = ref('');
const CurrentPasswordInput = ref('');
const NewPasswordInput = ref('');
const NewPasswordConfirmInput = ref('');
const otpCode = ref(null);
const ResponseContent = ref(null);
const ResponseError = ref(null);
const ReportLoading = ref(false);
const UsersLoading = ref(false);
const NotifsLoading = ref(false);
const ValidateLoading = ref(false);
const SettingsMenu = ref(false);
const ReportDelete = ref(false);
const ReportAccept = ref(false);
const CloseMessage = ref('');
const searchQuery = ref('');
const users_UserName = ref('');
const users_UserEmail = ref('');
const users_UserPassword = ref('');
const loading = ref(false);
const AllNotifs = ref([]);
const AllValidate = ref([]);
const AllUsers = ref([]);
var timeout = null;
const activatedTypeButton = ref(null);
const adminTypeButton = ref(null);
const AllReports = ref([]);const get_fullUser = ref(null);
const get_fullUser_customs = ref(null);
const get_user_name = ref(null);
const ProfImage = ref(null);
const theme = useTheme();
const DarkmodeChange = ref(false);
const profileImage = ref("");
const drawer = ref(false);
const group = ref(null);
const currentFont = ref("Roboto");
const currentTextIndex = ref(0);
const displayedText = ref("");
const textList = ref([
  "Math Solve", "A megoldásod", "Tanulj matematikát", "Újragondolt matematika", 
  "A számok nem hazudnak", "Gyors megoldás", "Mesteri matematika", 
  "Matematika mágia"
]);
const fonts = ref([
  "Roboto", "Montserrat", "Poppins", "Pacifico", "Lato", "Open Sans", "Oswald", 
  "Raleway", "Playfair Display", "Merriweather", "Ubuntu", "Roboto Slab", 
  "Slabo 27px", "Fira Sans"
]);

// <------- Változók ------->

// <------- Api hívások ------->

// Api hívás - felhasználói profil lekérése
const { mutate: ProfileGetUser } = useProfileGetUser()

// Api hívás - összes értesítés lekérése
const { mutate: getAllNotifs } = useGetAllNotifs()

// Api hívás - összes felhasználó lekérése
const { mutate: getAllUser } = useGetAllUser()

// Api hívás - felhasználói beállítások módosítása
const { mutate: setUserNewSettings } = useSetUserNewSettings()

// Api hívás - felhasználói szerepek módosítása
const { mutate: setNewUserRoles } = useSetUserRoles()

// Api hívás - összes jelentés lekérése
const { mutate: getAllReports } = useGetAllReports()

// Api hívás - jelentés lezárása
const { mutate: closeReport } = useCloseReport()

// Api hívás - beállítások megerősítése
const { mutate: getSettingsConfirm } = useGetSettingsConfirm()

// Api hívás - felhasználói beállítások módosítása
const { mutate: setNewSettings } = useSetSettings()

// Api hívás - sötét mód beállítása a felhasználó számára
const { mutate: ProfileDarkMode } = useProfileDarkmodeSwitch()

// <------- Api hívások ------->  

// <------- Függvények | figyelők ------->

watch(group, () => {
  drawer.value = false;
});

const toggleDrawer = (activePanelName) => {
  const panels = ['ProfSettingDraw', 'EmailSettingDraw', 'PassSettingDraw', 'NotifDraw', 'UsersDraw', 'AdminNotifDraw', 'AdminValidateDraw'];
  panels.forEach(panel => { eval(`${panel}.value = false`) });
  eval(`${activePanelName}.value = true`);
  activePanel.value = activePanelName;

  ResponseContent.value = null;
  ResponseError.value = null;
  userNameInput.value = '';
  userEmailInput.value = '';
  CurrentPasswordInput.value = '';
  NewPasswordInput.value = '';
  NewPasswordConfirmInput.value = '';
  
  ProfInputDisabled.value = true;
  EmailInputDisabled.value = true;
  ConfirmCode.value = false;
  loading.value = false;
};

const ProfSettingsActive = () => toggleDrawer('ProfSettingDraw');

const EmailSettingsActive = () => toggleDrawer('EmailSettingDraw');

const PassSettingsActive = () => toggleDrawer('PassSettingDraw');

const NotifActive = async () => {
  toggleDrawer('NotifDraw');
  NotifsLoading.value = true;
  await getAllNotifs({ id: get_fullUser.value.id }, {
    onSuccess: (response) => {
      AllNotifs.value = response;
      NotifsLoading.value = false;
    },
    onError: (error) => {
      console.log(error.response.data);
      NotifsLoading.value = false;
    }
  });
};

const UsersActive = async () => {
  toggleDrawer('UsersDraw');
  await fetchUsers(handleSearchParams());
};

const AdminNotifActive = async () => {
  toggleDrawer('AdminNotifDraw');
  ReportLoading.value = true;
  await getAllReports(get_user_by_token, {
    onSuccess: (response) => {
      response.forEach((post) => {
        if (post.reportedPost) {
          postsConvertToDisplay(post);
        } else {
          const createdAt = post.reportedComment.createdAt.split('T');
          post.reportedComment.createdAt = `${createdAt[0]} ${createdAt[1].split('.')[0].split(':')[0]}:${createdAt[1].split('.')[0].split(':')[1]}`;
          AllReports.value.push(post);
        }
      });
      ReportLoading.value = false;
    },
    onError: (error) => {
      if (showError) showError(error.response.data);
      else console.log(error.response.data);
      ReportLoading.value = false;
    }
  });
};

const AdminValidateActive = () => toggleDrawer('AdminValidateDraw');

function handlePanelToggle(){
 users_UserName.value = ''; 
 users_UserEmail.value = ''; 
 users_UserPassword.value = '';
}

const setNewSetting = async (user, id, model, type) => {
  const updateUser = (response) => {
    if (type === 1) {
      user.user_name = response;
      if (user.id === get_fullUser.value.id) {
        get_fullUser.value.user_name = response;
        get_user_name.value = response;
      }
    } else if (type === 2) {
      user.email = response;
    } else if (type === 3) {
      user.password = response;
    }
  };

  await setUserNewSettings({ content: model, id, type, token: get_user_by_token }, {
    onSuccess: (response) => {
      updateUser(response);
      handlePanelToggle();
    },
    onError: (error) => {
      showError ? showError(error.response.data) : console.log(error.response.data);
    }
  });
};

const setUserRoles = async (user, id, type) => {
  const updateUser = (role, activated, admin) => {
    user.user_role = role;
    user.activated = activated;
    user.admin = admin;
    if (get_fullUser.value.id === id && (type === 2 || type === 5)) {
      deleteCookie('user');
    }
  };

  await setNewUserRoles({ id, type, token: get_user_by_token }, {
    onSuccess: () => {
      if (type === 1) updateUser('member', 1, 0);
      else if (type === 2) updateUser('banned', 2, 0);
      else if (type === 3) updateUser('member', 1, 0);
      else if (type === 4) updateUser('admin', 1, 1);
      else if (type === 5) updateUser('member', 1, 0);
    },
    onError: (error) => showError ? showError(error.response.data) : console.log(error.response.data),
  });
};

function AdminType() {
  adminTypeButton.value = adminTypeButton.value === null ? 1 : null;
}

function ActivatedType(number) {
  activatedTypeButton.value = activatedTypeButton.value === number ? null : number;
}

const fetchUsers = async (params) => {
  UsersLoading.value = true;
  await getAllUser(params, {
    onSuccess: (response) => {
      AllUsers.value = response;
      UsersLoading.value = false;
    },
    onError: (error) => {
      if (showError) showError(error.response.data);
      else console.log(error.response.data);
      UsersLoading.value = false;
    }
  });
};

const handleSearchParams = () => ({
  name: searchQuery.value || null,
  activated_type: activatedTypeButton.value,
  admin: adminTypeButton.value,
  token: get_user_by_token
});

watch([activatedTypeButton, adminTypeButton], async () => {
  await fetchUsers(handleSearchParams());
});

watch(searchQuery, async (newValue) => {
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    await fetchUsers(handleSearchParams());
  }, 300);
});

const postsConvertToDisplay = (array) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = array.reportedPost.content;

  const createdAt = array.reportedPost.createdAt.split('T');
  array.reportedPost.createdAt = `${createdAt[0]} ${createdAt[1].split('.')[0].slice(0, 5)}`;

  tempDiv.querySelectorAll("img").forEach((img) => {
    const id = Number(img.id) - 1;
    const imgUrl = array.reportedPost.images[id];
    if (imgUrl) img.setAttribute("src", imgUrl.url || imgUrl.file);
  });

  array.reportedPost.content = tempDiv.innerHTML;
  AllReports.value.push(array);
};

const downloadFile = (file) => {
  try {
    const url = URL.createObjectURL(dataURLtoBlob(file.file));
    const link = document.createElement('a');
    link.href = url;
    link.download = file.file_name || 'file';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Fájl letöltési hiba:', error);
  }
};

const formatFileSize = (size) => {
  if (!size) return 'Ismeretlen méret';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return `${(size / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
};

const dataURLtoBlob = (dataURL) => {
  const [header, base64] = dataURL.split(',');
  const mime = header.match(/:(.*?);/)[1];
  const binary = atob(base64);
  const array = Array.from(binary, (char) => char.charCodeAt(0));
  return new Blob([new Uint8Array(array)], { type: mime });
};

const ReportCloseOpen = (model) => {
  ReportAccept.value = model === 'ReportAccept';
  ReportDelete.value = model !== 'ReportAccept';
};

const ReportClose = async (report, report_id, user_id, content_id, content_type) => {
  ReportLoading.value = true;
  const closeData = {
    id: report_id, user_id, admin_id: get_fullUser.value.id, 
    content: CloseMessage.value, 
    content_id: ReportDelete.value ? content_id : null, 
    content_type: ReportDelete.value ? content_type : null, 
    token: get_user_by_token
  };
  await closeReport(closeData, {
    onSuccess: () => {
      report.closed = true;
      ReportLoading.value = false;
    },
    onError: (error) => {
      showError ? showError(error.response.data) : console.log(error.response.data);
      ReportLoading.value = false;
    }
  });
};

const SendConfirmCode = async () => {
  loading.value = true;
  await getSettingsConfirm({email: get_fullUser.value.email, user_name: get_user_name.value, id: get_fullUser.value.id}, {
    onSuccess: (response) => {
      ConfirmCode.value = true;
      loading.value = false;
    },
    onError: (error) => {
      if (showError) {
        showError(error.response.data);
      }else{
        console.log(error.response.data);
      }
    },
  });
}

watch(otpCode, async (newVal) => {
  if (newVal?.length === 6) {
    ResponseError.value = null;
    const content = ProfSettingDraw.value ? [userNameInput.value] : 
                    EmailSettingDraw.value ? [userEmailInput.value] : 
                    PassSettingDraw.value ? [CurrentPasswordInput.value, NewPasswordInput.value, get_fullUser.value.password] : [];

    await setNewSettings({
      content, code: newVal, id: get_fullUser.value.id, type: activePanel.value
    }, {
      onSuccess: (response) => {
        otpCode.value = null;
        const messages = {
          ProfSettingDraw: "A fiók név sikeresen meg lett változtatva!",
          EmailSettingDraw: "A fiókhoz tartozó e-mail sikeresen meg lett változtatva!",
          PassSettingDraw: "A fiókhoz tartozó jelszó sikeresen meg lett változtatva!"
        };
        ResponseContent.value = messages[activePanel.value];
        if (activePanel.value === 'ProfSettingDraw') {
          get_fullUser.value.user_name = response;
          get_user_name.value = response;
        } else if (activePanel.value === 'EmailSettingDraw') {
          get_fullUser.value.email = response;
        } else if (activePanel.value === 'PassSettingDraw') {
          get_fullUser.value.password = response;
        }
      },
      onError: (error) => showError?.(error.response.data) ?? console.log(error.response.data),
    });
  }
});

onMounted(async () => {
  if (get_user_by_token) {
    try {
      await ProfileGetUser({ token: get_user_by_token, id: 0 }, {
        onSuccess: (get_user) => {
          get_fullUser.value = get_user;
          get_user_name.value = get_user.user_name;
          get_fullUser_customs.value = get_user.User_customization;
          ProfImage.value = get_fullUser_customs.value.profil_picture ?? ProfImage.value;
        },
        onError: () => getCookie('user') && deleteCookie('user'),
      });
    } catch (error) {
      console.error('Hiba történt a felhasználó lekérésekor:', error);
    }
  }

  typeAndSwitchFont();
  if (isMobile.value) SettingsMenu.value = true;
});

const typeAndSwitchFont = async () => {
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  while (true) {
    const text = textList.value[currentTextIndex.value];
    displayedText.value = "";
    for (let i = 0; i < text.length; i++) {
      displayedText.value += text[i];
      await sleep(100);
    }

    await sleep(2000);
    for (let i = text.length; i >= 0; i--) {
      displayedText.value = text.substring(0, i);
      await sleep(100);
    }

    currentTextIndex.value = (currentTextIndex.value + 1) % textList.value.length;
    currentFont.value = fonts.value[Math.floor(Math.random() * fonts.value.length)];
  }
};

watch(get_fullUser, (newUser) => {
  if (newUser) {
    DarkmodeChange.value = newUser.User_customization.darkmode;
    theme.global.name.value = DarkmodeChange.value ? 'darkTheme' : 'lightTheme';
    handleProfilePic();
  }
});

const handleDarkmodeSwitch = async () => {
  DarkmodeChange.value = !DarkmodeChange.value;
  theme.global.name.value = DarkmodeChange.value ? 'darkTheme' : 'lightTheme';

  if (get_fullUser.value) {
    try {
      await ProfileDarkMode({ id: get_fullUser.value.id, darkmode: DarkmodeChange.value, type: 4 });
    } catch (error) {
      console.error('Hiba történt a sötét mód váltásakor:', error);
    }
  }
};

const handleProfilePic = () => {
  const base64Image = get_fullUser_customs.value.profil_picture;
  if (base64Image) profileImage.value = base64Image;
};

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
  window.location.reload();
  deleteCookie('user');
  get_user_by_token = null;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// <------- Függvények | figyelők ------->
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

.custom-drawer-btn, .custom-drawer-btn h4{
  transition: .3s;
}
.custom-drawer-btn:hover{
  background-color: rgb(var(--v-theme-secondary), .3);
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

.adminUsers, .adminNotif{
  transition: .3s;
}

.adminUsers::-webkit-scrollbar, .adminNotif::-webkit-scrollbar {
  width: 8px; /* Görgetősáv szélessége */
}

.adminUsers::-webkit-scrollbar-track, .adminNotif::-webkit-scrollbar-track {
  background: transparent; /* Háttérszín */
  border-radius: 10px;
}

.adminUsers::-webkit-scrollbar-thumb, .adminNotif::-webkit-scrollbar-thumb {
  background: rgb(var(--v-theme-profile_bc)); /* Görgetősáv színe */
  border-radius: 10px;
}

.adminUsers::-webkit-scrollbar-thumb:hover ,  .adminNotif::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.7);
}

</style>