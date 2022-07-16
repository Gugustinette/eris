<template>
  <div class="lang-section">
    <h2>{{ t("BASIC.LANGUAGE") }}</h2>
    <!-- Select -->
    <div class="lang-select">
      <select @change="onChange">
        <option
          v-for="(lang, i) in langs"
          :key="`Lang${i}`"
          :value="lang.code"
          :selected="this.store.lang === lang.code"
        >
          {{ lang.name }}
        </option>
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
    const { t, locale } = useI18n();

    return {
      store,
      t,
      locale,
    };
  },
  name: "LangSection",
  methods: {
    onChange(e) {
      const lang = e.target.value;
      this.locale = lang;
      this.store.changeLanguage(lang);
    },
  },
  data() {
    return {
      langs: [
        {
          code: "en",
          name: "English",
        },
        {
          code: "fr",
          name: "Français",
        },
      ],
    };
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
