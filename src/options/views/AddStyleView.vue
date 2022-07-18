<template>
  <ModalPanel
    v-if="store.showAddStyle"
    v-on:close="store.showAddStyle = false"
    v-on:confirm="createStyle"
    :title="t('BASIC.CREATE_STYLE')"
    :fields="[
      { title: this.t('BASIC.NAME'), type: 'textfield' },
      { title: this.t('BASIC.DOMAIN'), type: 'textfield' },
    ]"
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
    const { t } = useI18n();

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
        name: fieldValues[this.t("BASIC.NAME")],
        domain: fieldValues[this.t("BASIC.DOMAIN")],
        css: "* {\ncolor: red !important;\n}",
      });
    },
  },
});
</script>
