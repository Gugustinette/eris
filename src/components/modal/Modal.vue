<template>
  <div class="modal-panel" @click.self="closeModalPanel">
    <form class="modal" @submit.prevent="handleConfirm">
      <div style="display: none" class="close" v-on:click="closeModalPanel">
        x
      </div>
      <h1>{{ title }}</h1>
      <div class="fields" v-if="fields">
        <div
          class="field"
          v-for="field in fields"
          v-bind:key="field"
          v-bind:id="'data-field-' + field"
        >
          <label>{{ field }}</label>
          <TextField v-bind:placeholder="field" />
        </div>
      </div>
      <div class="modal-footer">
        <Button
          v-bind:content="confirmText"
          :colorOnHover="false"
          type="submit"
        />
        <Button
          v-bind:content="cancelText"
          :noBackground="true"
          v-on:click="closeModalPanel"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
import TextField from "@/components/form/TextField.vue";
import Button from "@/components/form/Button.vue";

export default defineComponent({
  name: "option-modal-panel",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Modal Title",
    },
    fields: {
      type: Array,
      default: undefined,
    },
    confirmText: {
      type: String,
      default: "Confirm",
    },
    cancelText: {
      type: String,
      default: "Cancel",
    },
  },
  components: {
    TextField,
    Button,
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
          this.$emit("close");
        }, 250);
      }
    },
    handleConfirm() {
      this.closeModalPanel();
      var fieldValues = {};
      this.fields.forEach((field) => {
        var TextField = document.querySelector(`#data-field-${field}`)
          ?.children[1];
        if (TextField) {
          fieldValues[field] = TextField.value;
        }
      });
      this.$emit("confirm", fieldValues);
    },
  },
  mounted() {
    // Turn on focus on the first field
    if (this.fields && this.fields.length > 0) {
      const firstField = document.querySelector(`#data-field-${this.fields[0]}`)
        ?.children[1];
      if (firstField) {
        firstField.focus();
      }
    }
  },
});
</script>

<style lang="scss">
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
    position: relative;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 40px;
    min-width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background: var(--color-surface);
    border-radius: var(--border-radius-medium);

    opacity: 1 !important;
    -webkit-transform: scale(1) translateZ(0px) !important;
    transform: scale(1) translateZ(0px) !important;
    -webkit-animation: modalanim 300ms cubic-bezier(0.3, 0.3, 0.18, 1.88);
    animation: modalanim 300ms cubic-bezier(0.3, 0.3, 0.18, 1.88);
    -webkit-transition: all 100ms;
    transition: all 100ms;
    -webkit-transition-delay: 5s;
    transition-delay: 5s;

    .fields {
      display: flex;
      flex-direction: column;
      padding: 20px 0;
      width: 100%;
      row-gap: 20px;

      .field {
        display: flex;
        flex-direction: column;
        width: 100%;

        label {
          align-self: flex-start;
          margin-bottom: 5px;
        }
      }
    }

    .close {
      position: absolute;
      height: 20px;
      width: 20px;
      top: 0;
      right: 0;
      margin-right: 6px;
      margin-top: 6px;
      display: grid;
      place-content: center;
      font-size: var(--font-size-large);
      cursor: pointer;
    }

    h1 {
      font-size: var(--font-size-title);
      color: var(--color-secondary);
      margin-bottom: 20px;
    }

    .modal-footer {
      margin-top: 20px;
      padding: 20px;
      display: flex;
      flex-direction: row-reverse;
      column-gap: 10px;
      width: 100%;
      background: var(--surface-secondary);
    }
  }
}

.out {
  background: none;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);

  .modal {
    -webkit-animation: modalanimout 300 cubic-bezier(0.3, 0.3, 0.18, 1.88);
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
