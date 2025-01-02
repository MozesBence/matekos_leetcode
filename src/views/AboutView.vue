<template>
  <main>
    <div class="hero">
      <h1 ref="rotatingText">{{ currentText }}</h1>
    </div>

    <div class="content">
      <section class="about">
        <h2>A weboldalról</h2>
        <p>
          2023-ban egy évvégi beadandó keretin belül kezdtük el tervezni, majd a projektmunka során megjött az ihlet,
          hogy vigyük tovább szakmai vizsgának, amit 2024 szeptemberében kezdtünk el megcsinálni. Itt a már meglévő beadandónkat
          kellett átírni.
        </p>
      </section>

      <section class="why">
        <h2>MathSolve, miért a MathSolve?</h2>
        <p>
          Szerettünk volna egy olyan beadandót csinálni, ami diáktársaink segítségére lehet a későbbiekben,
          és innen jött a matek-infó közötti kapocs, amit próbálunk a leghatékonyabban diáktársaink részére átadni mint gyakorlófelület.
          Ezért lett a név MathSolve.
        </p>
      </section>

      <section class="usage">
        <h2>Hogyan használd a weboldalt?</h2>
        <p>
          Az oldalon lehet a feladatokra szűrni témakör és nehézségi szint alapján is, ezzel próbáljuk a felhasználók számára
          megkönnyíteni dolgukat, hogy a lehető legszűkebben tudják tudásukat bővíteni vagy tesztelni.
        </p>
      </section>

      <section class="features">
        <h2>Az oldal funkcióiról</h2>
        <p>
          Az oldalon nyomon tudja követni minden felhasználó saját és társai pontszámait, amit egy globális leaderboarddal szemléltetünk,
          emellett vannak challengek, amik speciálisabb módon, de beleszámítanak a ranglistába.
        </p>
      </section>

      <section class="about-us">
        <h2>Rólunk</h2>
        <p>
          Ez a projekt célja, hogy segítse a tanulókat matek- és infófeladatok megoldásában egy gyakorló környezetben.
        </p>
      </section>

      <section class="faq">
        <h2>GYIK - Gyakran ismételt kérdések</h2>
        <p>
          Ha bármilyen kérdésed van a használattal kapcsolatban, nézd meg a gyakori kérdéseket vagy lépj velünk kapcsolatba!
        </p>
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
        "Örülünk hogy itt vagy!",
        "Nézz szét!",
      ],
      currentFontIndex: 0,
      currentTextIndex: 0,
      currentText: "Üdv a fedélzeten!",
    };
  },
  mounted() {
    this.startRotation();
  },
  methods: {
    startRotation() {
      setInterval(() => {
        this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        this.currentText = this.texts[this.currentTextIndex];

        this.currentFontIndex = (this.currentFontIndex + 1) % this.fonts.length;
        this.updateFont();
      }, 2000);
    },
    updateFont() {
      this.$refs.rotatingText.style.fontFamily = this.fonts[this.currentFontIndex];
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
  background: #f9f9f9;
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
  color: #fff;
  padding: 50px 20px;
  border-radius: 12px;
  margin-bottom: 30px;
}

.hero h1 {
  font-size: 3rem;
  transition: font-family 0.5s ease, color 0.5s ease;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

section {
  margin-bottom: 20px;
}

h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
}

p {
  font-size: 1rem;
  line-height: 1.6;
  text-align: justify;
  color: #555;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style>
