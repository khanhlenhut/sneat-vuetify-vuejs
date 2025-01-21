import { AuthResponse, LoginCredentials } from "@/interfaces/auth.interface";
import AuthService from "@/services/auth.service";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loggedIn: false,
    user: null as AuthResponse | null,
  }),
  actions: {
    async login(credentials: LoginCredentials) {
      try {
        const response = await AuthService.login(credentials);
        this.user = response;
        this.loggedIn = true;

        // Lưu trữ thông tin đăng nhập vào localStorage
        localStorage.setItem("user", JSON.stringify(response));
        localStorage.setItem("loggedIn", "true");

        return true;
      } catch (error) {
        return false;
      }
    },
    updateTokens(accessToken: string, refreshToken: string) {
      if (this.user) {
        this.user.accessToken = accessToken;
        this.user.refreshToken = refreshToken;

        // Cập nhật token trong localStorage
        localStorage.setItem("user", JSON.stringify(this.user));
      }
    },
    logout() {
      this.loggedIn = false;
      this.user = null;

      // Xóa thông tin đăng nhập khỏi localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("loggedIn");
    },
    restoreAuthState() {
      const user = localStorage.getItem("user");
      const loggedIn = localStorage.getItem("loggedIn");

      if (user && loggedIn === "true") {
        this.user = JSON.parse(user);
        this.loggedIn = true;
      }
    },
    saveAuthState() {
      if (this.user && this.loggedIn) {
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("loggedIn", "true");
      }
    },
  },
  getters: {
    isLoggedIn(): boolean {
      return this.loggedIn;
    },
    getUser(): AuthResponse | null {
      return this.user;
    },
  },
});

// Khôi phục trạng thái đăng nhập khi ứng dụng được tải lại
onBeforeMount(() => {
  const authStore = useAuthStore();
  authStore.restoreAuthState();
});
