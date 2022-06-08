<template>
  <div
    :class="{
      style: true,
      actualStyle: actualStyle,
      editable: editable,
    }"
    @click.prevent="this.openStyle"
    @contextmenu="this.onContextMenu"
  >
    <div class="style-header">
      <h3 ref="styleName">{{ style.name }}</h3>
      <p class="style-header-domain" ref="styleDomain">{{ style.domain }}</p>
    </div>
  </div>
  <ContextStyleEditor
    :mousePos="this.contextMenuMousePosition"
    :style="style"
    v-if="this.showContextMenu"
    @close="this.closeContextMenu"
    @rename="this.toggleEditStyle"
  />
</template>

<script>
import { useStore } from "../../store";

// Components
import ContextStyleEditor from "@/components/context-menu/ContextStyleEditor.vue";

export default {
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  name: "option-style-editor",
  components: {
    ContextStyleEditor,
  },
  watch: {
    editorContextMenu: {
      handler() {
        // If editorContextMenu is the same as style._id
        if (this.editorContextMenu !== this.style._id) {
          this.showContextMenu = false;
        }
      },
    },
  },
  props: {
    style: {
      type: Object,
      required: true,
    },
    editorContextMenu: {
      type: String,
      required: false,
    },
  },
  methods: {
    openStyle() {
      this.$router.push({
        name: "style-editor",
        params: {
          styleId: this.style._id,
        },
      });
    },
    onContextMenu(e) {
      e.preventDefault();
      this.store.editorContextMenu = this.style._id;
      this.showContextMenu = true;
      this.contextMenuMousePosition = {
        x: e.clientX,
        y: e.clientY,
      };
    },
    closeContextMenu() {
      this.showContextMenu = false;
    },
    toggleEditStyle(event) {
      if (event) event.preventDefault();
      this.editable = !this.editable;
      // Make name and domain editable
      this.$refs.styleName.contentEditable = this.editable;
      this.$refs.styleDomain.contentEditable = this.editable;
      if (this.editable) {
        this.$refs.styleName.focus();
      } else {
        this.$refs.styleName.blur();
        this.$refs.styleDomain.blur();
        this.editStyle();
      }
    },
    editStyle() {
      this.store.renameStyle({
        _id: this.style._id,
        name: this.$refs.styleName.innerText,
        domain: this.$refs.styleDomain.innerText,
      });
    },
    attachSaveListener(element, event) {
      element.addEventListener(event, (e) => {
        e.preventDefault();
        // If text contains enter key, stop editing
        if (element.innerText.includes("\n") && this.editable) {
          this.toggleEditStyle();
          this.$refs.styleName.innerText =
            this.$refs.styleName.innerText.replace("\n", "");
          this.$refs.styleDomain.innerText =
            this.$refs.styleDomain.innerText.replace("\n", "");
          this.editStyle();
        }
      });
    },
  },
  mounted() {
    // If styleId is defined in URL
    if (this.$route.params.styleId) {
      this.actualStyle = this.style._id === this.$route.params.styleId;
    }
    // Events for style name and domain on input
    this.attachSaveListener(this.$refs.styleName, "input");
    this.attachSaveListener(this.$refs.styleDomain, "input");
  },
  updated() {
    // If styleId is defined in URL
    if (this.$route.params.styleId) {
      this.actualStyle = this.style._id === this.$route.params.styleId;
    }
  },
  data() {
    return {
      actualStyle: false,
      editable: false,
      showContextMenu: false,
      contextMenuMousePosition: {
        x: 0,
        y: 0,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.style {
  width: 200px;
  min-width: 167px;
  padding-left: 10px;
  padding-right: 10px;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 100px;
  cursor: pointer;
  background: var(--color-primary);
  opacity: 0.6;
  transition-property: opacity, height;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;

  .style-header {
    h3 {
      color: var(--color-secondary);
    }
    .style-header-domain {
      display: none;
      opacity: 0;
      color: var(--color-gray);
    }
  }

  &:hover {
    opacity: 1;
  }
}

.actualStyle {
  opacity: 1;
  height: 45px;
  background: var(--color-secondary);
  .style-header {
    h3 {
      color: var(--color-primary);
    }

    .style-header-domain {
      display: block;
      opacity: 1;
    }
  }
}

.editable {
  * {
    font-style: italic;
  }

  *:focus {
    outline: none;
  }
}
</style>
