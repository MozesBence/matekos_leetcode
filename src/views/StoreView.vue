<template>
  <!--Main content-->
  <v-container>
    <!--Cím div, skeleton-->
    <div class="hero">
      <v-skeleton-loader
        v-if="isLoading"
        type="heading"
        width="70%"
        class="mx-auto"
      ></v-skeleton-loader>
      <h1 v-else-if="get_fullUser && get_fullUser.user_name" ref="rotatingText">Üdvözlünk a boltban, {{ get_fullUser.user_name }}!</h1>
      <h1 v-else>Üdvözlünk a boltban!</h1>
    </div>

    <!--Aranyak kijelzése, skeleton-->
    <div class="userCurrency">
      <v-skeleton-loader
        v-if="isLoading"
        type="text"
        width="20%"
        class="mx-auto"
      ></v-skeleton-loader>
      <!--Ha van user bejelentkezve akkor mutatja az aranyat, ha nincs üzenetet mutat-->
      <h3 v-else-if="get_fullUser && get_fullUser.currency_count" style="align-items: center; vertical-align: middle; text-align: center; display: flex;">
        Aranyak száma: {{ formatCurrency(get_fullUser?.currency_count) }}
        <img height="20" src="../assets/coin.png" />
      </h3>
      <h3 v-else>Aranyaid megtekintéséhéze jelentkezz be!</h3>
    </div>

    <!--Skeletonok store itemekhez ha tölt-->
    <v-row v-if="isLoading">
      <v-col v-for="n in 4" :key="n" cols="12" sm="6" lg="3">
        <v-skeleton-loader
          type="image, text@2, button"
          class="mx-auto centered-row skeleton-card"
          max-width="400"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <!--Ha nem tölt itemek mutatása-->
    <v-row v-else>
      <!--Item 1-->
      <v-col cols="12" sm="6" lg="3">
        <v-card class="mx-auto centered-row" max-width="400" style="padding: 1em;">
          <img class="align-end text-white" height="200" src="../assets/rollback.png" cover />
          <!--Item neve-->
          <v-card-subtitle class="pt-4">
            {{ items.data.value[0].name }}
          </v-card-subtitle>

          <!--Item leírása-->
          <v-card-text>
            <div>{{ items.data.value[0].description }}</div>
          </v-card-text>

          <!--Item kiváltása ha van készleten, vagy nem limitált darabszámú - (ekkor null)-->
          <v-card-actions v-if="items.data.value[0].amount > 0 || items.data.value[0].amount == null">
            <!--Disabled ha a usernek nincs rá pénze-->
            <v-btn color="orange" :disabled="(get_fullUser?.currency_count ?? 0) < items.data.value[0].price" @click="openPurchaseDialog(items.data.value[0])" >
              Kiváltom - {{ formatCurrency(items.data.value[0].price) }}
              <img src="../assets/coin.png" alt="" height="20" />
            </v-btn>
          </v-card-actions>
          <!--Ha nincs készleten-->
          <v-card-actions v-else>
            <v-btn disabled>
              Nincs készleten
              <img src="../assets/coin.png" alt="" height="20" />
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!--Item 2-->
      <v-col cols="12" sm="6" lg="3">
        <v-card class="mx-auto centered-row" max-width="400" style="padding: 1em;">
          <img class="align-end text-white" height="200" src="../assets/Tshirt_item.png" cover />
          <!--Item neve-->
          <v-card-subtitle class="pt-4">
            {{ items.data.value[1].name }}
          </v-card-subtitle>
           <!--Item leírása-->
          <v-card-text>
            <div>{{ items.data.value[1].description }}</div>
          </v-card-text>
          <!--Item kiváltása ha van készleten, vagy nem limitált darabszámú - (ekkor null)-->
          <v-card-actions v-if="items.data.value[1].amount > 0 || items.data.value[1].amount == null">
             <!--Disabled ha a usernek nincs rá pénze-->
            <v-btn
              color="orange"
              :disabled="(get_fullUser?.currency_count ?? 0) < items.data.value[1].price"
              @click="openPurchaseDialog(items.data.value[1])"
            >
              Kiváltom - {{ formatCurrency(items.data.value[1].price) }}
              <img src="../assets/coin.png" alt="" height="20" />
            </v-btn>
          </v-card-actions>
          <!--Ha nincs készleten-->
          <v-card-actions v-else>
            <v-btn
              disabled
            >
              Nincs készleten
              <img src="../assets/coin.png" alt="" height="20" />
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!--Item 3-->
      <v-col cols="12" sm="6" lg="3">
        <v-card class="mx-auto centered-row" max-width="400" style="padding: 1em;">
          <img class="align-end text-white" height="200" src="../assets/Mug_item.png" cover />
          <!--Item neve-->
          <v-card-subtitle class="pt-4">
            {{ items.data.value[2].name }}
          </v-card-subtitle>
           <!--Item leírása-->
          <v-card-text>
            <div>{{ items.data.value[2].description }}</div>
          </v-card-text>
          <!--Item kiváltása ha van készleten, vagy nem limitált darabszámú - (ekkor null)-->
          <v-card-actions v-if="items.data.value[2].amount > 0 || items.data.value[2].amount == null">
             <!--Disabled ha a usernek nincs rá pénze-->
            <v-btn
              color="orange"
              :disabled="(get_fullUser?.currency_count ?? 0) < items.data.value[2].price"
              @click="openPurchaseDialog(items.data.value[2])"
            >
              Kiváltom - {{ formatCurrency(items.data.value[2].price) }}
              <img src="../assets/coin.png" alt="" height="20" />
            </v-btn>
          </v-card-actions>
          <!--Ha nincs készleten-->
          <v-card-actions v-else>
            <v-btn
              disabled
            >
              Nincs készleten
              <img src="../assets/coin.png" alt="" height="20" />
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!--Item 4-->
      <v-col cols="12" sm="6" lg="3">
        <v-card class="mx-auto centered-row" max-width="400" style="padding: 1em;">
          <img class="align-end text-white" height="200" src="../assets/Notebook_item.png" cover />
          <!--Item neve-->
          <v-card-subtitle class="pt-4">
            {{ items.data.value[3].name }}
          </v-card-subtitle>
           <!--Item leírása-->
          <v-card-text>
            <div>{{ items.data.value[3].description }}</div>
          </v-card-text>
          <!--Item kiváltása ha van készleten, vagy nem limitált darabszámú - (ekkor null)-->
          <v-card-actions v-if="items.data.value[3].amount > 0 || items.data.value[3].amount == null">
             <!--Disabled ha a usernek nincs rá pénze-->
            <v-btn
              color="orange"
              :disabled="(get_fullUser?.currency_count ?? 0) < items.data.value[3].price"
              @click="openPurchaseDialog(items.data.value[3])"
            >
              Kiváltom - {{ formatCurrency(items.data.value[3].price) }}
              <img src="../assets/coin.png" alt="" height="20" />
            </v-btn>
          </v-card-actions>
           <!--Ha nincs készleten-->
          <v-card-actions v-else>
            <v-btn
              disabled
            >
              Nincs készleten
              <img src="../assets/coin.png" alt="" height="20" />
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!--Dialog a kiváltásra-->
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

    <!--Dialog arra, hogy a vásárlás végbement (sikeres/sikertelen)-->
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

//Importok kezdete
import { get_fullUser, fetchUserData,get_user_name } from '@/stores/userStore';
import { ref, onMounted } from 'vue';
import { useProfileGetUser } from '@/api/profile/profileQuery';
import { UseFetchStoreItems } from '../api/storeItems/storeItemQuery';
import { UsePurchaseItem } from '@/api/redeemItem/purchaseItemQuery';
//Importok vége

//User interface
interface User {
  id: number;
  user_name: string;
  currency_count: number;
}

//Változók
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

//A vásárlásnál megjelenú dialog megnyitása, ahol mutatja az adott elem árát
const openPurchaseDialog = (item: { id: number; price: number }) => {
  purchaseData.value.itemId = item.id;
  purchaseData.value.price = item.price;
  dialog.value = true;
};

//Mutation a vásárlás folzamatához, ill. UsePurchaseItem-hez
const { mutate: confirmPurchase } = UsePurchaseItem(purchaseData);

//A vásárlás lekezelése,error handling
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
  } catch (error) {
    successStatus.value = false;
    SuccessMessage.value = 'Valami hiba történt a vásárlás során.';
    successDialog.value = true;

    console.error("Transaction failed:", error);
  }
};

// A vásárlás állapotát jelzó dialog bezárása
const CloseStateDialog = () => {
  successDialog.value = false;
};

/*Az adott éréket átkonvertálja adott formákra:
  Példák:
    - 100, (100)
    - 1,5E, (1500)
    - 1,4M, (1400000)
    - 10.2MLRD (10200003400)
*/
function formatCurrency(amount: number): string {
  if (amount === 0) return '0';

  const units = ['E', 'M', 'MLRD'];
  let index = 0;

  while (amount >= 1000 && index < units.length) {
    amount /= 1000;
    index++;
  }
  return index > 0 ? `${amount.toFixed(1)}${units[index - 1]}` : amount.toString();
}

//oldal betöltésénél lefutó kérések
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