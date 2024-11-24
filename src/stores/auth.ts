
import type { LoginPayload,RegisterPayload } from "@/types/auth";

import { defineStore, getActivePinia } from "pinia";
import { useLoginApi, useRegisterApi } from "~/apis/auth";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    
  }),
  getters: {},
  actions: {
    /**
     * @param payload LoginPayload
     * @returns Promise<LoginPayload>
     * @description Login function
     * @author PSK
     * @created 2024-11-24
     * @updated ****-**-**
     */
    async login(payload: LoginPayload) {
      console.log("store login", payload);
      return await useLoginApi(payload);
    },

    /**
     * @param payload RegisterPayload
     * @returns Promise<RegisterPayload>
     * @description Register function
     * @author PSK
     * @created 2024-11-24
     * @updated ****-**-**
     */
    async register(payload: RegisterPayload) {
      console.log("store register", payload);
      return await useRegisterApi(payload);
    },
  },
});
