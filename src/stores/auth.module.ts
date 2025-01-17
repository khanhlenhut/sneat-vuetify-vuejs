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
        this.loggedIn = true;
        this.user = response;

        return true;
      } catch (error) {
        return false;
      }
    },
    updateTokens(accessToken: string, refreshToken: string) {
      if (this.user) {
        this.user.accessToken = accessToken;
        this.user.refreshToken = refreshToken;
      }
    },
    logout() {
      this.loggedIn = false;
      this.user = null;
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
