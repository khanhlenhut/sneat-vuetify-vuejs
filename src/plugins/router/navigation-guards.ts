import { useAuthStore } from "@/stores/auth.module";
import type { Router } from "vue-router";

export function setupNavigationGuards(router: Router) {
  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      const authStore = useAuthStore();
      const isAuthenticated = authStore.isLoggedIn;
      if (!isAuthenticated) {
        // Check if the user has a valid access token in the store
        const accessToken = authStore.getUser?.accessToken;
        if (accessToken) {
          // If there is an access token, consider the user as authenticated
          next();
        } else {
          next({ path: "/login" });
        }
      } else {
        const userRole = "admin"; // Thay đổi điều kiện này theo logic của bạn
        if (to.meta.role && to.meta.role !== userRole) {
          next({ path: "/unauthorized" }); // Điều hướng đến trang không có quyền truy cập
        } else {
          next();
        }
      }
    } else {
      next();
    }
  });
}
