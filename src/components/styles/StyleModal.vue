<template>
  <div
    :class="{
      'style-modal-panel': true,
      editable: editable,
    }"
    @click.self="closeModalPanel"
  >
    <div class="style-modal modal" v-if="style !== undefined">
      <div class="style-modal-header">
        <div class="style-modal-header-title">
          <div class="row">
            <h1 class="input-editable" ref="styleName">{{ style.name }}</h1>
            <h1 class="separator">/</h1>
            <h2 class="input-editable" ref="styleDomain">{{ style.domain }}</h2>
          </div>
          <p class="style-id">ID : {{ style._id }}</p>
        </div>
        <div class="style-modal-header-actions">
          <!-- Edit Button -->
          <div
            class="edit-button"
            v-if="
              this.online.user && this.online.user.username === style.username
            "
            @click="toggleEditStyle"
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.9098 3.09167C21.0911 2.37662 20.17 1.96802 19.0443 1.96802C17.9185 1.96802 16.7927 2.47877 15.974 3.29597L4 15.3497L4.71639 16.0648L5.43279 16.7798L8.19602 19.5379L8.91241 20.253L9.6288 20.968L21.7052 8.91425C23.3426 7.27985 23.445 4.62393 21.9098 3.09167Z"
              />
              <path
                d="M6.6273 20.5959L4.56826 18.5368L3.78386 17.7524L2.99946 16.968C2.80336 17.2622 2.70531 17.6544 2.60726 17.9485L1.03847 22.753C0.940416 23.1452 1.03847 23.4393 1.23456 23.7335C1.43066 23.9296 1.82286 24.0276 2.21506 23.9296L7.0195 22.4588C7.4117 22.3608 7.70585 22.1647 8 22.0666L7.31365 21.3803L6.6273 20.5959Z"
              />
            </svg>
          </div>
          <!-- State Button -->
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
      </div>
      <div
        class="style-modal-images"
        v-if="this.style.images && this.style.images.length > 0"
      >
        <div class="style-modal-image-background"></div>
        <div class="style-modal-image-wrapper">
          <div
            class="style-modal-image"
            v-for="image in this.style.images"
            :id="image"
            :draggable="this.editable"
            @dragstart="this.dragStart($event, image)"
            @drop="this.onDrop($event)"
            @dragenter="this.onDragEnter($event)"
            @dragleave="this.onDragLeave($event)"
            @dragover.prevent
            :key="image"
          >
            <img
              :draggable="!this.editable"
              @drop="this.onDrop($event)"
              :src="`http://localhost:9050/style/images/${this.style._id}/${image}`"
            />
          </div>
          <label
            class="file-input"
            v-if="this.editable && this.style.images.length < 4"
          >
            <input type="file" @change="handleImage" />
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
            <h3>Add Image</h3>
          </label>
        </div>
      </div>
      <div class="style-modal-content">
        <div class="style-modal-content-details">
          <p ref="styleDescription" class="input-editable">
            {{ style.description }}
          </p>
          <h3 class="username" v-if="style.username">
            Author : {{ style.username }}
          </h3>
          <h3 v-else>Not published yet</h3>
          <h3 class="created" v-if="style.createdAt">
            Created at : {{ this.displayDate(style.createdAt) }}
          </h3>
          <h3 class="updated" v-if="style.updatedAt">
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
      editable: false,
    };
  },
  mounted() {
    this.style = this.store.actualOpenedStyle;
    // Convert this.style.images from object to array keeping values
    if (this.style.images) {
      this.style.images = Object.values(this.style.images);
    }
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
          this.store.actualOpenedStyle = undefined;
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
      if (
        styleModalImageBG &&
        this.style.images &&
        this.style.images.length > 0
      ) {
        styleModalImageBG.style.backgroundImage = `url(http://localhost:9050/style/images/${this.style._id}/${this.style.images[0]})`;
      }
    },
    toggleEditStyle() {
      this.editable = !this.editable;
      // Make elements editable
      this.$refs.styleName.contentEditable = this.editable;
      this.$refs.styleDomain.contentEditable = this.editable;
      this.$refs.styleDescription.contentEditable = this.editable;
      // If editable, attach save listeners
      if (this.editable) {
        this.attachSaveListener(this.$refs.styleName, "input");
        this.attachSaveListener(this.$refs.styleDomain, "input");
        this.attachSaveListener(this.$refs.styleDescription, "input");
      }
    },
    attachSaveListener(element, event) {
      element.addEventListener(event, (e) => {
        e.preventDefault();
        // If text contains enter key, stop editing
        if (element.innerText.includes("\n") && this.editable) {
          this.toggleEditStyle();
          this.$refs.styleName.innerText =
            this.$refs.styleName.innerText.replace("\n", "");
          this.$refs.styleDomain.innerText =
            this.$refs.styleDomain.innerText.replace("\n", "");
          this.$refs.styleDescription.innerText =
            this.$refs.styleDescription.innerText.replace("\n", "");
          this.editStyle();
        }
      });
    },
    editStyle() {
      this.style.name = this.$refs.styleName.innerText;
      this.style.domain = this.$refs.styleDomain.innerText;
      this.style.description = this.$refs.styleDescription.innerText;
      this.store.editStyle(this.style);
    },
    dragStart(event, item) {
      if (!this.editable) return;
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("itemID", item);
    },
    onDrop(event) {
      if (!this.editable) return;
      event.preventDefault();
      event.stopPropagation();
      const itemID = event.dataTransfer.getData("itemID");
      let target = event.target;
      // If target is img, take parent
      if (target.tagName === "IMG") {
        target = target.parentElement;
      }
      // If target is style-modal-image
      if (target.classList.contains("style-modal-image")) {
        // Target ID
        const targetID = target.id;
        // Switch images order
        const index = this.style.images.indexOf(itemID);
        const indexTarget = this.style.images.indexOf(targetID);
        const images = this.style.images;
        // Index goes to indexTarget / indexTarget goes to index
        images[index] = images[indexTarget];
        images[indexTarget] = itemID;
        // Update style
        this.style.images = images;
      }
      // Select all images
      const images = document.querySelectorAll(".style-modal-image");
      // Remove .drag-over class
      images.forEach((image) => {
        image.classList.remove("drag-over");
        // Select childrens of image
        const children = image.children;
        // Remove .drag-over class from children
        if (children && children.length > 0) {
          for (let i = 0; i < children.length; i++) {
            children[i].classList.remove("drag-over");
          }
        }
      });
    },
    onDragEnter(event) {
      if (!this.editable) return;
      event.preventDefault();
      // Add class to target element
      event.target.classList.add("drag-over");
    },
    onDragLeave(event) {
      if (!this.editable) return;
      event.preventDefault();
      // Add class to target element
      event.target.classList.remove("drag-over");
    },
    handleImage(event) {
      if (!this.editable) return;
      const file = event.target.files[0];
      // If file is not an image, return
      if (!file.type.includes("image")) return;
      // If file is too big, return
      if (file.size > 1000000) return;
      console.log(file);
    },
  },
};
</script>

<style lang="scss" scoped>
input[type="file"] {
  display: none;
}

.style-modal {
  width: 85%;
  max-width: 85vw;
  background: var(--color-surface);
  border-radius: var(--border-radius-medium);

  .style-modal-header {
    background: var(--color-primary);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 30px;
    min-height: 80px;
    border-top-left-radius: var(--border-radius-medium);
    border-top-right-radius: var(--border-radius-medium);

    .style-modal-header-title {
      .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        * {
          white-space: nowrap;
        }

        .separator {
          margin: 0px 10px;
        }

        h2 {
          color: var(--color-gray-secondary);
        }
      }

      .style-id {
        margin-top: 15px;
        color: var(--color-gray-secondary);
      }
    }

    .style-modal-header-actions {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      column-gap: 20px;
      width: 100%;

      .edit-button {
        display: grid;
        place-items: center;
        cursor: pointer;

        svg {
          fill: var(--color-secondary);
          transition: transform 0.15s ease-in-out;
        }

        &:hover {
          svg {
            transform: rotate(10deg);
          }
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
        padding: 20px 30px;
        z-index: 10;
        transition: all 0.15s ease-in-out;

        img {
          height: 100%;
          width: 100%;
          border-radius: var(--border-radius);
          transition: all 0.15s ease-in-out;
        }
      }

      .drag-over {
        transform: scale(1.1);
      }

      .file-input {
        color: var(--color-secondary);
        border: solid 1px var(--color-secondary);
        min-height: calc(20 * 9px) !important;
        height: calc(20 * 9px) !important;
        min-width: calc(20 * 16px) !important;
        width: calc(20 * 16px) !important;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: var(--border-radius);
        cursor: pointer;
        z-index: 10;
        opacity: 0.6;
        transition: opacity 0.15s ease-in-out;

        h3 {
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

  .input-editable {
    transition: all 0.15s ease-in-out;
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

.editable {
  .input-editable {
    background: whitesmoke;
    color: var(--color-primary) !important;
    padding: 10px 15px;
  }

  .style-modal-image-wrapper {
    justify-content: flex-start !important;
    .style-modal-image {
      cursor: move;
      min-height: calc(20 * 9px) !important;
      height: calc(20 * 9px) !important;
      min-width: calc(20 * 16px) !important;
      width: calc(20 * 16px) !important;
    }
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
