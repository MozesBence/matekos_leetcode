<template>
  <v-container>
    <div class="hero">
      <v-skeleton-loader
        v-if="isLoading"
        type="heading"
        width="70%"
        class="mx-auto"
      ></v-skeleton-loader>
      <h1 v-else ref="rotatingText">Üdvözlünk a boltban, {{ get_fullUser.user_name }}!</h1>
    </div>

    <div class="userCurrency">
      <v-skeleton-loader
        v-if="isLoading"
        type="text"
        width="20%"
        class="mx-auto"
      ></v-skeleton-loader>
      <h3 v-else style="align-items: center; vertical-align: middle; text-align: center; display: flex;">
        Aranyak száma: {{ formatCurrency(get_fullUser?.currency_count) }}
        <img height="20" src="../assets/coin.png" />
      </h3>
    </div>

    <v-row v-if="isLoading">
      <v-col v-for="n in 4" :key="n" cols="12" sm="6" lg="3">
        <v-skeleton-loader
          type="image, text@2, button"
          class="mx-auto centered-row skeleton-card"
          max-width="400"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row v-else>
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
              :disabled="(get_fullUser?.currency_count ?? 0) < item.price"
              @click="openPurchaseDialog(item)"
            >
              Kiváltom - {{ formatCurrency(item.price) }}
              <img src="../assets/coin.png" alt="" height="20" />
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">Biztosan kiváltod ezt a tételt?</v-card-title>
        <v-card-text>
          Tétel ára: {{ purchaseData.price }} <img src="../assets/coin.png" alt="" height="20" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Mégsem</v-btn>
          <v-btn @click="handleConfirmPurchase">Igen, Kiváltom</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="successDialog" max-width="400" persistent>
      <v-card class="d-flex flex-column align-center justify-center text-center">
        <v-card-title class="headline">{{ successStatus ? 'Sikeres vásárlás' : 'Sikertelen vásárlás' }}</v-card-title>
        <v-card-text>
          {{ SuccessMessage }}
          <v-icon :color="successStatus ? 'green' : 'red'" size="120">
            {{ successStatus ? 'mdi-check' : 'mdi-close' }}
          </v-icon>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="CloseStateDialog">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    

  </v-container>
</template>

<script lang="ts" setup>
import { get_fullUser, fetchUserData } from '@/stores/userStore';
import { ref, onMounted } from 'vue';
import { useProfileGetUser } from '@/api/profile/profileQuery';
import { UseFetchStoreItems } from '../api/storeItems/storeItemQuery';
import { UsePurchaseItem } from '@/api/redeemItem/purchaseItemQuery';

interface User {
  id: number;
  user_name: string;
  currency_count: number;
}


const dialog = ref(false);
const successDialog = ref(false);
const successStatus = ref(false);
const SuccessMessage = ref('');
const isLoading = ref(true);
const profileMutation = useProfileGetUser();
const items = UseFetchStoreItems();

const purchaseData = ref({
  userId: get_fullUser.value?.id ?? 0,
  currency: 'gold',
  itemId: 0,
  amount: 1,
  price: 0,
});

const openPurchaseDialog = (item: { id: number; price: number }) => {
  purchaseData.value.itemId = item.id;
  purchaseData.value.price = item.price;
  dialog.value = true;
};


const { mutate: confirmPurchase } = UsePurchaseItem(purchaseData);

const handleConfirmPurchase = async () => {
  try {
    await confirmPurchase();
    dialog.value = false;

    successStatus.value = true;
    SuccessMessage.value = 'A vásárlás sikeresen megtörtént!';
    successDialog.value = true;

    await items.refetch();
    try {
    await Promise.all([
      items.refetch(),
      await fetchUserData(),
    ]);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  } finally {
    isLoading.value = false;
  }
   // await fetchUserData();
  } catch (error) {
    successStatus.value = false;
    SuccessMessage.value = 'Valami hiba történt a vásárlás során.';
    successDialog.value = true;

    console.error("Transaction failed:", error);
  }
};

const CloseStateDialog = () => {
  successDialog.value = false;
};

const formatCurrency = (currency: number): string => {
  if (currency === 0) return '0';

  const units = ['E', 'M', 'MLRD'];
  let index = -1;

  while (currency >= 1000 && index < units.length - 1) {
    currency /= 1000;
    index++;
  }

  return index >= 0 ? `${currency.toFixed(1)}${units[index]}` : currency.toString();
};

onMounted(async () => {
  try {
    await Promise.all([
      items.refetch(),
      await fetchUserData(),
    ]);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  } finally {
    isLoading.value = false;
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
</style>