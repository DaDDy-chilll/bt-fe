import { type Ref } from "vue";
import { fetcher } from "~/apis/base-api";
type ReturnedRef<T> = Promise<Ref<T | null> | undefined>;

/**
 * @description Get unit
 * @returns Promise<Unit[]>
 * @author LK
 * @created 2024-12-08
 * @updated ****-**-**
 */
export const useGetUnit = async (
  type: number
): ReturnedRef<string> => {
  const { data, error } = await useAsyncData<string>(
    "master-settings/unit",
    fetcher(`master-settings/unit`, {
      method: "GET",
      params: {
        type,
      },
    })
  );
  if (!error.value) {
    return Promise.resolve(data);
  } else {
    return Promise.reject(error.value?.message);
  }
};

