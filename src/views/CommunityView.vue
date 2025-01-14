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
                    @click:clear="clearMessage"
                    style="min-width: 14vw;"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>

          <v-btn icon elevation="0" @click="toggleCreatePost">
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
                      @click="toggleUnderline"
                      >
                        <v-icon>mdi-format-underline</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeAlignLeft}" 
                      @click="applyAlignLeft"
                      >
                        <v-icon>mdi-format-align-left</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeAlignCenter}" 
                      @click="applyAlignCenter"
                      >
                        <v-icon>mdi-format-align-center</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeAlignRight}" 
                      @click="applyAlignRight"
                      >
                        <v-icon>mdi-format-align-right</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeOrderedList}" 
                      @click="applyOrderedList"
                      >
                        <v-icon>mdi-format-list-numbered</v-icon>
                      </v-btn>
                      <v-btn
                      elevation="0"
                      small
                      icon  
                      :class="{'active-btn': activeUnorderedList}" 
                      @click="applyUnorderedList"
                      >
                        <v-icon>mdi-format-list-bulleted</v-icon>
                      </v-btn>
                      <v-btn 
                      elevation="0"
                      icon 
                      small 
                      :class="{'active-btn': activeLink}" 
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
            <v-btn color="community_primary_color" @click="addPost(get_UserName)">Poszt létrehozása</v-btn>
            <v-btn text @click="toggleCreatePost">Mégse</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProfileGetUser } from '@/api/profile/profileQuery';

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
</script>

<script>
function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // hónap, 2 számjegyre
  const day = date.getDate().toString().padStart(2, '0'); // nap, 2 számjegyre
  const hours = date.getHours().toString().padStart(2, '0'); // óra, 2 számjegyre
  const minutes = date.getMinutes().toString().padStart(2, '0'); // perc, 2 számjegyre
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

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

      uploadedFiles: [],
      newPost: { title: "", content: "", images: [], files: [] },

      posts: [
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
      newPost: { title: "", content: "", images: [], files: [] },
      searchQuery: "",
      showCreatePost: false,
      editingText: "",
      dialog: false,
      selectedImage: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
    const editor = this.$refs.editor;

    if (editor) {
      // Drag & Drop események hozzáadása
      editor.addEventListener("dragover", (event) => {
        event.preventDefault(); // Az alapértelmezett viselkedés megakadályozása
      });

      editor.addEventListener("drop", (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
          const file = files[0];
          const reader = new FileReader();

          reader.onload = (e) => {
            this.insertImage(e.target.result); // A kép beszúrása
          };

          reader.readAsDataURL(file);
        }
      });
    }});
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
    handleFileUpload(event) {
      const files = event.target.files;
      const allowedTypes = ['.js', '.ts', '.vue', '.cs', '.lua', '.txt']; // Engedélyezett fájl típusok
      const uploadedFiles = [...this.uploadedFiles];  // Az eddigi fájlok másolása, hogy ne veszítsd el őket

      for (let file of files) {
        const fileExtension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
        if (allowedTypes.includes(`.${fileExtension}`)) {
          uploadedFiles.push(file);  // Ha a fájl kiterjesztése engedélyezett, hozzáadjuk
        } else {
          alert(`A(z) ${file.name} fájl nem engedélyezett!`);
        }
      }

      // Az összes feltöltött fájl frissítése a tömbben
      this.uploadedFiles = uploadedFiles;
    },
    triggerFileInput() {
      this.$refs.fileInput.click(); // Fájl input aktiválása
    },
    fileDelete(index){
      this.uploadedFiles.splice(index,1);
    },
    getFileUrl(file) {
      // Ellenőrizd, hogy valóban fájlobjektumot kaptál
      if (file instanceof File) {
        return URL.createObjectURL(file); // Hozz létre egy URL-t a fájlhoz
      }
      return file.url; // Ha az nem fájl, akkor visszaadhatod közvetlenül a fájl URL-jét (pl. ha már rendelkezésre áll)
    },
    updateContent(event) {
      const selection = window.getSelection();
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

      if (range) {

        const cursorPosition = range.startOffset;
        const startContainer = range.startContainer;
        
        this.content = event.target.innerHTML;

        this.$nextTick(() => {
          const editor = this.$refs.editor;

          if (editor.contains(startContainer)) {

            const newRange = document.createRange();
            const newSelection = window.getSelection();

            newRange.setStart(startContainer, cursorPosition);
            newRange.collapse(true);

            newSelection.removeAllRanges();
            newSelection.addRange(newRange);
          } else {
            const fallbackRange = document.createRange();
            fallbackRange.selectNodeContents(editor);
            fallbackRange.collapse(false);

            const fallbackSelection = window.getSelection();
            fallbackSelection.removeAllRanges();
            fallbackSelection.addRange(fallbackRange);
          }
        });
      }
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

      const selection = window.getSelection();
      const selectedNode = selection.anchorNode;

      if (selectedNode && selectedNode.nodeName === "IMG") {
        selectedNode.parentElement.style.textAlign = "left";
      }
    },

    applyAlignCenter() {
      this.execCommand("justifyCenter");
      this.activeAlignCenter = true;
      this.activeAlignLeft = false;
      this.activeAlignRight = false;

      const selection = window.getSelection();
      const selectedNode = selection.anchorNode;

      if (selectedNode && selectedNode.nodeName === "IMG") {
        selectedNode.parentElement.style.textAlign = "center";
      }
    },

    applyAlignRight() {
      this.execCommand("justifyRight");
      this.activeAlignRight = true;
      this.activeAlignLeft = false;
      this.activeAlignCenter = false;

      const selection = window.getSelection();
      const selectedNode = selection.anchorNode;

      if (selectedNode && selectedNode.nodeName === "IMG") {
        selectedNode.parentElement.style.textAlign = "right";
      }
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
        const linkNode = document.createElement("a");
        linkNode.setAttribute("href", selectedText);
        linkNode.setAttribute("target", "_blank");
        linkNode.textContent = selectedText;

        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(linkNode);

        linkNode.addEventListener('click', (event) => {
          event.preventDefault();
          window.open(linkNode.href, '_blank');
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
    triggerImageInput() {
      this.$refs.imageInput.click(); // Kép input aktiválása
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.insertImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    insertImage(imageUrl) {
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
        const editor = this.$refs.editor;
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
      const editor = this.$refs.editor;
      let htmlContent = editor.innerHTML;

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;

      const images = [];
      tempDiv.querySelectorAll("img").forEach((img) => {
        images.push(img.src);
      });

      const files = this.uploadedFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      }));

      const newId = this.posts.length + 1;
      this.posts.unshift({
        ...this.newPost,
        id: newId,
        author: get_UserName,
        likes: 0,
        dislikes: 0,
        userReaction: null,
        comments: [],
        newComment: "",
        showCommentsFromPost: false,
        preparingReply: false,
        commentLimit: 10,
        createdAt: formatDate(new Date()),
        title: this.newPost.title || "",
        content: htmlContent,
        images: images,
        files: files,  // Fájlok hozzáadása
      });

      // Új post inicializálása
      this.newPost = { title: "", content: "", images: [], files: [] };
      this.uploadedFiles = [];  // Feltöltött fájlok ürítése
      this.toggleCreatePost();  // Opció: Bezárja a létrehozási felületet
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
      }
    },
    dislikeComment(Comment) {
      if (Comment.userReaction === "dislike") {
        Comment.dislikes--;
        Comment.userReaction = null;
      } else {
        if (Comment.userReaction === "like") Comment.likes--;
        Comment.dislikes++;
        Comment.userReaction = "dislike";
      }
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
          userReaction: null,
          comments: [],
          showCommentsFromComments: false,
          commentLimit: 10,
          editable: false
        });
        post.newComment = "";
        post.preparingReply = false; // Visszazárja az írást
      }
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