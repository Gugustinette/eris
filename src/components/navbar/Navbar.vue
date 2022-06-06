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
  name: "option-navbar",
  components: {
    Route,
  },
};
</script>

<style scoped>
nav {
  min-width: 65px;
  width: 65px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 15px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  background: url("../../assets/navbar/background.png");
  background-size: cover;
  background-position-x: right;
  background-position-y: top;
}
</style>
