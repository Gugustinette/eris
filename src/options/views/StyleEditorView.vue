<template>
  <div class="style-editor-view">
    <EditorActionBar
      :isConnected="isConnected"
      :owned="owned"
      :needsToBeSaved="needsToBeSaved"
      :needsToBePublished="needsToBePublished"
      :allreadyPublished="allreadyPublished"
      @save-css="getCssForSave = true"
      @publish-css="this.publishCss"
      @update-css="this.updateCss"
      @export-css="this.exportCss"
      @export-package="this.exportPackage"
    />
    <Editor
      :css="editingStyle.css || ''"
      :getCssForSave="getCssForSave"
      @save-css="this.saveCSS"
      @needs-to-be-saved="stateChanged"
      @get-css-for-save="this.saveCssManually"
    />
  </div>
</template>

<script>
import { useStore } from "../../store";
import { useOnline } from "../../store/online";

import { useI18n } from "vue-i18n";

// Components
import Editor from "@/components/editor/Editor.vue";
import EditorActionBar from "@/components/editor/ActionBar.vue";

export default {
  setup() {
    const store = useStore();
    const online = useOnline();
    const { t } = useI18n();

    return {
      store,
      online,
      t,
    };
  },
  name: "StyleEditorView",
  components: {
    Editor,
    EditorActionBar,
  },
  methods: {
    saveCSS(css) {
      this.editingStyle.css = css;
      this.editingStyle.updatedLocal = true;
      if (this.owned) {
        this.needsToBePublished = true;
      }
      this.store.editStyle(this.editingStyle);
      this.needsToBeSaved = false;
    },
    stateChanged() {
      this.needsToBeSaved = true;
    },
    saveCssManually(css) {
      this.getCssForSave = false;
      this.saveCSS(css);
    },
    publishCss() {
      // Publish the style
      if (this.isConnected) {
        this.online.addStyle(this.editingStyle).then((remoteStyle) => {
          // No local changes to publish
          this.editingStyle.updatedLocal = undefined;
          // Dates for versioning
          this.editingStyle.updatedAt = remoteStyle.updatedAt;
          this.editingStyle.createdAt = remoteStyle.createdAt;
          // New id
          this.editingStyle._id = remoteStyle._id;
          // Save as local style
          this.store.editStyle(this.editingStyle);
          // States
          this.needsToBePublished = false;
          this.allreadyPublished = true;
        });
      } else {
        alert(this.t("AUTH.NOT_CONNECTED"));
      }
    },
    updateCss() {
      // Edit the style
      this.online.editStyle(this.editingStyle).then((remoteStyle) => {
        // No local changes to publish
        this.editingStyle.updatedLocal = undefined;
        // Dates for versioning
        this.editingStyle.updatedAt = remoteStyle.updatedAt;
        this.editingStyle.createdAt = remoteStyle.createdAt;
        // Save as local style
        this.store.editStyle(this.editingStyle);
        // States
        this.needsToBePublished = false;
        this.allreadyPublished = true;
      });
    },
    // Export the style as CSS file
    exportCss() {
      // Make the user download with navigator API
      const blob = new Blob([this.editingStyle.css], {
        type: "text/plain;charset=utf-8",
      });
      this.saveAs(blob, this.editingStyle.name, "css");
    },
    // Export as full package
    exportPackage() {
      // Make the user download with navigator API
      const blob = new Blob([JSON.stringify(this.editingStyle)], {
        type: "text/plain;charset=utf-8",
      });
      this.saveAs(blob, this.editingStyle.name, "eris");
    },
    // Save as file
    saveAs(blob, filename, extension) {
      const file = `${filename}.${extension}`;
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, file);
      } else {
        const elemDownload = window.document.createElement("a");
        elemDownload.href = window.URL.createObjectURL(blob);
        elemDownload.download = file;
        document.body.appendChild(elemDownload);
        elemDownload.click();
        document.body.removeChild(elemDownload);
      }
    },
  },
  mounted() {
    this.online.loadUser().then(() => {
      // Get the style from the store
      this.store.getStyles().then((styles) => {
        // Find the style we're editing
        this.editingStyle = styles.find((style) => {
          return style._id === this.$route.params.styleId;
        });

        // Owned ?
        if (this.editingStyle.user === undefined) {
          // No user defined => Local Style Owned
          this.owned = true;
        } else {
          // User defined => Needs connection to know
          if (this.online.isConnected()) {
            // Connected
            if (this.editingStyle.user === this.online.user._id) {
              // Owned
              this.owned = true;
            } else {
              // Not Owned
              this.owned = false;
            }
          } else {
            // Not connected
            this.owned = false;
          }
        }

        // Needs to be published ?
        if (this.editingStyle.updatedLocal) {
          this.needsToBePublished = true;
        } else {
          this.needsToBePublished = false;
        }

        // Allready published ?
        if (this.editingStyle.updatedAt) {
          this.allreadyPublished = true;
        }
      });
    });
  },
  data() {
    return {
      editingStyle: {},
      needsToBeSaved: false,
      needsToBePublished: false,
      allreadyPublished: false,
      isConnected: false,
      owned: false,
      getCssForSave: false,
    };
  },
};
</script>

<style lang="scss">
.style-editor-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100vh;
}
</style>
