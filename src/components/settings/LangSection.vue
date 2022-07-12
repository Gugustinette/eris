<template>
  <div class="lang-section">
    <h2>{{ t("BASIC.LANGUAGE") }}</h2>
  </div>
</template>

<script>
import { useStore } from "../../store";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const store = useStore();
    const { t } = useI18n();

    return {
      store,
      t,
    };
  },
  name: "LangSection",
};
</script>

<style lang="scss" scoped></style>
