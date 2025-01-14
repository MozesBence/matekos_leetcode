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
            width="45vw"
          >
            <div class="d-flex flex-row ga-2 pl-3 align-center" color="community_primary_color">
              <div class="d-flex flex-row align-center pa-1 pr-2 rounded-xl" style="width: max-content; background-color: rgb(var(--v-theme-community_comment_bc));">
                <img src="../components/background/test_profile.jpg" alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                <p style="font-size: .8vw;">{{ post.author }}</p>
              </div>
              <p style="font-size: .6vw;">{{ post.createdAt }}</p>
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

            <v-expand-transition>
              <div v-if="post.files.length" v-for="(file, index) in post.files" :key="index">
                <v-card-text class="mb-3">
                  <div class="d-flex flex-column justify-center align-start">
                    <v-btn 
                    icon 
                    elevation="0" 
                    class="ml-0"
                    size="70"
                    :href="getFileUrl(file)"
                    :download="file.name"
                    >
                      <v-icon size="50">mdi-file</v-icon>
                    </v-btn>
                    <p class="ml-2 mt-1">
                      {{ file.name  }}
                    </p>
                  </div>
                </v-card-text>
              </div>
            </v-expand-transition>

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

            <v-divider></v-divider>
            <v-card-actions>
              <v-btn icon @click="likePost(post)">
                <v-icon color="red">{{ post.userReaction === 'like' ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                {{ post.likes }}
              </v-btn>
              <v-btn icon @click="dislikePost(post)">
                <v-icon color="purple">{{ post.userReaction === 'dislike' ? 'mdi-heart-broken' : 'mdi-heart-broken-outline' }}</v-icon>
                {{ post.dislikes }}
              </v-btn>
              <v-btn icon color="community_primary_color" @click="toggleCommentsForPost(post)" class="rounded-circle" v-if="post.comments.length > 0">
                <v-icon> {{ post.showCommentsFromPost ? "mdi-comment-text" : "mdi-comment-text-outline" }} </v-icon>
                {{ post.comments.length }}
              </v-btn>
              <v-btn text color="community_primary_color" @click="prepareReplyForPost(post)">
                Válasz
              </v-btn>
            </v-card-actions>
            <!-- Komment szekció -->
            <v-expand-transition>
              <div v-if="post.showCommentsFromPost">
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
                        @click="addCommentToPost(post, get_UserName)"
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
                    <v-btn icon @click="likePost(comment)" elevation="0" style="background-color: transparent;">
                      <v-icon color="red">{{ comment.userReaction === 'like' ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                      {{ comment.likes }}
                    </v-btn>
                    <v-btn icon @click="dislikePost(comment)" elevation="0" style="background-color: transparent;">
                      <v-icon color="purple">{{ comment.userReaction === 'dislike' ? 'mdi-heart-broken' : 'mdi-heart-broken-outline' }}</v-icon>
                      {{ comment.dislikes }}
                    </v-btn>
                    <v-btn icon color="transparent" elevation="0" @click="toggleCommentsForComments(comment)" class="rounded-circle" v-if="comment.comments.length > 0">
                      <v-icon> {{ comment.showCommentsFromComments ? "mdi-comment-text" : "mdi-comment-text-outline" }}</v-icon>
                      {{ comment.comments.length }}
                    </v-btn>
                    <v-btn text color="transparent" elevation="0" @click="prepareReplyForComment(comment)">
                      Válasz
                    </v-btn>
                    <v-btn v-if="comment.author == get_UserName && !comment.editable" text color="transparent" elevation="0" @click="commentEdit(comment,post.id+''+ index)">
                      Módosítás
                    </v-btn>
                    <v-btn v-if="comment.author == get_UserName && comment.editable" text color="transparent" elevation="0" @click="EditConfirme(comment)">
                      Módosít
                    </v-btn>
                    <v-btn v-if="comment.editable" text color="transparent" elevation="0" @click="cancelCommentEdit(comment)">
                      Mégse
                    </v-btn>
                  </div>
                  <v-expand-transition>
                    <div v-if="comment.showCommentsFromComments">
                      <!-- Új komment -->
                      <v-expand-transition>
                        <div class="position-relative mx-4 pa-2" v-if="comment.preparingReply">
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
                                @click="addCommentToComment(comment, get_UserName)"
                              >
                                Küldés
                              </v-btn>
                              <v-btn
                                color="transparent"
                                elevation="0"
                                small
                                @click="cancelPrepareReplyForComment(comment)"
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
                          <div v-for="(inner_comment, index) in limitedCommentsAtComments(comment)" :key="inner_comment.id" class="d-flex flex-column rounded-lg ma-4 pt-3" style="background-color: rgb(var(--v-theme-community_comment_bc));">
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
                                  Módosítás
                                </v-btn>
                              </v-expand-transition>
                              <v-expand-transition>
                                <v-btn v-if="inner_comment.author == get_UserName && inner_comment.editable" class="expand-edit-btn-second" text color="transparent" elevation="0" @click="EditConfirme(inner_comment)">
                                  Módosít
                                </v-btn>
                              </v-expand-transition>
                              <v-expand-transition>
                                <v-btn v-if="inner_comment.editable" class="expand-edit-btn-second" text color="transparent" elevation="0" @click="cancelCommentEdit(inner_comment)">
                                  Mégse
                                </v-btn>
                              </v-expand-transition>
                            </div>
                            <v-expand-transition>
                              <div class="position-relative mx-4 pa-2" v-if="inner_comment.preparingReply">
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
                                      @click="addLastCommentToComment(comment, inner_comment, get_UserName)"
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
                      @click="activeUnderline = !activeUnderline"
                      >
                        <v-icon>mdi-format-underline</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeAlignLeft}" 
                      @click="AlignActivate('left')"
                      >
                        <v-icon>mdi-format-align-left</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeAlignCenter}" 
                      @click="AlignActivate('center')"
                      >
                        <v-icon>mdi-format-align-center</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeAlignRight}" 
                      @click="AlignActivate('right')"
                      >
                        <v-icon>mdi-format-align-right</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeOrderedList}" 
                      @click="activeOrderedList = !activeOrderedList"
                      >
                        <v-icon>mdi-format-list-numbered</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeUnorderedList}" 
                      @click="activeUnorderedList = !activeUnorderedList"
                      >
                        <v-icon>mdi-format-list-bulleted</v-icon>
                      </v-btn>
                      <v-btn 
                      elevation="0"
                      icon 
                      small
                      @click="addLink"
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
                <div v-if="uploadedFiles.length">
                  <p class="mx-4">
                    Kiválasztott fájlok:
                  </p>
                  <ul class="mx-12">
                    <li v-for="(file, index) in uploadedFiles" :key="index">
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
                </div>
              </v-expand-transition>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="community_primary_color" @click="callAddPost(get_UserName,get_fullUser.id)">Poszt létrehozása</v-btn>
            <v-btn text @click="toggleCreatePost">Mégse</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, reactive, computed, nextTick, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProfileGetUser } from '@/api/profile/profileQuery';
import { useCommunityPost } from '@/api/community/communityQuery';

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

const { mutate: ProfileGetUser } = useProfileGetUser();

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
const toggleCreatePost = ref(false);

const uploadedFiles = ref([]);
const newPost = reactive({ title: "", content: "", images: [], files: [] });

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
        showCommentsFromComments: false,
        comments: []
      },
      {
        id: 2,
        author: "AnotherUser",
        createdAt: "2025-01-01 18:39",
        text: "Ugyanez a kérdésem!",
        likes: 1,
        dislikes: 0,
        userReaction: null,
        newComment: "",
        showCommentsFromComments: false,
        comments: []
      }
    ],
    newComment: "",
    showCommentsFromPost: false,
    preparingReply: false,
    commentLimit: 10,
  }
]);

const searchQuery = ref("");
const showCreatePost = ref(false);
const editingText = ref("");
const dialog = ref(false);
const selectedImage = ref(null);

const { mutate: handlePostUpload } = useCommunityPost();

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

function AlignActivate(side){
  if(side == 'left'){
    activeAlignLeft.value = true;
    activeAlignCenter.value = false;
    activeAlignRight.value = false;
  }else if(side == 'center'){
    activeAlignLeft.value = false;
    activeAlignCenter.value = true;
    activeAlignRight.value = false;
  }else if(side == 'right'){
    activeAlignLeft.value = false;
    activeAlignCenter.value = false;
    activeAlignRight.value = true;
  }
}

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
      }
    }
  }
}

let execCommadnCheckInterval = null;

function startMonitoring() {
  if (!execCommadnCheckInterval) {
    execCommadnCheckInterval = setInterval(() => {
      checkSelection();
    }, 200);
  }
}

function stopMonitoring() {
  if (execCommadnCheckInterval) {
    clearInterval(execCommadnCheckInterval);
    execCommadnCheckInterval = null;
  }
}

watch(showCreatePost, (newValue) => {
  if (newValue) {
    startMonitoring(); 
  } else {
    stopMonitoring(); 
  }
});

const addPost = (get_UserName, get_UserID) => {
  const editor = document.querySelector("#editor");
  let htmlContent = editor.innerHTML;

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  const images = [];
  tempDiv.querySelectorAll("img").forEach((img) => {
    images.push(img.src);
  });

  const files = uploadedFiles.value.map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type,
    url: URL.createObjectURL(file),
  }));

  const mergedArray = images.concat(files);

  if (newPost.title && get_UserName && htmlContent) {
    // Hívjuk meg a `handlePostUpload`-ot az API kéréshez
    handlePostUpload({
      id: get_UserID, 
      title: newPost.title,
      content: htmlContent,
      files: mergedArray,
    });
  }

  // Reseteljük az űrlap adatokat
  newPost.title = "";
  newPost.content = "";
  newPost.images = [];
  newPost.files = [];
  uploadedFiles.value = [];
};

// Drag & Drop események hozzáadása
nextTick(() => {
  const editor = document.querySelector("#editor");

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
          insertImage(e.target.result); // A kép beszúrása
        };

        reader.readAsDataURL(file);
      }
    });
  }
});

// Kép beszúrása
const insertImage = (imageUrl) => {
  const selection = window.getSelection();
  const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

  if (range) {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Uploaded Image";
    img.style.maxWidth = "20vw";
    img.style.maxHeight = "20vh";
    img.style.display = "block";

    range.insertNode(img);
    range.setStartAfter(img);
    range.setEndAfter(img);
    selection.removeAllRanges();
    selection.addRange(range);
  } else {
    const editor = document.querySelector("#editor");
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Uploaded Image";
    img.style.maxWidth = "20vw";
    img.style.maxHeight = "20vh";
    img.style.display = "block";
    editor.appendChild(img);

    const range = document.createRange();
    range.selectNode(img);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

const handleFileUpload = (event) => {
  const files = event.target.files;
  const allowedTypes = ['.js', '.ts', '.vue', '.cs', '.lua', '.txt']; // Engedélyezett fájl típusok
  const uploadedFilesArray = [...uploadedFiles.value]; // Az eddigi fájlok másolása, hogy ne veszítsd el őket

  for (let file of files) {
    const fileExtension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
    if (allowedTypes.includes(`.${fileExtension}`)) {
      uploadedFilesArray.push(file); // Ha a fájl kiterjesztése engedélyezett, hozzáadjuk
    } else {
      alert(`A(z) ${file.name} fájl nem engedélyezett!`);
    }
  }

  // Az összes feltöltött fájl frissítése a tömbben
  uploadedFiles.value = uploadedFilesArray;
};
</script>

<style>
.v-img {
  cursor: pointer; /* Mutatja, hogy a kép kattintható */
  transition: transform 0.2s ease; /* Finom animáció */
}
.v-img:hover {
  transform: scale(1.05); /* Kisebb nagyítás az egérrel való áthúzáskor */
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
  max-width: 60vw;
  margin: auto;
  display: flex;
  flex-direction: column;
}

.editor-area .editor {
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
</style>