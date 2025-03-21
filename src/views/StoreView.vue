<template>
  <v-container>
    <div class="hero">
      <h1 ref="rotatingText">Üdvözlünk a boltban, {{ get_fullUser.user_name }}!</h1>
    </div>
    <div class="userCurrency">
      <h3
        style="align-items: center; vertical-align: middle; text-align: center; display: flex;"
      >
        Aranyak száma: {{ get_fullUser.currency_count }}
        <img height="20" src="../assets/coin.png" />
      </h3>
    </div>

    <v-row>
      <v-col cols="12" sm="6" lg="3" v-for="(item, index) in items.data.value" :key="index">
        <v-card class="mx-auto centered-row" max-width="400" style="padding: 1em;">
          <img class="align-end text-white" height="200" src="../assets/Tshirt_item.png" cover />

          <v-card-subtitle class="pt-4">
            {{ item.name }}
          </v-card-subtitle>

          <v-card-text>
            <div>{{ item.description }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="orange"
              :disabled="get_fullUser.currency_count < item.price"
              @click="openPurchaseDialog(item)" 
            >
              Kiváltom - {{ item.price }}
              <img src="../assets/coin.png" alt="" height="20" />
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card title="Biztosan kiváltod ezt a tételt?">
      <v-card-text>
        Tétel ára: {{ purchaseData.price }} <img src="../assets/coin.png" alt="" height="20" />
      </v-card-text>
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false">Mégsem</v-btn>
        <v-btn @click="confirmPurchase">Igen, Kiváltom</v-btn>
      </template>
    </v-card>
  </v-dialog>

  <v-dialog v-model="successDialog" max-width="400" persistent>
    <v-card>
      <v-card-title class="headline">Sikeres vásárlás</v-card-title>
      <v-card-text>
        A vásárlás sikeresen megtörtént!
      </v-card-text>
      <v-card-actions>
        <v-btn @click="successDialog = false">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>



<script lang="ts" setup>
import { get_fullUser, getCookie, get_user_name } from '@/stores/userStore';
import { ref, onMounted } from 'vue';
import { useProfileGetUser } from '@/api/profile/profileQuery';
import { UseFetchStoreItems } from '../api/storeItems/storeItemQuery';
import { UsePurchaseItem } from '@/api/redeemItem/purchaseItemQuery';

var dialog = ref(false);
const successDialog = ref(false);
const items = UseFetchStoreItems();


const purchaseData = ref({
  userId: get_fullUser.value?.id ?? null,
  currency: 'gold',
  itemId: null,
  amount: 1,
  price: null,
});

const openPurchaseDialog = (item) => {
  purchaseData.value.itemId = item.id;
  purchaseData.value.price = item.price;
  dialog.value = true;
};

const { mutate: confirmPurchase } = UsePurchaseItem(purchaseData); 

const handleConfirmPurchase = () => {
  console.log("Confirmed purchase", purchaseData.value);
  confirmPurchase();
  dialog.value = false;
};

onMounted(async () => {
  items.refetch();

  const userCookie = getCookie('user');
  if (userCookie) {
    try {
      const userData = JSON.parse(atob(userCookie.split('.')[1]));
      get_user_name.value = userData.id;
    } catch (error) {
      console.error('Error parsing user cookie:', error);
    }
  }

  const get_user_by_token =
    getCookie('user') != null &&
    getCookie('user') != 'undefined' &&
    typeof getCookie('user') != 'object'
      ? getCookie('user')
      : null;

  if (get_user_by_token) {
    const { mutate: ProfileGetUser } = useProfileGetUser();
    try {
      await ProfileGetUser(
        { token: get_user_by_token, id: 0 },
        {
          onSuccess: (get_user) => {
            get_user_name.value = get_user.user_name;
            get_fullUser.value = get_user;
          },
        }
      );
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