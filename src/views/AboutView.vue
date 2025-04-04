<template>
  <main>
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
          <span :style="{fontSize: $vuetify.display.smAndDown ? '3.6vw' : '1.6vw'}">A weboldalról</span>
          <v-icon style="position: absolute; right: .5vw;">{{ AboutOpen ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
        </v-btn>

        <!-- Lenyíló tartalom -->
        <v-expand-transition>
          <div v-if="AboutOpen" class="dropdown-content" :style="{marginTop: $vuetify.display.smAndDown ? '3vw' : '1vw'}">
            <p>Projektünk 2023 végén indult, amikor egy év végi beadandó keretében elkezdtük a tervezést. A munka során arra jutottunk, hogy szakmai vizsgánk témájaként folytassuk, így 2024 szeptemberében megkezdtük a kidolgozást. Az alapötlet már adott volt: egy olyan oldal létrehozása, amely lehetőséget biztosít a felhasználóknak a matematika gyakorlására egy bevált formula mentén. Célunk, hogy ne csupán egyéni élményt kínáljunk, hanem egy közösséget is építsünk, melyet versenyekkel, közösségi felületekkel és a jövőben további kreatív funkciókkal kívánunk támogatni.</p>
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
          <span :style="{fontSize: $vuetify.display.smAndDown ? '3.6vw' : '1.6vw'}">MathSolve, miért a MathSolve?</span>
          <v-icon style="position: absolute; right: .5vw;">{{ WhyOpen ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
        </v-btn>

        <!-- Lenyíló tartalom -->
        <v-expand-transition>
          <div v-if="WhyOpen" class="dropdown-content" :style="{marginTop: $vuetify.display.smAndDown ? '3vw' : '1vw'}">
            <p>A MathSolve név mögött az az elképzelés áll, hogy hidat építsünk a matematika és az informatika között, segítve diáktársainkat abban, hogy a tanulás élménye ne csupán egyéni, hanem közösségi kaland is legyen. Eredeti célunk egy olyan beadandó létrehozása volt, amely a gyakorlás mellett az információ átadásának hatékonyságát is szem előtt tartja, így született meg a MathSolve koncepciója. Ezzel a névvel azt kívántuk kifejezni, hogy a matek megoldása nemcsak az egyéni fejlődés, hanem a közös tudásépítés eszköze is lehet.</p>
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
          <span :style="{fontSize: $vuetify.display.smAndDown ? '3.6vw' : '1.6vw'}">Hogyan használd a weboldalt?</span>
          <v-icon style="position: absolute; right: .5vw;">{{ UsageOpen ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
        </v-btn>

        <!-- Lenyíló tartalom -->
        <v-expand-transition>
          <div v-if="UsageOpen" class="dropdown-content" :style="{marginTop: $vuetify.display.smAndDown ? '3vw' : '1vw'}">
            <p>Az oldalon lehetőség van a feladatok szűrésére témakör és nehézségi szint alapján, így célzottan fejlesztheted a tudásodat vagy tesztelheted magad.

              A napi feladatok rendszeres gyakorlást biztosítanak, miközben a teljesítményedet grafikonok és statisztikák segítségével követheted nyomon. Ha versenyszellem hajt, csatlakozhatsz heti és havi kihívásokhoz, ahol aranyat gyűjthetsz, amit később oldalon belüli tokenekre vagy valódi tárgyakra válthatsz.
              
              A közösségi funkciók lehetőséget biztosítanak arra, hogy másokkal együtt gondolkodj, megvitassátok a feladatokat, vagy akár saját feladványokat küldjetek be, amelyeket az adminok jóváhagyás után publikálnak.
              
              Ha inspirációra vágysz, minden nap egy új matematikai idézet vár rád, és saját playlistjeink is segítenek a tanulásban.
              
              Használd ki ezeket a lehetőségeket, és tedd hatékonyabbá a tanulásodat!</p>
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
          <span :style="{fontSize: $vuetify.display.smAndDown ? '3.6vw' : '1.6vw'}">Az oldal funkcióiról</span>
          <v-icon style="position: absolute; right: .5vw;">{{ FeaturesOpen ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
        </v-btn>

        <!-- Lenyíló tartalom -->
        <v-expand-transition>
          <div v-if="FeaturesOpen" class="dropdown-content" :style="{marginTop: $vuetify.display.smAndDown ? '3vw' : '1vw'}">
            <p>Oldalunk célja, hogy interaktív és motiváló módon segítse a felhasználókat a matematikai fejlődésben. Nálunk nemcsak feladatokat oldhatsz meg, hanem részt vehetsz heti és havi versenyeken, ahol aranyat gyűjthetsz. Az összegyűjtött aranyat később oldalon belüli tokenre vagy akár valódi tárgyakra válthatod.

              A teljesítményedet nyomon követheted részletes statisztikákkal és grafikonokkal, valamint egy globális ranglistán is megmérettetheted magad másokkal szemben. A kihívások (Challenges) speciális módon számítanak bele a rangsorba, így extra motivációt nyújtanak.
              
              Az oldal közösségi funkciókat is kínál: beszélgethetsz más felhasználókkal, megoszthatod gondolataidat a feladatokról, és akár saját feladványokat is beküldhetsz, amelyeket az adminok jóváhagyása után mások is megoldhatnak.
              
              Emellett minden nap egy inspiráló matematikai idézet vár rád, és saját playlistjeink segítenek a tanulásban. A napi feladatokkal fenntarthatod a lendületed, és folyamatosan fejlesztheted a tudásodat.
              
              Csatlakozz hozzánk, és tedd élvezetessé a matematikát!</p>
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
          <span :style="{fontSize: $vuetify.display.smAndDown ? '3.6vw' : '1.6vw'}">Rólunk</span>
          <v-icon style="position: absolute; right: .5vw;">{{ AboutUsOpen ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
        </v-btn>

        <!-- Lenyíló tartalom -->
        <v-expand-transition>
          <div v-if="AboutUsOpen" class="dropdown-content" :style="{marginTop: $vuetify.display.smAndDown ? '3vw' : '1vw'}">
            <p>Ez a projekt célja, hogy segítse a tanulókat matek- és infófeladatok megoldásában egy gyakorló környezetben.</p>
            <div class="team-section">
              <v-row>
                <v-col cols="12">
                  <div class="profile left">
                    <v-row class="d-flex align-center flex-column flex-md-row">
                      <div class="profile-img mr-md-8 mb-4 mb-md-0">
                        <img 
                        src="../../public/test_profile.jpg" 
                        alt="Profile 1" 
                        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; object-fit: cover;"/>
                      </div>
                      <div class="profile-info text-center" :style="{maxWidth: $vuetify.display.smAndDown ? '80vw': '40vw'}">
                        <h1 style="text-align: left;">Bujdosó Bálint</h1>
                        <br>
                        <p>2020 óta a Ceglédi SZC Közgazdasági és Informatikai Technikum tanulója vagyok, ahol az elmúlt évek során számos projektben és versenyen vettem részt. Ezek révén gyakorlati tapasztalatokat szereztem és folyamatosan fejlesztettem a programozási készségeimet.<br> A programozás számomra több mint szakma – lehetőséget ad arra, hogy kreatívan oldjak meg problémákat és új dolgokat hozzak létre.<br><br><strong>Nyelvek, amelyekben jártas vagyok: HTML, CSS, JavaScript, TypeScript, Python, C#.</strong></p>
                      </div>
                    </v-row>
                  </div>
                </v-col>


                <v-col cols="12" :style="{marginTop: $vuetify.display.smAndDown ? '5vw': '3vw'}">
                  <div class="profile right">
                    <v-row class="d-flex align-center flex-column flex-md-row">
                      <!-- Kép mobilon felül, nagyobb képernyőn jobb oldalon -->
                      <div class="profile-img order-first order-md-last mr-md-8 mb-4 mb-md-0" :style="{marginLeft: $vuetify.display.smAndDown ? '0vw': '2vw'}">
                        <img 
                          src="../../public/test_profile.jpg"
                          alt="Profile 2"
                          style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; object-fit: cover;"
                        />
                      </div>

                      <!-- Tartalom jobbra igazítása -->
                      <div class="profile-info text-center text-md-right ml-md-auto" :style="{ maxWidth: $vuetify.display.smAndDown ? '80vw' : '40vw' }">
                        <h1>Mózes Bence</h1>
                        <br>
                        <p>2020 óta a Ceglédi SZC Közgazdasági és Informatikai Technikum tanulója vagyok, ahol a programozás iránti szenvedélyem új lehetőségeket nyitott meg számomra. Számomra a programozás nemcsak munka, hanem egy eszköz arra, hogy problémákat fordítsak megoldássá és gondolatokat formáljak kézzelfogható eredményekké. A projektjeim során a kódolás segítségével valósítom meg ötleteimet, és mindig keresem az új kihívásokat, hogy még tovább fejlődjek.<br><br>

                          <strong>Nyelvek, amelyekben jártas vagyok: HTML, CSS, JavaScript, C#, Python.</strong></p>
                      </div>
                    </v-row>
                  </div>   
                </v-col>


                <v-col cols="12" :style="{marginTop: $vuetify.display.smAndDown ? '5vw': '3vw'}">
                  <div class="profile left">
                    <v-row class="d-flex align-center flex-column flex-md-row">
                      <div class="profile-img mr-md-8 mb-4 mb-md-0">
                        <img 
                          src="../../public/test_profile.jpg"
                          alt="Profile 3"
                          style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; object-fit: cover;"
                        />
                      </div>
                      <div class="profile-info text-center text-md-left" :style="{maxWidth: $vuetify.display.smAndDown ? '80vw': '40vw'}">
                        <h1>Pintea Dániel</h1>
                        <p>2020 óta a Ceglédi SZC Közgazdasági és Informatikai Technikum diákja vagyok. Az elmúlt években számos projektben és versenyen vettem részt, amelyek során folyamatosan bővítettem tudásomat és fejlesztettem készségeimet.
                        <br>
                        <br>
                          A programozás nemcsak a munkám, hanem a hobbim is – szenvedélyesen szeretek új dolgokat alkotni és problémákat megoldani.
                        </p>
                        <br></br>
                        <p><strong>Nyelvek, amelyekben jártas vagyok:</strong> HTML, CSS, TypeScript, JavaScript, Lua, C#, C++, Python, Rust</p>
                      </div>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
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
          <span :style="{fontSize: $vuetify.display.smAndDown ? '3.6vw' : '1.6vw'}">GYIK - Gyakran ismételt kérdések</span>
          <v-icon style="position: absolute; right: .5vw;">{{ FaqOpen ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
        </v-btn>

        <!-- Lenyíló tartalom -->
        <v-expand-transition>
          <div v-if="FaqOpen" class="dropdown-content" :style="{marginTop: $vuetify.display.smAndDown ? '3vw' : '1vw'}">
            <p>Ha bármilyen kérdésed van a használattal kapcsolatban, nézd meg a gyakori kérdéseket vagy lépj velünk kapcsolatba!</p>
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
  margin: 3rem 0 3rem 0;
  padding: 0 5vw;
  position: relative;
}

.profile {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  width: 100%;
}

.profile.left {
  justify-content: flex-start;
}

.profile.right {
  justify-content: flex-end;
}

.profile-img {
  width: 10em;
  height: 10em;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}

.profile-info {
  max-width: 80vw;
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
