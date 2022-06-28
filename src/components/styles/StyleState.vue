<template>
  <div
    :class="{
      'style-state': true,
      'background-black': state === 'late-to-date' || state === 'downloading',
    }"
    @click="this.handleClick"
  >
    <div class="up-to-date" v-if="state === 'up-to-date'">
      <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.6301 0.20194C19.2355 -0.093961 18.6437 -0.093961 18.2491 0.399208L15.3884 3.95002C13.8101 2.86505 11.9359 2.27325 9.86437 2.27325C4.43896 2.27325 0 6.71177 0 12.1366C0 17.5615 4.43896 22 9.86437 22C15.2898 22 19.7287 17.5615 19.7287 12.1366C19.7287 10.1639 19.1369 8.38854 18.1504 6.8104L17.4599 7.59947L16.7694 8.38854L11.0481 15.5888C10.8508 15.7861 10.5549 15.9833 10.2589 15.9833C9.96301 15.9833 9.76572 15.8847 9.56843 15.6874L5.32676 11.1503C5.03083 10.8544 5.03083 10.3612 5.12947 10.0653C5.12947 9.96668 5.22811 9.86805 5.32676 9.76941C5.72133 9.37488 6.31319 9.37488 6.70777 9.76941L10.1603 13.5175L15.5857 6.71177L16.1776 5.9227L16.7694 5.13363L19.6301 1.58281C20.1233 1.18828 20.1233 0.596475 19.6301 0.20194Z"
        />
      </svg>
    </div>
    <div v-else-if="state === 'late-to-date'" class="action late-to-date">
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.1057 2.81554C9.9835 2.81554 9.92239 2.81554 9.80016 2.81554C9.12794 1.67725 7.90572 0.958328 6.50016 0.958328C5.15572 0.958328 3.87239 1.67725 3.20016 2.81554C3.07794 2.81554 3.01683 2.81554 2.89461 2.81554C1.36683 2.81554 0.0834961 4.07364 0.0834961 5.6313C0.0834961 7.18896 1.36683 8.38716 2.89461 8.38716H4.36127C4.72794 8.38716 4.97239 8.14752 4.97239 7.78806C4.97239 7.4286 4.72794 7.18896 4.36127 7.18896H2.89461C2.03905 7.18896 1.30572 6.47004 1.30572 5.6313C1.30572 4.73265 2.03905 4.07364 2.89461 4.07364C3.07794 4.07364 3.20016 4.07364 3.3835 4.13355C3.68905 4.25337 3.99461 4.07364 4.11683 3.77409C4.54461 2.75563 5.46127 2.15653 6.50016 2.15653C7.53905 2.15653 8.51683 2.75563 8.8835 3.71418C9.00572 4.01373 9.31127 4.13355 9.61683 4.07364C9.73905 4.01373 9.92239 4.01373 10.1057 4.01373C11.0224 4.01373 11.6946 4.73265 11.6946 5.57139C11.6946 6.47004 10.9613 7.12905 10.1057 7.12905H7.11127V5.21193C7.11127 4.85247 6.86683 4.61283 6.50016 4.61283C6.1335 4.61283 5.88905 4.85247 5.88905 5.21193V10.0047L5.33905 9.46554C5.09461 9.2259 4.72794 9.2259 4.4835 9.46554C4.23905 9.70517 4.23905 10.0646 4.4835 10.3043L6.07239 11.8619C6.19461 11.9818 6.37794 12.0417 6.50016 12.0417C6.62239 12.0417 6.80572 11.9818 6.92794 11.8619L8.51683 10.3043C8.76127 10.0646 8.76127 9.70517 8.51683 9.46554C8.27239 9.2259 7.90572 9.2259 7.66127 9.46554L7.11127 9.94481V8.38716H10.1057C11.6946 8.38716 12.9168 7.12905 12.9168 5.6313C12.9168 4.13355 11.6946 2.81554 10.1057 2.81554Z"
        />
      </svg>
      Update
    </div>
    <div v-else-if="state === 'downloading'" class="action downloading">
      <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.15 10.5H1.85C1.1 10.5 0.5 9.9 0.5 9.15V1.85C0.5 1.1 1.1 0.5 1.85 0.5H9.1C9.9 0.5 10.5 1.1 10.5 1.85V9.1C10.5 9.9 9.9 10.5 9.15 10.5Z"
        />
      </svg>
      Download ...
    </div>
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  font-size: 0.8rem;

  .up-to-date {
    position: absolute;
    display: grid;
    place-items: center;
    top: 5px;
    right: 5px;
  }

  .action {
    color: var(--color-secondary);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    border: solid 1px var(--color-secondary);
    column-gap: 10px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.15s ease-in-out;

    svg {
      width: 16px;
      height: 16px;
      fill: var(--color-secondary);
      transition: all 0.15s ease-in-out;
    }

    &:hover {
      background-color: var(--color-secondary);
      color: var(--color-background);

      svg {
        fill: var(--color-background);
      }
    }
  }

  .downloading {
    border: none;

    &:hover {
      background-color: transparent;
      color: var(--color-secondary);

      svg {
        fill: var(--color-secondary);
      }
    }
  }

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

.background-black {
  background: var(--modal-background);
}
</style>
