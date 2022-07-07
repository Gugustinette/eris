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
      <h1>Your UI Hero is here</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem porro ad
        consequuntur ullam excepturi quod tempore ab sit optio? Maiores
        exercitationem natus cumque facilis fugiat, laborum, nam asperiores
        provident voluptatum corporis expedita commodi voluptatem qui magni
        consequatur dolorem, aut perferendis rem delectus eos alias perspiciatis
        similique. Minus quaerat tenetur vel adipisci, architecto dignissimos
        assumenda.
      </p>
      <a href="https://google.com" class="active-button"
        >Download for Google Chrome</a
      >
    </div>
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

  .bg-image-1 {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .bg-image-2 {
    position: absolute;
    bottom: 0;
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

    h1 {
      font-size: 62px;
    }

    p {
      margin: 0px 80px;
      text-align: center;
    }
  }
}
</style>
