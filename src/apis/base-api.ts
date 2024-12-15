import type { NitroFetchOptions } from "nitropack";
import type { FetchContext, FetchError } from "ofetch";
import { StatusCodes } from "~/utils/status-codes";


export const fetcher = <ResT>(
  path: string,
  fetchOptions: NitroFetchOptions<string> = {},
  allowedStatus: number[] = []
) => {
  const onRequest = () => {};
  const onRequestError = () => {};
  const onResponse = () => {};
  const token = useCookie("token");
  token.value =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Imxpbm5rb2tvMTEzMEBnbWFpbC5jb20iLCJpYXQiOjE3MzQxNDY3MTAsImV4cCI6MTczNjczODcxMH0.HSubGZRWL4560HLfpL49g37PVR7B7i1AS4hA2ewyCqo";
  const onResponseError = async ({ response }: FetchContext) => {
    if (!response) {
      return;
    }
    const { status } = response;
    if (status === StatusCodes.UNAUTHORIZED) {
      token.value = null;
      let alertMessage = `Error: (${response.status})`;
      if (response._data?.message) {
        alertMessage += `\n${response._data.message}`;
      }
      //alert(alertMessage);
    } else if (
      (status >= 500 || status == 404) &&
      !allowedStatus.includes(status)
    ) {
      const statusMessage = status + " " + response._data.error;
      throw showError({ statusCode: status, statusMessage });
    }
  };
  const defaultOptions: NitroFetchOptions<string> = {
    baseURL: "/api/",
    headers: {
      authorization:
        "Bearer " +
        (token.value),
    },
    retry: 0,
    credentials: "include",
    onRequest,
    onRequestError,
    onResponse,
    onResponseError,
  };
  return async () => {
    try {
      return await $fetch<ResT>(path, { ...defaultOptions, ...fetchOptions });
    } catch (error) {
      const message = (error as FetchError).response?._data?.message;
      throw new Error(message);
    }
  };
};
// Create a modified fetcher function without the Authorization header
export const fetcherWithoutAuthHeader = <ResT>(
  path: string,
  fetchOptions: NitroFetchOptions<string> = {},
  allowedStatus: number[] = []
) => {
  const onRequest = () => {};
  const onRequestError = () => {};
  const onResponse = () => {};
  const token = useCookie("token");
  const onResponseError = async ({ response }: FetchContext) => {
    if (!response) {
      return;
    }
    const { status } = response;
    if (status === StatusCodes.UNAUTHORIZED) {
      token.value = null;
      let alertMessage = `Error: (${response.status})`;
      if (response._data?.message) {
        alertMessage += `\n${response._data.message}`;
      }
      alert(alertMessage);
    } else if (
      status >= 400 &&
      status < 500 &&
      !allowedStatus.includes(status)
    ) {
      let alertMessage = `Error: (${response.status})`;
      if (response._data?.message) {
        alertMessage += `\n${response._data.message}`;
      }
      //alert(alertMessage);
    } else if (status >= 500 && !allowedStatus.includes(status)) {
      const statusMessage = status + " " + response._data.error;
      throw showError({ statusCode: status, statusMessage });
    }
  };
  const defaultOptions: NitroFetchOptions<string> = {
    baseURL: "/api/",
    retry: 0,
    credentials: "include",
    onRequest,
    onRequestError,
    onResponse,
    onResponseError,
  };
  return async () => {
    try {
      return await $fetch<ResT>(path, { ...defaultOptions, ...fetchOptions });
    } catch (error) {
      const message = (error as FetchError).response?._data?.message;
      throw new Error(message);
    }
  };
};

// fetcher with 404 error handling
export const fetcherWith404ErrorHandling = <ResT>(
  path: string,
  fetchOptions: NitroFetchOptions<string> = {},
  allowedStatus: number[] = []
) => {
  const onRequest = () => {};
  const onRequestError = () => {};
  const onResponse = () => {};
  const token = useCookie("token");
  const onResponseError = async ({ response }: FetchContext) => {
    if (!response) {
      return;
    }
    const { status } = response;
    if (status === StatusCodes.UNAUTHORIZED) {
      token.value = null;
      let alertMessage = `Error: (${response.status})`;
      if (response._data?.message) {
        alertMessage += `\n${response._data.message}`;
      }
      //alert(alertMessage);
    } else if (status >= 500 && !allowedStatus.includes(status)) {
      const statusMessage = status + " " + response._data.error;
      throw showError({ statusCode: status, statusMessage });
    }
  };
  const defaultOptions: NitroFetchOptions<string> = {
    baseURL: "/api/",
    headers: {
      authorization:
        "Bearer " +
        (token.value),
    },
    retry: 0,
    credentials: "include",
    onRequest,
    onRequestError,
    onResponse,
    onResponseError,
  };
  return async () => {
    try {
      return await $fetch<ResT>(path, { ...defaultOptions, ...fetchOptions });
    } catch (error) {
      const message = (error as FetchError).response?._data?.message;
      throw new Error(message);
    }
  };
};

export const fetcherDownload = <ResT>(
  path: string,
  fetchOptions: NitroFetchOptions<string> = {},
  allowedStatus: number[] = []
) => {
  const onRequest = () => {};
  const onRequestError = () => {};
  const onResponse = () => {};
  const token = useCookie("token");
  const onResponseError = async ({ response }: FetchContext) => {
    if (!response) {
      return;
    }
    const { status } = response;
    if (status === StatusCodes.UNAUTHORIZED) {
      token.value = null;
      let alertMessage = `Error: (${response.status})`;
      if (response._data?.message) {
        alertMessage += `\n${response._data.message}`;
      }
      //alert(alertMessage);
    } else if (
      (status >= 500 || status == 404) &&
      !allowedStatus.includes(status)
    ) {
      const statusMessage = status + " " + response._data.error;
      throw showError({ statusCode: status, statusMessage });
    }
  };
  const defaultOptions: NitroFetchOptions<string> = {
    baseURL: "/api/",
    headers: {
      authorization:
        "Bearer " +
        (token.value),
    },
    retry: 0,
    credentials: "include",
    onRequest,
    onRequestError,
    onResponse,
    onResponseError,
  };
  return async () => {
    try {
      return await $fetch<ResT>(path, { ...defaultOptions, ...fetchOptions });
    } catch (error) {
      const message = (error as FetchError).response?._data?.message;
      throw new Error(message);
    }
  };
};
