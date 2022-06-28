// Pinia Store
import { defineStore } from "pinia";
import { useStore } from "./index";

const API_URL = "http://localhost:9050";

export const useOnline = defineStore("online-store", {
  state: () => ({
    styles: [],
    showLogin: false,
    bearerToken: undefined,
    user: undefined,
  }),
  actions: {
    // Load user from chrome extension storage
    loadUser() {
      // Get bearerToken from Chrome extension storage
      chrome.storage.sync.get("bearerToken", (resToken) => {
        if (resToken.bearerToken) {
          // Get user
          chrome.storage.sync.get("user", (resUser) => {
            if (resUser.user) {
              this.bearerToken = resToken.bearerToken;
              this.user = resUser.user;
            } else {
              this.user = undefined;
            }
          });
        } else {
          this.bearerToken = undefined;
        }
      });
    },
    // Get css from chrome extension storage
    getStyles() {
      return new Promise((resolve) => {
        fetch(API_URL + "/style/get")
          .then((res) => res.json())
          .then((data) => {
            this.styles = data;
            this.updateStyleState();
            resolve(this.styles);
          });
      });
    },
    // Update style states
    updateStyleState() {
      const baseStore = useStore();
      this.styles.forEach((style) => {
        if (
          baseStore.isStyleInstalled(style) &&
          baseStore.isStyleUpToDate(style)
        ) {
          style.state = "up-to-date";
        } else if (
          baseStore.isStyleInstalled(style) &&
          !baseStore.isStyleUpToDate(style)
        ) {
          style.state = "late-to-date";
        } else {
          style.state = "none";
        }
      });
    },
    // Change state of specfiic style reactively
    changeStyleState(style, state) {
      // Find style in styles array
      const index = this.styles.findIndex((s) => s._id === style._id);
      // Update state
      this.styles[index].state = state;
    },
    // Login
    login(username, password) {
      return new Promise((resolve) => {
        fetch(API_URL + "/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            const bearerToken = data.access_token;
            const user = {
              _id: data._id,
              username: username,
            };
            this.bearerToken = bearerToken;
            this.user = user;
            chrome.storage.sync.set({
              bearerToken: bearerToken,
              user: user,
            });
            resolve(data);
          });
      });
    },
    // Logout
    logout() {
      return new Promise((resolve) => {
        this.bearerToken = undefined;
        this.user = undefined;
        chrome.storage.sync.remove("bearerToken");
        chrome.storage.sync.remove("user");
        resolve();
      });
    },
    downloadStyle(style) {
      // Change style state in styles
      this.changeStyleState(style, "downloading");
      return new Promise((resolve) => {
        fetch(API_URL + "/style/download/" + style._id, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + this.bearerToken,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            this.changeStyleState(style, "up-to-date");
            resolve(data);
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
