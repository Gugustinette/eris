<template>
  <nav>
    <Route to="/" />
    <Route to="/store" />
    <Route to="/editor" />
    <Route to="/settings" />
  </nav>
</template>

<script>
import Route from "@/components/navbar/Route.vue";

export default {
  name: "popup-navbar",
  components: {
    Route,
  },
};
</script>

<style scoped>
nav {
  min-height: 65px;
  height: 65px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background: conic-gradient(
    from 182.38deg at 114.5% -77%,
    #2a2b59 -0.62deg,
    #ba674f 7.95deg,
    #e5c4b8 11.46deg,
    #2a2b59 359.38deg,
    #ba674f 367.95deg
  );
}
</style>
