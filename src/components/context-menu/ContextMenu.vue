<template>
  <div class="context-menu"></div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContextMenu",
  props: {
    mousePos: {
      // { x: number; y: number }
      required: true,
    },
  },
  methods: {
    close() {
      // Emit Close Event
      this.$emit("close");
      // Remove Listeners
      document.removeEventListener("mousemove", this.onMouseMoveListener);
      document.removeEventListener("click", this.onClickListener);
    },
  },
  mounted() {
    // Move context menu to mouse pos
    let contextMenu = document.querySelector(".context-menu");
    contextMenu.style.top = this.mousePos.y + "px";
    contextMenu.style.left = this.mousePos.x + "px";
    // Track mouse pos
    document.addEventListener("mousemove", this.onMouseMoveListener);
    // On click outside the context menu
    document.addEventListener("click", this.onClickListener);
  },
  updated() {
    // Move context menu to mouse pos
    let contextMenu = document.querySelector(".context-menu");
    contextMenu.style.top = this.mousePos.y + "px";
    contextMenu.style.left = this.mousePos.x + "px";
  },
  data() {
    return {
      // Listeners
      onMouseMoveListener: (e) => {
        // If mouse is at the right of the context menu
        if (e.clientX > this.mousePos.x + 250) {
          // Delete the component
          this.close();
        }
      },
      onClickListener: () => {
        // Delete the component
        this.close();
      },
    };
  },
});
</script>

<style lang="scss">
.context-menu {
  position: absolute;
  padding: 4px 0;
  border-radius: 4px;
  width: 200px;
  background: var(--color-surface);
  color: var(--font-on-surface);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  pointer-events: all;
  z-index: 1000;

  .action {
    width: 90%;
    display: grid;
    align-content: center;
    padding: 10px 5px;
    cursor: pointer;
    border-radius: 4px;
    transition: color 0.15s ease-in-out;
    transition: background 0.15s ease-in-out;

    &:hover {
      color: var(--color-secondary);
    }
  }

  .separator {
    border-top: 1px solid var(--color-secondary);
    width: 90%;
    margin: 4px 0;
  }
}
</style>
