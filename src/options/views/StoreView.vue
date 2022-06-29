<template>
  <div class="home">
    <div class="header">
      <h1 class="header-title text-cant-be-selected">Store</h1>
    </div>
    <div class="store-wrapper">
      <SearchBar @search="this.onSearch" />
      <div class="styles-wrapper">
        <StyleStore
          v-for="style in online.styles"
          :key="style._id"
          :style="style"
        />
      </div>
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
import SearchBar from "@/components/store/SearchBar.vue";

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
    SearchBar,
  },
  mounted() {
    this.store.getStyles();
    this.online.getStyles();
  },
  methods: {
    onSearch(value) {
      this.online.searchStyles(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.store-wrapper {
  padding: 20px;
  background: var(--color-surface);
  margin-left: 20px;
  border-top-left-radius: 10px;
  height: 100%;
}

.styles-wrapper {
  margin-top: 20px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  row-gap: 20px;
  column-gap: 20px;

  .add-style {
    width: 200px;
    height: 110px;
    display: grid;
    place-items: center;
    background: var(--color-primary);
    color: var(--color-secondary);
    opacity: 0.7;
    border-radius: 7px;
    cursor: pointer;
    font-size: 66px;
    transition: opacity 0.15s ease-in-out;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
