<template>
  <ModalPanel
    v-if="online.showLogin"
    v-on:close="online.showLogin = false"
    v-on:confirm="login"
    :title="t('AUTH.LOGIN')"
    :fields="[t('BASIC.USERNAME'), t('BASIC.PWD/PASSWORD')]"
    :confirmText="t('AUTH.LOGIN')"
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
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });

    return {
      online,
      t,
    };
  },
  name: "LoginView",
  components: {
    ModalPanel,
  },
  methods: {
    login(fieldValues) {
      this.online.login(fieldValues.Username, fieldValues.Password);
    },
  },
});
</script>
