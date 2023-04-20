import { UnAuthorized } from "@domain/errors/UnAuthorized";

import axios, { type AxiosInstance } from "axios";
import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

const { VITE_SERVER_URL } = import.meta.env;
interface UseCustomClientReturns {
  api: AxiosInstance;
  authApi: AxiosInstance;
}

export const useApi = (): UseCustomClientReturns => {
  const { accessToken } = useAuthStore();

  const api = axios.create({
    baseURL: VITE_SERVER_URL,
  });
  const authApi = axios.create({
    baseURL: VITE_SERVER_URL,
  });

  authApi.interceptors.request.use((config) => {
    if (accessToken != null) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }
    throw new UnAuthorized();
  });

  return {
    api,
    authApi,
  };
};
