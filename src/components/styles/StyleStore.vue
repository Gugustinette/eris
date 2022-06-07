<template>
  <div class="style">
    <div class="style-thumbnail" @click.prevent="this.openStyle(style)">
      <div class="thumbnail-text">{{ this.thumbnail }}</div>
    </div>
    <div class="actions">
      <h3>{{ style.name }}</h3>
    </div>
  </div>
</template>

<script>
import { useStore } from "../../store";

export default {
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  name: "option-style",
  props: {
    style: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openStyle(style) {
      this.$router.push({
        name: "style-store",
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
  width: 200px;
  height: 134px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;

  .style-thumbnail {
    width: 100%;
    height: 110px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--color-secondary);
    border-radius: 7px;
    cursor: pointer;

    .thumbnail-text {
      width: 80px;
      height: 80px;
      display: grid;
      place-items: center;
      background: var(--color-background);
      font-size: 26px;
      font-weight: bold;
      border-radius: 15px;
      color: var(--color-secondary);
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
}
</style>
