// Pinia Store
import { defineStore } from "pinia";

export const useStore = defineStore("main-store", {
  state: () => ({
    styles: [],
    showAddStyle: false,
    editorContextMenu: "",
    actualStoreStyle: undefined,
  }),
  actions: {
    // Get css from chrome extension storage
    getStyles() {
      return new Promise((resolve) => {
        chrome.storage.sync.get("cssStyles", (result) => {
          if (result.cssStyles) {
            this.styles = result.cssStyles;
            this.styles = Object.values(this.styles);
          } else {
            this.styles = [];
          }
          resolve(this.styles);
        });
      });
    },
    saveToChromeStorage() {
      // For each styles, prevent name and domain from containing "\n"
      const styles = this.styles.map((style) => {
        return {
          ...style,
          name: style.name.replace("/\n/", ""),
          domain: style.domain.replace("/\n/g", ""),
        };
      });
      this.styles = styles;
      chrome.storage.sync.set({ cssStyles: this.styles });
    },
    purgeChromeStorage() {
      chrome.storage.sync.remove("cssStyles");
      this.styles = [];
    },
    toggleStyle(style) {
      this.styles.forEach((s) => {
        if (s._id === style._id) {
          s.active = !s.active;
        }
      });
      this.saveToChromeStorage();
    },
    addStyle(style) {
      // Generate id if not provided
      if (!style._id) {
        style._id = Math.random().toString(36).substr(2, 9);
      }
      style.active = false;
      this.styles.push(style);
      this.saveToChromeStorage();
    },
    editStyle(style) {
      this.styles.forEach((s) => {
        if (s._id === style._id) {
          s.name = style.name;
          s.user = style.user;
          s.username = style.username;
          s.description = style.description;
          s.domain = style.domain;
          s.css = style.css;
          s.updatedAt = style.updatedAt;
        }
      });
      this.saveToChromeStorage();
    },
    renameStyle(style) {
      this.styles.forEach((s) => {
        if (s._id === style._id) {
          s.name = style.name;
          s.domain = style.domain;
        }
      });
      this.saveToChromeStorage();
    },
    deleteStyle(style) {
      this.styles = this.styles.filter((s) => s._id !== style._id);
      this.saveToChromeStorage();
    },
  },
});
