<template>
  <nav>
    <img src="../../assets/logo.png" alt="Eris Logo" />
    <RoutePopup to="/" content="My Styles" />
    <RoutePopup to="/settings" content="Preferences" />
  </nav>
</template>

<script>
import RoutePopup from "@/components/navbar/RoutePopup.vue";

export default {
  name: "popup-navbar",
  components: {
    RoutePopup,
  },
};
</script>

<style scoped lang="scss">
nav {
  min-height: 50px;
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background: url("../../assets/navbar/background-popup.png");

  img {
    margin-left: 10px;
    height: 30px;
    width: 30px;
  }
}
</style>
