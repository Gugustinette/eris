// Pinia Store
import { defineStore } from "pinia";

export const useOnline = defineStore("online-store", {
  state: () => ({
    styles: [],
  }),
  actions: {
    // Get css from chrome extension storage
    getStyles() {
      return new Promise((resolve) => {
        fetch("http://localhost:9050/style/")
          .then((res) => res.json())
          .then((data) => {
            this.styles = data;
            resolve(this.styles);
          });
      });
    },
    addStyle(style) {
      console.log(style);
    },
    editStyle(style) {
      console.log(style);
    },
    deleteStyle(style) {
      console.log(style);
    },
  },
});
