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
        Eris is a chrome extension that allows you to customize the look and
        feel of websites. It works by injecting CSS into pages for certain
        domains. The extension lets you create, manage and share custom themes.
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
}
</style>
