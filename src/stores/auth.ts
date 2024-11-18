
import type { LoginPayload } from "@/types/auth";

import { defineStore, getActivePinia } from "pinia";
import { useAuthApi } from "~/apis/auth";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    
  }),
  getters: {},
  actions: {
    async login(payload: LoginPayload) {
      return await useAuthApi(payload);
    },
  },
});
