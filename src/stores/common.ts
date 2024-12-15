import { useGetUnit } from "@/apis/common";

export const useCommonStore = defineStore("common", {
  state: () => ({}),
  getters: {},
  actions: {
    /**
     * @description Get product categories
     * @returns Promise<ProductCategory[]>
     * @author LK
     * @created 2024-12-08
     * @updated ****-**-**
     */
    async getUnit(type: number) {
      return await useGetUnit(type);
    }
  },
});
