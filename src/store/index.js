// Pinia Store
import { defineStore } from "pinia";

export const useStore = defineStore("main-store", {
  state: () => ({
    styles: [],
    showAddStyle: false,
    showImportStyle: false,
    editorContextMenu: "",
    actualOpenedStyle: undefined,
    lang: "en",
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
          if (style.updatedLocal) {
            s.updatedLocal = style.updatedLocal;
          }
          if (style.images) {
            s.images = style.images;
          }
          if (style._newId) {
            s._id = style._newId;
          }
        }
      });
      this.saveToChromeStorage();
    },
    renameStyle(style) {
      this.styles.forEach((s) => {
        if (s._id === style._id) {
          s.name = style.name;
          s.domain = style.domain;
          if (style.description) {
            s.description = style.description;
          }
        }
      });
      this.saveToChromeStorage();
    },
    deleteStyle(style) {
      this.styles = this.styles.filter((s) => s._id !== style._id);
      this.saveToChromeStorage();
    },
    isStyleInstalled(style) {
      return this.styles.some((s) => s._id === style._id);
    },
    isStyleUpToDate(style) {
      // Find style
      const foundStyle = this.styles.find((s) => s._id === style._id);

      // If style is not found, return false
      if (!foundStyle) {
        return false;
      }

      // If style is up to date, return true
      if (foundStyle.updatedAt === style.updatedAt) {
        return true;
      }

      // If style is not up to date, return false
      return false;
    },
    changeLanguage(lang) {
      this.lang = lang;
      // Save lang to chrome storage
      chrome.storage.sync.set({ lang: this.lang });
    },
    initLanguage() {
      return new Promise((resolve) => {
        chrome.storage.sync.get("lang", (result) => {
          if (result.lang) {
            this.lang = result.lang;
          } else {
            this.lang = "en";
          }
          resolve(this.lang);
        });
      });
    },
  },
});
