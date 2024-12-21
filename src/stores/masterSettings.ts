import {
    useUnits, // Fetch Data Functions
    useTodayGoldPrice,
    useGoldTypes,
    useGemTypes,
    useGemColors,
    useGemIcons, // Fetch Data Functions
    useSaveUnit, // Post Data Functions
    useUpdateUnit,
    useDeleteUnit, // Put Unit Data Function
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
      /**
     * @description Get units
     * @returns Promise<any[]>
     * @author Phway
     * @created 2024-12-21
     * @updated 2024-12-21
     */
       async getUnits() {
         return await useUnits();
     },
     /**
     * @description Get today gold price
     * @returns Promise<any[]>
     * @author Phway
     * @created 2024-12-21
     * @updated 2024-12-21
     */
     async getTodayGoldPrice() {
      return await useTodayGoldPrice();
    },
    /**
     * @description Get gold types
     * @returns Promise<any[]>
     * @author Phway
     * @created 2024-12-21
     * @updated 2024-12-21
     */
    async getGoldTypes() {
      return await useGoldTypes();
    },
    /**
     * @description Get gem types
     * @returns Promise<any[]>
     * @author Phway
     * @created 2024-12-21
     * @updated 2024-12-21
     */
    async getGemTypes() {
      return await useGemTypes();
    },
    /**
     * @description Get gem colors
     * @returns Promise<any[]>
     * @author Phway
     * @created 2024-12-21
     * @updated 2024-12-21
     */
    async getGemColors() {
      return await useGemColors();
    },
    /**
     * @description Get gem icons
     * @returns Promise<any[]>
     * @author Phway
     * @created 2024-12-21
     * @updated 2024-12-21
     */
    async getGemIcons() {
      return await useGemIcons();
    },
    /**
     * @description Save unit
     * @returns Promise<any[]>
     * @author Phway
     * @created 2024-12-21
     * @updated 2024-12-21
     */
    async saveUnit(requestData: any) {
      return await useSaveUnit(requestData);
    },
    /**
     * @description Update unit type
     * @returns Promise<any[]>
     * @author Phway
     * @created 2024-12-21
     * @updated 2024-12-21
     */
    async updateUnit(requestData: any) {
      return await useUpdateUnit(requestData);
    },
    /**
     * @description Delete unit type
     * @returns Promise<any[]>
     * @author Phway
     * @created 2024-12-21
     * @updated 2024-12-21
     */
    async deleteUnit(id: number) {
      return await useDeleteUnit(id);
    },
  },
});
