<template>
  <div class="home">
    <div class="header">
      <h1 class="header-title">My styles</h1>
    </div>
    <div class="main-wrapper">
      <StylePopup
        v-for="style in store.styles"
        :key="style._id"
        :style="style"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from "../../store";

// Components
import StylePopup from "@/components/styles/StylePopup.vue";

export default {
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  name: "HomeView",
  components: {
    StylePopup,
  },
  mounted() {
    // Call getStyles() getter
    this.store.getStyles();
  },
};
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  margin-top: 40px;
  margin-bottom: 20px;
}

.main-wrapper {
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-content: flex-start;
  row-gap: 10px;
  column-gap: 10px;
  padding: 10px;
  background: var(--color-surface);
  border-radius: 10px;
}
</style>
