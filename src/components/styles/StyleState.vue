<template>
  <div class="style-state" @click="this.handleClick">
    <svg
      v-if="state === 'up-to-date'"
      clip-rule="evenodd"
      fill-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"
        fill-rule="nonzero"
      />
    </svg>
    <svg
      v-else-if="state === 'late-to-date'"
      class="smaller-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 14h-7v-8h2v6h5v2z"
      />
    </svg>
    <svg
      v-else-if="state === 'downloading'"
      class="loading-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "option-style-state",
  props: {
    state: {
      type: String,
    },
  },
  methods: {
    handleClick() {
      // Emit state
      this.$emit("state-click", this.state);
    },
  },
};
</script>

<style lang="scss" scoped>
// Define loading animation
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

.style-state {
  position: absolute;
  display: grid;
  place-items: center;
  top: 5px;
  right: 5px;

  svg {
    width: 30px;
    height: 30px;
    fill: var(--color-background);
  }

  .smaller-icon {
    width: 26px;
    height: 26px;
  }

  .loading-icon {
    // Loading animation
    animation: spin 1s linear infinite;
  }
}
</style>
