import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

/* eslint-disable no-new */
createApp(App).use(createPinia()).mount("#app");
