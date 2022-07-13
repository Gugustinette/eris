import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
// i18n
import i18n from "../i18n";

/* eslint-disable no-new */
createApp(App).use(router).use(createPinia()).use(i18n).mount("#app");
