<script setup lang="ts">

</script>

<template>
  <!-- First container with dynamic cards -->
  <v-container fluid>
    <v-row class="d-flex justify-center align-center flex-nowrap" style="overflow-x: auto; margin: 2em; white-space: nowrap;">
      <v-col v-for="(card, index) in cards" :key="index" class="pa-2" cols="12" sm="6" md="4" lg="3" style="min-width: 300px;">
        <v-card style="position: relative; display: flex; flex-direction: column; padding: 16px; overflow: hidden;">
          <video autoplay loop muted playsinline style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1;">
            <source src="../components/background/main_page_card1.mp4" type="video/mp4">
          </video>
  
          <v-card-title class="text-h6" style="background-color: rgba(107, 212, 234, 0.9); border-radius: 15px; text-align: center; padding: 8px; color:white">
            {{ card.title }}
          </v-card-title>
          <v-text class="text-body-2 text-center" style="margin: 16px 0; white-space: pre-wrap; word-wrap: break-word; color:white">
            {{ card.description }}
          </v-text>
          <v-card-actions class="d-flex justify-center" style="margin-top: auto;">
            <v-btn append-icon="mdi-chevron-right" color="white" text="Program megkezdése" variant="outlined" block style="max-width: 200px;">
              Program megkezdése
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  
  <!-- Second container for themes data -->
    <v-sheet
      class="mx-auto"
      max-width="100%"
    >
      <v-slide-group
        show-arrows
      >
        <v-slide-group-item
          v-for="n in options"
          :key="n.title"
          v-slot="{ isSelected, toggle }"
        >
          <v-btn
            :color="isSelected ? 'blue-lighten-1' : 'white'"
            class="ma-4"
            rounded
            width="350px"
            height="3em"
            style="font-size: small;"
            
            @click="toggle"
          >
            {{ n.title }}
          </v-btn>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

  <!-- Navigation Drawer Layout -->
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Drawer left"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer location="right">
      <v-list>
        <v-list-item title="Drawer right"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="d-flex align-center justify-center" style="min-height: 300px; ">
      <v-row>
        <v-row>
          <v-col class="text-center" style="border-bottom: 1px solid #ccc;">Státusz</v-col>
          <v-col class="text-center" style="border-bottom: 1px solid #ccc;">Cím</v-col>
          <v-col class="text-center" style="border-bottom: 1px solid #ccc;">Teljesítési arány</v-col>
          <v-col class="text-center" style="border-bottom: 1px solid #ccc;">Nehézség</v-col>
        </v-row>
      </v-row>
      <v-row>
        <br>  
         <!-- Card Row (in a new line) -->
      <v-card class="mx-auto" width="90%" link>
        <v-row align="center" justify="space-between" class="py-1 px-2">
          <!-- Zöld pipálás ikon -->
          <v-col cols="1" class="text-center">
            <v-icon color="green" small>mdi-check</v-icon>
          </v-col>
    
          <!-- Cím és sorszám -->
          <v-col cols="2" class="text-left">
            <span class="text-h6">1. Pelda feladat</span>
          </v-col>
    
          <!-- Százalékos érték -->
          <v-col cols="1" class="text-center">
            <span class="text-h6">50.0%</span>
          </v-col>
    
          <!-- Nehézség szintje -->
          <v-col cols="2" class="text-right">
            <v-chip color="green-lighten-1" outlined small>
              Konnyu
            </v-chip>
          </v-col>
    
          <!-- Zár ikon -->
          <v-col cols="1" class="text-right">
          </v-col>
        </v-row>
      </v-card>
      </v-row>
      <!-- Header Row -->
     
     
    </v-main>
    
  </v-layout>
</template>

<script lang="ts">
export default {
  data() {
    return {
      cards: [
        {
          title: "Érettségi felkészítő (közép)",
          image: "https://cdn.vuetifyjs.com/docs/images/cards/dark-beach.jpg",
          description:
            "Ezek a feladatok a közép szintű érettségihez képest még összetettebbek.",
        },
        {
          title: "Érettségi felkészítő (emelt)",
          image: "https://cdn.vuetifyjs.com/docs/images/cards/forest.jpg",
          description:
            "Ezek a feladatok a közép szintű érettségihez képest még összetettebbek.",
        },
        {
          title: "Matek mester",
          image: "https://cdn.vuetifyjs.com/docs/images/cards/bike.jpg",
          description:
            "A program célja, hogy alapvető kódolási ismereteket adjunk a diákoknak.",
        },
        {
          title: "Legutóbb elkezdett feladat",
          image: "https://cdn.vuetifyjs.com/docs/images/cards/river.jpg",
          description:
            "A matematika érettségihez szükséges feladatok részletes magyarázata.",
        },
      ],
      options: [
        { title: "Abszolútérték, gyök" },
        { title: "Bizonyítások" },
        { title: "Egyenletek" },
        {title:'Egyenletrendszerek'},
        {title: 'Egyenlőtlenségek'},
        { title: "Egyszerűsítések, átalakítások" },
        { title: "Értelmezési tartomány, értékkészlet" },
        { title: "Exponenciális és logaritmusos feladatok" },
        { title: "Függvények, analízis" },
        { title: "Halmazok" },
        { title: "Kombinatorika" },
        { title: "Paraméter" },
        { title: "Koordinátageometria" },
        { title: "Logika, grafok" },
        { title: "Síkmértan" },
        { title: "Sorozatok" },
        { title: "Statisztika" },
        { title: "Számelmélet" },
        { title: "Szöveges feladatok" },
        { title: "Térmértan" },
        { title: "Trigonometria" },
        { title: "Valószínűségszámítás" }
      ],
    };
  },
};



</script>
