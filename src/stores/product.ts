import {
  useGetProductCategories,
  useGetProductTypes,
  useGetGoldTypes,
  useGetGoldColors,
  useGetGemTypes,
} from "@/apis/product";
import type { Filter } from "@/types/product";

export const useProductStore = defineStore("product", {
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
    async getProductCategories() {
      const filter = {
        page: 1,
        limit: 1000,
      };
      return await useGetProductCategories(filter);
    },
    /**
     * @description Get product types
     * @returns Promise<ProductType[]>
     * @author LK
     * @created 2024-12-08
     * @updated ****-**-**
     */
    async getProductTypes() {
      const filter = {
        page: 1,
        limit: 1000,
      };
      return await useGetProductTypes(filter);
    },
    /**
     * @description Get gold types
     * @returns Promise<GoldType[]>
     * @author LK
     * @created 2024-12-08
     * @updated ****-**-**
     */
    async getGoldTypes() {
      return await useGetGoldTypes();
    },
    /**
     * @description Get gold colors
     * @returns Promise<GoldColor[]>
     * @author LK
     * @created 2024-12-08
     * @updated ****-**-**
     */
    async getGoldColors() {
      return await useGetGoldColors();
    },
    /**
     * @description Get gem types
     * @returns Promise<GemType[]>
     * @author LK
     * @created 2024-12-08
     * @updated ****-**-**
     */
    async getGemTypes() {
      return await useGetGemTypes();
    },
  },
});
