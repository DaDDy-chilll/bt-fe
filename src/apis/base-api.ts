

import type { NitroFetchOptions } from "nitropack";
import type { FetchContext, FetchError } from "ofetch";
import { StatusCodes } from "~/utils/status-codes";

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;

export const fetcher = <ResT>(
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
    baseURL: apiBaseUrl + "/api",
    headers: {
      authorization:
        "Bearer " +
        (token.value ??
          "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlYXJseWNyb3NzQHRlc3QuY29tIiwiaWF0IjoxNzAwNzg5MjUzLCJleHAiOjE3MDEzOTQwNTN9.tiKGsHkJy6WCAcI9AdESpsrGv2Cv3n2p-Rgsq-mWrTTS9gZ-7HQIq08swCntRpAx6hXNjDjr5xxR1t54T8-Adg"),
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
    baseURL: apiBaseUrl + "/api",
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
    baseURL: apiBaseUrl + "/api",
    headers: {
      authorization:
        "Bearer " +
        (token.value ??
          "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlYXJseWNyb3NzQHRlc3QuY29tIiwiaWF0IjoxNzAwNzg5MjUzLCJleHAiOjE3MDEzOTQwNTN9.tiKGsHkJy6WCAcI9AdESpsrGv2Cv3n2p-Rgsq-mWrTTS9gZ-7HQIq08swCntRpAx6hXNjDjr5xxR1t54T8-Adg"),
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
    baseURL: apiBaseUrl + "/api",
    headers: {
      authorization:
        "Bearer " +
        (token.value ??
          "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlYXJseWNyb3NzQHRlc3QuY29tIiwiaWF0IjoxNzAwNzg5MjUzLCJleHAiOjE3MDEzOTQwNTN9.tiKGsHkJy6WCAcI9AdESpsrGv2Cv3n2p-Rgsq-mWrTTS9gZ-7HQIq08swCntRpAx6hXNjDjr5xxR1t54T8-Adg"),
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
