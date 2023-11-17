import axios from 'axios';
import { LocaleStorageKeys } from '@/lib/constants';

const LOGIN_PATH = 'api/auth/login';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

client.interceptors.request.use(config => {
  if (!config.headers['Content-Type'])
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
        error.config.url != LOGIN_PATH &&
        !error.config._isRetry
      ) {
        originalRequest._isRetry = true;
        try {
          await onAccessExpired();
          return await client.request(originalRequest);
        } catch (e) {
          onRefreshExpired();
        }
      } else throw error;
    }
  );
