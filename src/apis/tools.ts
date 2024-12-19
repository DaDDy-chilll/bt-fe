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
export const useGetTools = async (): ReturnedRef<string> => {
  const { data, error } = await useAsyncData<string>(
    "getTools",
    fetcher(`tools`, {
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
 * @description Save tools
 * @param data Tool data to be updated
 * @returns Promise with updated tool data
 * @author Phway
 * @created 2024-12-18
 * @updated 2024-12-19
 */
export const useSaveTools = async (data: any): ReturnedRef<string> => {
  if (!data.id) {
    return Promise.reject(new Error('Tool ID is required'));
  }

  const { data: responseData, error } = await useAsyncData<string>(
    `saveTools-${data.id}`, // unique key per request
    fetcher<string>(`tools/${data.id}`, {
      method: "PUT",
      body: data,
    })
  );

  if (error.value) {
    return Promise.reject(error.value);
  }
  
  return Promise.resolve(responseData);
};
