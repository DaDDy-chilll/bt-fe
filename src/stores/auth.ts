import type { LoginPayload, RegisterPayload,ForgotPasswordPayload,OtpPayload,ResetPasswordPayload } from "@/types/auth";

import { defineStore, getActivePinia } from "pinia";
import { useLoginApi, useRegisterApi, useForgotApi, useOtpApi,useResetApi } from "~/apis/auth";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    email : localStorage.getItem("email") || "" as string,
    token:  localStorage.getItem("token") || "" as string,
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
      return await useRegisterApi(payload);
    },

    /**
     * @param payload Forgot Password
     * @returns Promise<LoginPayload>
     * @description Register function
     * @author PSK
     * @created 2024-11-25
     * @updated ****-**-**
     */
    async forgot(payload: ForgotPasswordPayload) {
      console.log("store forgot password", payload);
      return await useForgotApi(payload);
    },

      /**
     * @param payload Forgot Password
     * @returns Promise<LoginPayload>
     * @description Register function
     * @author PSK
     * @created 2024-11-25
     * @updated ****-**-**
     */
      async otp(payload: OtpPayload) {
        console.log("store otp", payload);
        return await useOtpApi(payload);
      },


            /**
     * @param payload Reset Password
     * @returns Promise<LoginPayload>
     * @description Register function
     * @author PSK
     * @created 2024-11-25
     * @updated ****-**-**
     */
            async resetPassword(payload: ResetPasswordPayload,token:string) {
              console.log("store otp", payload);
              return await useResetApi(payload,token);
            },


      /**
     * @param email string
     * @description set email function
     * @author PSK
     * @created 2024-12-19
     * @updated ****-**-**
     */
      setEmail(email: string){
        this.email = email;
        localStorage.setItem("email", email);
      },



      /**
     * @param token string
     * @description set token function
     * @author PSK
     * @created 2024-12-19
     * @updated ****-**-**
     */
      setToken(token: string){
        this.token = token;
        localStorage.setItem("token", token);
      }
  },
});
