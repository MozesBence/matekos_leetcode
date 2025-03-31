<template>
  <main>
    <v-container fluid class="d-flex" style="margin-right: 0; width: 100%; position: relative;">
      <div
        :style="{
          height: 'max-content',
          maxWidth: '34.5%',
          width: '100%',
          top: 'inherite',
        }"
        class="mr-3 rounded"
        v-if="!isMobile"
      >
        <v-list class="rounded">
          <v-list-item>
            <div class="d-flex align-center justify-center ga-2 pa-2 rounded">
              <v-text-field
                v-model="searchQuery"
                label="Keresés"
                clearable
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
                  <h2 class="text-h6 mb-2">Tagek</h2>
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
      </div>

        <v-row>
          <v-col
          v-if="isMobile"
          :cols="isMobile ? 12 : 0"
          class="order-0 order-md-0"
          >
            <v-expansion-panels v-if="isMobile">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <v-icon size="20" class="mr-2">mdi-magnify</v-icon>
                  <h2 style="font-weight: normal;">Keresési lehetőségek</h2>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="mobilExpensionText">
                  <v-list>
                    <v-list-item>
                      <div class="pa-2 d-flex align-center justify-center ga-3">
                        <v-text-field
                          v-model="searchQuery"
                          label="Keresés"
                          clearable
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
                  <img v-if="post.User.User_customization.profil_picture" :src="post.User.User_customization.profil_picture"  alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                  <v-icon v-else style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">mdi-account</v-icon>
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

                <v-divider v-if="post.tags && post.tags.length > 0"></v-divider>

                <div v-if="post.tags.length > 0" class="text-center d-flex flex-row flex-wrap align-center">
                  <div class="d-flex flex-row align-items-center mr-2">
                    <v-icon icon="mdi-label-multiple" class="mx-1 ml-4" color="community_primary_color"></v-icon>
                    <span class="font-weight-normal">Címkék</span>
                  </div>
                  <v-chip
                    v-for="tag in post.tags"
                    :key="tag"  
                    class="mx-1 my-2"
                    color="community_primary_color"
                    variant="outlined"
                  >
                    <v-icon icon="mdi-tag-multiple" start></v-icon>
                    <h3 style="font-weight: normal;">{{ tag }}</h3>
                  </v-chip>
                </div>

                <v-divider></v-divider>

                <v-card-actions class="position-relative">
                  <v-btn icon @click="like(post,'post')">
                    <v-icon color="red">{{ post.likes[0].user_reacted == 'like' ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                    {{ post.likes[0].total_likes > 0 ? post.likes[0].total_likes : null }}
                  </v-btn>
                  <v-btn icon @click="dislike(post,'post')">
                    <v-icon color="purple">{{ post.likes[0].user_reacted == 'dislike' ? 'mdi-heart-broken' : 'mdi-heart-broken-outline' }}</v-icon>
                    {{ post.likes[0].total_dislikes > 0 ? post.likes[0].total_dislikes : null }}
                  </v-btn>
                  <v-btn icon color="community_primary_color" @click="post.showComments = !post.showComments" class="rounded-circle" v-if="(post.total_comments) > 0">
                    <v-icon> {{ post.showComments ? "mdi-comment-text" : "mdi-comment-text-outline" }} </v-icon>
                    {{ post.total_comments }}
                  </v-btn>
                  <v-btn text color="community_primary_color" @click="post.showComments = true" v-if="get_user_by_token">
                    Válasz
                  </v-btn>
                  <v-btn v-if="post.user_name == get_UserName && !post.editable" text elevation="0" @click="EditPostOpen(post)">
                    Módosítás
                  </v-btn>
                  <v-btn
                    elevation="0"
                    icon
                    small
                    style="position: absolute; right: 0;"
                    class="mr-3"
                    @click="AlertOpen(post,true)"
                    v-if="get_fullUser"
                  >
                    <v-icon>mdi-flag-outline</v-icon>
                  </v-btn>
                </v-card-actions>
                <!-- Komment szekció -->
                <v-expand-transition>
                  <div v-if="post.showComments">
                    <!-- Új komment -->
                    <v-expand-transition>
                      <div class="position-relative mx-4 pa-2" v-if="get_user_by_token">
                        <div class="d-flex flex-row align-center mb-3 pa-1 pr-2 rounded-xl" style="width: max-content; background-color: rgb(var(--v-theme-community_comment_bc));">
                          <img v-if="get_fullUser.User_customization.profil_picture" :src="get_fullUser.User_customization.profil_picture" alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                          <v-icon v-else style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">mdi-account</v-icon>
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
                    </v-expand-transition>
                    
                    <v-divider class="my-2" v-if="post.total_comments > 0"></v-divider>
                    <!-- Kommentek listája -->
                    <div v-for="(comment, index) in post.comments" :key="comment.id" class="d-flex flex-column rounded-lg ma-4 pt-3" style="background-color: rgb(var(--v-theme-community_comment_bc));">
                      <transition-group name="expand-transition" tag="div">
                        <div class="d-flex flex-column pl-2 position-relative" :key="comment.id">
                          <div class="d-flex ga-2 align-center">
                            <div 
                              class="d-flex flex-row align-center mb-1 pa-1 pr-2 rounded-xl" 
                              style="width: max-content; background-color: rgb(var(--v-theme-community_posts_bc)); cursor: pointer;"
                              @click="router.push({ name: 'profile', params: { id: comment.User.id } })"
                            >
                              <img v-if="comment.User.User_customization.profil_picture" :src="comment.User.User_customization.profil_picture" 
                                alt="" 
                                style="height: 2rem; width: 2rem; border-radius: 50%;" 
                                class="mr-3"
                              >
                              <v-icon v-else style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">mdi-account</v-icon>
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
                      <div class="ml-1 position-relative">
                        <v-btn icon @click="like(comment,'comment')" elevation="0" style="background-color: transparent;">
                          <v-icon color="red">{{ comment.likes[0].user_reacted === 'like' ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                          {{ comment.likes[0].total_likes > 0 ? comment.likes[0].total_likes : null }}
                        </v-btn>
                        <v-btn icon @click="dislike(comment,'comment')" elevation="0" style="background-color: transparent;">
                          <v-icon color="purple">{{ comment.likes[0].user_reacted === 'dislike' ? 'mdi-heart-broken' : 'mdi-heart-broken-outline' }}</v-icon>
                          {{ comment.likes[0].total_dislikes > 0 ? comment.likes[0].total_dislikes : null }}
                        </v-btn>
                        <v-btn icon color="transparent" elevation="0" @click="comment.showComments = !comment.showComments" class="rounded-circle" v-if="comment.total_comments > 0">
                          <v-icon> {{ comment.showComments ? "mdi-comment-text" : "mdi-comment-text-outline" }}</v-icon>
                          {{ comment.total_comments }}
                        </v-btn>
                        <v-btn text color="transparent" elevation="0" @click="prepareReply(comment)" v-if="get_user_by_token">
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
                        <v-btn
                          elevation="0"
                          icon
                          small
                          style="position: absolute; right: 0; background-color: transparent;"
                          class="mr-3"
                          @click="AlertOpen(comment,false)"
                          v-if="get_fullUser"
                        >
                          <v-icon>mdi-flag-outline</v-icon>
                        </v-btn>
                      </div>
                      <v-expand-transition>
                        <div v-if="comment.showComments">
                          <!-- Új komment -->
                          <v-expand-transition>
                            <div class="position-relative mx-4 pa-2" v-if="comment.prepareReply && get_user_by_token">
                              <div 
                              class="d-flex flex-row align-center mb-3 pa-1 pr-2 rounded-xl" 
                              style="width: max-content; background-color: rgb(var(--v-theme-community_comment_bc));"
                              >
                                <img v-if="get_fullUser.User_customization.profil_picture" :src="get_fullUser.User_customization.profil_picture" alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                                <v-icon v-else style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">mdi-account</v-icon>
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
                              <div v-for="(inner_comment, index) in comment.comments" :key="inner_comment.id" class="d-flex flex-column rounded-lg ma-4 pt-3" style="background-color: rgb(var(--v-theme-community_comment_bc));">
                                <transition-group name="expand-transition" tag="div">
                                  <div class="d-flex flex-column pl-2" :key="inner_comment.id">
                                    <div class="d-flex ga-2 align-center">
                                      <div 
                                      class="d-flex flex-row align-center mb-1 pa-1 pr-2 rounded-xl" 
                                      style="width: max-content; background-color: rgb(var(--v-theme-community_posts_bc)); cursor: pointer;"
                                      @click="router.push({ name: 'profile', params: { id: inner_comment.User.id } })"
                                      >
                                        <img v-if="inner_comment.User.User_customization.profil_picture" :src="inner_comment.User.User_customization.profil_picture" alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                                        <v-icon v-else style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">mdi-account</v-icon>
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
                                    <v-icon color="red">{{ inner_comment.likes[0].user_reacted === 'like' ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                                    {{ comment.likes[0].total_likes > 0 ? comment.likes[0].total_likes : null }}
                                  </v-btn>
                                  <v-btn icon @click="dislike(inner_comment,'comment')" elevation="0" style="background-color: transparent;">
                                    <v-icon color="purple">{{ inner_comment.likes[0].user_reacted === 'dislike' ? 'mdi-heart-broken' : 'mdi-heart-broken-outline' }}</v-icon>
                                    {{  comment.likes[0].total_dislikes > 0 ? comment.likes[0].total_dislikes : null }}
                                  </v-btn>
                                  <v-btn v-if="inner_comment.user_name != get_UserName && get_user_by_token" text color="transparent" elevation="0" @click="prepareReply(inner_comment)">
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
                                      <img v-if="inner_comment.User.User_customization.profil_picture" :src="inner_comment.User.User_customization.profil_picture" alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                                      <v-icon v-else style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">mdi-account</v-icon>
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
                          <div class="align-center d-flex justify-center mb-4 pa-4 position-relative" v-if="comment.comments.length < comment.total_comments">
                            <v-divider class=""></v-divider>
                            <v-btn
                              elevation="0"
                              icon
                              small
                              @click="loadMoreComments(comment,2)"
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

                    <div class="align-center d-flex justify-center mb-4 pa-4 position-relative" v-if="post.comments.length < post.total_comments">
                      <v-divider class=""></v-divider>
                      <v-btn
                        elevation="0"
                        icon
                        small
                        @click="loadMoreComments(post,1)"
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
            <div class="d-flex justify-center w-100 mx-3 my-5" v-if="PostLoading">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <!-- Alert modal -->
      <v-dialog v-model="showAlert" :style="{maxWidth: isMobile ? '100%': '1000px'}" max-height="100vh" min-width="340px" width="auto" class="px-3">
        <v-card>          
          <v-card-title>Bejelentés</v-card-title>
          <v-card-text class="px-2">
            <v-radio-group class="px-2" style="transition: .3s;" v-model="ReportSelected">

              <div class="mb-2">
                <h3 class="ml-2">Általános szabályszegések</h3>
              </div>

              <v-divider></v-divider>

              <div>
                <v-radio value="Spam" class="my-1">
                  <template v-slot:label>
                    <div>
                      <strong>Spam</strong> - Indokolatlan, értelmetlen vagy többször ismétlődő poszt.
                    </div>
                  </template>
                </v-radio>
                <v-radio value="Hamis információ" class="my-1">
                  <template v-slot:label>
                    <div>
                      <strong>Hamis információ</strong> - Téves vagy félrevezető információ terjesztése.
                    </div>
                  </template>
                </v-radio>
                <v-radio value="Off-topic" class="my-1">
                  <template v-slot:label>
                    <div>
                      <strong>Off-topic</strong> - Nem kapcsolódik a fórum témájához vagy adott beszélgetéshez.
                    </div>
                  </template>
                </v-radio>
              </div>

              <v-divider></v-divider>

              <div class="my-2">
                <h3 class="ml-2">Káros vagy sértő tartalom</h3>
              </div>

              <v-divider></v-divider>

              <div>
                <v-radio value="Gyűlöletbeszéd" class="my-1">
                  <template v-slot:label>
                    <div>
                      <strong>Gyűlöletbeszéd</strong> - Másokat sértő, rasszista, szexista, homofób vagy más módon gyűlöletkeltő tartalom.
                    </div>
                  </template>
                </v-radio>
                <v-radio value="Zaklatás vagy fenyegetés" class="my-1">
                  <template v-slot:label>
                    <div>
                      <strong>Zaklatás vagy fenyegetés</strong> - Más felhasználók fenyegetése, zaklatása vagy személyes támadása.
                    </div>
                  </template>
                </v-radio>
                <v-radio value="Trágárság vagy durva nyelvezet" class="my-1">
                  <template v-slot:label>
                    <div>
                      <strong>Trágárság vagy durva nyelvezet</strong> - Túlzottan vulgáris vagy agresszív megnyilvánulások.
                    </div>
                  </template>
                </v-radio>
              </div>

              <v-divider></v-divider>

              <div class="my-2">
                <h3 class="ml-2">Káros vagy illegális fájlok</h3>
              </div>

              <v-divider></v-divider>

              <div>
                <v-radio value="Illegális tartalom" class="my-1">
                  <template v-slot:label>
                    <div>
                      <strong>Illegális tartalom</strong> - Szerzői jogokat sértő vagy illegális fájlok (pl. kalóz szoftver, lopott adatok).
                    </div>
                  </template>
                </v-radio>
                <v-radio value="Vírus vagy rosszindulatú program" class="my-1">
                  <template v-slot:label>
                    <div>
                      <strong>Vírus vagy rosszindulatú program</strong> - Kártékony fájlok vagy linkek megosztása.
                    </div>
                  </template>
                </v-radio>
                <v-radio value="Tiltott vagy veszélyes anyagok" class="my-1">
                  <template v-slot:label>
                    <div>
                      <strong>Tiltott vagy veszélyes anyagok</strong> - Pl. fegyverekkel, drogokkal kapcsolatos dokumentumok.
                    </div>
                  </template>
                </v-radio>
              </div>

              <v-divider></v-divider>

              <div class="my-2">
                <h3 class="ml-2">Egyéb közösségi problémák</h3>
              </div>

              <v-divider></v-divider>

              <div>
                <v-radio value="Önveszélyes vagy öngyilkossági tartalom" class="my-1">
                  <template v-slot:label>
                    <div>
                      <strong>Önveszélyes vagy öngyilkossági tartalom</strong> - Ha valaki veszélyes viselkedést vagy öngyilkossági gondolatokat oszt meg.
                    </div>
                  </template>
                </v-radio>
                <v-radio value="Személyes adatok közzététel" class="my-1">
                  <template v-slot:label>
                    <div>
                      <strong>Személyes adatok közzététele</strong> - Pl. telefonszám, cím, jelszó vagy más érzékeny adat publikálása.
                    </div>
                  </template>
                </v-radio>
                <v-radio value="Tartalomduplikáció" class="my-1">
                  <template v-slot:label>
                    <div>
                      <strong>Tartalomduplikáció</strong> -  Ugyanaz a poszt már létezik a platformon.
                    </div>
                  </template>
                </v-radio>
              </div>

            </v-radio-group>
          </v-card-text>
  
          <v-card-actions>
            <v-btn color="success" :disabled="!ReportSelected" @click="SendReport(true)">Küldés</v-btn>
            <v-btn text @click="showAlert = false;">Mégse</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Új poszt létrehozása modal -->
      <v-dialog v-model="showPostDial" :style="{maxWidth: isMobile ? '100%': '1000px'}" max-height="100vh">
        <v-card>
          <v-card-title>Új poszt létrehozása</v-card-title>
          <v-card-text class="pa-0">
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
            
            <v-container class="editor-area" style="max-width: 1600px;">
              <v-row>
                <v-col cols="12">
                  <div class="editor-container">
                    <!-- Toolbar -->
                    <div class="d-flex justify-start ga-2 mb-2 editor-btns flex-wrap">
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
            <v-card
              class="mb-1 mx-4 rounded custom_searchCard"
              elevation="0"
              style="transition: .3s;"
              :style="{border: FilterOptForCreate.length > 0 ? '.1vw solid rgb(var(--v-theme-community_createpost_editor_area_border))' : '.1vw solid gray'}"
            >
              <v-card-text>
                <h2 class="text-h6 mb-2">Tagek</h2>
                <v-chip-group
                  v-model="FilterOptForCreate"
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
                    :class="{'selected-chip': FilterOptForCreate.includes(FilterChips.indexOf(chip))}"
                  ></v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
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
                  <ul class="mx-12">
                    <transition-group 
                      name="expand-transition"
                      appear
                    >
                      <!-- Kulcsot rendelünk a file.name + index kombinációval -->
                      <li v-for="(file, index) in newPost.files" :key="`${file.name}-${index}`">
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
                    </transition-group>
                  </ul>
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
  </main>
</template>

<script setup>
import { onMounted, onUnmounted, ref, reactive, computed, nextTick, watch, watchEffect, inject} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProfileGetUser } from '@/api/profile/profileQuery';
import { 
  useCommunityPost, 
  useGetCommunityPost, 
  useCommunityEditPost,
  useLikeDislikeForPost, 
  useCommentForPost, 
  useCommentEdit, 
  useCommunityTags,
  useGetCommunityComments,
  useSendReports
} from '@/api/community/communityQuery';
import imageCompression from 'browser-image-compression';
import { useDisplay } from 'vuetify';

// Router és route hookok
const router = useRouter();
const route = useRoute();

// Üzenetkezelés
const showError = inject("showError");
const showSucces = inject("showSucces");

// Képernyő méret / eszköz
const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);

// Cookie kezelés
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

// <------- Változók ------->

var get_user_by_token = getCookie('user') != null && getCookie('user') != 'undefined' && typeof getCookie('user') != "object" ? getCookie('user') : null;
const get_fullUser = ref(null);
const get_UserName = ref('Betöltés...');
const posts_limit = ref(10);
const total_posts = ref(null);
const PostLoading = ref(true);
const showAlert = ref(false);
const ReportSelected = ref(null);
const SelectedReportArray = ref(null);
const SelectedReportArrayType = ref(true);
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
const saveEditingChips = ref([]);
const newPost = reactive({ title: "", images: ref([]), files: ref([]) });
const editingPost = reactive({ title: "", images: ref([]), files: ref([]), content: "" });
const posts = reactive([]);
const showCreatePost = ref(false);
const searchQuery = ref("");
let timeout = null;
const FilterChips = ref([]);
const FilterOpt = ref([]);
const FilterOptForCreate = ref([]);
const sortOptions = ref([]);
const sortOptionForPop = ref('');
let execCommandCheckInterval = null;
const loading = ref(false);

// <------- Változók ------->

// <------- Api hívások ------->

// Api hívás - közösségi címkék kezelése
const mutation = useCommunityTags();

// Api hívás - felhasználói profil lekérése
const { mutate: ProfileGetUser } = useProfileGetUser();

// Api hívás - közösségi bejegyzések lekérése
const { mutate: CommunityGetLimitedPosts } = useGetCommunityPost();

// Api hívás - jelentések küldése
const { mutate: CommunityReports } = useSendReports();

// Api hívás - bejegyzés módosítása
const { mutate: CommunityEditPostUpload } = useCommunityEditPost();

// Api hívás - új bejegyzés feltöltése
const { mutate: CommunityPostUpload } = useCommunityPost(loading);

// Api hívás - like/dislike művelet egy bejegyzésen
const { mutate: CommunityLikeDislikeForPost } = useLikeDislikeForPost();

// Api hívás - komment módosítása
const { mutate: CommunityCommentEdit } = useCommentEdit();

// Api hívás - új komment hozzáadása bejegyzéshez
const { mutate: CommunityCommentForPost } = useCommentForPost();

// Api hívás - limitált kommentek lekérése
const { mutate: CommunityGetLimitedComments } = useGetCommunityComments();

// <------- Api hívások ------->

// <------- Függvények | figyelők ------->

onMounted(async () => {
  if (get_user_by_token != null) {
    try {
      await ProfileGetUser({ token: get_user_by_token, id: 0 }, {
        onSuccess: (get_user) => { get_UserName.value = get_user.user_name; get_fullUser.value = get_user; },
        onError: (error) => {showError ? showError(error.response.data) : console.log(error.response.data);},
      });
    } catch (error) {
      showError ? showError(error.response.data) : console.log(error.response.data);
    }
  } else {
    await CommunityGetLimitedPosts({
      limit: posts_limit.value,
      offset: posts.length,
      id: null,
      filter: null,
      tagsArray: null,
      search: null
    }, {
      onSuccess: (posts_array) => {
        PostLoading.value = false;
        total_posts.value = posts_array.total_posts;
        posts_array.posts && posts_array.posts.forEach(post => setTimeout(() => postsConvertToDisplay(post, true, false)));
      },
      onError: (error) => {
        showError ? showError(error.response.data) : console.log(error.response.data);
      }
    });
  }
});

watch(get_fullUser, async (User) => {
  CommunityGetLimitedPosts({
    limit: posts_limit.value,
    offset: posts.length,
    id: User.id,
    filter: null,
    tagsArray: null,
    search: null
  }, {
    onSuccess: (posts_array) => {
      console.log(posts_array);
      PostLoading.value = false;
      total_posts.value = posts_array.total_posts;
      posts_array.posts && posts_array.posts.forEach(post =>
        setTimeout(() => postsConvertToDisplay(post, true, false))
      );
    },
    onError: (error) =>
      showError ? showError(error.response.data) : console.log(error.response.data)
  });
});

function formatDate(date) {
  return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')} ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;
}

function AlertOpen(array,igaze){
  showAlert.value = true;
  ReportSelected.value = null;
  SelectedReportArray.value = array;
  SelectedReportArrayType.value = igaze;
}

const SendReport = async (post) => {
  await CommunityReports({
    type: true,
    notif_content: ReportSelected.value,
    content_type: SelectedReportArrayType.value,
    user_id: SelectedReportArray.value.User.id,
    from_user_id: get_fullUser.value.id,
    content_id: SelectedReportArray.value.id
  }, {
    onSuccess: (response) => showSucces ? showSucces("Bejelentés el lett küldve!") : console.log("Bejelentés el lett küldve!"),
    onError: (error) => showError ? showError(error.response.data) : console.log(error.response.data)
  });

  showAlert.value = false;
};

watchEffect(() => {
  mutation.mutate(undefined, {
    onSuccess: (response) => FilterChips.value.push(...response.map(item => item.tag)),
    onError: (error) => showError ? showError(error.response.data) : console.log(error.response.data)
  });
});

const fetchPosts = async ({ search = null, tags = null, sort = null } = {}) => {
  posts.length = 0;
  PostLoading.value = true;

  await CommunityGetLimitedPosts({
    limit: posts_limit.value,
    offset: posts.length,
    id: get_fullUser.value?.id || null,
    filter: [sortOptions.value[0], sort],
    tagsArray: tags?.length ? JSON.stringify(tags.map(num => num + 1)) : null,
    search
  }, {
    onSuccess: (posts_array) => {
      PostLoading.value = false;
      total_posts.value = posts_array.total_posts;
      posts_array.posts?.forEach(post => setTimeout(() => postsConvertToDisplay(post, true, false)));
    },
    onError: (error) => showError ? showError(error.response.data) : console.log(error.response.data)
  });
};

watch(searchQuery, async (newValue) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => fetchPosts({ search: newValue, tags: FilterOpt.value }), 300);
});

watch(FilterOpt, async (newVal, oldVal) => {
  if (newVal.length || (oldVal.length && !newVal.length)) {
    fetchPosts({ search: searchQuery.value, tags: newVal });
  }
});

const toggleOption = async (option) => {
  if (!sortOptions.value.length) {
    sortOptions.value = [option];
  } else if (sortOptions.value[0] === option) {
    sortOptions.value = [];
  } else {
    sortOptions.value[0] = option;
  }
  fetchPosts({ search: searchQuery.value, tags: FilterOpt.value });
};

watch(sortOptionForPop, async (newSortOption) => {
  fetchPosts({ 
    search: searchQuery.value, 
    tags: FilterOpt.value, 
    sort: newSortOption === 'date' ? 'DESC' : 'ASC'
  });
});

watch(sortOptions, async (newSortOptions) => {
  if (sortOptionForPop.value[0]) {
    fetchPosts({ search: searchQuery.value, tags: FilterOpt.value, sort: sortOptionForPop.value[0] === 'date' ? 'ASC' : 'DESC' });
  }
}, { deep: true });

const checkScroll = async () => {
  if (total_posts.value === posts.length || PostLoading.value) return;

  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    PostLoading.value = true;

    await fetchPosts({
      search: searchQuery.value,
      tags: FilterOpt.value,
      sort: sortOptions.value[0] === 'date' ? 'DESC' : 'ASC'
    });

    PostLoading.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
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
  FilterOptForCreate.value = [...post.tags.map(c=> FilterChips.value.indexOf(c))];
  saveEditingChips.value = [...post.tags.map(c=> FilterChips.value.indexOf(c))];
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

const EditPostConf = async () => {
  const editor = document.querySelector(".editor");
  if (!editor) return;

  const htmlContent = editor.innerHTML.trim();
  if (!htmlContent || htmlContent === "<br>") return;

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  const imgElements = [...tempDiv.querySelectorAll("img")];
  imgElements.forEach(img => img.removeAttribute("src"));

  //Nem létező képek kiszűrése
  editingPost.images = editingPost.images.filter((_, i) =>
    imgElements.some(img => img.id === (i + 1).toString())
  );

  const cleanedHtmlContent = tempDiv.innerHTML;
  const changedFiles = [...editingPost.images, ...editingPost.files];
  const defaultFiles = [...defaultPostSave.value.images, ...defaultPostSave.value.files];

  const [changedCompressed, defaultCompressed] = await Promise.all([
    compressingFiles(changedFiles),
    compressingFiles(defaultFiles)
  ]);

  //Új fájlok keresése
  const newFiles = changedCompressed.filter(changedFile =>
    typeof changedFile !== 'number' &&
    changedFile &&
    !defaultCompressed.some(f => f && f.name === changedFile.name && f.size === changedFile.size && f.type === changedFile.type)
  );

  //Törölt fájlok keresése
  const noneExistingFiles = defaultCompressed
    .map((file, i) => (changedCompressed.some(f => f && f.name === file.name && f.size === file.size && f.type === file.type) ? null : defaultCompressed[i + 1]))
    .filter(Boolean);

  //Címkék különbsége
  const newChips = FilterOptForCreate.value.filter(c => !saveEditingChips.value.includes(c)).map(x => x + 1);
  const noneChips = saveEditingChips.value.filter(c => !FilterOptForCreate.value.includes(c)).map(x => x + 1);

  //Ha nincs érdemi változás, nem kell frissíteni
  if (
    defaultPostSave.value.title === editingPost.title &&
    defaultPostSave.value.content === editor.value &&
    JSON.stringify(defaultPostSave.value.files) === JSON.stringify(editingPost.files) &&
    JSON.stringify(defaultPostSave.value.images) === JSON.stringify(editingPost.images)
  ) return;

  //Post frissítés API hívás
  await CommunityEditPostUpload({
    id: defaultPostSave.value.id,
    title: editingPost.title,
    content: cleanedHtmlContent,
    files: newFiles,
    none_files: noneExistingFiles,
    new_Chips: newChips.length ? newChips : [],
    none_Chips: noneChips.length ? noneChips : []
  }, {
    onSuccess: async () => {
      const post = posts.find(c => c.id === defaultPostSave.value.id);
      if (!post) return;

      //Fájlok frissítése
      post.files = [
        ...post.files,
        ...await Promise.all(editingPost.files.map(async file => {
          if (typeof file.file === 'object') {
            const fileRes = await fileToBase64(file.file);
            return reactive({
              file: fileRes,
              file_name: file.name,
              file_size: file.size,
              file_type: file.type,
              id: null,
              name: file.name,
              post_id: defaultPostSave.value.id
            });
          }
          return null;
        })).then(arr => arr.filter(Boolean))
      ];

      //Képek frissítése
      post.images = [
        ...post.images,
        ...editingPost.images.filter(img =>
          !post.images.some(existing => existing.file_name === img.name && existing.id !== null)
        ).map(img => reactive({
          file: img.url,
          file_name: img.name,
          file_size: img.size,
          file_type: img.type,
          id: null,
          name: img.name,
          post_id: defaultPostSave.value.id
        }))
      ];

      //Törölt fájlok eltávolítása
      post.images = post.images.filter(img => !noneExistingFiles.includes(img.id));
      post.files = post.files.filter(file => !noneExistingFiles.includes(file.id));

      //Egyéb frissítések
      post.title = editingPost.title;
      post.content = cleanedHtmlContent;
      post.tags = FilterOptForCreate.value.map(i => FilterChips.value[i]);
      post.gotEdit = true;

      showSucces ? showSucces("A post sikeresen módosítva lett!") : console.log("A post sikeresen módosítva lett!");
    },
    onError: (error) =>{
      showError ? showError(error.response.data) : console.log(error.response.data);
    }
  });

  ShowPostClose();
};

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
  FilterOptForCreate.value = [];
  saveEditingChips.value = [];
}

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
    };
    
    reader.readAsDataURL(file);
  } else {
    showError ? showError('A fájl nem megfelelő típusú vagy túl nagy (max 1MB).') : console.log('A fájl nem megfelelő típusú vagy túl nagy (max 1MB).');
  }
};

function checkSelection() {
  const editor = document.querySelector(".editor");
  if (document.activeElement !== editor) return;

  const selection = document.getSelection();
  if (!selection.rangeCount) return;

  const selectedRange = selection.getRangeAt(0);
  const parent = selectedRange.startContainer.parentElement;
  if (!parent) return;

  const computedStyle = window.getComputedStyle(parent);
  const ancestor = selectedRange.commonAncestorContainer.parentElement;

  activeBold.value = computedStyle.fontWeight == "700";
  activeItalic.value = computedStyle.fontStyle == "italic";
  activeStrikethrough.value = computedStyle.textDecorationLine == "line-through";
  activeUnderline.value = computedStyle.textDecorationLine == "underline" && ancestor.tagName !== "A";
  activeAlignLeft.value = ["start", "left"].includes(computedStyle.textAlign);
  activeAlignCenter.value = computedStyle.textAlign == "center";
  activeAlignRight.value = computedStyle.textAlign == "right";
  activeOrderedList.value = ancestor?.parentElement?.tagName == "OL";
  activeUnorderedList.value = ancestor?.parentElement?.tagName == "UL";
  activeLink.value = ancestor.tagName == "A";
}

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

const addPost = async () => {
  const editor = document.querySelector(".editor");
  if (!editor || !newPost.title || !editor.innerHTML || !get_fullUser.value?.id) return;

  loading.value = true;

  // Tisztított HTML tartalom
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = editor.innerHTML;
  tempDiv.querySelectorAll("img").forEach(img => img.removeAttribute("src"));

  const cleanedHtmlContent = tempDiv.innerHTML;
  const compressedFiles = await compressingFiles([...newPost.images, ...newPost.files]);
  const tagsArray = FilterOptForCreate.value.map(num => num + 1);

  await CommunityPostUpload(
    {
      id: get_fullUser.value.id,
      title: newPost.title,
      content: cleanedHtmlContent,
      files: compressedFiles,
      chips: tagsArray,
    },
    {
      onSuccess: (response) => {
        loading.value = false;
        postsConvertToDisplay(
          {
            id: response.id,
            user_name: get_UserName.value,
            User: {
              id: get_fullUser.value.id,
              user_name: get_UserName.value,
              User_customization: { profil_picture: get_fullUser.value.User_customization.profil_picture },
            },
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
            files: [...newPost.files],
            images: [...newPost.images],
            tags: FilterOptForCreate.value.map(i => FilterChips.value[i]),
            commentLimit: 10,
            showComments: false,
            total_comments: 0,
          },
          false,
          false
        );
        showSucces ? showSucces("A post sikeresen fel lett töltve!") : console.log("A post sikeresen fel lett töltve!");
      },
      onError: (error) => {
        loading.value = false;
        showError ? showError(error.response.data) : console.log(error.response.data);
      },
    }
  );
};

function postsConvertToDisplay(array, formatDateFlag, appendToEnd) {
  array.createdAt = formatDateFlag ? array.createdAt.replace(/T/, " ").split(".")[0].slice(0, -3) : array.createdAt;
  array.comments.forEach(comment => {
    comment.createdAt = comment.createdAt.replace(/T/, " ").split(".")[0].slice(0, -3);
    comment.comments.forEach(inner => (inner.createdAt = inner.createdAt.replace(/T/, " ").split(".")[0].slice(0, -3)));
  });

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = array.content;

  tempDiv.querySelectorAll("img").forEach((img, index) => {
    if (array.images[index]) {
      img.setAttribute("src", array.images[index].url || array.images[index].file);
    }
  });

  array.content = tempDiv.innerHTML;

  if (!posts.some(post => post.id === array.id)) {
    appendToEnd ? posts.push(array) : posts.unshift(array);
  }

  Object.assign(newPost, { files: [], images: [], title: "" });

  ShowPostClose();
}

const compressingFiles = async (mergedArray) => {
  const compressedFiles = [];

  for (const file of mergedArray) {
    if (!file) continue;

    let blob;
    try {
      if (file.url) {
        const response = await fetch(file.url);
        if (!response.ok) throw new Error(`HTTP hiba: ${response.status}`);
        blob = await response.blob();
      } else if (file.file instanceof Blob) {
        blob = file.file;
      } else {
        blob = new Blob([file.file], { type: file.type || "application/octet-stream" });
      }

      if (!blob) continue;

      if (file.type?.startsWith("image/") && file.type !== "image/gif") {
        blob = await imageCompression(blob, { maxSizeMB: 0.1, useWebWorker: true });
      }

      const fileType = file.name.endsWith(".gif") ? "image/gif" : blob.type;
      const compressedFile = new File([blob], file.name || `file_${Date.now()}`, { type: fileType });

      compressedFiles.push(compressedFile);
      if (showEditPost.value) compressedFiles.push(file.id, file.type, file.size);
    } catch (error) {
      showError ? showError(error.response?.data || error) : console.log(error);
    }
  }

  return compressedFiles;
};

nextTick(() => {
  const editor = document.querySelector(".editor");
  if (!editor) return;

  editor.addEventListener("dragover", (event) => event.preventDefault());
  editor.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.dataTransfer.files.length) {
      const reader = new FileReader();
      reader.onload = insertImage;
      reader.readAsDataURL(event.dataTransfer.files[0]);
    }
  });
});

const insertImage = () => {
  const editor = document.querySelector(".editor");
  if (!editor) return showError ? showError("Editor div nem található.") : console.log("Editor div nem található.");

  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  if (!editor.contains(range.startContainer)) return;

  const imagesArray = showCreatePost.value ? newPost.images : editingPost.images;
  const lastImage = imagesArray[imagesArray.length - 1];
  if (!lastImage) return;

  const img = Object.assign(document.createElement("img"), {
    src: lastImage.url,
    alt: `Uploaded ${imagesArray.length}. Image`,
    id: imagesArray.length,
    style: "max-width: 100%; height: 20vh; display: block;",
  });

  range.deleteContents();
  range.insertNode(img);
  range.setStartAfter(img);
  range.setEndAfter(img);
  selection.removeAllRanges();
  selection.addRange(range);
};

function handleFileUpload(event) {
  const files = Array.from(event.target.files).filter(f => f.size <= 10 * 1024 * 1024); // Max 10MB

  files.forEach(file => {
    const obj = {
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      file,
    };

    const targetList = showCreatePost.value ? newPost.files : editingPost.files;
    if (!targetList.some(f => f.name === obj.name && f.size === obj.size && f.type === obj.type)) {
      targetList.push(obj);
    }
  });

  event.target.value = ''; // Input reset
}

function downloadFile(file) {
  try {
    const link = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(dataURLtoBlob(file.file)),
      download: file.file_name || "file",
    });

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (error) {
    showError ? showError(error.response?.data || error) : console.log(error);
  }
}

function dataURLtoBlob(dataURL) {
  const [mime, base64] = dataURL.match(/:(.*?);/)?.slice(1).concat(dataURL.split(",")[1]) || [];
  return new Blob([Uint8Array.from(atob(base64), c => c.charCodeAt(0))], { type: mime });
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

const triggerFileInput = () => fileInput.value?.click();

function fileDelete(index) {
  const targetPost = showCreatePost.value ? newPost.files : editingPost.files;
  targetPost.splice(index, 1);
}

const like = async (post, upload_type) => {
  if (!get_user_by_token) return;

  const oppositeReaction = post.userReaction === 'like' ? 'like' : 'dislike';
  const change = post.userReaction !== oppositeReaction;
  
  if (change) {
    if (post.userReaction === 'dislike') post.dislike -= 1;
    post.like += post.userReaction === 'like' ? -1 : 1;
    post.userReaction = change ? 'like' : null;
    await CommunityLikeDislikeForPost({post_id: post.id, user_id: get_fullUser.value.id, upload_type, type: 0});
  }
};

const dislike = async (post, upload_type) => {
  if (!get_user_by_token) return;

  const oppositeReaction = post.userReaction === 'dislike' ? 'dislike' : 'like';
  const change = post.userReaction !== oppositeReaction;
  
  if (change) {
    if (post.userReaction === 'like') post.like -= 1;
    post.dislike += post.userReaction === 'dislike' ? -1 : 1;
    post.userReaction = change ? 'dislike' : null;
    await CommunityLikeDislikeForPost({post_id: post.id, user_id: get_fullUser.value.id, upload_type, type: 1});
  }
};

function prepareReply(array) {
  Object.assign(array, { prepareReply: true, showComments: true });
}

function commentEdit(comment, id) {
  if (editingComment.value) {
    editingComment.value.editable = false;
    document.getElementById(editingID.value).value = editingContent.value;
    editingComment.value.content = editingContent.value;
  }

  Object.assign(comment, { editable: true });
  editingComment.value = comment;
  editingID.value = id;
  editingContent.value = comment.content;

  nextTick(() => document.getElementById(id)?.focus());
}

const commentEditConf = async (comment, id) => {
  const edited_content = document.getElementById(id).value;

  if (edited_content) {
    await CommunityCommentEdit({content: String(edited_content), comment_id: comment.id});
    comment.gotEdit = true;
  }

  Object.assign(editingID, {value: null});
  Object.assign(editingComment, {value: null});
  Object.assign(editingContent, {value: null});
  comment.editable = false;
};

function CommentClose(comment) {
  Object.assign(editingID, {value: null});
  Object.assign(editingComment, {value: null});
  Object.assign(editingContent, {value: null});
  comment.editable = false;
}

const addCommentToPost = async (post) => {
  if (!post.newComment) return;

  await CommunityCommentForPost({
    content: String(post.newComment),
    linkAuthor: null,
    linked_id: post.id,
    user_id: get_fullUser.value.id,
    type: 0
  }, {
    onSuccess: (comment) => {
      post.comments.unshift({
        ...comment,
        createdAt: formatDate(new Date()),
        content: post.newComment,
        user_name: get_UserName,
        User: {id: get_fullUser.value.id, user_name: get_UserName, User_customization: {profil_picture: get_fullUser.value.User_customization.profil_picture}},
        newComment: "",
        comments: [],
        showComments: false,
        prepareReply: false,
        gotEdit: false,
        editable: false
      });
      post.total_comments = (post.total_comments || 0) + 1;
    },
    onError: (error) => {showError ? showError(error.response.data) : console.log(error.response.data)}
  });
};

const addCommentToComment = async (comment) => {
  if (!comment.newComment) return;

  await CommunityCommentForPost({
    content: String(comment.newComment),
    linkAuthor: null,
    linked_id: comment.id,
    user_id: get_fullUser.value.id,
    type: 1
  }, {
    onSuccess: (res_comment) => {
      comment.comments.unshift({
        ...res_comment,
        createdAt: formatDate(new Date()),
        content: comment.newComment,
        user_name: get_UserName,
        User: {id: get_fullUser.value.id, user_name: get_UserName, User_customization: {profil_picture: get_fullUser.value.User_customization.profil_picture}},
        newComment: "",
        showComments: false,
        prepareReply: false,
        gotEdit: false,
        editable: false,
        comments: []
      });
      comment.prepareReply = false;
      comment.total_comments = (comment.total_comments || 0) + 1;
    },
    onError: (error) => {showError ? showError(error.response.data) : console.log(error.response.data)}
  });
};

const addLastCommentToComment = async (comment, inner_comment) => {
  if (!inner_comment.newComment) return;

  await CommunityCommentForPost({
    content: String(inner_comment.newComment),
    linkAuthor: "@" + comment.user_name,
    linked_id: comment.id,
    user_id: get_fullUser.value.id,
    type: 1
  }, {
    onSuccess: (res_comment) => {
      comment.comments.unshift({
        ...res_comment,
        createdAt: formatDate(new Date()),
        content: inner_comment.newComment,
        newComment: "",
        showComments: false,
        prepareReply: false,
        gotEdit: false,
        editable: false,
        linkAuthor: "@" + comment.user_name,
        comments: []
      });
      inner_comment.prepareReply = false;
      comment.total_comments = (comment.total_comments || 0) + 1;
    },
    onError: (error) => {showError ? showError(error.response.data) : console.log(error.response.data)}
  });
};

const loadMoreComments = async (post, type) => {
  await CommunityGetLimitedComments({
    limit: 10, 
    offset: post.comments.length, 
    id: post.id, 
    type,
    userId: get_fullUser.value?.id || null
  }, {
    onSuccess: (res_comment) => {
      res_comment.comments.forEach(comment => {
        comment.createdAt = formatDate(new Date(comment.createdAt));
        post.comments.push(comment);
      });
      post.hasMoreComments = res_comment.hasMoreComments;
    },
    onError: (error) => {showError ? showError(error.response.data) : console.log(error.response.data)}
  });
};

// <------- Függvények | figyelők ------->
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
  width: 100%;
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

/* Transition a fájlok megjelenítéséhez */
.expand-transition-enter-active, .expand-transition-leave-active {
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease;
}

.expand-transition-enter, .expand-transition-leave-to /* .expand-transition-leave-active in <2.1.8 */ {
  max-height: 0;
  opacity: 0;
}

/* Alapértelmezett magasság a fájl listaelemekhez */
ul {
  padding-left: 0;
  margin: 0;
}
li {
  max-height: 1000px; /* Maximum magasság az animációhoz */
  opacity: 1;
}

</style>