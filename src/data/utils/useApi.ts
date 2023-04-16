import { UnAuthorized } from "@domain/errors/UnAuthorized";
import { useFirebaseAuth } from "./useFirebaseAuth";
import axios, { type AxiosInstance } from "axios";
import { useEffect, useState } from "react";

const { VITE_SERVER_URL } = import.meta.env;
interface UseCustomClientReturns {
  api: AxiosInstance;
  authApi: AxiosInstance;
}

export const useApi = (): UseCustomClientReturns => {
  const { accessToken } = useFirebaseAuth();
  const api = axios.create({
    baseURL: VITE_SERVER_URL,
  });
  const authApi = axios.create({
    baseURL: VITE_SERVER_URL,
  });

  useEffect(() => {
    authApi.interceptors.request.use((config) => {
      if (accessToken != null) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      }
      throw new UnAuthorized();
    });
  }, [accessToken]);

  return {
    api,
    authApi,
  };
};
