<template>
  <div class="style">
    <div
      class="style-thumbnail text-cant-be-selected"
      @click.prevent="this.openStyle(style)"
    >
      <div class="thumbnail-text">{{ this.thumbnail }}</div>
    </div>
    <div class="actions" @click.prevent="this.store.toggleStyle(style)">
      <h3>{{ style.name }}</h3>
      <Switch :checked="style.active" />
    </div>
  </div>
</template>

<script>
import { useStore } from "../../store";

import Switch from "@/components/form/Switch.vue";

export default {
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  name: "option-style",
  components: {
    Switch,
  },
  props: {
    style: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openStyle(style) {
      this.$router.push({
        name: "style-editor",
        params: {
          styleId: style._id,
        },
      });
    },
  },
  mounted() {
    // Create thumbnail (2 first characters of name)
    const thumbnail = this.style.name.substring(0, 2);
    // Set to upper case and add a dot
    this.thumbnail = thumbnail.toUpperCase() + ".";
  },
  data() {
    return {
      thumbnail: "YO.",
    };
  },
};
</script>

<style lang="scss" scoped>
.style {
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;
  padding: 2px 8px;

  .style-thumbnail {
    width: 50px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 7px;

    .thumbnail-text {
      width: 30px;
      height: 30px;
      display: grid;
      place-items: center;
      background: var(--color-secondary);
      font-size: 11px;
      font-weight: bold;
      border-radius: 6px;
      color: var(--color-background);
    }
  }

  .actions {
    margin-top: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    column-gap: 5px;
  }

  &:hover {
    background: var(--color-primary);
    color: var(--color-secondary);
  }
}
</style>
