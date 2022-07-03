<template>
  <div class="context-menu">
    <div class="action" @click="openDetails">Details</div>
    <div class="action" @click="renameStyle">Rename</div>
    <div class="separator"></div>
    <div class="action red" @click="deleteStyle">Delete</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Store
import { useStore } from "../../store";

// Components
import ContextMenu from "@/components/context-menu/ContextMenu.vue";

export default defineComponent({
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  name: "ContextStyleEditor",
  extends: ContextMenu,
  props: {
    style: {},
  },
  methods: {
    deleteStyle() {
      // Launch Delete Style Action
      this.store.deleteStyle(this.style);
    },
    renameStyle() {
      // Emit rename event
      this.$emit("rename");
    },
    openDetails() {
      this.store.actualOpenedStyle = this.style;
    },
  },
});
</script>
