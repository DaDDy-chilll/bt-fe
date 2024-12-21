import { type Ref } from "vue";
import { fetcher } from "~/apis/base-api";
type ReturnedRef<T> = Promise<Ref<T | null> | undefined>;

/****** Fetch Data Functions ******/
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

/**
 * @description Get gold types
 * @returns Promise<any[]>
 * @author Phway
 * @created 2024-12-19
 * @updated 2024-12-19
 */
export const useGoldTypes = async (): ReturnedRef<string> => {
  const { data, error } = await useAsyncData<string>(
    "getGoldTypes",
    fetcher(`master-settings/gold-type`, {
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
 * @description Get gem types
 * @returns Promise<any[]>
 * @author Phway
 * @created 2024-12-20
 * @updated 2024-12-20
 */
export const useGemTypes = async (): ReturnedRef<string> => {
  const { data, error } = await useAsyncData<string>(
    "getGemTypes",
    fetcher(`master-settings/gem-type`, {
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
 * @description Get gem colors
 * @returns Promise<any[]>
 * @author Phway
 * @created 2024-12-20
 * @updated 2024-12-20
 */
export const useGemColors = async (): ReturnedRef<string> => {
  const { data, error } = await useAsyncData<string>(
    "getGemColors",
    fetcher(`master-settings/colors`, {
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
 * @description Get gem icons
 * @returns Promise<any[]>
 * @author Phway
 * @created 2024-12-20
 * @updated 2024-12-20
 */
export const useGemIcons = async (): ReturnedRef<string> => {
  const { data, error } = await useAsyncData<string>(
    "getGemIcons",
    fetcher(`master-settings/gem-icon`, {
      method: "GET",
    })
  );
  if (!error.value) {
    return Promise.resolve(data);
  } else {
    return Promise.reject(error.value?.message);
  }
};

/****** Fetch Data Functions End ******/

/**** Post Data Functions ******/

/**
 * @description Save unit
 * @returns Promise<any[]>
 * @author Phway
 * @created 2024-12-21
 * @updated 2024-12-21
 */
export const useSaveUnit = async (requestData: any): ReturnedRef<string> => {
  const { data: responseData, error } = await useAsyncData<string>(
    "saveUnit", fetcher(`master-settings/unit`, {
      method: "POST",
      body: requestData,
    })
  );

  if (error.value) {
    const errorMessage = error.value.message || "Failed to save the unit type.";
    console.error(`Error in useSaveUnit: ${errorMessage}`);
    return Promise.reject(new Error(errorMessage));
  }
  return responseData;
};

/**** Post Data Functions End ******/

/**** Put Data Functions ******/

/**
 * @description Update unit type
 * @returns Promise<string>
 * @author Phway
 * @created 2024-12-21
 * @updated 2024-12-21
 */
export const useUpdateUnit = async (requestData: any): Promise<string> => {
  const { id, ...bodyData } = requestData;

  try {
    const responseData = await fetcher<string>(`master-settings/unit/${id}`, {
      method: "PUT",
      body: JSON.stringify(bodyData),
    })();

    return responseData;
  } catch (error: any) {
    console.log(error, "Error in api");
    // const errorMessage =
    //   error?.response?._data?.message ||
    //   error?.message ||
    //   "An unexpected error occurred.";
    throw new Error(error);
  }
};

/**** Put Data Functions End ******/

/**** Delete Data Functions ******/

/**
 * @description Delete unit type
 * @returns Promise<string>
 * @author Phway
 * @created 2024-12-21
 * @updated 2024-12-21
 */
export const useDeleteUnit = async (id: number): Promise<string> => {
  const { data, error } = await useAsyncData<string>(
    "deleteUnit",
    fetcher(`master-settings/unit/${id}`, {
      method: "DELETE",
    })
  );
  if (error.value) {
    const errorMessage = error.value.message || "Failed to delete the unit type.";
    console.error(`Error in useDeleteUnit: ${errorMessage}`);
    return Promise.reject(new Error(errorMessage));
  }
  return data.value || "";
};
