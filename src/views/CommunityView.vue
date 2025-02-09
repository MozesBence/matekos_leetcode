<template>
  <main>
    <v-container fluid class="d-flex justify-end" style="margin-right: 0; width: 100%;" :style="{maxWidth: isMobile ? '100%' : '75%'}">
      <v-navigation-drawer style="height: max-content; max-width: 35%; width: 100%;" class="ma-2 ml-3 mt-4 rounded" v-if="!isMobile">
        <v-list>
          <v-list-item>
            <div class="d-flex align-center justify-center ga-2 pa-2">
              <v-text-field
                v-model="searchQuery"
                label="Keresés"
                clearable
                @keyup.enter="search"
                icon="mdi-magnify"
                variant="outlined"
                hide-details
              >
              </v-text-field>
              <v-btn v-if="get_fullUser != null" icon elevation="0" @click="CreatePostOpen()">
                <v-icon size="30">mdi-pencil</v-icon>
              </v-btn>
            </div>
            <div>
              <v-card
                class="mx-2 rounded custom_searchCard"
                elevation="0"
                style="transition: .3s;"
                :style="{border: FilterOpt.length > 0 ? '.1vw solid rgb(var(--v-theme-community_createpost_editor_area_border))' : '.1vw solid gray'}"
              >
                <v-card-text>
                  <h2 class="text-h6 mb-2">Szűrési opciók</h2>
                  <v-chip-group
                    v-model="FilterOpt"
                    multiple
                    column
                    style="transition: .3s;"
                  >
                    <v-chip
                      v-for="chip in FilterChips"
                      :key="chip"
                      :text="chip"
                      variant="outlined"
                      filter
                      class="mr-2 chip"
                      :class="{'selected-chip': FilterOpt.includes(FilterChips.indexOf(chip))}"
                    ></v-chip>
                  </v-chip-group>
                </v-card-text>
              </v-card>
            </div>
            <div 
            class="mt-2 mx-2 d-flex pa-2 flex-column justify-center rounded PopDate"
            style="transition: .3s;"
            :style="{border: sortOptions.length > 0 ? '.1vw solid rgb(var(--v-theme-community_createpost_editor_area_border))' : '.1vw solid gray'}"
            >
              <div>
                <v-btn-toggle
                  style="width: 100%;"
                  elevation="0"
                >
                  <v-btn 
                    :value="'popularity'" 
                    style="width: 50%; transition: .3s;"
                    :style="{backgroundColor: sortOptions.includes('popularity') ? 'rgb(var(--v-theme-community_filter_bc))' : 'transparent'}"
                    variant="flat"
                    @click="toggleOption('popularity')"
                    elevation="0"
                  >
                    <v-icon class="mr-1">mdi-fire</v-icon>
                    <h4 style="font-weight: normal;">Népszerűség</h4>
                  </v-btn>
                  <v-btn 
                    :value="'date'" 
                    style="width: 50%; transition: .3s;"
                    :style="{backgroundColor: sortOptions.includes('date') ? 'rgb(var(--v-theme-community_filter_bc))' : 'transparent'}"
                    variant="flat"
                    @click="toggleOption('date')"
                    elevation="0"
                  >
                    <v-icon class="mr-1">mdi-calendar-clock</v-icon>
                    <h4 style="font-weight: normal;">Feltöltés dátuma</h4>
                  </v-btn>
                </v-btn-toggle>
              </div>

              <div>
                <v-expand-transition class="mt-1">
                  <div v-if="sortOptions.includes('date') || sortOptions.includes('popularity')">
                    <v-btn-toggle
                      v-model="sortOptionForPop" 
                      style="width: 100%; height: fit-content;"
                    >
                      <v-btn value="popularity"
                      style="width: 50%; height: max-content;"
                      class="py-2"
                      >
                        <v-icon class="mr-1">mdi-sort-descending</v-icon>
                        <h5>Növekvő</h5>
                      </v-btn>
                      <v-btn 
                      value="date" 
                      style="width: 50%; height: max-content;"
                      class="py-2"
                      >
                        <v-icon class="mr-1">mdi-sort-ascending</v-icon>
                        <h5>Csökkenő</h5>
                      </v-btn>
                    </v-btn-toggle>
                  </div>
                </v-expand-transition>
              </div>
            </div>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
        <v-row>
          <v-col
          v-if="isMobile"
          :cols="isMobile ? 12 : 0"
          class="order-0 order-md-0"
          >
            <v-expansion-panels v-if="isMobile">
              <v-expansion-panel>
                <v-expansion-panel-title>Keresési lehetőségek</v-expansion-panel-title>
                <v-expansion-panel-text class="mobilExpensionText">
                  <v-list>
                    <v-list-item>
                      <div class="pa-2 d-flex align-center justify-center ga-3">
                        <v-text-field
                          v-model="searchQuery"
                          label="Keresés"
                          clearable
                          @keyup.enter="search"
                          icon="mdi-magnify"
                          variant="outlined"
                          hide-details
                        >
                        </v-text-field>
                        <v-btn v-if="get_fullUser != null" icon elevation="0" @click="CreatePostOpen()">
                          <v-icon size="30">mdi-pencil</v-icon>
                        </v-btn>
                      </div>
                      <div>
                        <v-card
                          class="mx-2 rounded"
                          elevation="0"
                          style="transition: .3s;"
                          :style="{border: FilterOpt.length > 0 ? '.1vw solid rgb(var(--v-theme-community_createpost_editor_area_border))' : '.1vw solid gray'}"
                        >
                          <v-card-text>
                            <h2 class="text-h6 mb-2">Szűrési opciók</h2>
                            <v-chip-group
                              v-model="FilterOpt"
                              multiple
                              column
                            >
                              <v-chip
                                v-for="chip in FilterChips"
                                :key="chip"
                                :text="chip"
                                variant="outlined"
                                filter
                                class="mr-2"
                                style="border: .1vw solid gray; color: gray; transition: .3s;"
                                :class="{'selected-chip': FilterOpt.includes(FilterChips.indexOf(chip))}"
                              ></v-chip>
                            </v-chip-group>
                          </v-card-text>
                        </v-card>
                      </div>
                      <div 
                      class="mt-2 mx-2 d-flex pa-2 flex-column justify-center rounded" 
                      :style="{border: sortOptions.length > 0 ? '.1vw solid rgb(var(--v-theme-community_createpost_editor_area_border))' : '.1vw solid gray'}"
                      >
                        <div>
                          <v-btn-toggle
                            style="width: 100%;"
                            elevation="0"
                          >
                            <v-btn 
                              :value="'popularity'" 
                              style="width: 50%; transition: .3s;"
                              :style="{backgroundColor: sortOptions.includes('popularity') ? 'rgb(var(--v-theme-community_filter_bc))' : 'transparent'}"
                              variant="flat"
                              @click="toggleOption('popularity')"
                              elevation="0"
                            >
                              <v-icon class="mr-1">mdi-fire</v-icon>
                              <h5 style="font-weight: normal;">Népszerűség</h5>
                            </v-btn>
                            <v-btn 
                              :value="'date'" 
                              style="width: 50%; transition: .3s;"
                              :style="{backgroundColor: sortOptions.includes('date') ? 'rgb(var(--v-theme-community_filter_bc))' : 'transparent'}"
                              variant="flat"
                              @click="toggleOption('date')"
                              elevation="0"
                            >
                              <v-icon class="mr-1">mdi-calendar-clock</v-icon>
                              <h5 style="font-weight: normal;">Feltöltés dátuma</h5>
                            </v-btn>
                          </v-btn-toggle>
                        </div>

                        <div>
                          <v-expand-transition class="mt-1">
                            <div v-if="sortOptions.includes('date') || sortOptions.includes('popularity')">
                              <v-btn-toggle
                                v-model="sortOptionForPop" 
                                style="width: 100%; height: fit-content;"
                              >
                                <v-btn value="popularity"
                                style="width: 50%; height: max-content;"
                                class="py-2"
                                >
                                  <v-icon class="mr-1">mdi-sort-descending</v-icon>
                                  <h5>Növekvő</h5>
                                </v-btn>
                                <v-btn 
                                value="date" 
                                style="width: 50%; height: max-content;"
                                class="py-2"
                                >
                                  <v-icon class="mr-1">mdi-sort-ascending</v-icon>
                                  <h5>Csökkenő</h5>
                                </v-btn>
                              </v-btn-toggle>
                            </div>
                          </v-expand-transition>
                        </div>
                      </div>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>

          <!-- Középső rész: Posztok -->
          
          <v-col
          cols="12"
          class="order-1 order-md-1"
          >
            <transition-group 
            name="fade"
            appear
            >
            <v-card
              v-for="post in posts"
              :key="post.id"
              class="mb-4 pt-2"
              fade
            >
              <div class="d-flex flex-row ga-2 pl-3 align-center" color="community_primary_color">
                <div 
                class="d-flex flex-row align-center pa-1 pr-2 rounded-xl" 
                style="width: max-content; background-color: rgb(var(--v-theme-community_comment_bc)); cursor: pointer;" 
                @click="router.push({ name: 'profile', params: { id: post.User.id } })">
                  <img :src="post.User.User_customization.profil_picture == null ? '/src/components/background/test_profile.jpg' : post.User.User_customization.profil_picture"  alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                  <h4 style="font-weight: normal;">{{ post.user_name }}</h4>
                </div>
                <h5 style="font-weight: normal;">{{ post.createdAt }}</h5>
                <h5 v-if="post.gotEdit" style="font-weight: normal;">[Szerkeztve]</h5>
              </div>

              <v-card-title>
                <div>
                  {{ post.title }}
                </div>
              </v-card-title>

              <v-card-text>
                <div v-html="post.content">
                </div>
              </v-card-text>
                <transition-group name="expand-transition" tag="div" class="d-flex ga-2">
                  <div v-if="post.files.length > 0" v-for="(file, index) in post.files" :key="index">
                    <v-card-text class="mb-3">
                      <div class="d-inline-flex flex-column justify-center align-center">
                        <v-btn 
                          icon 
                          elevation="0" 
                          size="50"
                          @click="downloadFile(file)"
                        >
                          <v-icon size="30">mdi-file</v-icon>
                        </v-btn>
                        <h3 style="font-weight: normal;">
                          {{ (file.name == undefined ? file.file_name : file.name) }}
                        </h3>
                        <h5 style="font-weight: normal;">
                          Méret: {{ formatFileSize(file.size == undefined ? file.file_size : file.size) }}
                        </h5>
                      </div>
                    </v-card-text>
                  </div>
                </transition-group>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-btn icon @click="like(post,'post')">
                    <v-icon color="red">{{ post.userReaction == 'like' ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                    {{ post.like > 0 ? post.like : null }}
                  </v-btn>
                  <v-btn icon @click="dislike(post,'post')">
                    <v-icon color="purple">{{ post.userReaction == 'dislike' ? 'mdi-heart-broken' : 'mdi-heart-broken-outline' }}</v-icon>
                    {{ post.dislike > 0 ? post.dislike : null }}
                  </v-btn>
                  <v-btn icon color="community_primary_color" @click="post.showComments = !post.showComments" class="rounded-circle" v-if="(post.total_comments) > 0">
                    <v-icon> {{ post.showComments ? "mdi-comment-text" : "mdi-comment-text-outline" }} </v-icon>
                    {{ post.total_comments }}
                  </v-btn>
                  <v-btn text color="community_primary_color" @click="post.showComments = true">
                    Válasz
                  </v-btn>
                  <v-btn v-if="post.user_name == get_UserName && !post.editable" text elevation="0" @click="EditPostOpen(post)">
                    Módosítás
                  </v-btn>
                </v-card-actions>
                <!-- Komment szekció -->
                <v-expand-transition>
                  <div v-if="post.showComments">
                    <!-- Új komment -->
                    <div class="position-relative mx-4 pa-2">
                      <div class="d-flex flex-row align-center mb-3 pa-1 pr-2 rounded-xl" style="width: max-content; background-color: rgb(var(--v-theme-community_comment_bc));">
                        <img :src="post.User.User_customization.profil_picture == null ? '/src/components/background/test_profile.jpg' : post.User.User_customization.profil_picture" alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                        <h4 style="font-weight: normal;">{{ get_UserName }}</h4>
                      </div>
                      <div>
                        <v-textarea
                          v-model="post.newComment"
                          label="Válaszod"
                          hide-details
                          variant="outlined"
                          rows="1"
                          style="min-height: min-content; width: 100%;"
                        ></v-textarea>
                        <div class="d-flex pa-2 pl-0 ga-2">
                          <v-btn
                            :disabled="post.newComment == ''" 
                            :style="post.newComment == '' ? 'background-color: rgb(var(--v-theme-community_posts_bc)) !important; color: darkgray !important;' : ''"
                            color="transparent"
                            elevation="0"
                            small
                            @click="addCommentToPost(post)"
                          >
                            Küldés
                          </v-btn>
                          <v-btn
                            color="transparent"
                            elevation="0"
                            small
                            v-if="post.total_comments == 0"
                            @click="post.showComments = false"
                          >
                            Mégse
                          </v-btn>
                        </div>
                      </div>
                    </div>
                    
                    <v-divider class="my-2" v-if="post.total_comments > 0"></v-divider>
                    <!-- Kommentek listája -->
                    <div v-for="(comment, index) in limitedComments(post)" :key="comment.id" class="d-flex flex-column rounded-lg ma-4 pt-3" style="background-color: rgb(var(--v-theme-community_comment_bc));">
                      <transition-group name="expand-transition" tag="div">
                        <div class="d-flex flex-column pl-2 position-relative" :key="comment.id">
                          <div class="d-flex ga-2 align-center">
                            <div 
                              class="d-flex flex-row align-center mb-1 pa-1 pr-2 rounded-xl" 
                              style="width: max-content; background-color: rgb(var(--v-theme-community_posts_bc)); cursor: pointer;"
                              @click="router.push({ name: 'profile', params: { id: comment.User.id } })"
                            >
                              <img 
                                :src="comment.User.User_customization.profil_picture == null 
                                  ? '/src/components/background/test_profile.jpg' 
                                  : comment.User.User_customization.profil_picture" 
                                alt="" 
                                style="height: 2rem; width: 2rem; border-radius: 50%;" 
                                class="mr-3"
                              >
                              <h4 style="font-weight: normal;">{{ comment.user_name }}</h4>
                            </div>
                            <h5 style="font-weight: normal;">{{ comment.createdAt }}</h5>
                          </div>

                          <div class="mt-2">
                            <v-expand-transition>
                              <div v-if="!comment.editable" class="d-flex align-center">
                                <h3 class="pa-2 pl-4 mr-2" style="font-weight: normal;">
                                  {{ comment.linkAuthor }} {{ comment.content }}
                                </h3>
                                <h5 v-if="comment.gotEdit" style="font-weight: normal;">[Szerkesztve]</h5>
                              </div>
                            </v-expand-transition>

                            <v-expand-transition>
                              <v-text-field
                                v-if="comment.editable"
                                type="text"
                                elevation="0"
                                hide-details
                                variant="solo-inverted" 
                                v-model="comment.content"
                                class="custom-solo-inverted mr-2"
                                :id="'commentId' + post.id+''+ index"
                              ></v-text-field>
                            </v-expand-transition>
                          </div>
                        </div>
                      </transition-group>
                      <div class="ml-1">
                        <v-btn icon @click="like(comment,'comment')" elevation="0" style="background-color: transparent;">
                          <v-icon color="red">{{ comment.userReaction === 'like' ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                          {{ comment.like > 0 ? comment.like : null }}
                        </v-btn>
                        <v-btn icon @click="dislike(comment,'comment')" elevation="0" style="background-color: transparent;">
                          <v-icon color="purple">{{ comment.userReaction === 'dislike' ? 'mdi-heart-broken' : 'mdi-heart-broken-outline' }}</v-icon>
                          {{ comment.dislike > 0 ? comment.dislike : null }}
                        </v-btn>
                        <v-btn icon color="transparent" elevation="0" @click="comment.showComments = !comment.showComments" class="rounded-circle" v-if="comment.total_comments > 0">
                          <v-icon> {{ comment.showComments ? "mdi-comment-text" : "mdi-comment-text-outline" }}</v-icon>
                          {{ comment.total_comments }}
                        </v-btn>
                        <v-btn text color="transparent" elevation="0" @click="prepareReply(comment)">
                          Válasz
                        </v-btn>
                        <v-btn v-if="comment.user_name == get_UserName && !comment.editable" text color="transparent" elevation="0" @click="commentEdit(comment,'commentId'+post.id+''+ index)">
                          Módosítás
                        </v-btn>
                        <v-btn v-if="comment.user_name == get_UserName && comment.editable" text color="transparent" elevation="0" @click="commentEditConf(comment,'commentId'+post.id+''+ index)">
                          Módosít
                        </v-btn>
                        <v-btn v-if="comment.editable" text color="transparent" elevation="0" @click="CommentClose(comment)">
                          Mégse
                        </v-btn>
                      </div>
                      <v-expand-transition>
                        <div v-if="comment.showComments">
                          <!-- Új komment -->
                          <v-expand-transition>
                            <div class="position-relative mx-4 pa-2" v-if="comment.prepareReply">
                              <div 
                              class="d-flex flex-row align-center mb-3 pa-1 pr-2 rounded-xl" 
                              style="width: max-content; background-color: rgb(var(--v-theme-community_comment_bc));"
                              >
                                <img :src="comment.User.User_customization.profil_picture == null ? '/src/components/background/test_profile.jpg' : comment.User.User_customization.profil_picture" alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                                <h4 style="font-weight: normal;">{{ get_UserName }}</h4>
                              </div>
                              <div>
                                <v-textarea
                                  v-model="comment.newComment"
                                  label="Válaszod"
                                  hide-details
                                  variant="outlined"
                                  rows="1"
                                  style="min-height: min-content; width: 100%;"
                                ></v-textarea>
                                <div class="d-flex pa-2 pl-0 ga-2">
                                  <v-btn
                                    :disabled="comment.newComment == ''"
                                    :style="comment.newComment == '' ? 'background-color: rgb(var(--v-theme-community_posts_bc)) !important; color: darkgray !important;' : ''"
                                    color="transparent"
                                    elevation="0"
                                    small
                                    @click="addCommentToComment(comment)"
                                  >
                                    Küldés
                                  </v-btn>
                                  <v-btn
                                    color="transparent"
                                    elevation="0"
                                    small
                                    @click="comment.prepareReply = false"
                                  >
                                    Mégse
                                  </v-btn>
                                </div>
                              </div>
                            </div>
                          </v-expand-transition>
                          <!-- Kommentek listája -->
                          <v-divider class="my-2" v-if="comment.total_comments > 0"></v-divider>
                          <v-expand-transition>
                            <div>
                              <div v-for="(inner_comment, index) in limitedComments(comment)" :key="inner_comment.id" class="d-flex flex-column rounded-lg ma-4 pt-3" style="background-color: rgb(var(--v-theme-community_comment_bc));">
                                <transition-group name="expand-transition" tag="div">
                                  <div class="d-flex flex-column pl-2" :key="inner_comment.id">
                                    <div class="d-flex ga-2 align-center">
                                      <div 
                                      class="d-flex flex-row align-center mb-1 pa-1 pr-2 rounded-xl" 
                                      style="width: max-content; background-color: rgb(var(--v-theme-community_posts_bc)); cursor: pointer;"
                                      @click="router.push({ name: 'profile', params: { id: inner_comment.User.id } })"
                                      >
                                        <img :src="inner_comment.User.User_customization.profil_picture == null ? '/src/components/background/test_profile.jpg' : inner_comment.User.User_customization.profil_picture" alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                                        <h4 style="font-weight: normal;">{{ inner_comment.user_name }}</h4>
                                      </div>
                                      <h5 style="font-weight: normal;">{{ inner_comment.createdAt }}</h5>
                                    </div>
                                    <div class="mt-2">
                                      <v-expand-transition>
                                        <div v-if="!inner_comment.editable" class="d-flex align-center">
                                          <h3 class="pa-2 pl-4" style="font-weight: normal; width: max-content;">
                                            {{ inner_comment.linkAuthor }} {{ inner_comment.content }}
                                          </h3>
                                          <v-expand-transition>
                                            <h5 v-if="inner_comment.gotEdit" style="font-weight: normal;">[Szerkeztve]</h5>
                                          </v-expand-transition>
                                        </div>
                                      </v-expand-transition>
                                      <v-expand-transition>
                                        <v-text-field
                                          v-if="inner_comment.editable"
                                          type="text"
                                          elevation="0"
                                          hide-details
                                          variant="solo-inverted" 
                                          v-model="inner_comment.content"
                                          class="custom-solo-inverted"
                                          :id="'commentId' + post.id+''+comment.id+''+ index"
                                        ></v-text-field>
                                      </v-expand-transition>
                                    </div>
                                  </div>
                                </transition-group>
                                <div class="ml-1">
                                  <v-btn icon @click="like(inner_comment,'comment')" elevation="0" style="background-color: transparent;">
                                    <v-icon color="red">{{ inner_comment.userReaction === 'like' ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                                    {{ inner_comment.like }}
                                  </v-btn>
                                  <v-btn icon @click="dislike(inner_comment,'comment')" elevation="0" style="background-color: transparent;">
                                    <v-icon color="purple">{{ inner_comment.userReaction === 'dislike' ? 'mdi-heart-broken' : 'mdi-heart-broken-outline' }}</v-icon>
                                    {{ inner_comment.dislike }}
                                  </v-btn>
                                  <v-btn v-if="inner_comment.user_name != get_UserName" text color="transparent" elevation="0" @click="prepareReply(inner_comment)">
                                    Válasz
                                  </v-btn>
                                  <v-expand-transition>
                                    <v-btn v-if="inner_comment.user_name == get_UserName && !inner_comment.editable" class="expand-edit-btn-first" text color="transparent" elevation="0" @click="commentEdit(inner_comment,'commentId'+post.id+''+comment.id+''+ index)">
                                      Módosítás
                                    </v-btn>
                                  </v-expand-transition>
                                  <v-expand-transition>
                                    <v-btn v-if="inner_comment.user_name == get_UserName && inner_comment.editable" class="expand-edit-btn-second" text color="transparent" elevation="0" @click="commentEditConf(inner_comment,'commentId' + post.id+''+comment.id+''+ index)">
                                      Módosít
                                    </v-btn>
                                  </v-expand-transition>
                                  <v-expand-transition>
                                    <v-btn v-if="inner_comment.editable" class="expand-edit-btn-second" text color="transparent" elevation="0" @click="CommentClose(inner_comment)">
                                      Mégse
                                    </v-btn>
                                  </v-expand-transition>
                                </div>
                                <v-expand-transition>
                                  <div class="position-relative mx-4 pa-2" v-if="inner_comment.prepareReply">
                                    <div class="d-flex flex-row align-center mb-3 pa-1 pr-2 rounded-xl" style="width: max-content; background-color: rgb(var(--v-theme-community_comment_bc));">
                                      <img :src="inner_comment.User.User_customization.profil_picture == null ? '/src/components/background/test_profile.jpg' : inner_comment.User.User_customization.profil_picture" alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                                      <h4 style="font-weight: normal;">{{ get_UserName }}</h4>
                                    </div>
                                    <div>
                                      <v-textarea
                                        v-model="inner_comment.newComment"
                                        label="Válaszod"
                                        hide-details
                                        variant="outlined"
                                        rows="1"
                                        style="min-height: min-content; width: 100%;"
                                      ></v-textarea>
                                      <div class="d-flex pa-2 pl-0 ga-2">
                                        <v-btn
                                          :disabled="inner_comment.newComment == ''"
                                          :style="inner_comment.newComment == '' ? 'background-color: rgb(var(--v-theme-community_posts_bc)) !important; color: darkgray !important;' : ''"
                                          color="transparent"
                                          elevation="0"
                                          small
                                          @click="addLastCommentToComment(comment, inner_comment)"
                                        >
                                          Küldés
                                        </v-btn>
                                        <v-btn
                                          color="transparent"
                                          elevation="0"
                                          small
                                          @click="cancelPrepareReplyForComment(inner_comment)"
                                        >
                                          Mégse
                                        </v-btn>
                                      </div>
                                    </div>
                                  </div>
                                </v-expand-transition>
                              </div>
                            </div>
                          </v-expand-transition>

                          <div class="align-center d-flex justify-center mb-4 pa-4 position-relative" v-if="comment.total_comments > comment.commentLimit">
                            <v-divider class=""></v-divider>
                            <v-btn
                              elevation="0"
                              icon
                              small
                              @click="loadMoreCommentsForPost(post)"
                              class="align-center d-flex justify-center position-absolute"
                              v-tooltip="'Több komment megjelenítése'"
                              style="
                              left: 50%; 
                              transform: translate(-50%,0);
                              background-color: rgb(var(--v-theme-community_comment_bc));"
                            >
                              <v-icon>mdi-comment-plus-outline</v-icon>
                            </v-btn>
                          </div>
                        </div>
                      </v-expand-transition>
                    </div>

                    <div class="align-center d-flex justify-center mb-4 pa-4 position-relative" v-if="post.total_comments > post.commentLimit">
                      <v-divider class=""></v-divider>
                      <v-btn
                        elevation="0"
                        icon
                        small
                        @click="loadMoreCommentsForPost(post)"
                        class="align-center d-flex justify-center position-absolute"
                        v-tooltip="'Több komment megjelenítése'"
                        style="left: 50%; transform: translate(-50%,0);"
                      >
                        <v-icon>mdi-comment-plus-outline</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </v-expand-transition>
              </v-card>
            </transition-group>
          </v-col>
        </v-row>
      </v-container>

      <!-- Új poszt létrehozása modal -->
      <v-dialog v-model="showPostDial" max-width="600px">
        <v-card>
          <v-card-title>Új poszt létrehozása</v-card-title>
          <v-card-text class="mb-2">
            <v-text-field
              v-if="showCreatePost"
              v-model="newPost.title"
              label="Cím"
              variant="outlined"
              class="mx-4"
              hide-details
            ></v-text-field>

            <v-text-field
              v-if="showEditPost"
              v-model="editingPost.title"
              label="Cím"
              variant="outlined"
              class="mx-4"
              hide-details
            ></v-text-field>
            
            <v-container class="editor-area">
              <v-row>
                <v-col cols="12">
                  <div class="editor-container">
                    <!-- Toolbar -->
                    <div class="d-flex justify-start ga-2 mb-2 editor-btns">
                      <v-btn 
                      elevation="0"
                      small
                      icon 
                      :class="{'active-btn': activeBold}" 
                      @click="toggleBold"
                      >
                        <v-icon class="text-community_createpost_btn">mdi-format-bold</v-icon>
                      </v-btn>
                      <v-btn 
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeItalic}" 
                      @click="toggleItalic"
                      >
                        <v-icon class="text-community_createpost_btn">mdi-format-italic</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeStrikethrough}" 
                      @click="toggleStrikethrough"
                      >
                        <v-icon class="text-community_createpost_btn">mdi-format-strikethrough</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeUnderline}"
                      @click="toggleUnderline"
                      >
                        <v-icon class="text-community_createpost_btn">mdi-format-underline</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeAlignLeft}" 
                      @click="AlignActivate('left')"
                      >
                        <v-icon class="text-community_createpost_btn">mdi-format-align-left</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeAlignCenter}" 
                      @click="AlignActivate('center')"
                      >
                        <v-icon class="text-community_createpost_btn">mdi-format-align-center</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeAlignRight}" 
                      @click="AlignActivate('right')"
                      >
                        <v-icon class="text-community_createpost_btn">mdi-format-align-right</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeOrderedList}" 
                      @click="toggleOrderedList"
                      >
                        <v-icon class="text-community_createpost_btn">mdi-format-list-numbered</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeUnorderedList}" 
                      @click="toggleUnorderedList"
                      >
                        <v-icon class="text-community_createpost_btn">mdi-format-list-bulleted</v-icon>
                      </v-btn>
                      <v-btn 
                      elevation="0"
                      icon 
                      small
                      :class="{'active-btn': activeLink}" 
                      @click="createLink"
                      >
                        <v-icon class="text-community_createpost_btn">mdi-link</v-icon>
                      </v-btn>
                      
                      <input
                        type="file"
                        ref="imageInput"
                        accept="image/*"
                        style="display: none"
                        @change="handleImageUpload"
                      />

                      <v-btn 
                      elevation="0"
                      icon 
                      small  
                      @click="triggerImageInput"
                      >
                        <v-icon class="text-community_createpost_btn">mdi-image</v-icon>
                      </v-btn>
                    </div>

                    <div
                      ref="editor"
                      contenteditable="true"
                      class="editor"
                      @input="updateContent"
                      placeholder="Írj ide..."
                    ></div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
            <div v-if="showCreatePost">
              <!-- Rejtett fájl input -->
              <div class="d-flex ml-4 mb-2 ga-2 align-center">
                <h3
                @click="triggerFileInput"
                style="cursor: pointer;"
                >Fájl feltöltése</h3>
                <v-btn 
                  elevation="0" 
                  icon 
                  small 
                  @click="triggerFileInput"
                >
                  <v-icon>mdi-file-upload</v-icon>
                </v-btn>
              </div>
              <input
                type="file"
                ref="fileInput"
                style="display: none"
                @change="handleFileUpload"
                accept=".js, .ts, .vue, .cs, .css, .lua, .txt"
                multiple
              />

              <!-- Kiválasztott fájlok listája -->
              <v-expand-transition>
                <div v-if="newPost.files.length">
                  <p class="mx-4">
                    Kiválasztott fájlok:
                  </p>
                  <v-expand-transition>
                    <ul class="mx-12">
                      <li v-for="(file, index) in newPost.files" :key="index">
                        {{ file.name }} ({{ (file.size / 1024).toFixed(2) }} KB)

                        <v-btn 
                          elevation="0" 
                          icon 
                          small 
                          @click="fileDelete(index)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>

                      </li>
                    </ul>
                  </v-expand-transition>
                </div>
              </v-expand-transition>
            </div>

            <div v-if="showEditPost">
              <!-- Rejtett fájl input -->
              <div class="d-flex ml-4 mb-2 ga-2 align-center">
                <h3
                @click="triggerFileInput"
                style="cursor: pointer;"
                >Fájl feltöltése</h3>
                <v-btn 
                  elevation="0" 
                  icon 
                  small 
                  @click="triggerFileInput"
                >
                  <v-icon>mdi-file-upload</v-icon>
                </v-btn>
              </div>
              <input
                type="file"
                ref="fileInput"
                style="display: none"
                @change="handleFileUpload"
                accept=".js, .ts, .vue, .cs, .css, .lua, .txt"
                multiple
              />

              <!-- Kiválasztott fájlok listája -->
              <v-expand-transition>
                <div v-if="editingPost.files.length > 0">
                  <p class="mx-4">
                    Kiválasztott fájlok:
                  </p>
                  <v-expand-transition>
                    <ul class="mx-12">
                      <li v-for="(file, index) in editingPost.files" :key="index">
                        {{ file.name == undefined ? file.file_name : file.name }} ({{ ((file.size == undefined ? file.file_size : file.size) / 1024).toFixed(2) }} KB)

                        <v-btn 
                          elevation="0" 
                          icon 
                          small 
                          @click="fileDelete(index)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>

                      </li>
                    </ul>
                  </v-expand-transition>
                </div>
              </v-expand-transition>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn v-if="showCreatePost" color="community_primary_color" @click="addPost" :loading="loading">
              Poszt létrehozása
            </v-btn>
            <v-btn v-if="showEditPost" color="community_primary_color" @click="EditPostConf()" :loading="loading">
              Poszt szerkeztése
            </v-btn>
            <v-btn text @click="ShowPostClose()">Mégse</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-expand-transition>
        <div class="d-flex justify-center" v-if="PostLoading">
          <v-progress-circular indeterminate></v-progress-circular>
        </div>
      </v-expand-transition>
  </main>
</template>

<script setup>
import { onMounted, ref, reactive, computed, nextTick, watch, watchEffect   } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProfileGetUser } from '@/api/profile/profileQuery';
import { useCommunityPost, useGetCommunityPost, useCommunityEditPost, useLikeDislikeForPost, useCommentForPost, useCommentEdit, useCommunityTags } from '@/api/community/communityQuery';
import imageCompression from 'browser-image-compression';
import { useDisplay } from 'vuetify';

const router = useRouter();
const route = useRoute();

// Vuetify beépített breakpoint detektálás
const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);

const getCookie = (name) => {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

var get_user_by_token = getCookie('user') != null && getCookie('user') != 'undefined' && typeof getCookie('user') != "object" ? getCookie('user') : null;

const get_fullUser = ref(null);

const get_UserName = ref('Betöltés...');

const posts_limit = ref(10);
const total_posts = ref(null);
const PostLoading = ref(true);


const { mutate: ProfileGetUser } = useProfileGetUser();
const { mutate: CommunityGetLimitedPosts } = useGetCommunityPost();

onMounted(async () => {
  if (get_user_by_token != null) {
    try {
      await ProfileGetUser({token: get_user_by_token, id: 0}, {
        onSuccess: (get_user) => {
          get_UserName.value = get_user.user_name;
          get_fullUser.value = get_user;
        },
        onError: (error) => {
        },
      });
    } catch (error) {
      console.error('Hiba történt a felhasználó lekérésekor:', error);
    }
  }

  if(get_user_by_token == null){
    await CommunityGetLimitedPosts({
      limit: posts_limit.value,
      id: null,
      filter: null,
    }, {
      onSuccess: (posts_array) => {
        PostLoading.value = false;
        total_posts.value = posts_array.total_posts;
        if (posts_array.posts != null) {
          posts_array.posts.forEach((post, index) => {
            setTimeout(() => {
              postsConvertToDisplay(post, true);
            });
          });
        }
      },
      onError: (error) => {
        console.error('Hiba történt a posztok lekérésekor:', error);
      },
    });
  }
});
watch(get_fullUser, async (User) => {
  try {
    await CommunityGetLimitedPosts({
      limit: posts_limit.value,
      id: User.id == null ? null : User.id,
      filter: null,
    }, {
      onSuccess: (posts_array) => {
        PostLoading.value = false;
        total_posts.value = posts_array.total_posts;
        if (posts_array.posts != null) {
          posts_array.posts.forEach((post, index) => {
            setTimeout(() => {
              postsConvertToDisplay(post, true);
            });
          });
        }
      },
      onError: (error) => {
        console.error('Hiba történt a posztok lekérésekor:', error);
      },
    });
  } catch (error) {
    console.error('Hiba történt a posztok lekérésekor:', error);
  }
});


function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // hónap, 2 számjegyre
  const day = date.getDate().toString().padStart(2, '0'); // nap, 2 számjegyre
  const hours = date.getHours().toString().padStart(2, '0'); // óra, 2 számjegyre
  const minutes = date.getMinutes().toString().padStart(2, '0'); // perc, 2 számjegyre
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// Állapotok és változók
const content = ref(""); // A textarea tartalma
const activeBold = ref(false);
const activeItalic = ref(false);
const activeStrikethrough = ref(false);
const activeUnderline = ref(false);
const activeAlignLeft = ref(true);
const activeAlignCenter = ref(false);
const activeAlignRight = ref(false);
const activeOrderedList = ref(false);
const activeUnorderedList = ref(false);
const activeLink = ref(false);
const fileInput = ref(null);
const editingComment = ref(null);
const editingID = ref(null);
const editingContent = ref(null);
const showEditPost = ref(false);
const showPostDial = ref(false);
const defaultPostSave = ref(null);

const newPost = reactive({ title: "", images: ref([]), files: ref([]) });
const editingPost = reactive({ title: "", images: ref([]), files: ref([]), content: "" });

// Posts tömb
const posts = reactive([]);

const showCreatePost = ref(false);

const searchQuery = ref('');
const results = ref([]);

function search() {
  // Itt implementáld a keresést, például API hívás vagy adatbázis lekérdezés
  console.log('Keresés:', searchQuery.value);
  // Példa eredmények:
  results.value = [
    { id: 1, title: 'Eredmény 1', description: 'Leírás 1' },
    { id: 2, title: 'Eredmény 2', description: 'Leírás 2' },
    { id: 3, title: 'Eredmény 3', description: 'Leírás 3' }
  ];
}

const mutation = useCommunityTags();

watchEffect(() => {
  mutation.mutate(undefined, {
    onSuccess: (response) => {
      const tags = response.map(item => item.tag);
      FilterChips.value.push(...tags);
    },
    onError: (error) => {
      console.error("Hiba történt:", error);
    }
  });
});

const FilterChips = ref([]);

const FilterOpt = ref([]);

watch(FilterOpt, (newVal, oldVal) => {
  if(newVal.length != 0){
    console.log("FilterOpt változott:", newVal);
  }
});

const sortOptions = ref([]); // Tömb, amely tartalmazza a kiválasztott értékeket

const toggleOption = async (option) => {
  if(sortOptions.value.length == 0){
    sortOptions.value.push(option);
  }else{
    if(sortOptions.value[0] == option){
      sortOptions.value = [];
      sortOptionForPop.value = null;
      posts.length = 0;
      PostLoading.value = true;
      await CommunityGetLimitedPosts({
        limit: posts_limit.value,
        id: get_fullUser.value.id == null ? null : get_fullUser.value.id,
        filter: null,
      }, {
        onSuccess: (posts_array) => {
          PostLoading.value = false;
          total_posts.value = posts_array.total_posts;
          if (posts_array.posts != null) {
            posts_array.posts.forEach((post, index) => {
              setTimeout(() => {
                postsConvertToDisplay(post, true);
              });
            });
          }
        },
        onError: (error) => {
          console.error('Hiba történt a posztok lekérésekor:', error);
        },
      });
    }
    else{
      sortOptions.value[0] = option;
    }
  }
};

const sortOptionForPop = ref(null); // Alapértelmezett érték

watch(sortOptionForPop, async (newSortOption, oldSortOption) => {
  if (newSortOption !== oldSortOption) {
    if (newSortOption === 'popularity') {
      posts.length = 0;
      PostLoading.value = false;
      await CommunityGetLimitedPosts({
        limit: posts_limit.value,
        id: get_fullUser.value.id == null ? null : get_fullUser.value.id,
        filter: [[sortOptions.value[0], 'ASC']],
        }, 
        {
          onSuccess: (posts_array) => {
            PostLoading.value = false;
            total_posts.value = posts_array.total_posts;
            if (posts_array.posts != null) {
              posts_array.posts.forEach((post, index) => {
                setTimeout(() => {
                  postsConvertToDisplay(post, true);
                });
              });
            }
          },
          onError: (error) => {
            console.error('Hiba történt a posztok lekérésekor:', error);
          },
        }
      );
    } else if (newSortOption === 'date') {
      posts.length = 0;
      PostLoading.value = false;
      if (sortOptionForPop.value != null) {
        await CommunityGetLimitedPosts({
          limit: posts_limit.value,
          id: get_fullUser.value.id == null ? null : get_fullUser.value.id,
          filter: [[sortOptions.value[0], 'DESC']],
          }, 
          {
            onSuccess: (posts_array) => {
              PostLoading.value = false;
              total_posts.value = posts_array.total_posts;
              if (posts_array.posts != null) {
                posts_array.posts.forEach((post, index) => {
                  setTimeout(() => {
                    postsConvertToDisplay(post, true);
                  });
                });
              }
            },
            onError: (error) => {
              console.error('Hiba történt a posztok lekérésekor:', error);
            },
          }
        );
      }
    }
  }
});

// Figyeljük a sortOptions változását
watch(sortOptions.value, async (newSortOptions, oldSortOptions) => {
  if (sortOptionForPop.value != null) {
    posts.length = 0;
    PostLoading.value = false;
    await CommunityGetLimitedPosts({
      limit: posts_limit.value,
      id: get_fullUser.value.id == null ? null : get_fullUser.value.id,
      filter: [[newSortOptions[0], (sortOptionForPop.value == 'popularity'? "ASC" : "DESC")]],
      }, 
      {
        onSuccess: (posts_array) => {
          PostLoading.value = false;
          total_posts.value = posts_array.total_posts;
          if (posts_array.posts != null) {
            posts_array.posts.forEach((post, index) => {
              setTimeout(() => {
                postsConvertToDisplay(post, true);
              });
            });
          }
        },
        onError: (error) => {
          console.error('Hiba történt a posztok lekérésekor:', error);
        },
      }
    );
  }
});



function CreatePostOpen(){
  showEditPost.value = false;
  showPostDial.value = true;
  showCreatePost.value = true;
}

function EditPostOpen(post){
  editingPost.title = post.title;
  editingPost.content = post.content;
  editingPost.files = [...post.files];
  editingPost.images = [...post.images];
  defaultPostSave.value = post;
  showCreatePost.value = false;
  showPostDial.value = true;
  showEditPost.value = true;
}

watch(showEditPost, async (newVal) => {
  if (newVal) {
    await nextTick();
    var editor = document.getElementsByClassName("editor")[0];
    if (editor) {
      editor.innerHTML = editingPost.content;
    }
  }
});

const { mutate: CommunityEditPostUpload } = useCommunityEditPost();

const EditPostConf = async () =>{
  var editor = document.getElementsByClassName("editor")[0];
  let htmlContent = editor.innerHTML;

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  const imgElements = Array.from(tempDiv.querySelectorAll("img")); // Átalakítjuk tömbbé

  var none_existingFiles = [];

  imgElements.forEach(img => {
    img.removeAttribute("src");
  });

  for (let i = 0; i < editingPost.images.length; i++) {
    const found = imgElements.some(img => img.id === (i + 1).toString());
    if(!found){
      editingPost.images.splice(i,1);
    }
  }

  const cleanedHtmlContent = tempDiv.innerHTML;

  const changed_mergedArray = [...editingPost.images, ...editingPost.files];
  const def_mergedArray = [...defaultPostSave.value.images, ...defaultPostSave.value.files];

  const changed_compressingFilesArray = await compressingFiles(changed_mergedArray);
  const def_compressingFilesArray = await compressingFiles(def_mergedArray);

  var new_files = [];

  changed_compressingFilesArray.filter(changedFile => {
    if(typeof changedFile != 'number' && changedFile != undefined){
      if (!def_compressingFilesArray.some(f => f != undefined && f.name === changedFile.name && f.size === changedFile.size && f.type === changedFile.type)) {
        new_files.push(changedFile);
      }
    }
  });
  
  def_compressingFilesArray.filter(changedFile => {
    if(typeof changedFile != 'number' && changedFile != undefined){
      if (!changed_compressingFilesArray.some(f => f != undefined && f.name === changedFile.name && f.size === changedFile.size && f.type === changedFile.type)) {
        none_existingFiles.push(def_compressingFilesArray[def_compressingFilesArray.indexOf(changedFile)+1]);
      }
    }
  });

  const def_postId =  Number(defaultPostSave.value.id);

  if(editor.innerHTML != "" && editor.innerHTML != "<br>" && (defaultPostSave.value.title != editingPost.title || defaultPostSave.value.content != editor.value || defaultPostSave.value.files != editingPost.files || defaultPostSave.value.images != editingPost.images)){
    await CommunityEditPostUpload({id: defaultPostSave.value.id, title: editingPost.title , content: cleanedHtmlContent, files: new_files, none_files: none_existingFiles}, {
      onSuccess : async (response) =>{
        const post = posts.find(c => c.id == def_postId);

        for (let i = 0; i < editingPost.files.length; i++) {
          if(typeof editingPost.files[i].file == 'object'){
            const file_res = await fileToBase64(editingPost.files[i].file);
            const obj = reactive({
              file: file_res,
              file_name: editingPost.files[i].name,
              file_size: editingPost.files[i].size,
              file_type: editingPost.files[i].type,
              id: null,
              name: editingPost.files[i].name,
              post_id: Number(defaultPostSave.value.id)
            });
            post.files = [...post.files, obj];
          }
        }

        for (let i = 0; i < editingPost.images.length; i++) {
          const image = post.images.find(c=> c.file_name == editingPost.images[i].name && c.id != null);
          if(image == undefined){
            const obj = reactive({
              file: editingPost.images[i].url,
              file_name: editingPost.images[i].name,
              file_size: editingPost.images[i].size,
              file_type: editingPost.images[i].type,
              id: null,
              name: editingPost.images[i].name,
              post_id: Number(defaultPostSave.value.id)
            });
            post.images = [...post.images, obj];
          }
        }

        for (let i = 0; i < none_existingFiles.length; i++) {
          const image = post.images.find(c=> c.id == none_existingFiles[i]);
          const file = post.files.find(c=> c.id == none_existingFiles[i]);
          if(image != undefined){
            post.images.splice(post.images.indexOf(image),1);
          }
          if(file != undefined){
            post.files.splice(post.files.indexOf(file),1);
          }
        }

        post.title = editingPost.title;
        post.content = htmlContent;
      }
    });

    ShowPostClose();
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
  });
}


function ShowPostClose(){
  showPostDial.value = false;
  showCreatePost.value = false;
  showEditPost.value = false;
  defaultPostSave.value = false;
}

// Methods
function toggleBold() {
  document.execCommand('bold');
  activeBold.value = !activeBold.value;
}

function toggleItalic(){
  document.execCommand('italic');
  activeItalic.value = !activeItalic.value;
}

function toggleStrikethrough() {
  document.execCommand('strikethrough');
  activeStrikethrough.value = !activeStrikethrough.value;
}

function toggleUnderline(){
  document.execCommand('underline');
  activeUnderline.value = !activeUnderline.value;
}

function AlignActivate(side){
  if(side == 'left'){
    document.execCommand('justifyLeft');
    activeAlignLeft.value = true;
    activeAlignCenter.value = false;
    activeAlignRight.value = false;
  }else if(side == 'center'){
    document.execCommand('justifyCenter');
    activeAlignLeft.value = false;
    activeAlignCenter.value = true;
    activeAlignRight.value = false;
  }else if(side == 'right'){
    document.execCommand('justifyRight');
    activeAlignLeft.value = false;
    activeAlignCenter.value = false;
    activeAlignRight.value = true;
  }
}

function toggleOrderedList(){
  document.execCommand('insertOrderedList');
  activeOrderedList.value = !activeOrderedList.value;
}

function toggleUnorderedList(){
  document.execCommand('insertUnorderedList');
  activeUnorderedList.value = !activeUnorderedList.value;
}

function createLink() {
  const selection = window.getSelection();

  if (selection && selection.toString().length > 0 && selection.toString() != '') {
    let url = selection.toString().trim();

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url;
    }

    if (isLink(url)) {
      const range = selection.getRangeAt(0);
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';

      const linkText = document.createTextNode(selection.toString());

      link.appendChild(linkText);

      range.deleteContents();
      range.insertNode(link);

      link.focus();
      
      link.addEventListener('click', (e) => {
        window.open(link.href, '_blank');
        e.preventDefault();
      });

      activeLink.value = true;
    }
  } else {
    document.execCommand('unlink');
    activeLink.value = false;
  }
}
function isLink(text) {
  try {
    const url = new URL(text);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (e) {
    return false;
  }
}

const triggerImageInput = () => {
  const input = document.querySelector('input[type="file"]'); // Alternatíva: this.$refs.imageInput
  if (input) input.click();
};

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image') && file.size <= 1048576) {
    const reader = new FileReader();
    
    reader.onload = () => {
      const imgUrl = reader.result;

      const imgObj = {
        url: imgUrl,
        type: file.type,
        size: file.size,
        name: file.name,
      };

      if(showCreatePost.value){
        newPost.images.push(imgObj);
        insertImage();
      }else if(showEditPost.value){
        if (!editingPost.images.some(f => f != undefined && f.file_name === imgObj.name && f.file_size === imgObj.size && f.file_type === imgObj.type)) {
          editingPost.images.push(imgObj);
          insertImage();
        }
      }

      // Kép beszúrása a kurzor helyére
    };
    
    reader.readAsDataURL(file);
  } else {
    alert('A fájl nem megfelelő típusú vagy túl nagy (max 1MB).');
  }
};

function checkSelection(){
  const editor = document.getElementsByClassName("editor")[0];
  if (document.activeElement === editor) {
    const selection = document.getSelection();
    if (selection.rangeCount > 0) {
      const selectedRange = selection.getRangeAt(0);
      const parentElement = selectedRange.startContainer.parentElement;
      const computedStyle = window.getComputedStyle(parentElement);

      // Ellenőrizzük, hogy a szülő elem tartalmazza-e a 'font-weight: bold' stílust
      if(parentElement){
        if (computedStyle.fontWeight == 700) {
          activeBold.value = true;
        } else {
          activeBold.value = false;
        }
  
        if (computedStyle.fontStyle  == 'italic') {
          activeItalic.value = true;
        } else {
          activeItalic.value = false;
        }
  
        if (computedStyle.textDecorationLine == 'line-through') {
          activeStrikethrough.value = true;
        } else {
          activeStrikethrough.value = false;
        }

        if (computedStyle.textDecorationLine == 'underline' && selectedRange.commonAncestorContainer.parentElement.tagName != 'A') {
          activeUnderline.value = true;
        } else {
          activeUnderline.value = false;
        }

        if(computedStyle.textAlign == 'start' || computedStyle.textAlign == 'left'){
          activeAlignLeft.value = true;
          activeAlignCenter.value = false;
          activeAlignRight.value = false;
        }else if(computedStyle.textAlign == 'center'){;
          activeAlignLeft.value = false;
          activeAlignCenter.value = true;
          activeAlignRight.value = false;
        }else if(computedStyle.textAlign == 'right'){
          activeAlignLeft.value = false;
          activeAlignCenter.value = false;
          activeAlignRight.value = true;
        }

        const orderlistParentElement = selectedRange.commonAncestorContainer.parentElement.parentElement;
        if (orderlistParentElement.tagName == 'OL') {
          activeOrderedList.value = true;
        }else{
          activeOrderedList.value = false;
        }

        if (orderlistParentElement.tagName == 'UL') {
          activeUnorderedList.value = true;
        }else{
          activeUnorderedList.value = false;
        }

        if (selectedRange.commonAncestorContainer.parentElement.tagName == 'A') {
          activeLink.value = true;
        }else{
          activeLink.value = false;
        }
      }
    }
  }
}

let execCommandCheckInterval = null;
function startMonitoring() {
  if (!execCommandCheckInterval) {
    execCommandCheckInterval = setInterval(() => {
      checkSelection();
    }, 200);
  }
}
function stopMonitoring() {
  if (execCommandCheckInterval) {
    clearInterval(execCommandCheckInterval);
    execCommandCheckInterval = null;
  }
}

watch(showCreatePost, (newValue) => {
  if (newValue) {
    startMonitoring(); 
  } else {
    stopMonitoring(); 
  }
});

watch(showEditPost, (newValue) => {
  if (newValue) {
    startMonitoring(); 
  } else {
    stopMonitoring(); 
  }
});

const loading = ref(false);
const { mutate: CommunityPostUpload } = useCommunityPost(loading);
const addPost = async () =>{
  const editor = document.getElementsByClassName("editor")[0];
  let htmlContent = editor.innerHTML;

  // Létrehozunk egy ideiglenes DOM elemet a HTML tartalommal
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  // Az összes <img> elem `src` attribútumát eltávolítjuk
  const imgElements = tempDiv.querySelectorAll("img");
  imgElements.forEach(img => {
    img.removeAttribute("src"); // Törli az `src` attribútumot
  });

  // A módosított HTML tartalom
  const cleanedHtmlContent = tempDiv.innerHTML;

  const mergedArray = [...newPost.images, ...newPost.files];

  const compressingFilesArray = await compressingFiles(mergedArray);

  if(get_fullUser.value.id && newPost.title && htmlContent){
    loading.value = true;
    await CommunityPostUpload({id: get_fullUser.value.id, title: newPost.title, content: cleanedHtmlContent, files: compressingFilesArray}, {
      onSuccess: (response) => {
        loading.value = false;
        postsConvertToDisplay({
          id: response.id,
          user_name: get_UserName.value,
          User: {id: get_fullUser.value.id, user_name: get_UserName, User_customization: {profil_picture: get_fullUser.value.User_customization.profil_picture}},
          createdAt: formatDate(new Date()),
          content: cleanedHtmlContent,
          title: newPost.title,
          like: 0,
          dislike: 0,
          userReaction: null,
          newComment: "",
          gotEdit: false,
          editable: false,
          comments: [],
          files: newPost.files,
          images: newPost.images,
          commentLimit: 10,
          showComments: false,
          total_comments: 0,
        }, false);
      },
      onError: (error) => {
  
      },
    });
    loading.value = false;
  }
};

function postsConvertToDisplay(array,igaze){
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = array.content;

  var createdAt = array.createdAt;
  if(igaze){
    array.createdAt = createdAt.split('T')[0] + " " + createdAt.split('T')[1].split('.')[0].split(':')[0]+':'+createdAt.split('T')[1].split('.')[0].split(':')[1];
  }

  array.comments.forEach(comment =>{
    comment.createdAt = comment.createdAt.split('T')[0] + " " + comment.createdAt.split('T')[1].split('.')[0].split(':')[0]+':'+comment.createdAt.split('T')[1].split('.')[0].split(':')[1];

    comment.comments.forEach(inner_comment =>{
      inner_comment.createdAt = inner_comment.createdAt.split('T')[0] + " " + inner_comment.createdAt.split('T')[1].split('.')[0].split(':')[0] +':'+inner_comment.createdAt.split('T')[1].split('.')[0].split(':')[1];});
  });

  const imgElements = tempDiv.querySelectorAll("img");

  if(imgElements){
    imgElements.forEach((img) => {
      const id = Number(img.id)-1;
      if (array.images[id]) {
        img.setAttribute("src", (array.images[id].url != null ? array.images[id].url : array.images[id].file)); // Az `src` attribútumot beállítjuk
      }
    });
  }
  
  array.content = tempDiv.innerHTML;
  
  posts.unshift(array);
  
  newPost.files = [];
  newPost.images = [];
  newPost.title = "";
  
  ShowPostClose();
}

const compressingFiles = async (mergedArray) => {
  const compressFilesArray = [];

  for (const file of mergedArray) {
    if (file) {
      let blob;

      try {
        if (file.url) {
          // Ha a fájlnak van URL-je
          try {
            const response = await fetch(file.url);
            if (!response.ok) throw new Error(`HTTP hiba: ${response.status}`);
            blob = await response.blob();
          } catch (error) {
            console.error('Fetch hiba:', error);
            continue; // Hibás fájlt kihagyjuk
          }
        } else if (file.file) {
          // Feltöltött fájl
          if (file.file instanceof Blob) {
            blob = file.file;
          } else {
            try {
              blob = new Blob([file.file], { type: file.type || 'application/octet-stream' });
            } catch (error) {
              console.error('Blob inicializálási hiba:', error);
              continue; // Hibás fájlt kihagyjuk
            }
          }
        }

        if (!blob) {
          console.warn('A blob nem inicializálható:', file);
          continue; // Hibás fájlt kihagyjuk
        }

        if (file.type && file.type.startsWith('image/')) {
          // Ha nem GIF, akkor tömörítés
          if (file.type !== 'image/gif') {
            try {
              const options = {
                maxSizeMB: 0.1,
                useWebWorker: true,
              };
              blob = await imageCompression(blob, options);
            } catch (error) {
              console.error('Tömörítési hiba:', error);
              continue; // Hibás fájlt kihagyjuk
            }
          }
        }
        
        // Ha GIF, állítsuk be kifejezetten image/gif típusra
        const fileType = file.name.split('.').pop() === 'gif' ? 'image/gif' : blob.type;
        
        // Blob-ból File objektum létrehozása fájlnévvel
        const fileWithMetadata = new File([blob], file.name || `file_${Date.now()}`, { type: fileType });

        compressFilesArray.push(fileWithMetadata);
        if(showEditPost.value){
          compressFilesArray.push(file.id);
          compressFilesArray.push(file.type);
          compressFilesArray.push(file.size);
        }
      } catch (error) {
        console.error('Fájl feldolgozási hiba:', error);
      }
    }
  }

  return compressFilesArray;
};

nextTick(() => {
  const editor = document.getElementsByClassName("editor")[0];

  if (editor) {
    editor.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    editor.addEventListener("drop", (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          insertImage();
        };

        reader.readAsDataURL(file);
      }
    });
  }
});

// Kép beszúrása
const insertImage = () => {
  const editor = document.getElementsByClassName("editor")[0]; 

  if (editor) {
    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      
      // Ellenőrizzük, hogy a kurzor az editor-ban van
      if(showCreatePost.value){
        if (editor.contains(range.startContainer)) {
          const img = document.createElement('img');
          img.src = newPost.images[newPost.images.length-1].url;
          img.alt = 'Uploaded ' + newPost.images.length+'. Image';
          img.id = newPost.images.length;
          img.style.maxWidth = '100%';
          img.style.height = '20vh';
          img.style.display = 'block';
  
          range.deleteContents();
          range.insertNode(img);
  
          range.setStartAfter(img);
          range.setEndAfter(img);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }else if(showEditPost){
        const img = document.createElement('img');
        img.src = editingPost.images[editingPost.images.length-1].url;
        img.alt = 'Uploaded ' + editingPost.images.length+'. Image';
        img.id = editingPost.images.length;
        img.style.maxWidth = '100%';
        img.style.height = '20vh';
        img.style.display = 'block';

        range.deleteContents();
        range.insertNode(img);

        range.setStartAfter(img);
        range.setEndAfter(img);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  } else {
    console.error('Editor div nem található.');
  }
};

function handleFileUpload(event) {
  const uploadedFiles = event.target.files;

  for (const file of uploadedFiles) {
    if (file.size <= 10 * 1024 * 1024) { // 10 MB limit 
      const obj = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        file: file // Blob URL létrehozása az azonnali használathoz
      };

      // Ellenőrizzük, hogy a fájl már szerepel-e
      if(showCreatePost.value){
        if (!newPost.files.some(f => f.name === obj.name && f.file_size === obj.size && f.file_type === obj.type)) {
          newPost.files.push(obj);
        }
      }else if(showEditPost.value){
        if (!editingPost.files.some(f => f.name === obj.name && f.file_size === obj.size && f.file_type === obj.type)) {
          editingPost.files.push(obj);
        }
      }
    } else {
      console.warn(`A fájl mérete túl nagy: ${file.name}`);
    }
  }
  event.target.value = '';
}

function downloadFile(file) {
  try {
    const blob = dataURLtoBlob(file.file);
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = file.file_name || 'file';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Az URL-t felszabadítjuk
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Fájl letöltési hiba:', error);
  }
}

function dataURLtoBlob(dataURL) {
  const [header, base64] = dataURL.split(',');
  const mime = header.match(/:(.*?);/)[1];
  const binary = atob(base64);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: mime });
}

function formatFileSize(size) {
  if (!size) return 'Ismeretlen méret';
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'KB', 'MB', 'GB', 'TB'][i]
  );
}

function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

function fileDelete(index){
  if(showCreatePost.value){
    newPost.files.splice(index,1);
  }else if(showEditPost.value){
    editingPost.files.splice(index,1);
  }
}

const { mutate: CommunityLikeDislikeForPost } = useLikeDislikeForPost();

const like = async(post, upload_type) =>{
  if(post.userReaction != 'like'){
    if(post.userReaction == 'dislike'){
      post.dislike = post.dislike - 1;
      await CommunityLikeDislikeForPost({post_id: post.id, user_id: get_fullUser.value.id,upload_type: upload_type, type: 0});
    }
    post.like = post.like + 1;
    post.userReaction = 'like';
    await CommunityLikeDislikeForPost({post_id: post.id, user_id: get_fullUser.value.id,upload_type: upload_type, type: 0});
  }else{
    post.like = post.like - 1;
    post.userReaction = null;
    await CommunityLikeDislikeForPost({post_id: post.id, user_id: get_fullUser.value.id,upload_type: upload_type, type: 0});
  }
}

const dislike = async(post,upload_type) =>{
  if(post.userReaction != 'dislike'){
    if(post.userReaction == 'like'){
      post.like = post.like - 1;
      await CommunityLikeDislikeForPost({post_id: post.id, user_id: get_fullUser.value.id,upload_type: upload_type, type: 1});
    }
    post.dislike = post.dislike + 1;
    post.userReaction = 'dislike';
    await CommunityLikeDislikeForPost({post_id: post.id, user_id: get_fullUser.value.id,upload_type: upload_type, type: 1});
  }else{
    post.dislike = post.dislike - 1;
    post.userReaction = null;
    await CommunityLikeDislikeForPost({post_id: post.id, user_id: get_fullUser.value.id,upload_type: upload_type, type: 1});
  }
}

function prepareReply(array){
  array.prepareReply = true;
  array.showComments = true;
}

function limitedComments(array){
  return array.comments.slice(0,array.limitedComments);
}

const { mutate: CommunityCommentEdit } = useCommentEdit();

function commentEdit(comment,id){
  comment.editable = true;

  if(editingComment.value != null){
    editingComment.value.editable = false;
    document.getElementById(editingID.value).value = editingContent.value;
    editingComment.value.content = editingContent.value;
  }
  
  editingComment.value = comment;
  editingID.value = id;
  editingContent.value = comment.content;
  
  nextTick(() => {
    const element = document.getElementById(id);
    if (element) {
      element.focus();
    }
  });
}

const commentEditConf = async (comment,id) =>{
  var edited_content = document.getElementById(id).value;

  if(edited_content.value != ''){
    await CommunityCommentEdit({content: String(edited_content), comment_id: comment.id});
    comment.gotEdit = true;
  }

  editingID.value = null,
  editingComment.value = null,
  editingContent.value = null;
  comment.editable = false;
}

function CommentClose(comment){
  editingID.value = null,
  editingComment.value = null,
  editingContent.value = null;
  comment.editable = false;
}

const { mutate: CommunityCommentForPost } = useCommentForPost();

const addCommentToPost = async (post) =>{
  if(post.newComment != ""){
    await CommunityCommentForPost({content: String(post.newComment), linkAuthor: null, linked_id: post.id, user_id: get_fullUser.value.id, type: 0}, {
        onSuccess: (comment) => {
          post.comments.unshift({
            id: comment.id,
            User: {id: get_fullUser.value.id, user_name: get_UserName, User_customization: {profil_picture: get_fullUser.value.User_customization.profil_picture}},
            user_name: get_UserName,
            createdAt: formatDate(new Date()),
            content: post.newComment,
            like: null,
            dislike: null,
            userReaction: null,
            newComment: "",
            showComments: false,
            prepareReply: false,
            gotEdit: false,
            editable: false,
            comments: []
          });

          post.newComment = "";
          post.total_comments = post.total_comments == undefined ? 1 : post.total_comments + 1;
        },
        onError: (error) => {

        },
      });
  }
}

const addCommentToComment = async (comment) =>{
  if(comment.newComment != ""){
    await CommunityCommentForPost({content: String(comment.newComment), linkAuthor: null, linked_id: comment.id, user_id: get_fullUser.value.id, type: 1}, {
      onSuccess: (res_comment) => {
        comment.comments.unshift({
          id: res_comment.id,
          User: {id: get_fullUser.value.id, user_name: get_UserName, User_customization: {profil_picture: get_fullUser.value.User_customization.profil_picture}},
          user_name: get_UserName,
          createdAt: formatDate(new Date()),
          content: comment.newComment,
          like: null,
          dislike: null,
          userReaction: null,
          newComment: "",
          showComments: false,
          prepareReply: false,
          gotEdit: false,
          editable: false,
          comments: []
        });
        comment.prepareReply = false;
        comment.newComment = "";
        comment.total_comments = comment.total_comments == undefined ? 1 : comment.total_comments + 1;
      },
      onError: (error) => {

      },
    });
  }
}

const addLastCommentToComment = async (comment, inner_comment) => {
  if(inner_comment.newComment != ""){
    await CommunityCommentForPost({content: String(inner_comment.newComment), linkAuthor: "@"+comment.user_name, linked_id: comment.id, user_id: get_fullUser.value.id, type: 1}, {
      onSuccess: (res_comment) => {
        comment.comments.unshift({
          id: res_comment.id,
          user_name: get_UserName,
          User: {id: get_fullUser.value.id, user_name: get_UserName, User_customization: {profil_picture: get_fullUser.value.User_customization.profil_picture}},
          createdAt: formatDate(new Date()),
          content: inner_comment.newComment,
          like: null,
          dislike: null,
          userReaction: null,
          newComment: "",
          showComments: false,
          prepareReply: false,
          gotEdit: false,
          editable: false,
          linkAuthor: "@"+comment.user_name,
          comments: []
        });
        inner_comment.prepareReply = false;
        inner_comment.newComment = "";
        comment.total_comments = comment.total_comments == undefined ? 1 : comment.total_comments + 1;
      },
      onError: (error) => {

      },
    });
  }
}

</script>

<style>
.v-img {
  cursor: pointer;
  transition: transform 0.2s ease;
}
.v-img:hover {
  transform: scale(1.05);
}

.PostsMargin:last-child{
  margin-bottom: .6rem;
}

.custom-solo-inverted .v-field{
  background: transparent !important;
  outline: none;
  box-shadow: none;
  color: rgb(var(--v-theme-community_primary_color)) !important;
}

.custom-solo-inverted .v-field input{
  min-height: 0;
  min-width: 0;
  padding-top: .5vw;
  padding-bottom: .5vw;
  font-size: 1.15rem; 
  font-weight: normal;
}

.expand-edit-btn-first-enter-active,
.expand-edit-btn-first-leave-activ{
  transition: all 0.5s ease;
  transition-delay: 1s;
}

.expand-edit-btn-second-enter-active,
.expand-edit-btn-second-leave-active {
  transition: all 0.5s ease;
  transition-delay: 1s;
}

/* ---- editor-area ----*/
.editor-area .editor-container {
  max-width: 60vw;
  margin: auto;
  display: flex;
  flex-direction: column;
}

.editor-area .editor {
  border: .1vw solid rgb(180, 180, 180);
  outline: none;
  padding: 10px;
  min-height: 40vh;
  font-size: 16px;
  white-space: pre-wrap;
  overflow-y: auto;
  border-radius: 4px;
  font-size: medium;
  transition: .3s all;
}

.editor-area .editor:focus {
  border: .1vw solid rgb(var(--v-theme-community_createpost_editor_area_border)) !important;
}
.editor-area .editor:hover {
  border: .1vw solid rgb(var(--v-theme-community_createpost_editor_area_border));
}

.editor-area button {
  padding: 5px 10px;
  cursor: pointer;
}

/* Active button style */
.editor-area .active-btn {
  background-color: rgb(var(--v-theme-community_createpost_btn_active)) !important;
  color: white;
  border-radius: 50%;
}

.editor-area .v-btn {
  color: white;
  border-radius: 50%;
}

.editor-area .v-btn:hover {
  background-color: rgb(var(--v-theme-community_createpost_btn_hover));
}

/* Smaller button size */
.editor-area .v-btn{
  width: 2.5rem;
  height: 2.5rem;
}

.editor a {
  color: #1976d2;
  text-decoration: underline;
  cursor: pointer;
}

.editor a:hover {
  text-decoration: none;
  color: #1565c0;
}

.editor ol li {
  list-style-type: decimal;
  margin-left: 1.5rem;
  transition: .3s;
}
.editor ul li {
  list-style-type: disc;
  margin-left: 1.5rem;
  transition: .3s;
}

.editor a {
  pointer-events: auto;
  color: red;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade {
  transition: opacity 0.5s !important;
}

.chip{
  border: .1vw solid gray; 
  color: gray;
  transition: .3s;
}
.chip:hover, .selected-chip, .PopDate:hover{
  border: .1vw solid rgb(var(--v-theme-community_createpost_editor_area_border)) !important; 
  color: rgb(var(--v-theme-community_primary_color)) !important;
}
.custom_searchCard:hover{
  border: .1vw solid rgb(var(--v-theme-community_createpost_editor_area_border)) !important; 
}
.mobilExpensionText .v-expansion-panel-text__wrapper{
  padding: 0;
}
</style>