<template>
  <div class="code-editor-wrapper">
    <CodeEditor
      class="code-editor"
      ref="codeEditor"
      :display_language="false"
      :hide_header="true"
      :width="'100%'"
      :height="'100%'"
      :languages="[['css', 'CSS']]"
      font_size="14px"
      v-model="editedCSS"
    />
  </div>
</template>

<script>
// Components
import CodeEditor from "simple-code-editor";

export default {
  name: "EditorPanel",
  components: {
    CodeEditor,
  },
  props: {
    css: {
      type: String,
      required: false,
    },
  },
  methods: {
    saveCSS() {
      this.$emit("save-css", this.editedCSS);
      this.lastSavedCSS = this.editedCSS;
    },
  },
  mounted() {
    // Detect save event
    document.onkeydown = (e) => {
      if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault(); // present "Save Page" from getting triggered.
        this.saveCSS();
      } else {
        // If lastSavedCSS is not the same as the editedCSS, then emit changed state
        if (this.lastSavedCSS !== this.editedCSS) {
          this.$emit("needs-to-be-saved");
        }
      }
    };
  },
  watch: {
    css: {
      immediate: true,
      handler(css) {
        this.editedCSS = css;
        this.lastSavedCSS = css;
      },
    },
  },
  data() {
    return {
      editedCSS: "",
      lastSavedCSS: "",
    };
  },
};
</script>

<style lang="scss">
.code-editor-wrapper {
  overflow-y: scroll;
  background: var(--color-editor-background);
  height: 100%;
}
.code_editor {
  background: var(--color-editor-background) !important;
  & > .code_area > pre > code {
    background: var(--color-editor-background);
  }
}

.code-editor {
  * {
    font-family: monospace;
  }
}
</style>
