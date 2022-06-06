<template>
  <Editor
    :css="editingStyle.css || ''"
    @save-css="this.saveCSS"
    @needs-to-be-saved="stateChanged"
  />
</template>

<script>
import { useStore } from "../../store";

// Components
import Editor from "@/components/editor/Editor.vue";

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
  },
  mounted() {
    // Get the style from the store
    this.store.getStyles().then((styles) => {
      // Find the style we're editing
      this.editingStyle = styles.find((style) => {
        return style.id === this.$route.params.styleId;
      });
    });
  },
  data() {
    return {
      editingStyle: {},
      needsToBeSaved: false,
    };
  },
};
</script>

<style lang="scss"></style>
