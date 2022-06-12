<template>
  <div class="home">
    <div class="header">
      <h1 class="header-title">Store</h1>
    </div>
    <div class="main-wrapper">
      <StyleStore
        v-for="style in online.styles"
        :key="style._id"
        :style="style"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from "../../store";
import { useOnline } from "../../store/online";

// Components
import StyleStore from "@/components/styles/StyleStore";

export default {
  setup() {
    const store = useStore();
    const online = useOnline();

    return {
      store,
      online,
    };
  },
  name: "StoreView",
  components: {
    StyleStore,
  },
  mounted() {
    this.online.getStyles();
  },
};
</script>

<style lang="scss"></style>
