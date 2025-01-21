import { useAuthStore } from "@/stores/auth.module";
import { useLoaderStore } from "@/stores/loader.module";
import axios from "axios";

// Tạo instance của axios
const instance = axios.create({
  baseURL: "https://dummyjson.com/",
});

// Utility functions for loader
const showLoader = () => useLoaderStore().showLoading();
const hideLoader = () => useLoaderStore().hideLoading();

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    showLoader();

    const authStore = useAuthStore();
    const accessToken = authStore.getUser?.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    hideLoader();
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    hideLoader();
    return response;
  },
  async (error) => {
    hideLoader();
    const authStore = useAuthStore();
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = authStore.getUser?.refreshToken;

        if (refreshToken) {
          // Yêu cầu làm mới token
          const response = await instance.post("auth/refresh", {
            refreshToken: refreshToken,
            expiresInMins: 30,
          });

          // Cập nhật token mới vào store
          authStore.updateTokens(
            response.data.accessToken,
            response.data.refreshToken
          );

          console.log("Token refreshed successfully");

          // Cập nhật token vào request ban đầu
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

          // Thực hiện lại request ban đầu
          return instance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Thực hiện đăng xuất người dùng khi không thể làm mới token
        authStore.logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
