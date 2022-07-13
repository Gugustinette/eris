<template>
  <NavbarPopup />
  <div class="app-content">
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarPopup from "@/components/navbar/NavbarPopup.vue";

export default {
  name: "App",
  components: {
    NavbarPopup,
  },
};
</script>

<style>
@font-face {
  font-family: "Comfortaa";
  src: url("../assets/font/Comfortaa/Comfortaa-VariableFont_wght.ttf");
}

:root {
  --color-primary: #2a2b59;
  --color-primary-hover: #3c3d7d;
  --color-secondary: #e5c4b8;
  --color-surface: #1f1f1f;
  --color-background: #040404;
  --color-action: #ba674f;
  --font: #fff;
  --font-on-secondary: #000;

  --black-off: rgba(0, 0, 0, 0.3);

  --navbar-background: conic-gradient(
    from 156.31deg at 50% 49.38%,
    #e5c4b8 0deg,
    #ba674f 111.86deg,
    #2a2b59 178.26deg,
    #e5c4b8 360deg
  );

  --color-gray: rgba(42, 43, 89, 0.4);
  --color-gray-secondary: rgba(229, 196, 184, 0.5);
  --color-green: #54c35f;
  --color-red: #f25c5c;

  --color-editor-background: rgb(17, 17, 39);

  --modal-background: rgba(0, 0, 0, 0.7);
  --modal-backdrop-filter: blur(2px);

  --border-radius-small: 4px;
  --border-radius-medium: 8px;
  --border-radius: 14px;

  --font-size-small: 0.8rem;
  --font-size-medium: 1rem;
  --font-size-large: 1.2rem;
  --font-size-title: 1.8rem;
}
* {
  margin: 0;
  padding: 0;

  font-family: "Comfortaa", sans-serif;
  color: #fff;
}
#app {
  width: 100vw;
  height: 100vh;
  min-width: 450px;
  min-height: 550px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
}
.app-content {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}
</style>
