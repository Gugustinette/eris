<template>
  <div class="style-editor-view">
    <EditorActionBar
      :isConnected="isConnected"
      :owned="owned"
      :needsToBeSaved="needsToBeSaved"
      :needsToBePublished="needsToBePublished"
      @save-css="getCssForSave = true"
    />
    <Editor
      :css="editingStyle.css || ''"
      :getCssForSave="getCssForSave"
      @save-css="this.saveCSS"
      @needs-to-be-saved="stateChanged"
      @get-css-for-save="this.saveCssManually"
    />
  </div>
</template>

<script>
import { useStore } from "../../store";

// Components
import Editor from "@/components/editor/Editor.vue";
import EditorActionBar from "@/components/editor/ActionBar.vue";

export default {
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  name: "StyleEditorView",
  components: {
    Editor,
    EditorActionBar,
  },
  methods: {
    saveCSS(css) {
      this.editingStyle.css = css;
      this.store.editStyle(this.editingStyle);
      this.needsToBeSaved = false;
    },
    stateChanged() {
      this.needsToBeSaved = true;
    },
    saveCssManually(css) {
      this.getCssForSave = false;
      this.saveCSS(css);
    },
  },
  mounted() {
    // Get the style from the store
    this.store.getStyles().then((styles) => {
      // Find the style we're editing
      this.editingStyle = styles.find((style) => {
        return style._id === this.$route.params.styleId;
      });
    });
  },
  data() {
    return {
      editingStyle: {},
      needsToBeSaved: false,
      needsToBePublished: false,
      isConnected: false,
      owned: false,
      getCssForSave: false,
    };
  },
};
</script>

<style lang="scss">
.style-editor-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100vh;
}
</style>
