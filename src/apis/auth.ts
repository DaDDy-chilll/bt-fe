import { fetcher } from "~/apis/base-api";
import type {
  LoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
  OtpPayload,
  ResetPasswordPayload,
} from "~/types/auth";
import type { Filter } from "~/types/product";
import type { FetchError } from "ofetch";
/**
 * @param payload LoginPayload
 * @returns data
 * @description Login function
 * @author PSK
 * @created 2024-11-24
 * @updated ****-**-**
 */
export const useLoginApi = async (payload: LoginPayload) => {
  const { data, error } = await useAsyncData(
    "login",
    fetcher("auth/login", { method: "POST", body: payload })
  );
  console.log("error from auth api----", error.value);
  if (error.value) throw error.value;
  if (data.value) return data;
};

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
    fetcher("auth/register", { method: "POST", body: payload })
  );
  // console.log("data from auth api-----",error.response?._data)
  if (error.value) throw error.value;
  if (data.value) return data;
};

/**
 * @param payload Login Payload
 * @returns data
 * @description Forgot passworld function
 * @author PSK
 * @created 2024-11-25
 * @updated ****-**-**
 */
export const useForgotApi = async (payload: ForgotPasswordPayload) => {
  console.log("api forgot password", payload);
  const { data, error } = await useAsyncData(
    "register",
    fetcher("auth/forgot-password", { method: "POST", body: payload })
  );
  if (error.value) throw error.value;
  if (data.value) return data;
};

/**
 * @param payload Login Payload
 * @returns data
 * @description Forgot passworld function
 * @author PSK
 * @created 2024-11-25
 * @updated ****-**-**
 */
export const useOtpApi = async (payload: OtpPayload) => {
  const { data, error } = await useAsyncData(
    "register",
    fetcher("auth/verify-otp", { method: "POST", body: payload })
  );
  if (error.value) throw error.value;
  if (data.value) return data;
};

/**
 * @param payload Reset Payload
 * @returns data
 * @description Forgot passworld function
 * @author PSK
 * @created 2024-11-25
 * @updated ****-**-**
 */
export const useResetApi = async (payload: ResetPasswordPayload,token:string) => {
  const { data, error } = await useAsyncData(
    "register",
    fetcher("auth/reset-password", { method: "POST", body: payload ,headers:{
      "Authorization": token,
    }})
  );
  if (error.value) throw error.value;
  if (data.value) return data;
};
