<template>
  <div class="home">
    <div class="header">
      <h1 class="header-title text-cant-be-selected">
        {{ t("BASIC.SETTINGS") }}
      </h1>
    </div>
    <div class="main-wrapper settings-main-wrapper">
      <LoginSection />
      <LangSection />
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";

// Components
import LoginSection from "@/components/settings/LoginSection";
import LangSection from "@/components/settings/LangSection";

export default {
  setup() {
    const { t } = useI18n();

    return {
      t,
    };
  },
  name: "SettingsView",
  components: {
    LoginSection,
    LangSection,
  },
};
</script>

<style lang="scss">
.settings-main-wrapper {
  display: flex;
  flex-direction: column;
  align-content: center;

  .settings-section {
    max-width: 1000px;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    .settings-section-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .settings-section-content {
      display: flex;
      flex-direction: column;
      margin-left: 30px;
      row-gap: 10px;
    }
  }
}
</style>
