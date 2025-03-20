<template>
  <v-container>
  <div class="hero">
    <h1 ref="rotatingText">Üdvözlünk a boltban, {{get_fullUser.user_name}}!</h1>
  </div>
  <div class="userCurrency">
    <h3 
    style="align-items: center; vertical-align:middle; text-align:center; display:flex;"
    >
    Aranyak száma: {{get_fullUser.currency_count}}
    <img height="20" src="../assets/coin.png">


  </h3>
  </div>
    <v-row>
        <!--Kartya 1 kezdete-->
        <v-col cols="12" sm="6" lg="3">
          <v-card
          class="mx-auto centered-row"
          max-width="400"
          style="padding: 1em;"
        >
          <img
            class="align-end text-white"
            height="200"
            src="../assets/Tshirt_item.png"
            cover
          >
            
      
          <v-card-subtitle class="pt-4">
            Math Solve póló
          </v-card-subtitle>
      
          <v-card-text>
            <div>Tavaszi kollekció</div>
      
            <div>Limitált kiadás, a készlet erejéig kiváltható</div>
          </v-card-text>
      
          <v-card-actions>
            <v-btn
            color="orange"
            :disabled="get_fullUser.currency_count < 5000"
          >
            Kiváltom - 5000
            <img src="../assets/coin.png" alt="" height="20" v-if="get_fullUser.currency_count < 5000" />
          </v-btn>
          
          </v-card-actions>
        </v-card>
        </v-col>
        <!--Kartya 1 vege-->

        <!--Kartya 2 kezdete-->
        <v-col cols="12" sm="6" lg="3">
          <v-card
          class="mx-auto centered-row"
          max-width="400"
          style="padding: 1em;"
        >
          <img
            class="align-end text-white"
            height="200"
            src="../assets/Notebook_item.png"
            cover
          >
            
      
          <v-card-subtitle class="pt-4">
            Math Solve füzet
          </v-card-subtitle>
      
          <v-card-text>
            <div>Tavaszi kollekció</div>
      
            <div>Limitált kiadás, a készlet erejéig kiváltható</div>
          </v-card-text>
      
          <v-card-actions>
            <v-btn
            color="orange"
            :disabled="get_fullUser.currency_count < 5000"
          >
            Kiváltom - 5000
            <img src="../assets/coin.png" alt="" height="20" v-if="get_fullUser.currency_count < 5000" />
          </v-btn>
          </v-card-actions>
        </v-card>
        </v-col>
        <!--Kartya 2 vege-->

        <!--Kartya 3 kezdete-->
        <v-col cols="12" sm="6" lg="3">
          <v-card
          class="mx-auto centered-row"
          max-width="400"
          style="padding: 1em;"
        >
          <img
            class="align-end text-white"
            height="200"
            src="../assets/Mug_item.png"
            cover
          >
            
      
          <v-card-subtitle class="pt-4">
            Math Solve bögre
          </v-card-subtitle>
      
          <v-card-text>
            <div>Tavaszi kollekció</div>
      
            <div>Limitált kiadás, a készlet erejéig kiváltható</div>
          </v-card-text>
      
          <v-card-actions>
            <v-btn
            color="orange"
            :disabled="get_fullUser.currency_count < 5000"
          >
            Kiváltom - 5000
            <img src="../assets/coin.png" alt="" height="20" v-if="get_fullUser.currency_count < 5000" />
          </v-btn>
          </v-card-actions>
        </v-card>
        </v-col>
        <!--Kartya 3 vege-->

        <!--Kartya 4 kezdete-->
        <v-col cols="12" sm="6" lg="3">
          <v-card
          class="mx-auto centered-row"
          max-width="400"
          style="padding: 1em;"
        >
          <img
            class="align-end text-white"
            height="200"
            src="../assets/rollback.png"
            cover
          >
            
      
          <v-card-subtitle class="pt-4">
            Math Solve visszaugró token
          </v-card-subtitle>
      
          <v-card-text>      
            <div>Ha lemaradtál egy napi feladatról visszatérhetsz rá, a token segítségével!</div>
          </v-card-text>
      
          <v-card-actions>
            <v-btn
            color="orange"
            :disabled="get_fullUser.currency_count < 5000"
          >
            Kiváltom - 5000
            <img src="../assets/coin.png" alt="" height="20" v-if="get_fullUser.currency_count < 5000" />
          </v-btn>
          </v-card-actions>
        </v-card>
        </v-col>
        <!--Kartya 4 vege-->
    </v-row>
</v-container>
</template>

<script lang="ts" setup>
import {get_fullUser, getCookie, userId,get_user_email,get_user_name} from '@/stores/userStore'
import { ref, computed, watchEffect,onMounted } from "vue";
import { useProfileGetUser } from '@/api/profile/profileQuery';

  onMounted(async ()=>{
  const userCookie = getCookie('user');
        if (userCookie) {
          try {
            const userData = JSON.parse(atob(userCookie.split('.')[1]));
            get_user_name.value = userData.id;
          } catch (error) {
            console.error('Error parsing user cookie:', error);
          }
        }
  
        const get_user_by_token = getCookie('user') != null && getCookie('user') != 'undefined' && typeof getCookie('user') != "object" ? getCookie('user') : null;
  
        if (get_user_by_token) {
          const { mutate: ProfileGetUser } = useProfileGetUser();
          try {
            await ProfileGetUser({token: get_user_by_token, id: 0}, {
              onSuccess: (get_user) => {
                get_user_name.value = get_user.user_name;
                get_fullUser.value = get_user;
              },
            });
          } catch (error) {
            console.error('Error fetching user profile:', error);
          }
        }
});
</script>

<style scoped>
.hero {
  text-align: center;
  background: linear-gradient(120deg, #6a11cb, #2575fc, #00d2ff, #6a11cb, #2575fc, #00d2ff);
  background-size: 400% 400%;
  animation: gradient-animation 8s ease-in-out infinite;
  color: rgb(var(--v-theme-about_main_text_color));
  padding: 50px 20px;
  border-radius: 12px;
  margin-bottom: 30px;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 84% 50%;
  }
}

.hero h1 {
  font-size: 2.5rem;
  transition: font-family 0.5s ease, color 0.5s ease;
}
.storeItem {
  height: 15vw;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.storeCard {
  padding: 2em;
  text-align: center;
}

.centered-row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  width: 100%;
}

.userCurrency h3 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:2em;
  margin-bottom:2em;
}
.userCurrency{

}
</style>