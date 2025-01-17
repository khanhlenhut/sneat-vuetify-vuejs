import { useAuthStore } from "@/stores/auth.module";
import { useLoaderStore } from "@/stores/loader.module";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://dummyjson.com/",
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const loadingStore = useLoaderStore();
    loadingStore.showLoading();

    const authStore = useAuthStore();
    const accessToken = authStore.getUser?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    const loadingStore = useLoaderStore();
    loadingStore.hideLoading();
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    const loadingStore = useLoaderStore();
    loadingStore.hideLoading();
    return response;
  },
  async (error) => {
    const originalRequest = await error.config;

    const authStore = useAuthStore();

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = authStore.getUser?.refreshToken;
        if (refreshToken) {
          const response = await instance.post("auth/refresh", {
            refreshToken: refreshToken,
            expiresInMins: 30,
          });

          authStore.updateTokens(
            response.data.accessToken,
            response.data.refreshToken
          );

          console.log("Làm mới token thành công");
          // Cập nhật token cho request ban đầu
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

          // Gửi lại request ban đầu
          return instance(originalRequest);
        }
      } catch (refreshError) {
        // Xử lý lỗi làm mới token (ví dụ: đăng xuất người dùng)
        console.error("Không thể làm mới token:", refreshError);

        authStore.logout();
        const loadingStore = useLoaderStore();
        loadingStore.hideLoading();
        return Promise.reject(refreshError);
      }

      const loadingStore = useLoaderStore();
      loadingStore.hideLoading();
      return Promise.reject(error);
    }
  }
);

export default instance;
