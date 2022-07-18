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
  width: 100%;
  height: 40px;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 1rem;
  color: #000;
  outline: none;
  border: none;
  transition: all 0.3s ease;
}
</style>
