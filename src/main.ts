import { createApp } from "vue";

import App from "@/App.vue";
import { registerPlugins } from "@core/utils/plugins";

import { useAuthStore } from "@/stores/auth.module";

// Styles
import "@core/scss/template/index.scss";
import "@layouts/styles/index.scss";
import "@styles/styles.scss";

// Create vue app
const app = createApp(App);

// Register plugins
registerPlugins(app);

// Đảm bảo rằng trạng thái đăng nhập không bị mất khi trang được tải lại.
const authStore = useAuthStore();
authStore.restoreAuthState();

// Mount vue app
app.mount("#app");
