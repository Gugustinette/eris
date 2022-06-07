// Pinia Store
import { defineStore } from "pinia";

export const useStore = defineStore("main-store", {
  state: () => ({
    styles: [],
    showAddStyle: false,
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
      chrome.storage.sync.set({ cssStyles: this.styles });
    },
    purgeChromeStorage() {
      chrome.storage.sync.remove("cssStyles");
      this.styles = [];
    },
    toggleStyle(style) {
      this.styles.forEach((s) => {
        if (s.id === style.id) {
          s.active = !s.active;
        }
      });
      this.saveToChromeStorage();
    },
    addStyle(style) {
      // Generate id
      style._id = Math.random().toString(36).substr(2, 9);
      style.active = false;
      this.styles.push(style);
      this.saveToChromeStorage();
      console.log(this.styles);
    },
    editStyle(style) {
      this.styles.forEach((s) => {
        if (s.id === style.id) {
          s.name = style.name;
          s.css = style.css;
        }
      });
      this.saveToChromeStorage();
    },
    deleteStyle(style) {
      this.styles = this.styles.filter((s) => s.id !== style.id);
      this.saveToChromeStorage();
    },
  },
});
