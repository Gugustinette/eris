// Pinia Store
import { defineStore } from "pinia";

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
            resolve(this.styles);
          });
      });
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
      return new Promise((resolve) => {
        fetch(API_URL + "/style/download/" + style._id, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + this.bearerToken,
          },
        })
          .then((res) => res.json())
          .then((data) => {
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
