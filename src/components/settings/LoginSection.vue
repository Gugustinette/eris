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
      <Button :content="t('AUTH.DISCONNECT')" @click="online.logout()" />
    </div>
    <div class="settings-section-content" v-else>
      <div class="profil-header">
        <div class="profil-name">{{ t("AUTH.NOT_CONNECTED") }}</div>
      </div>
      <Button :content="t('AUTH.LOGIN')" @click="online.showLogin = true" />
      <Button
        :content="t('AUTH.SIGNUP')"
        :noBackground="true"
        @click="online.showSignUp = true"
      />
    </div>
  </div>
  <LoginView />
  <SignUpView />
</template>

<script>
import { useStore } from "../../store";
import { useOnline } from "../../store/online";
import { useI18n } from "vue-i18n";

// Components
import Button from "@/components/form/Button.vue";
import LoginView from "@/options/views/LoginView.vue";
import SignUpView from "@/options/views/SignUpView.vue";

export default {
  setup() {
    const store = useStore();
    const online = useOnline();
    const { t } = useI18n();

    return {
      store,
      online,
      t,
    };
  },
  name: "LoginSection",
  components: {
    Button,
    LoginView,
    SignUpView,
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
