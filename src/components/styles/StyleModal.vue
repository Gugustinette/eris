<template>
  <div class="modal-panel" @click.self="closeModalPanel">
    <div class="style-modal modal" v-if="style !== undefined">
      <div class="style-modal-header">
        <div class="style-modal-header-title">
          <h1>{{ style.name }}</h1>
          <p>by {{ style.username }}</p>
        </div>
        <Button @click="this.downloadStyle" content="Install" />
      </div>
      <div class="style-modal-content">
        <div class="style-modal-content-details">
          <p>{{ style.description }}</p>
          <h3 class="username">Author : {{ style.username }}</h3>
          <h3 class="created">Created at : {{ style.createdAt }}</h3>
          <h3 class="updated">Last update : {{ style.updatedAt }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "../../store";

import Button from "@/components/form/Button.vue";

export default {
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  name: "option-style",
  components: {
    Button,
  },
  data() {
    return {
      style: undefined,
    };
  },
  mounted() {
    this.style = this.store.actualStoreStyle;
  },
  methods: {
    closeModalPanel() {
      // Select .modal-panel element
      const modalPanel = document.querySelector(".modal-panel");
      if (modalPanel) {
        // Launch fadeInUp animation on it
        modalPanel.classList.add("out");
        // Remove the animation class after the animation is finished
        setTimeout(() => {
          this.store.actualStoreStyle = undefined;
        }, 250);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.style-modal {
  width: 85%;
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

.modal-panel {
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
