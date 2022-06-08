<template>
  <div class="editor">
    <div class="editor-header">
      <h1 class="editor-header-title">Editor</h1>
      <div class="editor-style-list">
        <div class="editor-style-list-container">
          <StyleEditor
            v-for="style in store.styles"
            :key="style._id"
            :style="style"
            :editorContextMenu="store.editorContextMenu"
          />
          <div class="add-style" @click="store.showAddStyle = true">+</div>
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

        .add-style {
          display: grid;
          place-items: center;
          width: 200px;
          min-width: 167px;
          padding-left: 10px;
          padding-right: 10px;
          height: 30px;
          border-radius: 100px;

          cursor: pointer;
          background: var(--color-primary);
          color: var(--color-secondary);
          opacity: 0.6;
          font-size: 20px;

          transition: opacity 0.15s ease-in-out;

          &:hover {
            opacity: 1;
          }
        }
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
