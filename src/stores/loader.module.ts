import { defineStore } from "pinia";

export const useLoaderStore = defineStore("loading", {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    showLoading() {
      this.isLoading = true;
      console.log("Show loading: ", this.isLoading);
    },
    hideLoading() {
      this.isLoading = false;
      console.log("Show loading: ", this.isLoading);
    },
  },
  getters: {
    getLoading: (state) => state.isLoading,
  },
});
