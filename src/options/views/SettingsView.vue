<template>
  <div class="home">
    <div class="header">
      <h1 class="header-title">Settings</h1>
    </div>
    <div class="main-wrapper"></div>
  </div>
</template>

<script>
import { useStore } from "../../store";

export default {
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  name: "SettingsView",
};
</script>

<style lang="scss"></style>
