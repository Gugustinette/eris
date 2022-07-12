<template>
  <div class="lang-section">
    <h2>{{ t("BASIC.LANGUAGE") }}</h2>
    <!-- Select -->
    <div class="lang-select">
      <select @change="this.onChange">
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </div>
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
  methods: {
    onChange(e) {
      const language = e.target.value;
      this.store.changeLanguage(language);
      // this.t.locale = e.target.value;
    },
  },
  mounted() {
    console.log(this.store.lang);
  },
};
</script>

<style lang="scss" scoped>
.lang-section {
  display: flex;
  flex-direction: column;
  align-content: center;
  row-gap: 20px;
  .lang-select {
    select {
      padding: 10px 20px;
      background: var(--color-primary);
      color: var(--color-secondary);
      border-radius: var(--border-radius-medium);

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
