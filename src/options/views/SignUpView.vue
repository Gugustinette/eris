<template>
  <ModalPanel
    v-if="online.showSignUp"
    v-on:close="online.showSignUp = false"
    v-on:confirm="login"
    title="Sign Up"
    :fields="['Username', 'Password']"
    confirmText="Sign Up"
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
  name: "SignUpView",
  components: {
    ModalPanel,
  },
  methods: {
    login(fieldValues) {
      this.online.signup(fieldValues.Username, fieldValues.Password);
    },
  },
});
</script>
