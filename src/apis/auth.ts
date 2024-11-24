
import { fetcher } from "~/apis/base-api";
import type { LoginPayload, RegisterPayload } from "~/types/auth";

/**
 * @param payload LoginPayload
 * @returns data
 * @description Login function
 * @author PSK
 * @created 2024-11-24
 * @updated ****-**-**
 */
export const useLoginApi = async (payload: LoginPayload) => {
  console.log("api login", payload);
  const { data, error } = await useAsyncData(
    "login",
    fetcher("/login", { method: "POST", body: payload })
  );
  console.log(data);
  return data;
}

/**
 * @param payload RegisterPayload
 * @returns data
 * @description Register function
 * @author PSK
 * @created 2024-11-24
 * @updated ****-**-**
 */
export const useRegisterApi = async (payload: RegisterPayload) => {
  console.log("api register", payload);
  const { data, error } = await useAsyncData(
    "register",
    fetcher("/register", { method: "POST", body: payload })
  );
  return data;
}
