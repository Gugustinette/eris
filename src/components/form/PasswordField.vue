<template>
  <input
    type="password"
    v-bind:name="name"
    v-bind:value="value"
    autocomplete="off"
    v-bind:placeholder="placeholder"
    @input="$emit('update:modelValue', $event?.target?.value)"
    class="text-can-be-selected"
  />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "form-passwordfield",
  props: {
    name: String,
    type: {
      type: String,
      default: "text",
    },
    modelValue: String,
    value: String,
    placeholder: String,
  },
});
</script>

<style scoped lang="scss">
input {
  width: 250px;
  height: 40px;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  padding: 0 10px;
  font-size: 16px;
  color: #000;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    width: 300px;
  }
}
</style>
