<template>
  <div class="editor">
    <div class="editor-header">
      <h1 class="editor-header-title">Editor</h1>
      <div class="editor-style-list">
        <div class="editor-style-list-container">
          <StyleEditor
            v-for="style in store.styles"
            :key="style.id"
            :style="style"
          />
        </div>
      </div>
    </div>
    <div class="editor-main-wrapper">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import { useStore } from "../../store";

// Components
import StyleEditor from "../../components/styles/StyleEditor.vue";

export default {
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  name: "EditorView",
  components: {
    StyleEditor,
  },
  mounted() {
    // Call getStyles() getter
    this.store.getStyles();
  },
};
</script>

<style lang="scss" scoped>
.editor {
  height: 100%;
  max-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;

  .editor-header {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 40px;

    .editor-header-title {
      align-self: flex-start;
      margin-bottom: 20px;
    }

    .editor-style-list {
      overflow-y: scroll;

      .editor-style-list-container {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
      }
    }
  }

  .editor-main-wrapper {
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    column-gap: 20px;
  }
}
</style>
