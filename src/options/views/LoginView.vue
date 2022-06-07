<template>
  <ModalPanel
    v-if="online.showLogin"
    v-on:close="online.showLogin = false"
    v-on:confirm="login"
    title="Login"
    :fields="['Username', 'Password']"
    confirmText="Login"
    cancelText="Cancel"
  />
</template>

<script>
import { defineComponent } from "vue";

// online
import { useOnline } from "../../store/online";

// Components
import ModalPanel from "@/components/modal/Modal.vue";

export default defineComponent({
  setup() {
    const online = useOnline();

    return {
      online,
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
