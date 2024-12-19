import {
    useUnits,
    useTodayGoldPrice,
   } from "@/apis/masterSettings";
 
   /**
    * @description Gold Method Store
    * @returns void
    * @author Phway
    * @created 2024-12-19
    * @updated 2024-12-19
    */
   export const useMasterSettingsStore = defineStore("masterSettings", {
     state: () => ({}),
     getters: {},
     actions: {
       async getUnits() {
         return await useUnits();
     },
     async getTodayGoldPrice() {
      return await useTodayGoldPrice();
    },
   },
 });
 