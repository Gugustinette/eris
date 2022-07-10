<template>
  <router-view />
</template>

<style lang="scss">
@font-face {
  font-family: "Comfortaa";
  src: url("../../src/assets/font/Comfortaa/Comfortaa-VariableFont_wght.ttf");
}

:root {
  --background: #2a2b59;
  --color-primary: #2a2b59;
  --color-secondary: #e5c4b8;
}

* {
  margin: 0;
  padding: 0;

  font-family: "Comfortaa", sans-serif;
  color: #fff;
}

#app {
  background: var(--background);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100vw;
}

body {
  background: var(--background);
}

nav {
  position: absolute;
  top: 37px;
  left: 42px;
}

.active-button {
  background: var(--color-secondary);
  color: var(--color-primary);
  display: grid;
  place-items: center;
  padding: 20px 40px;
  border-radius: 10px;
  cursor: pointer;
}

a {
  text-decoration: none;
}
</style>
