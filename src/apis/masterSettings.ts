import { type Ref } from "vue";
import { fetcher } from "~/apis/base-api";
type ReturnedRef<T> = Promise<Ref<T | null> | undefined>;


/**
 * @description Get tools
 * @returns Promise<Tools[]>
 * @author Phway
 * @created 2024-12-17
 * @updated 2024-12-17
 */
export const useUnits = async (): ReturnedRef<string> => {
  const { data, error } = await useAsyncData<string>(
    "getUnits",
    fetcher(`master-settings/unit`, {
      method: "GET",
    })
  );
  if (!error.value) {
    return Promise.resolve(data);
  } else {
    return Promise.reject(error.value?.message);
  }
};

/**
 * @description Get today gold price
 * @returns Promise<any[]>
 * @author Phway
 * @created 2024-12-19
 * @updated 2024-12-19
 */
export const useTodayGoldPrice = async (): ReturnedRef<string> => {
  const { data, error } = await useAsyncData<string>(
    "getTodayGoldPrice",
    fetcher(`master-settings/today-gold-price`, {
      method: "GET",
    })
  );
  if (!error.value) {
    return Promise.resolve(data);
  } else {
    return Promise.reject(error.value?.message);
  }
};


