import axios, { AxiosInstance } from 'axios';
import { LocaleStorageKeys } from '@/lib/constants';
import { api } from '@/lib/api/plugins/api';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

client.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json';
  const authToken = localStorage.getItem(LocaleStorageKeys.JWT);
  if (authToken) config.headers.Authorization = 'Bearer ' + authToken;
  return config;
});

export const setupResponseInterceptors = (
  onRefreshExpired: () => void,
  onAccessExpired: () => Promise<void>
) =>
  client.interceptors.response.use(
    config => config,
    async error => {
      const originalRequest = error.config;
      if (
        error.response.status == 401 &&
        error.config &&
        !error.config._isRetry
      ) {
        originalRequest._isRetry = true;
        localStorage.removeItem(LocaleStorageKeys.JWT);
        try {
          await onAccessExpired();
          return await client.request(originalRequest);
        } catch (e) {
          onRefreshExpired();
        }
      }
    }
  );
