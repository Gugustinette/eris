<template>
  <ModalPanel
    v-if="store.showAddStyle"
    v-on:close="store.showAddStyle = false"
    v-on:confirm="createStyle"
    :title="t('BASIC.CREATE_STYLE')"
    :fields="[t('BASIC.NAME'), t('BASIC.DOMAIN')]"
    :confirmText="t('ACTIONS.CREATE')"
    :cancelText="t('ACTIONS.CANCEL')"
  />
</template>

<script>
import { defineComponent } from "vue";

// Store
import { useStore } from "../../store";
import { useI18n } from "vue-i18n";

// Components
import ModalPanel from "@/components/modal/Modal.vue";

export default defineComponent({
  setup() {
    const store = useStore();
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });

    return {
      store,
      t,
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
