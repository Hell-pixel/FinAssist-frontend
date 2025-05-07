import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { authTokenService } from '@/services/authTokenService';
import { accountApi } from './account';
import { getApiUrl } from '@/utils/stringHelper';

export const axiosInstance = axios.create({
  baseURL: getApiUrl(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Расширяем интерфейс AxiosRequestConfig для добавления свойства _retry
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

axiosInstance.interceptors.request.use((config) => {
  const token = authTokenService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

function onTokenRefreshed(token: string) {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
}

function subscribeTokenRefresh(callback: (token: string) => void) {
  subscribers.push(callback);
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = authTokenService.getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token');

        const newToken = await accountApi.refreshToken({ refreshToken });
        authTokenService.setTokens(
          newToken.token,
          newToken.refreshToken,
          newToken.expiresIn,
          newToken.refreshTokenExpiresIn
        );

        onTokenRefreshed(newToken.token);
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newToken.token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        authTokenService.clearTokens();
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (status === 403) {
      toast.error('Недостаточно прав для выполнения операции');
    } else {
      const errorResponse = error.response?.data;
      toast.error((errorResponse as IErrorResponse)?.message || 'Что-то пошло не так');
    }

    return Promise.reject(error);
  }
);

interface IErrorResponse {
  message?: string;
}
