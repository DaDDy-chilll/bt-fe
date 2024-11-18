
import { fetcher } from "~/apis/base-api";
import type { LoginPayload } from "~/types/auth";

export const useAuthApi = async (payload: LoginPayload) => {
  const { data, error } = await useAsyncData(
    "login",
    fetcher("/login", { method: "POST", body: payload })
  );
  console.log(data);
  return data;
}