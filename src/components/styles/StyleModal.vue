<template>
  <div class="style-modal-panel" @click.self="closeModalPanel">
    <div class="style-modal modal" v-if="style !== undefined">
      <div class="style-modal-header">
        <div class="style-modal-header-title">
          <h1>{{ style.name }}</h1>
          <p>by {{ style.username }}</p>
          <p class="style-id">ID : {{ style._id }}</p>
        </div>
        <div
          class="button installed"
          v-if="
            this.store.isStyleInstalled(this.style) &&
            this.store.isStyleUpToDate(this.style)
          "
        >
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
          <h3>Installed</h3>
        </div>
        <div
          class="button"
          v-else-if="
            this.store.isStyleInstalled(this.style) &&
            !this.store.isStyleUpToDate(this.style)
          "
          @click="this.updateStyle"
        >
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
          <h3>Update</h3>
        </div>
        <div class="button" v-else @click="this.downloadStyle">
          <h3>Install</h3>
        </div>
      </div>
      <div class="style-modal-images" v-if="this.style.images.length > 0">
        <div class="style-modal-image-background"></div>
        <div class="style-modal-image-wrapper">
          <div
            class="style-modal-image"
            v-for="image in this.style.images"
            :key="image"
          >
            <img
              :src="`http://localhost:9050/style/images/${this.style._id}/${image}`"
            />
          </div>
        </div>
      </div>
      <div class="style-modal-content">
        <div class="style-modal-content-details">
          <p>{{ style.description }}</p>
          <h3 class="username">Author : {{ style.username }}</h3>
          <h3 class="created">
            Created at : {{ this.displayDate(style.createdAt) }}
          </h3>
          <h3 class="updated">
            Last update : {{ this.displayDate(style.updatedAt) }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "../../store";
import { useOnline } from "../../store/online";

export default {
  setup() {
    const store = useStore();
    const online = useOnline();

    return {
      store,
      online,
    };
  },
  name: "option-style",
  data() {
    return {
      style: undefined,
    };
  },
  mounted() {
    this.style = this.store.actualStoreStyle;
  },
  updated() {
    this.updateBackgroundImage();
  },
  methods: {
    closeModalPanel() {
      // Select .modal-panel element
      const modalPanel = document.querySelector(".style-modal-panel");
      if (modalPanel) {
        // Launch fadeInUp animation on it
        modalPanel.classList.add("out");
        // Remove the animation class after the animation is finished
        setTimeout(() => {
          this.store.actualStoreStyle = undefined;
        }, 250);
      }
    },
    downloadStyle() {
      this.online.downloadStyle(this.style).then((style) => {
        this.store.addStyle(style);
      });
    },
    updateStyle() {
      this.online.downloadStyle(this.style).then((style) => {
        this.store.editStyle(style);
      });
    },
    displayDate(date) {
      // Return date as Mon, 01 Jan 2020, 00:00
      return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    },
    updateBackgroundImage() {
      // Select .style-modal-images
      const styleModalImageBG = document.querySelector(
        ".style-modal-image-background"
      );
      // If any image, make the first image the background image
      if (styleModalImageBG && this.style.images.length > 0) {
        styleModalImageBG.style.backgroundImage = `url(http://localhost:9050/style/images/${this.style._id}/${this.style.images[0]})`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.style-modal {
  width: 85%;
  max-width: 85vw;
  background: var(--color-surface);
  border-radius: var(--border-radius-medium);

  .style-modal-header {
    background: var(--color-primary);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    min-height: 80px;
    border-top-left-radius: var(--border-radius-medium);
    border-top-right-radius: var(--border-radius-medium);

    .style-modal-header-title {
      .style-id {
        margin-top: 15px;
        color: var(--color-gray-secondary);
      }
    }

    .button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      column-gap: 10px;
      padding: 10px 30px;
      background: var(--color-secondary);
      color: var(--color-primary);
      border-radius: 5px;
      cursor: pointer;
      min-height: 24px;
      min-width: 90px;

      h3 {
        color: var(--color-primary);
      }

      svg {
        fill: var(--color-primary);
      }
    }

    .installed {
      border: solid 1px var(--color-secondary);
      background: none;
      color: var(--color-secondary);
      cursor: default;

      h3 {
        color: var(--color-secondary);
      }

      svg {
        fill: var(--color-secondary);
      }
    }
  }

  .style-modal-images {
    position: relative;
    overflow: hidden;

    .style-modal-image-background {
      position: absolute;
      // Blur & Darken
      filter: blur(5px) brightness(0.5);
      -webkit-filter: blur(5px) brightness(0.5);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .style-modal-image-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 500px;
      overflow-x: scroll;

      .style-modal-image {
        min-height: calc(40 * 9px);
        height: calc(40 * 9px);
        min-width: calc(40 * 16px);
        width: calc(40 * 16px);
        margin: 20px 30px;
        z-index: 10;

        img {
          height: 100%;
          width: 100%;
          border-radius: var(--border-radius);
        }
      }
    }
  }

  .style-modal-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;

    p {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}

.style-modal-panel {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  max-width: 100vw;
  display: grid;
  place-items: center;
  z-index: 10;
  background: var(--modal-background);
  backdrop-filter: var(--modal-backdrop-filter);
  -webkit-backdrop-filter: var(--modal-backdrop-filter);
  transition: all 0.25s ease-in-out;

  .modal {
    opacity: 1 !important;
    -webkit-transform: scale(1) translateZ(0px) !important;
    transform: scale(1) translateZ(0px) !important;
    -webkit-animation: modalanim 300ms cubic-bezier(0.3, 0.3, 0.18, 1.88);
    animation: modalanim 300ms cubic-bezier(0.3, 0.3, 0.18, 1.88);
    -webkit-transition: all 100ms;
    transition: all 100ms;
    -webkit-transition-delay: 5s;
    transition-delay: 5s;
  }
}

.out {
  background: none;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);

  .modal {
    -webkit-animation: modalanimout 300ms cubic-bezier(0.3, 0.3, 0.18, 1.88);
    animation: modalanimout 300ms cubic-bezier(0.3, 0.3, 0.18, 1.88);
  }
}

@-webkit-keyframes modalanim {
  from {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    opacity: 0;
  }

  to {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes modalanim {
  from {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    opacity: 0;
  }

  to {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}

@-webkit-keyframes modalanimout {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }

  to {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    opacity: 0;
  }
}

@keyframes modalanimout {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }

  to {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    opacity: 0;
  }
}
</style>
