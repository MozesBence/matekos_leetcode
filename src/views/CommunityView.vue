<template>
  <main style="min-height: 85.4vh;" class="mt-5 d-flex justify-center">
    <div>
      <div class="d-flex">
        <div 
          class="d-flex align-center" 
          style="height: max-content; position: fixed; left: 7rem; z-index: 1;">
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
        <div class="">
          <v-card
            v-for="post in filteredPosts"
            :key="post.id"
            class="mb-4"
            min-width="40vw"
          >
            <v-card-title>
              {{ post.title }}
            </v-card-title>
            <v-card-subtitle>
              Írta: {{ post.author }} - {{ new Date(post.createdAt).toLocaleDateString() }}
            </v-card-subtitle>
            <v-card-text>
              <div v-if="post.images.length">
                <v-carousel>
                  <v-carousel-item
                    v-for="(image, index) in post.images"
                    :key="index"
                  >
                    <v-img :src="image" class="mb-3" />
                  </v-carousel-item>
                </v-carousel>
              </div>
              {{ post.content }}
            </v-card-text>
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
              <v-btn icon color="community_primary_color" @click="toggleCommentsForPost(post)" class="rounded-circle">
                <v-icon> {{ post.showCommentsFromPost ? "mdi-comment-text" : "mdi-comment-text-outline" }} </v-icon>
              </v-btn>
              <v-btn text color="community_primary_color" @click="prepareReplyForPost(post)">
                Válasz
              </v-btn>
            </v-card-actions>
            <!-- Komment szekció -->
            <v-expand-transition>
              <div v-if="post.showCommentsFromPost">
                <!-- Új komment -->
                <v-divider class="my-2"></v-divider>
                <div class="position-relative mx-4 pa-2" style="border: .1vw solid red;">
                  <div class="d-flex flex-row align-center mb-3 ml-2 pa-1 pr-2 rounded-xl" style="width: max-content; background-color: rgb(var(--v-theme-community_comment_bc));">
                    <img src="../components/background/test_profile.jpg" alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                    {{ get_UserName }}
                  </div>
                  <div>
                    <v-textarea
                      v-model="post.newComment"
                      label="Válaszod"
                      hide-details
                      variant="outlined"
                      rows="1"
                      style="min-height: min-content;"
                    ></v-textarea>
                    <div class="d-flex pa-2 ga-2">
                      <v-btn
                        :disabled="post.newComment == ''"
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
                        @click="cancelPrepareReplyForPost(post)"
                      >
                        Mégse
                      </v-btn>
                    </div>
                  </div>
                </div>

                <!-- Kommentek listája -->
                <div v-for="(comment, index) in limitedComments(post)" :key="comment.id" class="d-flex flex-column rounded-lg ma-4 pt-3" style="background-color: rgb(var(--v-theme-community_comment_bc));">
                  <div class="d-flex flex-column pl-2">
                    <div class="d-flex flex-row align-center mb-1 pa-1 pr-2 rounded-xl" style="width: max-content; background-color: rgb(var(--v-theme-community_posts_bc));">
                      <img src="../components/background/test_profile.jpg" alt="" style="height: 2rem; width: 2rem; border-radius: 50%;" class="mr-3">
                      {{ comment.author }}
                    </div>
                    <div class="ml-4 mt-2">
                      {{ comment.text }}
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
                    <v-btn icon color="transparent" elevation="0" @click="toggleCommentsForComments(comment)" class="rounded-circle">
                      <v-icon> {{ comment.showCommentsFromComments ? "mdi-comment-text" : "mdi-comment-text-outline" }} </v-icon>
                    </v-btn>
                    <v-btn text color="transparent" elevation="0" @click="prepareReplyForComment(comment)">
                      Válasz
                    </v-btn>
                  </div>
                </div>
                <!-- Több komment betöltése -->
                <v-btn
                  v-if="post.comments.length > post.commentLimit"
                  text small @click="loadMoreComments(post)"
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
          <v-card-text>
            <v-text-field
              v-model="newPost.title"
              label="Cím"
              outlined
              class="mb-3"
            ></v-text-field>
            <v-textarea
              v-model="newPost.content"
              label="Tartalom"
              outlined
            ></v-textarea>
            <v-file-input
              v-model="newPost.images"
              label="Képek feltöltése"
              accept="image/*"
              multiple
              outlined
            ></v-file-input>
          </v-card-text>
          <v-card-actions>
            <v-btn color="community_primary_color" @click="addPost">Poszt létrehozása</v-btn>
            <v-btn text @click="toggleCreatePost">Mégse</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, watch, shallowRef } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProfilePicUpload } from '@/api/profile/profileQuery';
import { useProfileGetUser } from '@/api/profile/profileQuery';
import { useTheme } from 'vuetify';

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
export default {
  name: "CommunityPage",
  data() {
    return {
      posts: [
        {
          id: 1,
          author: "User123",
          title: "Vue.js kérdés",
          content: "Hogyan lehet Vue-t használni?",
          images: ["https://via.placeholder.com/300"],
          likes: 3,
          dislikes: 0,
          userReaction: null,
          createdAt: "2025-01-01",
          comments: [
            { id: 1, author: "Helper99", text: "Segíthetek ebben!", likes: 2, dislikes: 1, userReaction: null, showCommentsFromComments: false,},
            { id: 2, author: "AnotherUser", text: "Ugyanez a kérdésem!", likes: 1, dislikes: 0, userReaction: null, showCommentsFromComments: false,},
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
    };
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
    clearMessage () {
      this.searchQuery = ''
    },
    toggleCreatePost() {
      this.showCreatePost = !this.showCreatePost;
    },
    addPost() {
      const newId = this.posts.length + 1;
      this.posts.unshift({
        ...this.newPost,
        id: newId,
        author: "Én",
        likes: 0,
        dislikes: 0,
        userReaction: null,
        comments: [],
        newComment: "",
        showCommentsFromPost: false,
        preparingReply: false,
        commentLimit: 10,
        createdAt: new Date().toISOString(),
      });
      this.newPost = { title: "", content: "", images: [] };
      this.toggleCreatePost();
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
      comment.preparingReply = true;
    },
    limitedComments(post) {
      return post.comments.slice(0, post.commentLimit);
    },
    loadMoreComments(post) {
      post.commentLimit += 10;
    },
    addCommentToPost(post) {
      if (post.newComment.trim()) {
        const commentId = post.comments.length + 1;
        post.comments.push({
          id: commentId,
          author: "Én",
          text: post.newComment.trim(),
          likes: 0, 
          dislikes: 0, 
          userReaction: null,
          comments: [],
        });
        post.newComment = "";
        post.preparingReply = false; // Visszazárja az írást
      }
    },
    addCommentToComment(Comment) {
      if (Comment.newComment.trim()) {
        const commentId = post.comments.length + 1;
        Comment.comments.push({
          id: commentId,
          author: "Én",
          text: Comment.newComment.trim(),
          likes: 0, 
          dislikes: 0, 
          userReaction: null,
        });
        post.newComment = "";
        post.preparingReply = false; // Visszazárja az írást
      }
    },
  },
};
</script>
