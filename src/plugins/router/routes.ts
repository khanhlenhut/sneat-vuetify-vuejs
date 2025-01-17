export const routes = [
  { path: "/", redirect: "/dashboard" },
  {
    path: "/",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        path: "dashboard",
        component: () => import("@/pages/dashboard.vue"),
        meta: { requiresAuth: true, role: "admin" },
      },
      {
        path: "account-settings",
        component: () => import("@/pages/account-settings.vue"),
        meta: { requiresAuth: true, role: "admin" },
      },
      {
        path: "typography",
        component: () => import("@/pages/typography.vue"),
        meta: { requiresAuth: true, role: "admin" },
      },
      {
        path: "icons",
        component: () => import("@/pages/icons.vue"),
        meta: { requiresAuth: true, role: "admin" },
      },
      {
        path: "cards",
        component: () => import("@/pages/cards.vue"),
        meta: { requiresAuth: true, role: "admin" },
      },
      {
        path: "tables",
        component: () => import("@/pages/tables.vue"),
        meta: { requiresAuth: true, role: "admin" },
      },
      {
        path: "form-layouts",
        component: () => import("@/pages/form-layouts.vue"),
        meta: { requiresAuth: true, role: "admin" },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/blank.vue"),
    children: [
      {
        path: "login",
        component: () => import("@/pages/login.vue"),
      },
      {
        path: "register",
        component: () => import("@/pages/register.vue"),
      },
      {
        path: "unauthorized",
        component: () => import("@/pages/unauthorized.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        component: () => import("@/pages/[...error].vue"),
      },
    ],
  },
];
