import { useGetProductCategories } from "@/apis/product";
import type { Filter } from "@/types/product";

export const useProductStore = defineStore("product", {
  state: () => ({}),
  getters: {},
  actions: {
    async getProductCategories() {
      const filter = {
        page: 1,
        limit: 1000,
      };
      return await useGetProductCategories(filter);
    },
  },
});