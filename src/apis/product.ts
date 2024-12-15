import { type Ref } from "vue";
import { fetcher, fetcherDownload } from "~/apis/base-api";
import type { Filter } from "~/types/product";
type ReturnedRef<T> = Promise<Ref<T | null> | undefined>;

/**
 * @description Get product categories
 * @returns Promise<ProductCategory[]>
 * @author LK
 * @created 2024-12-08
 * @updated ****-**-**
 */
export const useGetProductCategories = async (
  filter: Filter
): ReturnedRef<string> => {
  const { data, error } = await useAsyncData<string>(
    "getProductCategories",
    fetcher(`product-categories`, {
      method: "GET",
      params: filter,
    })
  );
  if (!error.value) {
    return Promise.resolve(data);
  } else {
    return Promise.reject(error.value?.message);
  }
};

/**
 * @description Get product types
 * @returns Promise<ProductType[]>
 * @author LK
 * @created 2024-12-08
 * @updated ****-**-**
 */
export const useGetProductTypes = async (
  filter: Filter
): ReturnedRef<string> => {
  const { data, error } = await useAsyncData<string>(
    "getProductTypes",
    fetcher(`product-types`, { 
      method: "GET", 
      params: filter
    })
  );
  if (!error.value) {
    return Promise.resolve(data);
  } else {
    return Promise.reject(error.value?.message);
  }
};

/**
 * @description Get gold types
 * @returns Promise<GoldType[]>
 * @author LK
 * @created 2024-12-08
 * @updated ****-**-**
 */
export const useGetGoldTypes = async (): ReturnedRef<string> => {
  const { data, error } = await useAsyncData<string>(
    "getGoldTypes",
    fetcher(`gold-types`, { method: "GET" })
  );
  if (!error.value) {
    return Promise.resolve(data);
  } else {
    return Promise.reject(error.value?.message);
  }
};

/**
 * @description Get gold colors
 * @returns Promise<GoldColor[]>
 * @author LK
 * @created 2024-12-08
 * @updated ****-**-**
 */
export const useGetGoldColors = async (): ReturnedRef<string> => {
  const { data, error } = await useAsyncData<string>(
    "getGoldColors",
    fetcher(`colors`, { method: "GET" })
  );
  if (!error.value) {
    return Promise.resolve(data);
  } else {
    return Promise.reject(error.value?.message);
  }
};

/**
 * @description Get gem types
 * @returns Promise<GemType[]>
 * @author LK
 * @created 2024-12-08
 * @updated ****-**-**
 */
export const useGetGemTypes = async (): ReturnedRef<string> => {
  const { data, error } = await useAsyncData<string>(
    "getGemTypes",
    fetcher(`gem-types`, { method: "GET" })
  );
  if (!error.value) {
    return Promise.resolve(data);
  } else {
    return Promise.reject(error.value?.message);
  }
};
