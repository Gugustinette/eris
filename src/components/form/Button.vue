<template>
  <input
    type="button"
    v-bind:value="content"
    v-bind:class="{
      widthOnHover: widthOnHover,
      colorOnHover: colorOnHover,
      noBackground: noBackground,
    }"
  />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "form-button",
  props: {
    content: String,
    colorOnHover: Boolean,
    widthOnHover: Boolean,
    noBackground: Boolean,
  },
});
</script>

<style scoped lang="scss">
input {
  width: auto;
  height: 40px;
  border: none;
  border-radius: var(--border-radius);
  padding-left: 20px;
  padding-right: 20px;
  font-size: 16px;
  color: var(--font-on-secondary);
  background: var(--color-secondary);
  outline: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.widthOnHover:hover {
  padding-left: 30px;
  padding-right: 30px;
}

.colorOnHover:hover {
  background: var(--color-action);
}

.noBackground {
  color: var(--font);
  background: transparent;
}
</style>
