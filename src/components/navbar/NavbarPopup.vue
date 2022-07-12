<template>
  <nav>
    <img
      src="../../assets/logo.png"
      alt="Eris Logo"
      @click="this.openOptions"
    />
    <RoutePopup to="/" :content="t('NAVBAR.MY_STYLES')" />
    <RoutePopup to="/settings" :content="t('NAVBAR.PREFERENCES')" />
  </nav>
</template>

<script>
import { useI18n } from "vue-i18n";

import RoutePopup from "@/components/navbar/RoutePopup.vue";

export default {
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });

    return {
      t,
    };
  },
  name: "popup-navbar",
  components: {
    RoutePopup,
  },
  methods: {
    openOptions() {
      chrome.runtime.openOptionsPage();
    },
  },
};
</script>

<style scoped lang="scss">
nav {
  min-height: 50px;
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background: url("../../assets/navbar/background-popup.png");

  img {
    margin-left: 10px;
    height: 30px;
    width: 30px;
    cursor: pointer;
  }
}
</style>
