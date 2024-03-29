// Pinia Store
import { defineStore } from "pinia";
import { useStore } from "./index";

const API_URL = process.env.VUE_APP_ERIS_API_URL;

export const useOnline = defineStore("online-store", {
  state: () => ({
    styles: [],
    showLogin: false,
    showSignUp: false,
    bearerToken: undefined,
    user: undefined,
  }),
  actions: {
    // Load user from chrome extension storage
    loadUser() {
      return new Promise((resolve) => {
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
              resolve();
            });
          } else {
            this.bearerToken = undefined;
            resolve();
          }
        });
      });
    },
    // Get styles from server
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
    // Change state of specific style reactively
    changeStyleState(style, state) {
      // Find style in styles array
      const index = this.styles.findIndex((s) => s._id === style._id);
      // Update state
      this.styles[index].state = state;
    },
    // Login
    login(username, password) {
      return new Promise((resolve, reject) => {
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
            if (data._id) {
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
            } else {
              reject(data);
            }
          });
      });
    },
    // Sign Up
    signup(username, password) {
      return new Promise((resolve) => {
        fetch(API_URL + "/auth/signup", {
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
    // Delete account
    deleteAccount() {
      return new Promise(() => {
        fetch(API_URL + "/user/delete/" + this.user._id, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + this.bearerToken,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data._id) {
              return this.logout();
            }
          });
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
    isConnected() {
      return this.bearerToken !== undefined;
    },
    // Add Style
    addStyle(style) {
      return new Promise((resolve) => {
        fetch(API_URL + "/style/create", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + this.bearerToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: style.name,
            domain: style.domain,
            description: "",
            css: style.css,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            resolve(data);
          });
      });
    },
    editStyle(style) {
      return new Promise((resolve) => {
        fetch(API_URL + "/style/edit/" + style._id, {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + this.bearerToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: style.name,
            domain: style.domain,
            description: style.description,
            css: style.css,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            resolve(data);
          });
      });
    },
    editStyleImages(style, files) {
      let formData = new FormData();

      // Add files
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i], files[i].name);
      }

      // Add images
      if (style.images && style.images.length > 0) {
        let imagesID = "[";
        style.images.forEach((image) => {
          imagesID += '"' + image + '",';
        });
        // Remove last ,
        imagesID = imagesID.substring(0, imagesID.length - 1);
        imagesID += "]";
        // Add property
        formData.append("imagesID", imagesID);
      }

      return new Promise((resolve) => {
        fetch(API_URL + "/style/images/" + style._id, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + this.bearerToken,
            // Accept: "application/json",
          },
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            resolve(data);
          });
      });
    },
    deleteStyle(style) {
      return new Promise((resolve) => {
        fetch(API_URL + "/style/delete/" + style._id, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + this.bearerToken,
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            // Remove style from styles if it is in it
            const index = this.styles.findIndex((s) => s._id === style._id);
            if (index !== -1) {
              this.styles.splice(index, 1);
            }
            // If style is in base store, remove it
            const baseStore = useStore();
            if (baseStore.styles.find((s) => s._id === style._id)) {
              baseStore.deleteStyle(style);
            }
            resolve(data);
          });
      });
    },
    searchStyles(query) {
      return new Promise((resolve) => {
        fetch(API_URL + "/style/search?query=" + query, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + this.bearerToken,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            this.styles = data;
            this.updateStyleState();
            resolve(data);
          });
      });
    },
  },
});
