<template>
  <ModalFilePanel
    v-if="store.showImportStyle"
    v-on:close="store.showImportStyle = false"
    v-on:confirm="importStyle"
    title="Import Style"
    confirmText="Import"
    cancelText="Cancel"
  />
</template>

<script>
import { defineComponent } from "vue";

// Store
import { useStore } from "../../store";

// Components
import ModalFilePanel from "@/components/modal/ModalFile.vue";

export default defineComponent({
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  name: "CreateRoomView",
  components: {
    ModalFilePanel,
  },
  methods: {
    importStyle(file, type, fields) {
      if (type === "css") {
        // Get the file content
        const reader = new FileReader();
        reader.onload = (e) => {
          // Get the content
          const content = e.target.result;
          // Create a new style
          const style = {
            name: fields.Name,
            domain: fields.Domain,
            css: content,
          };
          // Add the style to the store
          this.store.addStyle(style);
        };
        reader.readAsText(file);
      } else {
        // 'package'
        // Get the file content
        const reader = new FileReader();
        reader.onload = (e) => {
          // Get the content
          const content = JSON.parse(e.target.result);
          // Create a new style
          const style = {
            name: content.name,
            domain: content.domain,
            css: content.css,
            _id: content._id,
          };
          // Add the style to the store
          this.store.addStyle(style);
        };
        reader.readAsText(file);
      }
    },
  },
});
</script>
