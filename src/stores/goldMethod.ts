import {
   useGetTools,
   useSaveTools,
  } from "@/apis/tools";

  /**
   * @description Gold Method Store
   * @returns void
   * @author Phway
   * @created 2024-12-18
   * @updated 2024-12-18
   */
  export const useGoldMethodStore = defineStore("goldMethod", {
    state: () => ({}),
    getters: {},
    actions: {
      async getGoldMethod() {
        return await useGetTools();
    },
    async saveGoldMethod(data: any) {
      return await useSaveTools(data);
    },
  },
});
