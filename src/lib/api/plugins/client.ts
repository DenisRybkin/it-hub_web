import axios from 'axios';
import { LocaleStorageKeys } from '@/lib/constants';
import { api } from '@/lib/api/plugins/api';

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
});

client.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json';
  const authToken = localStorage.getItem(LocaleStorageKeys.JWT);
  if (authToken) config.headers.Authorization = 'Bearer ' + authToken;
  return config;
});

export const setupResponseInterceptors = (onLogout: () => void) =>
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
          const { access } = await api.auth.refresh();
          localStorage.setItem(LocaleStorageKeys.JWT, access);
          return await client.request(originalRequest);
        } catch (e) {
          onLogout();
        }
      }
    }
  );
