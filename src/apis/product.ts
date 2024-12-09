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