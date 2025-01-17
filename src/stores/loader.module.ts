import { defineStore } from "pinia";

export const useLoaderStore = defineStore("loading", {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    showLoading() {
      this.isLoading = true;
    },
    hideLoading() {
      this.isLoading = false;
    },
  },
  getters: {
    getLoading: (state) => state.isLoading,
  },
});
