<template>
  <div class="settings-section">
    <h2 class="settings-section-title">Profil</h2>
    <div class="settings-section-content" v-if="online.bearerToken">
      <div class="profil-header">
        <div class="profil-picture">
          {{ online.user.username.substring(0, 1) }}
        </div>
        <div class="profil-name">{{ online.user.username }}</div>
      </div>
      <Button content="Logout" @click="online.logout()" />
    </div>
    <div class="settings-section-content" v-else>
      <div class="profil-header">
        <div class="profil-name">You're not connected</div>
      </div>
      <Button content="Login" @click="online.showLogin = true" />
    </div>
  </div>
  <LoginView />
</template>

<script>
import { useStore } from "../../store";
import { useOnline } from "../../store/online";

// Components
import Button from "@/components/form/Button.vue";
import LoginView from "@/options/views/LoginView.vue";

export default {
  setup() {
    const store = useStore();
    const online = useOnline();

    return {
      store,
      online,
    };
  },
  name: "LoginSection",
  components: {
    Button,
    LoginView,
  },
  mounted() {
    this.online.loadUser();
  },
};
</script>

<style lang="scss" scoped>
.profil-header {
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  align-items: center;
  margin-bottom: 20px;

  .profil-picture {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: var(--color-primary);
    background-color: var(--color-secondary);
    display: grid;
    place-items: center;
    font-size: 30px;
    font-weight: bold;
  }

  .profil-name {
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
