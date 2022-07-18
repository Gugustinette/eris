<template>
  <ModalPanel
    v-if="online.showSignUp"
    v-on:close="online.showSignUp = false"
    v-on:confirm="signup"
    :title="t('AUTH.SIGNUP')"
    :fields="[
      { title: this.t('BASIC.USERNAME'), type: 'textfield' },
      { title: this.t('BASIC.PASSWORD'), type: 'password' },
    ]"
    :confirmText="t('AUTH.SIGNUP')"
    :cancelText="t('ACTIONS.CANCEL')"
  />
</template>

<script>
import { defineComponent } from "vue";

// online
import { useOnline } from "../../store/online";

import { useI18n } from "vue-i18n";

// Components
import ModalPanel from "@/components/modal/Modal.vue";

export default defineComponent({
  setup() {
    const online = useOnline();
    const { t } = useI18n();

    return {
      online,
      t,
    };
  },
  name: "SignUpView",
  components: {
    ModalPanel,
  },
  methods: {
    signup(fieldValues) {
      this.online.signup(
        fieldValues[this.t("BASIC.USERNAME")],
        fieldValues[this.t("BASIC.PASSWORD")]
      );
    },
  },
});
</script>
