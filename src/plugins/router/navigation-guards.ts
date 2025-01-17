import { useAuthStore } from "@/stores/auth.module";
import type { Router } from "vue-router";

export function setupNavigationGuards(router: Router) {
  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      const authStore = useAuthStore();
      const isAuthenticated = authStore.isLoggedIn;
      const userRole = "admin"; // Thay đổi điều kiện này theo logic của bạn

      if (!isAuthenticated) {
        next({ path: "/login" });
      } else if (to.meta.role && to.meta.role !== userRole) {
        next({ path: "/unauthorized" }); // Điều hướng đến trang không có quyền truy cập
      } else {
        next();
      }
    } else {
      next();
    }
  });
}
