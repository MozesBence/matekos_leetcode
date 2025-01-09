<template>
  <main style="min-height: 88vh;">
    <div class="hero">
      <h1 ref="rotatingText">{{ currentText }}</h1>
    </div>

    <div class="content">
      <section class="about">
        <v-btn
          block
          class="d-flex justify-space-between align-center custom-btn"
          @click="AboutOpen = !AboutOpen"
          elevation="0"
          style="position: relative;"
        >
          <span :style="{fontSize: $vuetify.display.smAndDown ? '3.6vw' : '1.8vw'}">A weboldalról</span>
          <v-icon style="position: absolute; right: .5vw;">{{ AboutOpen ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
        </v-btn>

        <!-- Lenyíló tartalom -->
        <v-expand-transition>
          <div v-if="AboutOpen" class="dropdown-content" :style="{marginTop: $vuetify.display.smAndDown ? '3vw' : '1vw'}">
            <p :style="{fontSize: $vuetify.display.smAndDown ? '3vw' : '1vw'}">2023-ban egy évvégi beadandó keretin belül kezdtük el tervezni, majd a projektmunka során megjött az ihlet,
              hogy vigyük tovább szakmai vizsgának, amit 2024 szeptemberében kezdtünk el megcsinálni. Itt a már meglévő beadandónkat
              kellett átírni.</p>
          </div>
        </v-expand-transition>
      </section>

      <section class="why">
        <v-btn
          block
          class="d-flex justify-space-between align-center custom-btn"
          @click="WhyOpen = !WhyOpen"
          elevation="0"
          style="position: relative;"
        >
          <span :style="{fontSize: $vuetify.display.smAndDown ? '3.6vw' : '1.8vw'}">MathSolve, miért a MathSolve?</span>
          <v-icon style="position: absolute; right: .5vw;">{{ WhyOpen ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
        </v-btn>

        <!-- Lenyíló tartalom -->
        <v-expand-transition>
          <div v-if="WhyOpen" class="dropdown-content" :style="{marginTop: $vuetify.display.smAndDown ? '3vw' : '1vw'}">
            <p :style="{fontSize: $vuetify.display.smAndDown ? '3vw' : '1vw'}">Szerettünk volna egy olyan beadandót csinálni, ami diáktársaink segítségére lehet a későbbiekben,
              és innen jött a matek-infó közötti kapocs, amit próbálunk a leghatékonyabban diáktársaink részére átadni mint gyakorlófelület.
              Ezért lett a név MathSolve.</p>
          </div>
        </v-expand-transition>
      </section>

      <section class="usage">
        <v-btn
          block
          class="d-flex justify-space-between align-center custom-btn"
          @click="UsageOpen = !UsageOpen"
          elevation="0"
          style="position: relative;"
        >
          <span :style="{fontSize: $vuetify.display.smAndDown ? '3.6vw' : '1.8vw'}">Hogyan használd a weboldalt?</span>
          <v-icon style="position: absolute; right: .5vw;">{{ UsageOpen ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
        </v-btn>

        <!-- Lenyíló tartalom -->
        <v-expand-transition>
          <div v-if="UsageOpen" class="dropdown-content" :style="{marginTop: $vuetify.display.smAndDown ? '3vw' : '1vw'}">
            <p :style="{fontSize: $vuetify.display.smAndDown ? '3vw' : '1vw'}">Az oldalon lehet a feladatokra szűrni témakör és nehézségi szint alapján is, ezzel próbáljuk a felhasználók számára
              megkönnyíteni dolgukat, hogy a lehető legszűkebben tudják tudásukat bővíteni vagy tesztelni.</p>
          </div>
        </v-expand-transition>
      </section>

      <section class="features">
        <v-btn
          block
          class="d-flex justify-space-between align-center custom-btn"
          @click="FeaturesOpen = !FeaturesOpen"
          elevation="0"
          style="position: relative;"
        >
          <span :style="{fontSize: $vuetify.display.smAndDown ? '3.6vw' : '1.8vw'}">Az oldal funkcióiról</span>
          <v-icon style="position: absolute; right: .5vw;">{{ FeaturesOpen ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
        </v-btn>

        <!-- Lenyíló tartalom -->
        <v-expand-transition>
          <div v-if="FeaturesOpen" class="dropdown-content" :style="{marginTop: $vuetify.display.smAndDown ? '3vw' : '1vw'}">
            <p :style="{fontSize: $vuetify.display.smAndDown ? '3vw' : '1vw'}">Az oldalon nyomon tudja követni minden felhasználó saját és társai pontszámait, amit egy globális leaderboarddal szemléltetünk,
              emellett vannak challengek, amik speciálisabb módon, de beleszámítanak a ranglistába.</p>
          </div>
        </v-expand-transition>
      </section>

      <section class="about-us">
        <v-btn
          block
          class="d-flex justify-space-between align-center custom-btn"
          @click="AboutUsOpen = !AboutUsOpen"
          elevation="0"
          style="position: relative;"
        >
          <span :style="{fontSize: $vuetify.display.smAndDown ? '3.6vw' : '1.8vw'}">Rólunk</span>
          <v-icon style="position: absolute; right: .5vw;">{{ AboutUsOpen ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
        </v-btn>

        <!-- Lenyíló tartalom -->
        <v-expand-transition>
          <div v-if="AboutUsOpen" class="dropdown-content" :style="{marginTop: $vuetify.display.smAndDown ? '3vw' : '1vw'}">
            <p :style="{fontSize: $vuetify.display.smAndDown ? '3vw' : '1vw'}">Ez a projekt célja, hogy segítse a tanulókat matek- és infófeladatok megoldásában egy gyakorló környezetben.</p>

            <div class="team-section">
              <div class="profile left">
                <img src="../components/background/test_profile.jpg" alt="Profile 1" class="profile-img" />
                <div class="profile-info">
                  <h1>Bujdosó Bálint</h1>
                  <p>Rövid bemutatkozás...</p>
                  <p><strong>Nyelvek, amelyekben jártas vagyok:</strong> HTML, CSS, JavaScript</p>
                </div>
              </div>
              
              <div class="profile right">
                <img src="../components/background/test_profile.jpg" alt="Profile 2" class="profile-img" />
                <div class="profile-info">
                  <h1>Mózes Bence</h1>
                  <p>Rövid bemutatkozás...</p>
                  <p><strong>Nyelvek, amelyekben jártas vagyok:</strong> Python, C#, Vue.js</p>
                </div>
              </div>
              
              <div class="profile left">
                <img src="../components/background/test_profile.jpg" alt="Profile 3" class="profile-img"/>
                <div class="profile-info">
                  <h1>Pintea Dániel</h1>
                  <p>2020 óta a Ceglédi SZC Közgazdasági és Informatikai Technikum diákja vagyok. Az elmúlt években számos projektben és versenyen vettem részt, amelyek során folyamatosan bővítettem tudásomat és fejlesztettem készségeimet.
                    <br>
                    <br>
                    A programozás nemcsak a munkám, hanem a hobbim is – szenvedélyesen szeretek új dolgokat alkotni és problémákat megoldani.</p>
                  <p><strong>Nyelvek, amelyekben jártas vagyok:</strong> HTML, CSS, TypeScript, JavaScript, Lua, C#, C++, Python, Rust</p>
                </div>
              </div>
            </div>

          </div>
        </v-expand-transition>
      </section>

      <section class="faq">
        <v-btn
          block
          class="d-flex justify-space-between align-center custom-btn"
          @click="FaqOpen = !FaqOpen"
          elevation="0"
          style="position: relative;"
        >
          <span :style="{fontSize: $vuetify.display.smAndDown ? '3.6vw' : '1.8vw'}">GYIK - Gyakran ismételt kérdések</span>
          <v-icon style="position: absolute; right: .5vw;">{{ FaqOpen ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
        </v-btn>

        <!-- Lenyíló tartalom -->
        <v-expand-transition>
          <div v-if="FaqOpen" class="dropdown-content" :style="{marginTop: $vuetify.display.smAndDown ? '3vw' : '1vw'}">
            <p :style="{fontSize: $vuetify.display.smAndDown ? '3vw' : '1vw'}">Ha bármilyen kérdésed van a használattal kapcsolatban, nézd meg a gyakori kérdéseket vagy lépj velünk kapcsolatba!</p>
          </div>
        </v-expand-transition>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      fonts: [
        "Roboto",
        "Montserrat",
        "Poppins",
        "Pacifico",
        "Lato",
        "Open Sans",
        "Oswald",
        "Raleway",
        "Playfair Display",
        "Merriweather",
        "Ubuntu",
        "Roboto Slab",
        "Slabo 27px",
        "Fira Sans",
      ],
      texts: [
        "Üdv a fedélzeten!",
        "Köszöntünk az oldalon!",
        "Örülünk, hogy itt vagy!",
        "Nézz szét!",
        "Jó, hogy csatlakoztál hozzánk!",
        "Reméljük, jól fogod érezni magad!",
        "Kellemes időtöltést kívánunk!",
        "Üdvözlünk a közösségünkben!",
        "Nagyszerű, hogy itt vagy!",
        "Fedezd fel az oldalunkat!",
        "Köszönjük, hogy benéztél!",
        "Várnak rád izgalmas tartalmak!",
        "Lépj be, és érezd otthon magad!",
        "Szuper, hogy csatlakoztál!",
        "Kezdd el a felfedezést most!",
        "Legyen szép napod nálunk!",
        "Készülj az élményekre!",
        "Üdv a csapatban!",
        "Lazíts, és böngéssz kedvedre!"
      ],
      currentFont: "",
      currentText: "",
      AboutOpen: false,
      WhyOpen: false,
      UsageOpen: false,
      FeaturesOpen: false,
      AboutUsOpen: false,
      FaqOpen: false,
    };
  },
  mounted() {
    this.selectRandomTextAndFont();
  },
  methods: {
    selectRandomTextAndFont() {
      // Véletlenszerű szöveg kiválasztása
      const randomTextIndex = Math.floor(Math.random() * this.texts.length);
      this.currentText = this.texts[randomTextIndex];

      // Véletlenszerű betűtípus kiválasztása
      const randomFontIndex = Math.floor(Math.random() * this.fonts.length);
      this.currentFont = this.fonts[randomFontIndex];

      // Betűtípus alkalmazása
      this.$refs.rotatingText.style.fontFamily = this.currentFont;
    },
  },
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  overflow: hidden; 
}

main {
  font-family: 'Roboto', sans-serif;
  background: rgb(var(--v-theme-background));
  color: #333;
  padding: 20px;
  overflow-y: auto; 
  height: 100%; 
  scrollbar-width: none; /*gorgeteshez*/ 
  -ms-overflow-style: none; /*gorgeteshez*/ 
}

main::-webkit-scrollbar {
  display: none; /*gorgeteshez*/ 
}

.hero {
  text-align: center;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: rgb(var(--v-theme-about_main_text_color));
  padding: 50px 20px;
  border-radius: 12px;
  margin-bottom: 30px;
}

.hero h1 {
  font-size: 3rem;
  transition: font-family 0.5s ease, color 0.5s ease;
}

.content {
  max-width: 100%;
  margin: 0 auto;
  background: rgb(var(--v-theme-about_bc));
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

section {
  margin-bottom: 20px;
}

h2 {
  font-size: 2rem;
  color: rgb(var(--v-theme-about_text_color));
  margin-bottom: 10px;
}

p {
  font-size: 1rem;
  line-height: 1.6;
  text-align: justify;
  color: rgb(var(--v-theme-about_text_color));
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}

.custom-btn {
  background-color: transparent;
  font-weight: bold;
  padding: 1.5vw;
}

.dropdown-content {
  margin: auto;
  width: 96%;
}

.team-section {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 3rem 0 3rem 0;
  padding: 0 18rem;
  position: relative;
}

.profile {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
}

.profile.left {
  justify-content: flex-start;
}

.profile.right {
  justify-content: flex-end;
}

.profile-img {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  position: relative;
}

.profile-info {
  max-width: 40rem;
}

.profile-info h1 {
  margin-bottom: 10px;
  color: rgb(var(--v-theme-about_text_color));
}

.profile-info p {
  margin: 5px 0;
  color: rgb(var(--v-theme-about_text_color));
}
</style>
