<template>
  <div class="home">
    <img
      class="bg-image-1"
      src="../assets/main-page-polygone-1.png"
      alt="Background Image 1"
    />
    <img
      class="bg-image-2"
      src="../assets/main-page-polygone-2.png"
      alt="Background Image 2"
    />
    <nav>
      <ErisLogo />
    </nav>
    <div class="content">
      <h1>Votre sauveur d'interface</h1>
      <p>
        Eris est une extension chrome qui vous permet de personnaliser l'aspect
        visuel des sites web. Elle fonctionne en injectant du code CSS dans les
        pages web, à des domaines précis. L'extension vous permet ainsi de
        créer, manager et partager des refontes visuelles personnalisées.
      </p>
      <a
        href="https://chrome.google.com/webstore/detail/eris/jhakgjgcbkfcfiifmphdmbiinekbalej"
        class="active-button"
        >Télécharger pour Google Chrome</a
      >
    </div>
    <a class="policy-button" href="/policy">Politique de confidentialité</a>
  </div>
</template>

<script>
import ErisLogo from "@/components/ErisLogo.vue";

export default {
  name: "HomeView",
  components: {
    ErisLogo,
  },
};
</script>

<style lang="scss">
.home {
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 1920px;
  display: grid;
  place-items: center;
  overflow: hidden;

  .bg-image-1 {
    position: absolute;
    top: -100px;
    left: 0;
    z-index: 0;
  }

  .bg-image-2 {
    position: absolute;
    bottom: -100px;
    right: 0;
    z-index: 0;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 25px;
    z-index: 2;
    height: 100vh;

    h1 {
      font-size: 62px;
      margin: 0px 50px;
    }

    p {
      max-width: 900px;
      margin: 0px 80px;
      text-align: center;
    }
  }

  .policy-button {
    position: absolute;
    bottom: 10px;
    left: 10px;
    z-index: 2;
    margin: 0px 20px;
  }
}
</style>
