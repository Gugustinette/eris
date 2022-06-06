<template>
  <ModalPanel
    v-if="store.showAddStyle"
    v-on:close="store.showAddStyle = false"
    v-on:confirm="createStyle"
    title="Create Style"
    :fields="['Name', 'Domain']"
    confirmText="Create"
    cancelText="Cancel"
  />
</template>

<script>
import { defineComponent } from "vue";

// Store
import { useStore } from "../../store";

// Components
import ModalPanel from "@/components/modal/Modal.vue";

export default defineComponent({
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  name: "CreateRoomView",
  components: {
    ModalPanel,
  },
  methods: {
    createStyle(fieldValues) {
      this.store.addStyle({
        name: fieldValues.Name,
        domain: fieldValues.Domain,
        css: "* {\ncolor: red !important;\n}",
      });
    },
  },
});
</script>
