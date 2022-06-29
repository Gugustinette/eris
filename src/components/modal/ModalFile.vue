<template>
  <div class="modal-panel" @click.self="closeModalPanel">
    <form class="modal" @submit.prevent="handleConfirm">
      <h1>{{ title }}</h1>
      <div class="file-selector" v-if="file !== undefined">
        <h2>{{ file.name }}</h2>
      </div>
      <div class="file-wrapper" v-else>
        <label class="file-input">
          <input type="file" @change="handleCssFile" />
          <svg
            width="48"
            height="50"
            viewBox="0 0 24 25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4 5.68809C4 3.88644 5.40423 2.28809 7.31339 2.28809H12.3425C13.3927 2.28809 14.4567 2.67989 15.2604 3.47893L15.2701 3.48859L18.8866 7.18414C19.6883 7.98458 20.0956 9.15706 19.9809 10.2452V18.8881C19.9809 20.6897 18.5767 22.2881 16.6675 22.2881H7.31339C5.40423 22.2881 4 20.6897 4 18.8881V5.68809ZM7.31339 4.28809C6.60742 4.28809 6 4.88974 6 5.68809V18.8881C6 19.6864 6.60742 20.2881 7.31339 20.2881H16.6675C17.3735 20.2881 17.9809 19.6864 17.9809 18.8881V10.1881C17.9809 10.1464 17.9835 10.1047 17.9888 10.0633C18.0504 9.57265 17.8563 8.98011 17.4712 8.59724L17.4615 8.58758L13.8459 4.89292C13.443 4.49478 12.8996 4.28809 12.3425 4.28809H7.31339Z"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 12.2881C12.5523 12.2881 13 12.7358 13 13.2881V17.2881C13 17.8404 12.5523 18.2881 12 18.2881C11.4477 18.2881 11 17.8404 11 17.2881V13.2881C11 12.7358 11.4477 12.2881 12 12.2881Z"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 15.2881C9 14.7358 9.44772 14.2881 10 14.2881H14C14.5523 14.2881 15 14.7358 15 15.2881C15 15.8404 14.5523 16.2881 14 16.2881H10C9.44772 16.2881 9 15.8404 9 15.2881Z"
            />
          </svg>
          <h2>CSS File</h2>
        </label>
        <label class="file-input">
          <input type="file" @change="handlePackage" />
          <svg
            width="48"
            height="50"
            viewBox="0 0 24 25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2 6.85219C2 4.89332 3.51277 3.28809 5.48619 3.28809H8.96685C10.0949 3.28809 11.1746 3.68204 11.9849 4.62917L13.1489 5.74962H18.5138C20.4872 5.74962 22 7.35486 22 9.31373V17.724C22 19.6829 20.4872 21.2881 18.5138 21.2881H5.48619C3.51277 21.2881 2 19.6829 2 17.724V6.85219ZM5.48619 5.28809C4.67507 5.28809 4 5.93926 4 6.85219V17.724C4 18.6369 4.67507 19.2881 5.48619 19.2881H18.5138C19.3249 19.2881 20 18.6369 20 17.724V9.31373C20 8.4008 19.3249 7.74962 18.5138 7.74962H12.7459C12.4872 7.74962 12.2387 7.64943 12.0524 7.47008L10.5606 6.03418C10.534 6.00851 10.5087 5.98137 10.4851 5.9529C10.1061 5.49695 9.61099 5.28809 8.96685 5.28809H5.48619Z"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 9.78809C12.5523 9.78809 13 10.2358 13 10.7881V15.7881C13 16.3404 12.5523 16.7881 12 16.7881C11.4477 16.7881 11 16.3404 11 15.7881V10.7881C11 10.2358 11.4477 9.78809 12 9.78809Z"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.5 13.2881C8.5 12.7358 8.94772 12.2881 9.5 12.2881H14.5C15.0523 12.2881 15.5 12.7358 15.5 13.2881C15.5 13.8404 15.0523 14.2881 14.5 14.2881H9.5C8.94772 14.2881 8.5 13.8404 8.5 13.2881Z"
            />
          </svg>
          <h2>Package</h2>
        </label>
      </div>
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
    type: {
      type: String,
      default: "strings",
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
      var fieldValues = undefined;
      if (this.fields) {
        fieldValues = {};
        this.fields.forEach((field) => {
          var TextField = document.querySelector(`#data-field-${field}`)
            ?.children[1];
          if (TextField) {
            fieldValues[field] = TextField.value;
          }
        });
      }
      this.$emit(
        "confirm",
        this.file,
        fieldValues ? "css" : "package",
        fieldValues
      );
    },
    handleCssFile(event) {
      const file = event.target.files[0];
      this.fields = ["Name", "Domain"];
      this.file = file;
    },
    handlePackage(event) {
      const file = event.target.files[0];
      this.file = file;
    },
  },
  data() {
    return {
      fields: undefined,
      file: undefined,
    };
  },
});
</script>

<style scoped lang="scss">
input[type="file"] {
  display: none;
}

.file-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: calc(100% + 40px);
  justify-content: center;
  align-items: center;
  column-gap: 20px;
  .file-input {
    background: var(--color-primary);
    color: var(--color-secondary);
    width: 180px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: var(--border-radius);
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.15s ease-in-out;

    h2 {
      margin-top: 15px;
      color: var(--color-secondary);
    }

    svg {
      fill: var(--color-secondary);
    }

    &:hover {
      opacity: 1;
    }
  }
}
</style>
