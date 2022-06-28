<template>
  <div class="home">
    <div class="header">
      <h1 class="header-title text-cant-be-selected">Store</h1>
    </div>
    <div class="main-wrapper">
      <StyleStore
        v-for="style in online.styles"
        :key="style._id"
        :style="style"
      />
    </div>
  </div>
  <StyleModal v-if="store.actualStoreStyle !== undefined" />
</template>

<script>
import { useStore } from "../../store";
import { useOnline } from "../../store/online";

// Components
import StyleStore from "@/components/styles/StyleStore";
import StyleModal from "@/components/styles/StyleModal";

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
    StyleModal,
  },
  mounted() {
    this.store.getStyles();
    this.online.getStyles();
  },
};
</script>

<style lang="scss"></style>
