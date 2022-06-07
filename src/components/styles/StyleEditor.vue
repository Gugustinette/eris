<template>
  <div
    :class="{
      style: true,
      actualStyle: actualStyle,
    }"
    @click.prevent="this.openStyle"
  >
    <h3>{{ style.name }}</h3>
    <div class="actions" @click.prevent="this.store.deleteStyle(style)">
      <svg
        class="delete-style"
        width="16"
        height="16"
        viewBox="0 0 12 12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.05879 0.545455C4.05879 0.244208 4.28599 0 4.56626 0H8.21999C8.50025 0 8.72745 0.244208 8.72745 0.545455C8.72745 0.846701 8.50025 1.09091 8.21999 1.09091H4.56626C4.28599 1.09091 4.05879 0.846701 4.05879 0.545455ZM0.811035 2.50909C0.811035 2.20784 1.03823 1.96364 1.3185 1.96364H11.4678C11.748 1.96364 11.9752 2.20784 11.9752 2.50909C11.9752 2.81034 11.748 3.05454 11.4678 3.05454H10.7573V9.49091C10.7573 10.8831 9.71816 12 8.42297 12H4.36327C3.05901 12 2.02894 10.8732 2.02894 9.43636V3.05454H1.3185C1.03823 3.05454 0.811035 2.81034 0.811035 2.50909ZM3.04387 3.05454V9.43636C3.04387 10.2904 3.63768 10.9091 4.36327 10.9091H8.42297C9.15763 10.9091 9.74238 10.2806 9.74238 9.49091V3.05454H3.04387ZM5.02298 4.47273C5.30324 4.47273 5.53044 4.71694 5.53044 5.01818V9C5.53044 9.30125 5.30324 9.54545 5.02298 9.54545C4.74271 9.54545 4.51551 9.30125 4.51551 9V5.01818C4.51551 4.71694 4.74271 4.47273 5.02298 4.47273ZM7.76327 4.47273C8.04354 4.47273 8.27074 4.71694 8.27074 5.01818V9C8.27074 9.30125 8.04354 9.54545 7.76327 9.54545C7.48301 9.54545 7.25581 9.30125 7.25581 9V5.01818C7.25581 4.71694 7.48301 4.47273 7.76327 4.47273Z"
        />
      </svg>
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
  name: "option-style-editor",
  props: {
    style: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openStyle() {
      this.$router.push({
        name: "style-editor",
        params: {
          styleId: this.style._id,
        },
      });
    },
  },
  mounted() {
    // If styleId is defined in URL
    if (this.$route.params.styleId) {
      this.actualStyle = this.style._id === this.$route.params.styleId;
    }
  },
  updated() {
    // If styleId is defined in URL
    if (this.$route.params.styleId) {
      this.actualStyle = this.style._id === this.$route.params.styleId;
    }
  },
  data() {
    return {
      actualStyle: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.style {
  width: 200px;
  min-width: 167px;
  padding-left: 10px;
  padding-right: 10px;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 100px;
  cursor: pointer;
  background: var(--color-gray);
  transition: background 0.15s ease-in-out;

  h3 {
    color: var(--color-gray-secondary);
  }

  .actions {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    column-gap: 5px;

    .delete-style {
      opacity: 0;
      fill: var(--color-action);
      transition: opacity 0.15s ease-in-out;
    }
  }

  &:hover {
    background: var(--color-primary-hover);

    .delete-style {
      opacity: 1;
    }
  }
}

.actualStyle {
  background: var(--color-secondary);

  h3 {
    color: var(--color-primary);
  }

  &:hover {
    background: var(--color-secondary);
  }
}
</style>
