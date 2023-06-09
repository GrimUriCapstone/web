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
  const { accessToken, firebaseUser, updateAccessToken } = useAuthStore();

  const api = axios.create({
    baseURL: VITE_SERVER_URL,
  });
  const authApi = axios.create({
    baseURL: VITE_SERVER_URL,
  });

  authApi.interceptors.request.use(async (config) => {
    if (accessToken != null) {
      try {
        const newAccessToken = await firebaseUser?.getIdToken();
        updateAccessToken(newAccessToken!);
        config.headers.Authorization = `Bearer ${newAccessToken!}`;
        return config;
      } catch {
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      }
    }
    throw new UnAuthorized();
  });
  return {
    api,
    authApi,
  };
};
