<template>
  <div class="editor">
    <div class="editor-header">
      <h1 class="editor-header-title text-cant-be-selected">
        {{ t("EDITOR.EDITOR") }}
      </h1>
      <div class="editor-style-list">
        <div class="editor-style-list-container">
          <StyleEditor
            v-for="style in store.styles"
            :key="style._id"
            :style="style"
            :editorContextMenu="store.editorContextMenu"
          />
          <div class="add-style">
            <div class="new-style" @click="store.showAddStyle = true">+</div>
            <div class="import-style" @click="store.showImportStyle = true">
              <svg
                width="13"
                height="14"
                viewBox="0 0 24 25"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.3604 13.2881H19.6726H6.76565C5.97137 13.2881 5.1771 13.5738 4.58139 14.05C4.18426 14.3357 3.8864 14.8119 3.68783 15.2881L2.79427 17.3833L2.09928 19.0976C2 19.2881 2 19.4786 2 19.669C2 19.9548 2.09928 20.2405 2.19857 20.4309C2.49642 20.9071 2.99284 21.2881 3.68783 21.2881H18.1833C19.5733 21.2881 20.7647 20.5262 21.2612 19.2881L22.8497 15.4786C23.3461 14.4309 22.5519 13.2881 21.3604 13.2881Z"
                />
                <path
                  d="M1.98522 14.6955C2.18227 14.2807 2.37931 13.8659 2.67488 13.451C2.87192 13.1399 3.06897 12.9325 3.36453 12.6214C4.25123 11.7918 5.4335 11.2733 6.71429 11.2733H19.4236H20.2118H21V9.4066C21 7.43623 19.5222 5.88068 17.6502 5.88068H12.133L10.8522 4.53253C10.1626 3.7029 9.07882 3.28809 7.99507 3.28809H4.34975C2.47783 3.28809 1 4.84364 1 6.81401V17.2881L1.78818 15.1103L1.98522 14.6955Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="editor-main-wrapper">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import { useStore } from "../../store";
import { useI18n } from "vue-i18n";

// Components
import StyleEditor from "../../components/styles/StyleEditor.vue";

export default {
  setup() {
    const store = useStore();
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });

    return {
      store,
      t,
    };
  },
  name: "EditorView",
  components: {
    StyleEditor,
  },
  mounted() {
    // Call getStyles() getter
    this.store.getStyles();
  },
};
</script>

<style lang="scss" scoped>
.editor {
  height: 100%;
  max-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;

  .editor-header {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 40px;

    .editor-header-title {
      align-self: flex-start;
      margin-bottom: 20px;
    }

    .editor-style-list {
      overflow-y: scroll;

      .editor-style-list-container {
        display: flex;
        flex-direction: column;
        row-gap: 10px;

        .add-style {
          position: relative;
          display: grid;
          place-items: center;
          grid-template-columns: 1fr 1fr;
          width: 100%;
          height: 30px;
          font-size: 20px;

          .new-style {
            grid-column: 1;
            grid-row: 1;
            cursor: pointer;
            height: 100%;
            width: 100%;
            opacity: 0.6;
            border-top-left-radius: 100px;
            border-bottom-left-radius: 100px;
            color: var(--color-secondary);

            display: grid;
            place-items: center;

            background: var(--color-primary);

            transition: opacity 0.15s ease-in-out;

            &:hover {
              opacity: 1;
            }
          }

          .import-style {
            grid-column: 2;
            grid-row: 1;
            cursor: pointer;
            height: 100%;
            width: 100%;
            opacity: 0.6;

            display: grid;
            place-items: center;

            border-top-right-radius: 100px;
            border-bottom-right-radius: 100px;

            background: var(--color-primary);

            transition: opacity 0.15s ease-in-out;

            &:hover {
              opacity: 1;
            }
          }

          svg {
            fill: var(--color-secondary);
          }

          &::after {
            position: absolute;
            content: "";
            top: 0;
            height: 100%;
            left: 50%;
            width: 2px;
            transform: translateX(-50%);
            background: var(--color-secondary);
            opacity: 0.6;
            transition: opacity 0.15s ease-in-out;
          }

          &:hover {
            &::after {
              opacity: 1;
            }
          }
        }
      }
    }
  }

  .editor-main-wrapper {
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    column-gap: 20px;
  }
}
</style>
