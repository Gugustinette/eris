<template>
  <div class="home">
    <div class="header">
      <h1 class="header-title">My styles</h1>
      <div class="actions">
        <button @click="store.purgeChromeStorage()">Purge</button>
      </div>
    </div>
    <div class="main-wrapper">
      <div class="add-style" @click="store.showAddStyle = true">+</div>
      <Style v-for="style in store.styles" :key="style._id" :style="style" />
    </div>
  </div>
</template>

<script>
import { useStore } from "../../store";

// Components
import Style from "@/components/styles/Style.vue";

export default {
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  name: "HomeView",
  components: {
    Style,
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
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 20px;
  margin-top: 40px;
  margin-bottom: 20px;

  .actions {
    display: flex;
    flex-direction: row;
    column-gap: 5px;

    button {
      background-color: var(--color-primary);
      border: none;
      color: #fff;
      font-size: 1.2em;
      cursor: pointer;
    }
  }
}

.main-wrapper {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  row-gap: 20px;
  column-gap: 20px;
  padding: 20px;
  background: var(--color-surface);
  margin-left: 20px;
  border-top-left-radius: 10px;

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
