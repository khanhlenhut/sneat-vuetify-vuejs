import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { setupNavigationGuards } from "./navigation-guards";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Setup navigation guards
setupNavigationGuards(router);

export default function (app: App) {
  app.use(router);
}

export { router };
