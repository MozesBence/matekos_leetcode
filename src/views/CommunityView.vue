<template>
  <main style="min-height: 85.4vh;" class="mt-5 d-flex justify-center">
    <div>
      <div class="d-flex">
        <div 
          class="d-flex align-center" 
          style="height: max-content; position: fixed; left: 5vw; z-index: 1;">
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="searchQuery"
                    prepend-inner-icon="mdi-magnify"
                    clear-icon="mdi-close"
                    hide-details
                    label="Keresés a posztok között"
                    type="text"
                    variant="outlined"
                    clearable
                    @click:clear="searchQuery = ''"
                    style="min-width: 14vw;"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>

          <v-btn icon elevation="0" @click="showCreatePost = !showCreatePost">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>

        <!-- Középső rész: Posztok -->
        <div class="PostsMargin">
          <v-card
            v-for="post in filteredPosts"
            :key="post.id"
            class="mb-4 pt-2"
<<<<<<< HEAD
            min-width="40vw"
=======
            width="45vw"
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
          >
            <div class="d-flex flex-row ga-2 pl-3 align-center" color="community_primary_color">
              <div class="d-flex flex-row align-center pa-1 pr-2 rounded-xl" style="width: max-content; background-color: rgb(var(--v-theme-community_comment_bc));">
                <img src="../components/background/test_profile.jpg" alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
<<<<<<< HEAD
                <p style="font-size: .8vw;">{{ post.author }}</p>
=======
                <p style="font-size: .8vw;">{{ (post.author == undefined ? post.User.user_name : post.author) }}</p>
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
              </div>
              <p style="font-size: .6vw;">{{ post.createdAt }}</p>
            </div>

            <v-card-title>
              <div>
                {{ post.title }}
              </div>
            </v-card-title>

<<<<<<< HEAD
            <v-card-text class="mb-3">
              <div v-html="post.content">
              </div>
            </v-card-text>

            <v-dialog
              v-model="dialog"
              max-width="800px"
              persistent
            >
              <v-card>
                <v-card-text>
                  <!-- Nagyított kép -->
                  <v-img
                    :src="selectedImage"
                    max-height="600"
                    class="mb-0"
                    contain
                  />
                </v-card-text>
                <v-card-actions>
                  <v-btn color="community_primary_color" text @click="dialog = false">
                    Bezárás
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
=======
            <v-card-text>
              <div v-html="post.content">
              </div>
            </v-card-text>
            <v-expand-transition>
              <div v-if="post.files.length > 0" v-for="(file, index) in post.files" :key="index">
                <v-card-text class="mb-3">
                  <div class="d-inline-flex flex-column justify-center align-center">
                    <v-btn 
                      icon 
                      elevation="0" 
                      size="70"
                      @click="downloadFile(file)"
                    >
                      <v-icon size="50">mdi-file</v-icon>
                    </v-btn>
                    <p>
                      {{ (file.name == undefined ? file.file_name : file.name) }}
                    </p>
                    <p style="font-size: .5vw;">
                      Méret: {{ formatFileSize(file.size == undefined ? file.file_size : file.size) }}
                    </p>
                  </div>
                </v-card-text>
              </div>
            </v-expand-transition>
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1

            <v-divider></v-divider>
            <v-card-actions>
              <v-btn icon @click="like(post)">
                <v-icon color="red">{{ post.userReaction == 'like' ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                {{ post.likes }}
              </v-btn>
              <v-btn icon @click="dislike(post)">
                <v-icon color="purple">{{ post.userReaction == 'dislike' ? 'mdi-heart-broken' : 'mdi-heart-broken-outline' }}</v-icon>
                {{ post.dislikes }}
              </v-btn>
              <v-btn icon color="community_primary_color" @click="post.showComments = !post.showComments" class="rounded-circle" v-if="(post.comments != null? post.comments.length : post.Community_comments.length) > 0">
                <v-icon> {{ post.showComments ? "mdi-comment-text" : "mdi-comment-text-outline" }} </v-icon>
                {{ post.comments.length }}
              </v-btn>
              <v-btn text color="community_primary_color" @click="post.showComments = true">
                Válasz
              </v-btn>
            </v-card-actions>
            <!-- Komment szekció -->
            <v-expand-transition>
              <div v-if="post.showComments">
                <!-- Új komment -->
                <div class="position-relative mx-4 pa-2">
                  <div class="d-flex flex-row align-center mb-3 pa-1 pr-2 rounded-xl" style="width: max-content; background-color: rgb(var(--v-theme-community_comment_bc));">
                    <img src="../components/background/test_profile.jpg" alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                    <p style="font-size: .8vw;">{{ get_UserName }}</p>
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
                    </div>
                  </div>
                </div>
                
                <v-divider class="my-2"></v-divider>
                <!-- Kommentek listája -->
                <div v-for="(comment, index) in limitedComments(post)" :key="comment.id" class="d-flex flex-column rounded-lg ma-4 pt-3" style="background-color: rgb(var(--v-theme-community_comment_bc));">
                  <div class="d-flex flex-column pl-2">
                    <div class="d-flex ga-2 align-center">
                      <div class="d-flex flex-row align-center mb-1 pa-1 pr-2 rounded-xl" style="width: max-content; background-color: rgb(var(--v-theme-community_posts_bc));">
                        <img src="../components/background/test_profile.jpg" alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                        <p style="font-size: .8vw;">{{ comment.author }}</p>
                      </div>
                      <p style="font-size: .7vw; position: relative;">{{ comment.createdAt }}</p>
                    </div>
                    <div class="mt-2">
                      <div v-if="!comment.editable" class="d-flex align-center">
                        <p class="pa-2 pl-4 mr-2" style="font-size: .9vw;">
                          {{ comment.linkAuthor }} {{ comment.text }}
                        </p>
                        <v-expand-transition>
                          <p v-if="comment.gotEdit" style="font-size: .6vw; position: relative;">[Módosított]</p>
                        </v-expand-transition>
                      </div>
                      <v-text-field
                        v-if="comment.editable"
                        type="text"
                        elevation="0"
                        hide-details
                        variant="solo-inverted" 
                        v-model="comment.text"
                        class="custom-solo-inverted mr-2"
                        :id="'commentId' + post.id+''+ index"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="ml-1">
                    <v-btn icon @click="like(comment)" elevation="0" style="background-color: transparent;">
                      <v-icon color="red">{{ comment.userReaction === 'like' ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                      {{ comment.likes }}
                    </v-btn>
                    <v-btn icon @click="dislike(comment)" elevation="0" style="background-color: transparent;">
                      <v-icon color="purple">{{ comment.userReaction === 'dislike' ? 'mdi-heart-broken' : 'mdi-heart-broken-outline' }}</v-icon>
                      {{ comment.dislikes }}
                    </v-btn>
                    <v-btn icon color="transparent" elevation="0" @click="comment.showComments = !comment.showComments" class="rounded-circle" v-if="comment.comments.length > 0">
                      <v-icon> {{ comment.showComments ? "mdi-comment-text" : "mdi-comment-text-outline" }}</v-icon>
                      {{ comment.comments.length }}
                    </v-btn>
                    <v-btn text color="transparent" elevation="0" @click="prepareReply(comment)">
                      Válasz
                    </v-btn>
<<<<<<< HEAD
                    <v-btn v-if="comment.author == get_UserName && !comment.editable" text color="transparent" elevation="0" @click="commentEdit(comment,post.id+''+ index)">
                      Módosítás
                    </v-btn>
                    <v-btn v-if="comment.author == get_UserName && comment.editable" text color="transparent" elevation="0" @click="EditConfirme(comment)">
                      Módosít
                    </v-btn>
                    <v-btn v-if="comment.editable" text color="transparent" elevation="0" @click="cancelCommentEdit(comment)">
=======
                    <v-btn v-if="comment.author == get_UserName && !comment.editable" text color="transparent" elevation="0" @click="commentEdit(comment,'commentId'+post.id+''+ index)">
                      Módosítás
                    </v-btn>
                    <v-btn v-if="comment.author == get_UserName && comment.editable" text color="transparent" elevation="0" @click="comment.editable = false">
                      Módosít
                    </v-btn>
                    <v-btn v-if="comment.editable" text color="transparent" elevation="0" @click="comment.editable = false">
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
                      Mégse
                    </v-btn>
                  </div>
                  <v-expand-transition>
                    <div v-if="comment.showComments">
                      <!-- Új komment -->
                      <v-expand-transition>
                        <div class="position-relative mx-4 pa-2" v-if="comment.prepareReply">
                          <div class="d-flex flex-row align-center mb-3 pa-1 pr-2 rounded-xl" style="width: max-content; background-color: rgb(var(--v-theme-community_comment_bc));">
                            <img src="../components/background/test_profile.jpg" alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                            <p style="font-size: .8vw;">{{ get_UserName }}</p>
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
                      <v-divider class="my-2" v-if="comment.comments.length > 0"></v-divider>
                      <v-expand-transition>
                        <div>
<<<<<<< HEAD
                          <div v-for="(inner_comment, index) in limitedCommentsAtComments(comment)" :key="inner_comment.id" class="d-flex flex-column rounded-lg ma-4 pt-3" style="background-color: rgb(var(--v-theme-community_comment_bc));">
=======
                          <div v-for="(inner_comment, index) in limitedComments(comment)" :key="inner_comment.id" class="d-flex flex-column rounded-lg ma-4 pt-3" style="background-color: rgb(var(--v-theme-community_comment_bc));">
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
                            <div class="d-flex flex-column pl-2">
                              <div class="d-flex ga-2 align-center">
                                <div class="d-flex flex-row align-center mb-1 pa-1 pr-2 rounded-xl" style="width: max-content; background-color: rgb(var(--v-theme-community_posts_bc));">
                                  <img src="../components/background/test_profile.jpg" alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                                  <p style="font-size: .8vw;">{{ inner_comment.author }}</p>
                                </div>
                                <p style="font-size: .7vw; position: relative;">{{ inner_comment.createdAt }}</p>
                              </div>
                              <div class="mt-2">
                                <div v-if="!inner_comment.editable" class="d-flex align-center">
                                  <p class="pa-2 pl-4" style="font-size: .9vw; width: max-content;">
                                    {{ inner_comment.linkAuthor }} {{ inner_comment.text }}
                                  </p>
                                  <v-expand-transition>
                                    <p v-if="inner_comment.gotEdit" style="font-size: .6vw; position: relative;">[Módosított]</p>
                                  </v-expand-transition>
                                </div>
                                <v-text-field
                                  v-if="inner_comment.editable"
                                  type="text"
                                  elevation="0"
                                  hide-details
                                  variant="solo-inverted" 
                                  v-model="inner_comment.text"
                                  class="custom-solo-inverted"
                                  :id="'commentId' + post.id+''+comment.id+''+ index"
                                ></v-text-field>
                              </div>
                            </div>
                            <div class="ml-1">
<<<<<<< HEAD
                              <v-btn icon @click="likePost(inner_comment)" elevation="0" style="background-color: transparent;">
                                <v-icon color="red">{{ inner_comment.userReaction === 'like' ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                                {{ inner_comment.likes }}
                              </v-btn>
                              <v-btn icon @click="dislikePost(inner_comment)" elevation="0" style="background-color: transparent;">
                                <v-icon color="purple">{{ inner_comment.userReaction === 'dislike' ? 'mdi-heart-broken' : 'mdi-heart-broken-outline' }}</v-icon>
                                {{ inner_comment.dislikes }}
                              </v-btn>
                              <v-btn v-if="inner_comment.author != get_UserName" text color="transparent" elevation="0" @click="prepareReplyForComment(inner_comment)">
                                Válasz
                              </v-btn>
                              <v-expand-transition>
                                <v-btn v-if="inner_comment.author == get_UserName && !inner_comment.editable" class="expand-edit-btn-first" text color="transparent" elevation="0" @click="commentEdit(inner_comment,post.id+''+comment.id+''+ index)">
=======
                              <v-btn icon @click="like(inner_comment)" elevation="0" style="background-color: transparent;">
                                <v-icon color="red">{{ inner_comment.userReaction === 'like' ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                                {{ inner_comment.likes }}
                              </v-btn>
                              <v-btn icon @click="dislike(inner_comment)" elevation="0" style="background-color: transparent;">
                                <v-icon color="purple">{{ inner_comment.userReaction === 'dislike' ? 'mdi-heart-broken' : 'mdi-heart-broken-outline' }}</v-icon>
                                {{ inner_comment.dislikes }}
                              </v-btn>
                              <v-btn v-if="inner_comment.author != get_UserName" text color="transparent" elevation="0" @click="prepareReply(inner_comment)">
                                Válasz
                              </v-btn>
                              <v-expand-transition>
                                <v-btn v-if="inner_comment.author == get_UserName && !inner_comment.editable" class="expand-edit-btn-first" text color="transparent" elevation="0" @click="commentEdit(inner_comment,'commentId'+post.id+''+comment.id+''+ index)">
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
                                  Módosítás
                                </v-btn>
                              </v-expand-transition>
                              <v-expand-transition>
<<<<<<< HEAD
                                <v-btn v-if="inner_comment.author == get_UserName && inner_comment.editable" class="expand-edit-btn-second" text color="transparent" elevation="0" @click="EditConfirme(inner_comment)">
=======
                                <v-btn v-if="inner_comment.author == get_UserName && inner_comment.editable" class="expand-edit-btn-second" text color="transparent" elevation="0" @click="inner_comment.editable = false">
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
                                  Módosít
                                </v-btn>
                              </v-expand-transition>
                              <v-expand-transition>
<<<<<<< HEAD
                                <v-btn v-if="inner_comment.editable" class="expand-edit-btn-second" text color="transparent" elevation="0" @click="cancelCommentEdit(inner_comment)">
=======
                                <v-btn v-if="inner_comment.editable" class="expand-edit-btn-second" text color="transparent" elevation="0" @click="inner_comment.editable = false">
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
                                  Mégse
                                </v-btn>
                              </v-expand-transition>
                            </div>
                            <v-expand-transition>
<<<<<<< HEAD
                              <div class="position-relative mx-4 pa-2" v-if="inner_comment.preparingReply">
=======
                              <div class="position-relative mx-4 pa-2" v-if="inner_comment.prepareReply">
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
                                <div class="d-flex flex-row align-center mb-3 pa-1 pr-2 rounded-xl" style="width: max-content; background-color: rgb(var(--v-theme-community_comment_bc));">
                                  <img src="../components/background/test_profile.jpg" alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                                  <p style="font-size: .8vw;">{{ get_UserName }}</p>
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
<<<<<<< HEAD
                                      @click="addLastCommentToComment(comment, inner_comment, get_UserName)"
=======
                                      @click="addLastCommentToComment(comment, inner_comment)"
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
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
  
                      <!-- Több komment betöltése -->
                      <v-btn
                        v-if="comment.comments.length > comment.commentLimit"
                        text small @click="loadMoreCommentsForComments(comment)"
                        class="pl-4"
                      >
                        Több komment megjelenítése
                      </v-btn>
                    </div>
                  </v-expand-transition>
                </div>


                <!-- Több komment betöltése -->
                <v-btn
                  v-if="post.comments.length > post.commentLimit"
                  text small @click="loadMoreCommentsForPost(post)"
                  class="pl-4"
                >
                  Több komment megjelenítése
                </v-btn>
              </div>
            </v-expand-transition>
          </v-card>
        </div>
      </div>

      <!-- Új poszt létrehozása modal -->
      <v-dialog v-model="showCreatePost" max-width="600px">
        <v-card>
          <v-card-title>Új poszt létrehozása</v-card-title>
          <v-card-text class="mb-2">
            <v-text-field
              v-model="newPost.title"
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
                        <v-icon>mdi-format-bold</v-icon>
                      </v-btn>
                      <v-btn 
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeItalic}" 
                      @click="toggleItalic"
                      >
                        <v-icon>mdi-format-italic</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeStrikethrough}" 
                      @click="toggleStrikethrough"
                      >
                        <v-icon>mdi-format-strikethrough</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeUnderline}"
                      @click="toggleUnderline"
                      >
                        <v-icon>mdi-format-underline</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeAlignLeft}" 
<<<<<<< HEAD
                      @click="applyAlignLeft"
=======
                      @click="AlignActivate('left')"
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
                      >
                        <v-icon>mdi-format-align-left</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeAlignCenter}" 
<<<<<<< HEAD
                      @click="applyAlignCenter"
=======
                      @click="AlignActivate('center')"
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
                      >
                        <v-icon>mdi-format-align-center</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeAlignRight}" 
<<<<<<< HEAD
                      @click="applyAlignRight"
=======
                      @click="AlignActivate('right')"
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
                      >
                        <v-icon>mdi-format-align-right</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeOrderedList}" 
<<<<<<< HEAD
                      @click="applyOrderedList"
=======
                      @click="toggleOrderedList"
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
                      >
                        <v-icon>mdi-format-list-numbered</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeUnorderedList}" 
<<<<<<< HEAD
                      @click="applyUnorderedList"
=======
                      @click="toggleUnorderedList"
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
                      >
                        <v-icon>mdi-format-list-bulleted</v-icon>
                      </v-btn>
                      <v-btn 
                      elevation="0"
                      icon 
<<<<<<< HEAD
                      small 
                      :class="{'active-btn': activeLink}" 
                      @click="addLink"
                      >
                        <v-icon>mdi-link</v-icon>
                      </v-btn>

                    </div>

                    <!-- Contenteditable div helyettesíti a textarea-t -->
=======
                      small
                      :class="{'active-btn': activeLink}" 
                      @click="createLink"
                      >
                        <v-icon>mdi-link</v-icon>
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
                        <v-icon>mdi-image</v-icon>
                      </v-btn>
                    </div>

>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
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
<<<<<<< HEAD

            <v-file-input
              v-model="newPost.images"
              label="Képek feltöltése"
              accept="image/*"
              multiple
              outlined
            ></v-file-input>
=======
            <div>
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
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
          </v-card-text>

          <v-card-actions>
<<<<<<< HEAD
            <v-btn color="community_primary_color" @click="addPost(get_UserName)">Poszt létrehozása</v-btn>
            <v-btn text @click="toggleCreatePost">Mégse</v-btn>
=======
            <v-btn color="community_primary_color" @click="addPost">Poszt létrehozása</v-btn>
            <v-btn text @click="showCreatePost = !showCreatePost">Mégse</v-btn>
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </main>
</template>

<script setup>
<<<<<<< HEAD
import { onMounted, ref } from 'vue';
=======
import { onMounted, ref, reactive, computed, nextTick, watch } from 'vue';
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
import { useRouter, useRoute } from 'vue-router';
import { useProfileGetUser } from '@/api/profile/profileQuery';
import { useCommunityPost, useGetCommunityPost } from '@/api/community/communityQuery';
import imageCompression from 'browser-image-compression';

const router = useRouter();
const route = useRoute();

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

const { mutate: ProfileGetUser } = useProfileGetUser();
const { mutate: CommunityGetLimitedPosts } = useGetCommunityPost();


onMounted(async () => {
  if (get_user_by_token != null) {
    try {
      await ProfileGetUser(get_user_by_token, {
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

  try {
    await CommunityGetLimitedPosts(posts_limit.value, {
      onSuccess: (posts_array) => {
        posts_array.reverse();
        posts_array.forEach((post) =>{ postsConvertToDisplay(post); });
      },
      onError: (error) => {
      },
    });
  } catch (error) {
    console.error('Hiba történt a posztok lekérésekor:', error);
  }
});

<<<<<<< HEAD
<script>
=======
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // hónap, 2 számjegyre
  const day = date.getDate().toString().padStart(2, '0'); // nap, 2 számjegyre
  const hours = date.getHours().toString().padStart(2, '0'); // óra, 2 számjegyre
  const minutes = date.getMinutes().toString().padStart(2, '0'); // perc, 2 számjegyre
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

<<<<<<< HEAD
export default {
  name: "CommunityPage",
  data() {
    return {
      content: "", // A textarea tartalma
      activeBold: false,
      activeItalic: false,
      activeStrikethrough: false,
      activeUnderline: false,
      activeAlignLeft: true,
      activeAlignCenter: false,
      activeAlignRight: false,
      activeOrderedList: false,
      activeUnorderedList: false,
      activeLink: false,

      posts: [
        {
          id: 1,
          author: "User123",
          title: "Vue.js kérdés",
          content: `<p>valami content</p>
                    <div id="contentImages1" class="image-placeholder"></div>
                    <p>Thank you for viewing!</p>`,
          images: [{id: "contentImages1", src: "https://via.placeholder.com/300"}],
          likes: 3,
          dislikes: 0,
          userReaction: null,
          createdAt: "2025-01-01 18:39",
          comments: [
            { id: 1, author: "Helper99", createdAt: "2025-01-01 18:39", text: "Segíthetek ebben!", likes: 2, dislikes: 1, userReaction: null, newComment: "", showCommentsFromComments: false, comments: [{
              id: 1, author: "Helper99", createdAt: "2025-01-01 18:39", text: "Segíthetek ebben!", likes: 2, dislikes: 1, userReaction: null, newComment: "", showCommentsFromComments: false, commentLimit: 10, editable: false, gotEdit: false, linkAuthor: ""
            }], commentLimit: 10, preparingReply: false, editable: false, gotEdit: false},
            { id: 2, author: "AnotherUser", createdAt: "2025-01-01 18:39", text: "Ugyanez a kérdésem!", likes: 1, dislikes: 0, userReaction: null, newComment: "", showCommentsFromComments: false, comments: [], commentLimit: 10, preparingReply: false, editable: false, gotEdit: false},
          ],
          newComment: "",
          showCommentsFromPost: false,
          preparingReply: false,
          commentLimit: 10,
        },
      ],
      newPost: { title: "", content: "", images: [] },
      searchQuery: "",
      showCreatePost: false,
      editingText: "",
      dialog: false,
      selectedImage: null,
    };
  },
  mounted() {
    this.insertImages();
  },
  updated() {
    this.insertImages(); // Ha a posts frissül, új képeket is beillesztünk
  },
  computed: {
    filteredPosts() {
      const query = this.searchQuery.toLowerCase();
      return this.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    updateContent(event) {
      // A kurzor pozíciójának mentése
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const cursorPosition = range.startOffset;

      // A div tartalmának frissítése
      this.content = event.target.innerHTML;

      // A kurzor pozíciójának visszaállítása
      this.$nextTick(() => {
        const editor = this.$refs.editor;
        const range = document.createRange();
        const selection = window.getSelection();

        // A kurzor visszahelyezése
        range.setStart(editor.firstChild, cursorPosition);
        range.setEnd(editor.firstChild, cursorPosition);
        selection.removeAllRanges();
        selection.addRange(range);
      });
    },
    toggleBold() {
      this.execCommand("bold");
      this.activeBold = !this.activeBold;
    },
    toggleItalic() {
      this.execCommand("italic");
      this.activeItalic = !this.activeItalic;
    },
    toggleStrikethrough() {
      this.execCommand("strikeThrough");
      this.activeStrikethrough = !this.activeStrikethrough;
    },
    toggleUnderline() {
      this.execCommand("underline");
      this.activeUnderline = !this.activeUnderline;
    },
    applyAlignLeft() {
      this.execCommand("justifyLeft");
      this.activeAlignLeft = true;
      this.activeAlignCenter = false;
      this.activeAlignRight = false;
    },
    applyAlignCenter() {
      this.execCommand("justifyCenter");
      this.activeAlignCenter = true;
      this.activeAlignLeft = false;
      this.activeAlignRight = false;
    },
    applyAlignRight() {
      this.execCommand("justifyRight");
      this.activeAlignRight = true;
      this.activeAlignLeft = false;
      this.activeAlignCenter = false;
    },
    applyOrderedList() {
      this.execCommand("insertOrderedList");
      this.activeOrderedList = !this.activeOrderedList;
    },
    applyUnorderedList() {
      this.execCommand("insertUnorderedList");
      this.activeUnorderedList = !this.activeUnorderedList;
    },
    addLink() {
      const selection = window.getSelection();
      const selectedText = selection.toString().trim();

      if (selectedText && this.isValidUrl(selectedText) && !this.activeLink) {
        // Készítsük el a <a> elemet a megfelelő href attribútummal
        const linkNode = document.createElement("a");
        linkNode.setAttribute("href", selectedText);
        linkNode.setAttribute("target", "_blank"); // Új lapon kell megnyílni
        linkNode.textContent = selectedText; // A szöveg legyen maga az URL

        // A kijelölt szöveg törlése és a link beillesztése
        const range = selection.getRangeAt(0);
        range.deleteContents(); // Kijelölés törlése
        range.insertNode(linkNode); // Link beszúrása

        // Hozzuk létre a kattinthatóságot az új linkekhez
        linkNode.addEventListener('click', (event) => {
          event.preventDefault(); // Ne történjen semmi más kattintáskor
          window.open(linkNode.href, '_blank'); // Nyissuk meg új lapon
        });
      }
      else if(this.activeLink){
        this.activeLink = false;
      }
    },
    isValidUrl(url) {
      const pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      return pattern.test(url);
    },
    execCommand(command) {
      // A kurzor pozíciójának mentése
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      // Parancs végrehajtása
      document.execCommand(command);

      // A kurzor pozíciójának visszaállítása
      this.$nextTick(() => {
        const editor = this.$refs.editor;
        const newRange = document.createRange();
        const newSelection = window.getSelection();

        // Az új pozíció beállítása
        newRange.setStart(editor.firstChild, range.startOffset);
        newRange.setEnd(editor.firstChild, range.endOffset);
        newSelection.removeAllRanges();
        newSelection.addRange(newRange);
      });
    },


    clearMessage () {
      this.searchQuery = ''
    },
    toggleCreatePost() {
      this.showCreatePost = !this.showCreatePost;
    },
    addPost(get_UserName) {
      const newId = this.posts.length + 1;
      
      this.posts.unshift({
        ...this.newPost,
        id: newId,
        author: get_UserName,
        likes: 0,
=======
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

const newPost = reactive({ title: "", content: "", images: reactive([]), files: ref([]) });

// Posts tömb
const posts = reactive([
  {
    id: 1,
    author: "User123",
    title: "Vue.js kérdés",
    content: `<p>valami content</p>
              <div id="contentImages1" class="image-placeholder"></div>
              <p>Thank you for viewing!</p>`,
    images: [{id: "contentImages1", src: "https://via.placeholder.com/300"}],
    files: [],
    likes: 3,
    dislikes: 0,
    userReaction: null,
    createdAt: "2025-01-01 18:39",
    comments: [
      {
        id: 1,
        author: "Helper99",
        createdAt: "2025-01-01 18:39",
        text: "Segíthetek ebben!",
        likes: 2,
        dislikes: 1,
        userReaction: null,
        newComment: "",
        showComments: false,
        prepareReply: false,
        gotEdit: false,
        editable: false,
        comments: [{
            id: 1,
            author: "Helper99",
            createdAt: "2025-01-01 18:39",
            text: "Segíthetek ebben!",
            likes: 2,
            dislikes: 1,
            userReaction: null,
            newComment: "",
            showComments: false,
            prepareReply: false,
            gotEdit: false,
            editable: false,
          },]
      },
      {
        id: 2,
        author: "AnotherUser",
        createdAt: "2025-01-01 18:39",
        text: "Ugyanez a kérdésem!",
        likes: 1,
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
        dislikes: 0,
        userReaction: null,
        newComment: "",
<<<<<<< HEAD
        showCommentsFromPost: false,
        preparingReply: false,
        commentLimit: 10,
        createdAt: formatDate(new Date()),
        title: "",
        content: "", 
        images: []
      });
      this.newPost = { title: "", content: "", images: [] };
      this.toggleCreatePost();
    },
    openPreview(image) {
      this.selectedImage = image;
      this.dialog = true;
    },
    insertImages() {
      this.posts.forEach((post) => {
        post.images.forEach((image) => {
          const placeholder = document.getElementById(image.id);
          if (placeholder) {
            // Ellenőrizzük, hogy a kép még nincs-e beszúrva
            if (!placeholder.querySelector(`img[src="${image.src}"]`)) {
              const img = document.createElement("img");
              img.src = image.src;
              img.style.maxWidth = "100%";
              img.style.height = "8vw";
              img.style.cursor = "pointer";
              //img.setAttribute.onClick(this.openPreview('this'));

              img.addEventListener("click", () => {
                this.openPreview(image);
              });
              placeholder.appendChild(img);
            }
          }
        });
      });
    },
    likePost(post) {
      if (post.userReaction === "like") {
        post.likes--;
        post.userReaction = null;
      } else {
        if (post.userReaction === "dislike") post.dislikes--;
        post.likes++;
        post.userReaction = "like";
      }
    },
    dislikePost(post) {
      if (post.userReaction === "dislike") {
        post.dislikes--;
        post.userReaction = null;
      } else {
        if (post.userReaction === "like") post.likes--;
        post.dislikes++;
        post.userReaction = "dislike";
      }
    },
    likeComment(Comment) {
      if (Comment.userReaction === "like") {
        Comment.likes--;
        Comment.userReaction = null;
      } else {
        if (Comment.userReaction === "dislike") Comment.dislikes--;
        Comment.likes++;
        Comment.userReaction = "like";
=======
        showComments: false,
        prepareReply: false,
        gotEdit: false,
        editable: false,
        comments: []
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
      }
    ],
    newComment: "",
    showComments: false,
    commentLimit: 10,
  }
]);

const searchQuery = ref("");
const showCreatePost = ref(false);
const editingText = ref("");
const dialog = ref(false);
const selectedImage = ref(null);

// Computed properties
const filteredPosts = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
  );
});

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

      // Mentés az images tömbbe
      const imageId = newPost.images.length + 1;
      newPost.images.push({
        url: imgUrl,
        type: file.type,
        name: file.name,
      });

      // Kép beszúrása a kurzor helyére
      insertImage();
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
<<<<<<< HEAD
    },
    toggleCommentsForPost(post) {
      post.showCommentsFromPost = !post.showCommentsFromPost;
      if(post.showCommentsFromPost){
        for (let i = 0; i < post.comments.length; i++) {
          post.comments[i].showCommentsFromComments = false;
          for (let j = 0; j < post.comments[i].comments.length; j++) {
            post.comments[i].comments[j].showCommentsFromComments = false;
          }
        }
      }
    },
    toggleCommentsForComments(comment) {
      comment.showCommentsFromComments = !comment.showCommentsFromComments;
    },
    prepareReplyForPost(post) {
      post.showCommentsFromPost = true;
      post.preparingReply = true;
    },
    cancelPrepareReplyForPost(post) {
      post.preparingReply = false;
    },
    prepareReplyForComment(comment) {
      comment.showCommentsFromComments = true;
      comment.preparingReply = true;
    },
    cancelPrepareReplyForComment(comment) {
      comment.preparingReply = false;
    },
    cancelPrepareReplyForLastComment(comment) {
      comment.preparingReply = false;
    },
    limitedComments(post) {
      return post.comments.slice(0, post.commentLimit);
    },
    limitedCommentsAtComments(comment) {
      return comment.comments.slice(0, comment.commentLimit);
    },
    loadMoreCommentsForPost(post) {
      post.commentLimit += 10;
    },
    loadMoreCommentsForComments(comment) {
      comment.commentLimit += 10;
    },
    commentEdit(comment,id){
      comment.editable = true;
      this.editingText = comment.text;

      this.$nextTick(() => {
        const inputElement = document.getElementById("commentId" + id);
        if (inputElement) {
          inputElement.focus();
        } else {
          console.error("Input element not found for id: " + id);
        }
      });
    },
    cancelCommentEdit(comment){
      comment.editable = false;
      comment.text = this.editingText;
      this.editingText = null;
    },
    EditConfirme(comment){
      comment.editable = false;
      if(this.editingText != comment.text){
        comment.gotEdit = true;
      }
    },
    addCommentToPost(post,get_UserName) {
      if (post.newComment.trim()) {
        const commentId = post.comments.length + 1;
        post.comments.push({
          id: commentId,
          author: get_UserName,
          createdAt: formatDate(new Date()),
          text: post.newComment.trim(),
          likes: 0, 
          dislikes: 0, 
=======
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

const { mutate: CommunityPostUpload } = useCommunityPost();
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

  console.log(compressingFilesArray);

  if(get_fullUser.value.id && newPost.title && htmlContent){
    await CommunityPostUpload({id: get_fullUser.value.id, title: newPost.title, content: cleanedHtmlContent, files: compressingFilesArray}, {
      onSuccess: (response) => {
        postsConvertToDisplay({
          id: response.id,
          author: get_UserName.value,
          createdAt: formatDate(new Date()),
          content: cleanedHtmlContent,
          title: newPost.title,
          likes: 0,
          dislikes: 0,
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
          userReaction: null,
          newComment: "",
          gotEdit: false,
          editable: false,
          comments: [],
<<<<<<< HEAD
          showCommentsFromComments: false,
          commentLimit: 10,
          editable: false
=======
          files: newPost.files,
          images: newPost.images,
          commentLimit: 10,
          showComments: false,
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
        });
      },
      onError: (error) => {
  
      },
    });
  }
};

function postsConvertToDisplay(array){
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = array.content;

  var createdAt = array.createdAt;
  array.createdAt = createdAt.split('T')[0] + " " + createdAt.split('T')[1].split('.')[0];

  const imgElements = tempDiv.querySelectorAll("img");

  imgElements.forEach((img) => {
    const id = Number(img.id)-1;
    if (array.images[id]) {
      img.setAttribute("src", (array.images[id].url != null ? array.images[id].url : array.images[id].file)); // Az `src` attribútumot beállítjuk
    }
  });

  array.content = tempDiv.innerHTML;

  posts.unshift(array);
 
  newPost.files = [];
  newPost.images = [];
  newPost.title = "";

  showCreatePost.value = false;
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

        // Ha GIF fájl, ne tömörítsük, hanem egyszerűen hagyjuk úgy
        if (file.type && file.type === 'image/gif') {
          console.log('GIF fájl, nem tömörítjük:', file.name);
        } else if (file.type && file.type.startsWith('image/')) {
          // Kép tömörítése (nem GIF esetén)
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

        // Blob-ból File objektum létrehozása fájlnévvel
        const fileWithName = new File([blob], file.name || `file_${Date.now()}`, { type: blob.type });

        compressFilesArray.push(fileWithName);
      } catch (error) {
        console.error('Fájl feldolgozási hiba:', error);
      }
<<<<<<< HEAD
    },
    addCommentToComment(Comment,get_UserName) {
      if (Comment.newComment.trim()) {
        const commentId = Comment.comments.length + 1;
        Comment.comments.push({
          id: commentId,
          author: get_UserName,
          createdAt: formatDate(new Date()),
          text: Comment.newComment.trim(),
          likes: 0, 
          dislikes: 0, 
          userReaction: null,
          showCommentsFromComments: false,
          commentLimit: 10,
          editable: false,
          gotEdit: false,
        });
        Comment.newComment = "";
        Comment.preparingReply = false; // Visszazárja az írást
      }
    },
    addLastCommentToComment(Comment, inner_comment, get_UserName) {
      const commentId = Comment.comments.length + 1;
      Comment.comments.push({
        id: commentId,
        author: get_UserName,
        createdAt: formatDate(new Date()),
        text: inner_comment.newComment.trim(),
        likes: 0, 
        dislikes: 0, 
        userReaction: null,
        showCommentsFromComments: false,
        commentLimit: 10,
        editable: false,
        gotEdit: false,
        linkAuthor: "@"+inner_comment.author+ " ",
      });
      inner_comment.newComment = "";
      inner_comment.preparingReply = false; // Visszazárja az írást
    },
  },
=======
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
    }
  } else {
    console.error('Editor div nem található.');
  }
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
};

function handleFileUpload(event) {
  const uploadedFiles = event.target.files;

  for (const file of uploadedFiles) {
    if (file.size <= 10 * 1024 * 1024) { // 10 MB limit 
      const obj = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file), // Blob URL létrehozása az azonnali használathoz
      };

      // Ellenőrizzük, hogy a fájl már szerepel-e
      if (!newPost.files.some(f => f.name === obj.name && f.size === obj.size && f.type === obj.type)) {
        newPost.files.push(obj);
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
  newPost.files.splice(index,1);
}

function like(array){
  if(array.userReaction != 'like'){
    if(array.userReaction == 'dislike'){
      array.dislikes = array.dislikes - 1;
    }
    array.likes = array.likes + 1;
    array.userReaction = 'like'
  }else{
    array.likes = array.likes - 1;
    array.userReaction = null
  }
}

function dislike(array){
  if(array.userReaction != 'dislike'){
    if(array.userReaction == 'like'){
      array.likes = array.likes - 1;
    }
    array.dislikes = array.dislikes + 1;
    array.userReaction = 'dislike'
  }else{
    array.dislikes = array.dislikes - 1;
    array.userReaction = null
  }
}

function prepareReply(array){
  array.prepareReply = true;
  array.showComments = true;
}

function limitedComments(array){
  return array.comments.slice(0,array.limitedComments);
}

function commentEdit(comment,id){
  comment.editable = true;
  nextTick(() => {
    const element = document.getElementById(id);
    if (element) {
      element.focus();
    }
  });
}

function addCommentToPost(post){
  if(post.newComment != ""){
    post.comments.push({
      id: post.comments.length+1,
      author: get_UserName,
      createdAt: formatDate(new Date()),
      text: post.newComment,
      likes: 0,
      dislikes: 0,
      userReaction: null,
      newComment: "",
      showComments: false,
      prepareReply: false,
      gotEdit: false,
      editable: false,
      comments: []
    });
    
    post.newComment = "";
  }
}

function addCommentToComment(comment){
  if(comment.newComment != ""){
    comment.comments.push({
      id: comment.comments.length+1,
      author: get_UserName,
      createdAt: formatDate(new Date()),
      text: comment.newComment,
      likes: 0,
      dislikes: 0,
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
  }
}

function addLastCommentToComment(comment, inner_comment){
  if(inner_comment.newComment != ""){
    comment.comments.push({
      id: comment.comments.length+1,
      author: get_UserName,
      createdAt: formatDate(new Date()),
      text: inner_comment.newComment,
      likes: 0,
      dislikes: 0,
      userReaction: null,
      newComment: "",
      showComments: false,
      prepareReply: false,
      gotEdit: false,
      editable: false,
      linkAuthor: "@"+comment.author,
      comments: []
    });
    inner_comment.prepareReply = false;
    inner_comment.newComment = "";
  }
}

</script>

<style>
.v-img {
<<<<<<< HEAD
  cursor: pointer; /* Mutatja, hogy a kép kattintható */
  transition: transform 0.2s ease; /* Finom animáció */
}
.v-img:hover {
  transform: scale(1.05); /* Kisebb nagyítás az egérrel való áthúzáskor */
=======
  cursor: pointer;
  transition: transform 0.2s ease;
}
.v-img:hover {
  transform: scale(1.05);
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
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
  font-size: .9vw;
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
<<<<<<< HEAD
  width: 100%;
  max-width: 800px;
=======
  max-width: 60vw;
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
  margin: auto;
  display: flex;
  flex-direction: column;
}

.editor-area .editor {
<<<<<<< HEAD
  border: 1px solid #ccc;
  outline: none;
  padding: 10px;
  min-height: 150px;
  font-size: 16px;
  font-family: Arial, sans-serif;
  white-space: pre-wrap;
  overflow-y: auto;
  border-radius: 8px;
}

.editor-area  button {
=======
  border: 1px solid gray;
  outline: none;
  padding: 10px;
  min-height: 40vh;
  font-size: 16px;
  white-space: pre-wrap;
  overflow-y: auto;
  border-radius: 4px;
  font-size: medium;
  transition: .3s;
}

.editor-area .editor:focus {
  border: 1px solid white;
}
.editor-area .editor:hover {
  border: 1px solid white;
}

.editor-area button {
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
  padding: 5px 10px;
  cursor: pointer;
}

/* Active button style */
.editor-area .active-btn {
  background-color: #1976d2 !important;
  color: white;
  border-radius: 50%;
}

.editor-area .v-btn {
  color: white;
  border-radius: 50%;
}

.editor-area .v-btn:hover {
  background-color: #1976d2;
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

<<<<<<< HEAD
=======
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
>>>>>>> 3ae6ebf29a9fea2259e104a0b1cb26718c18fab1
</style>