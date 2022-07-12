<template>
  <div class="context-menu">
    <div class="action" @click="openDetails">{{ t("ACTIONS.DETAILS") }}</div>
    <div class="action" @click="renameStyle">{{ t("ACTIONS.RENAME") }}</div>
    <div class="separator"></div>
    <div class="action red" @click="deleteStyle">{{ t("ACTIONS.DELETE") }}</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Store
import { useStore } from "../../store";
import { useI18n } from "vue-i18n";

// Components
import ContextMenu from "@/components/context-menu/ContextMenu.vue";

export default defineComponent({
  setup() {
    const store = useStore();
    const { t } = useI18n();

    return {
      store,
      t,
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
