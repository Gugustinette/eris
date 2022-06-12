<template>
  <Navbar />
  <div class="app-content">
    <router-view></router-view>
  </div>
  <AddStyle />
</template>

<script>
import Navbar from "@/components/navbar/Navbar.vue";
import AddStyle from "@/options/views/AddStyleView.vue";

export default {
  name: "App",
  components: {
    Navbar,
    AddStyle,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Comfortaa");

:root {
  --color-primary: #2a2b59;
  --color-primary-hover: #3c3d7d;
  --color-secondary: #e5c4b8;
  --color-surface: #1f1f1f;
  --color-background: #040404;
  --color-action: #ba674f;

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
  max-width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: row;
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
.text-cant-be-selected {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
