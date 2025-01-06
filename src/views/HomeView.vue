<template>
  <v-container fluid>
    <v-row class="d-flex justify-center align-center" style="overflow-x: auto; margin: 1vw 2vw;">
      <v-col v-for="(card, index) in cards" :key="index" class="pa-2" cols="12" sm="4" md="4" lg="3">
        <v-card style="position: relative; display: flex; flex-direction: column; overflow: hidden; padding: .5vw 1vw">
          <video autoplay loop muted playsinline style="width: 100%; height: 100%;top: 0; left: 0; position: absolute; z-index: -1; object-fit: fill;">
            <source src="http://localhost:3000/drive-video" type="video/mp4"/>
          </video>

          <v-card-title class="text-h6 rounded-lg" style="background-color: rgba(107, 212, 234, 0.9); text-align: center; padding: .6rem; color: white">
            {{ card.title }}
          </v-card-title>
          <v-text class="text-body-2 text-center" style="margin: 16px 0; white-space: pre-wrap; word-wrap: break-word; color: white">
            {{ card.description }}
          </v-text>
          <v-card-actions class="d-flex justify-center" style="margin-top: auto;">
            <v-btn append-icon="mdi-chevron-right" color="white" text="Program megkezdése" variant="outlined" block style="width: 4rem;">
              Program megkezdése
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-sheet class="mx-auto" max-width="100%" style="background: transparent;">
    <v-slide-group show-arrows>
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

  <v-row 
  class="d-flex align-center justify-center" 
  style="padding: 10px; gap: 16px;"
>
<v-col cols="2" class="d-flex align-center justify-center">
  <v-select
    clearable
    label="Nehézség"
    :items="['Könnyű', 'Közepes', 'Nehéz']"
    variant="solo"
    class="responsive-item"
    theme="light"
  ></v-select>
</v-col>

<v-col cols="2" class="d-flex align-center justify-center">
  <v-select
    clearable
    label="Állapot"
    :items="['Megkezdetlen', 'Függőben lévő', 'Kész']"
    variant="solo"
    class="responsive-item"
    theme="light"
  ></v-select>
</v-col>


<v-col cols="3" class="d-flex align-center justify-start search-bar" style="vertical-align:middle">
 
      <v-text-field
        style="height: 4.5em;text-align:center; vertical-align:middle;"
        :loading="loading"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Feladat neve..."
        variant="solo"
        hide-details
        single-line
        @click:append-inner="onClick"
      ></v-text-field>
</v-col>


  <v-col cols="2" class="d-flex align-center justify-center" style="align-items: center; vertical-align:middle">
    <v-btn class="responsive-item bg-green" style="width: 100%; height:4em">
      Random feladat  <v-icon color="white">mdi-shuffle-variant</v-icon>
    </v-btn>
  </v-col>
</v-row>

  <v-layout class="rounded rounded-md" height="100em">
    <v-navigation-drawer 
    location="right" 
    width="400"
    style="background: transparent;"
    >
    <v-list>
      <v-list-item>
        <div
          style="border-radius: 15px; padding: 10px; width: 380px; margin-bottom:2em"
          class="d-flex flex-column align-center justify-center bg-grey-lighten-4"
        >
          <h1>Napi idézet</h1>
          <br>
          <p>A matematika nem az, hogy képleteket bemagolunk és alkalmazunk. Nem attól leszek a matematikához értő ember, hogy fejből tudom a másodfokú egyenlet megoldóképletét. Ezt a szemléletet nagyon jó lenne letörni, hogy a matematika tanulása ne egy mechanikus dolog legyen, hanem az, hogy gondolkozom, aktív cselekvője vagyok annak, ami történik, nem egy szolgaszerű végrehajtója az elmondott dolgoknak. (...) Gondolkozni örömet okoz. Az egy jó érzés, amikor én jövök rá valamire, sokkal jobb, mint amikor a tanár megmondja.</p>
        </div>
      </v-list-item>
      <v-list-item 
      class="d-flex flex-column align-center justify-center" 
      style="text-align: center; height: 10em; width:400px; margin-bottom:2em"
    >
      <div 
        style="border-radius: 15px; padding: 10px; width: 380px; height: 9em;" 
        class="d-flex flex-column align-center justify-center bg-grey-lighten-4"
      >
        <h1 >Fiók szintje:</h1>
    
        <v-progress-linear
          v-model="percentage"
          color="green-darken-2"
          height="25"
          style="width: 300px; border-radius: 15px; margin-top: 10px; background-color: transparent;" 
        >
          <template v-slot:default="{ value }">
            <strong>{{ Math.ceil(level) }}. szint</strong> <!-- Display 'level' -->
          </template>
        </v-progress-linear>
      </div>
    </v-list-item>

      <v-list-item class="d-flex flex-column align-center justify-center" 
      style="text-align: center;  width: 400px; margin-top: 2em; margin-bottom: 2em">
      <div 
        style="border-radius: 15px; padding: 10px; width: 380px; height: 100%;" 
        class="d-flex flex-column align-center justify-center bg-grey-lighten-4"
      >
      <div class="heatmap">
        <h1>Napi feladatok - {{ currentYear }}/{{ currentMonth }}</h1>
        <div class="heatmap-grid">
          <div
            v-for="(day, index) in days"
            :key="index"
            :style="{ backgroundColor: getClass(day.value) }"
            class="heatmap-cell"
          >
            {{ day.day }}
          </div>
        </div>
      </div>      
      </div>
      </v-list-item>
      <v-list-item class="d-flex flex-column align-center justify-center" 
      style="text-align: center; width:400px; margin-top:2em; margin-bottom:2em">
      <div 
        style="border-radius: 15px; padding: 10px; width: 380px; height: 100%;" 
        class="d-flex flex-column align-center justify-center bg-grey-lighten-4"
      >
        <h1>Teljesítési statisztika:</h1>
        <div id="chart">
          <apexchart type="radialBar" height="390" :options="chartOptions" :series="series"></apexchart>
        </div>
      </div>
      </v-list-item>
      </v-list>
    </v-navigation-drawer>
  
    <v-main class="d-block align-center justify-center" style="background: transparent;">
      <v-row style="margin: 2em; border-bottom: 1px solid #ccc;">
        <v-col class="d-flex align-center justify-center" cols="2">
          <span>Státusz</span>
        </v-col>
        <v-col class="d-flex align-center justify-center" cols="6">
          <span>Cím</span>
        </v-col>
        <v-col class="d-flex align-center justify-center" cols="2">
          <span>Teljesítési arány</span>
        </v-col>
        <v-col class="d-flex align-center justify-center" cols="2">
          <span>Nehézség</span>
        </v-col>
      </v-row>
  
      <v-row 
        v-for="(task, index) in taskList" 
        :key="index" 
        style="margin: 2em; border-bottom: 1px solid #ccc;"
      >
        <v-col class="d-flex align-center justify-center" cols="2">
          <v-icon :color="task.statusColor" small>{{task.icon}}</v-icon>
        </v-col>
        <v-col class="d-flex align-center justify-center" cols="6">
          <span class="text-h7">{{ task.title }}</span>
        </v-col>
        <v-col class="d-flex align-center justify-center" cols="2">
          <span class="text-h7">{{ task.completionRate }}%</span>
        </v-col>
        <v-col class="d-flex align-center justify-center" cols="2">
          <v-chip :color="task.difficultyColor" outlined small>
            {{ task.difficulty }}
          </v-chip>
        </v-col>
      </v-row>
    </v-main>
  </v-layout>
  
  <v-row style="display: flex; justify-content:center; vertical-align:middle;margin:1em; background: transparent;">
    <v-pagination :length="6"></v-pagination>
  </v-row>
  <v-footer style="background: rgb(var(--v-theme-secondary));">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        class="mx-2"
        color="white"
        rounded="xl"
        variant="text"
      >
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        Copyright © {{ new Date().getFullYear() }} — Math Solve
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import axios from "axios";
import * as cheerio from 'cheerio';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = String(today.getMonth() + 1).padStart(2, "0");
    const daysInMonth = new Date(currentYear, today.getMonth() + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      value: Math.floor(Math.random() * 3) - 1,
    }));

    return {
      quote: "",
      currentYear,
      currentMonth,
      days,
      series: [76, 67, 61],
      chartOptions: {
        chart: {
          height: 390,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              }
            },
            barLabels: {
              enabled: true,
              useSeriesColors: true,
              offsetX: -8,
              fontSize: '16px',
              formatter: function(seriesName, opts) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
              },
            },
          }
        },
        colors: ['green', 'orange', 'red'],
        labels: ['Könnyű', 'Közepes', 'Nehéz'],
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              show: false
            }
          }
        }],
      },
      percentage: 20,
      level: 100,
      taskList: [
        {
          title: "2021. Közép. érettségi I. 2,a feladat",
          statusColor: "blue",
          completionRate: 30,
          difficulty: "Közepes",
          difficultyColor: "orange-lighten-1",
          icon: "mdi-calendar"
        },
        {
          title: "2021. Közép. érettségi I. 1,a feladat",
          statusColor: "green",
          completionRate: 50,
          difficulty: "Könnyű",
          difficultyColor: "green-lighten-1",
          icon: "mdi-check"
        },
        {
          title: "2022. Emelt érettségi I. 1,b feladat",
          statusColor: "green",
          completionRate: 70,
          difficulty: "Nehéz",
          difficultyColor: "red-lighten-1",
          icon: "mdi-check"
        },
        {
          title: "2022. Közép. érettségi II. 3,a feladat",
          statusColor: "yellow",
          completionRate: 45,
          difficulty: "Közepes",
          difficultyColor: "orange-lighten-1",
          icon: "mdi-clock-outline"
        },
        {
          title: "2023. Emelt érettségi I. 2,c feladat",
          statusColor: "green",
          completionRate: 85,
          difficulty: "Nehéz",
          difficultyColor: "red-lighten-1",
          icon: "mdi-check"
        },
        {
          title: "2021. Közép. érettségi I. 4,a feladat",
          statusColor: "yellow",
          completionRate: 20,
          difficulty: "Könnyű",
          difficultyColor: "green-lighten-1",
          icon: "mdi-clock-outline"
        },
        {
          title: "2023. Közép. érettségi II. 5,b feladat",
          statusColor: "yellow",
          completionRate: 55,
          difficulty: "Közepes",
          difficultyColor: "orange-lighten-1",
          icon: "mdi-clock-outline"
        },
        {
          title: "2024. Emelt érettségi II. 6,a feladat",
          statusColor: "green",
          completionRate: 90,
          difficulty: "Nehéz",
          difficultyColor: "red-lighten-1",
          icon: "mdi-check"
        },
        {
          title: "2020. Közép. érettségi I. 7,c feladat",
          statusColor: "yellow",
          completionRate: 25,
          difficulty: "Közepes",
          difficultyColor: "orange-lighten-1",
          icon: "mdi-clock-outline"
        },
        {
          title: "2022. Emelt érettségi II. 8,b feladat",
          statusColor: "green",
          completionRate: 75,
          difficulty: "Nehéz",
          difficultyColor: "red-lighten-1",
          icon: "mdi-check"
        },{
          title: "2024. Emelt érettségi II. 6,a feladat",
          statusColor: "green",
          completionRate: 90,
          difficulty: "Nehéz",
          difficultyColor: "red-lighten-1",
          icon: "mdi-check"
        },
        {
          title: "2020. Közép. érettségi I. 7,c feladat",
          statusColor: "yellow",
          completionRate: 25,
          difficulty: "Közepes",
          difficultyColor: "orange-lighten-1",
          icon: "mdi-clock-outline"
        },
        {
          title: "2022. Emelt érettségi II. 8,b feladat",
          statusColor: "green",
          completionRate: 75,
          difficulty: "Nehéz",
          difficultyColor: "red-lighten-1",
          icon: "mdi-check"
        },
        {
          title: "2024. Emelt érettségi II. 6,a feladat",
          statusColor: "green",
          completionRate: 90,
          difficulty: "Nehéz",
          difficultyColor: "red-lighten-1",
          icon: "mdi-check"
        }, {
          title: "2024. Emelt érettségi II. 6,a feladat",
          statusColor: "green",
          completionRate: 90,
          difficulty: "Nehéz",
          difficultyColor: "red-lighten-1",
          icon: "mdi-check"
        },
      ],
      cards: [
        {
          title: "Érettségi felkészítő (közép)",
          image: "https://cdn.vuetifyjs.com/docs/images/cards/dark-beach.jpg",
          description:
            "Ezek a feladatok a közép szintű érettségihez képest még összetettebbek."
        },
        {
          title: "Érettségi felkészítő (emelt)",
          image: "https://cdn.vuetifyjs.com/docs/images/cards/forest.jpg",
          description:
            "Ezek a feladatok a közép szintű érettségihez képest még összetettebbek."
        },
        {
          title: "Matek mester",
          image: "https://cdn.vuetifyjs.com/docs/images/cards/bike.jpg",
          description:
            "A program célja, hogy alapvető kódolási ismereteket adjunk a diákoknak."
        },
        {
          title: "Legutóbb elkezdett feladat",
          image: "https://cdn.vuetifyjs.com/docs/images/cards/river.jpg",
          description:
            "A matematika érettségihez szükséges feladatok részletes magyarázata."
        },
      ],
      options: [
        { title: "Abszolútérték, gyök" },
        { title: "Bizonyítások" },
        { title: "Egyenletek" },
        { title: "Egyenletrendszerek" },
        { title: "Egyenlőtlenségek" },
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
  methods: {
    getClass(value) {
      switch (value) {
        case -1:
          return "rgb(12, 17, 92)";
        case 0:
          return "rgb(157, 190, 250)";
        case 1:
          return "rgb(43, 179, 224)";
        default:
          return "";
      }
    },
  },
};

</script>

<style>
  .listitem
  {
    background-color: black;
    border-radius: 15px;
  }
  .v-layout{
    overflow-y: auto;
    overflow-x: hidden;
  }
  .heatmap {
    font-family: Arial, sans-serif;
    text-align: center;
    margin: 20px;
  }
  .heatmap-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    margin-top: 20px;
  }
  .heatmap-cell {
    padding: 10px;
    text-align: center;
    font-weight: bold;
    border-radius: 5px;
    color: white;
  }
  .red {
    background-color: rgb(185, 98, 98);
  }
  .light-blue {
    background-color: rgba(107, 212, 234, 0.9);;
  }
  .dark-blue {
    background-color: rgb(26, 26, 77);
  }
</style>