import { createRouter, createWebHashHistory } from "vue-router";

// Views
import HomeView from "../views/HomeView.vue";
import StoreView from "../views/StoreView.vue";
import EditorView from "../views/EditorView.vue";
import StyleEditorView from "../views/StyleEditorView.vue";
import SettingsView from "../views/SettingsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/store",
    name: "store",
    component: StoreView,
  },
  {
    path: "/editor",
    name: "editor",
    component: EditorView,
    children: [
      {
        path: "/editor/:styleId",
        name: "style-editor",
        component: StyleEditorView,
      },
    ],
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
