import {
  LoginRequest,
  RegisterRequest,
  CurrentUser,
  AccountTokenResponse,
  RefreshSessionRequest,
} from '@/types/account';
import { axiosInstance } from '@/api/api';

export const accountApi = {
  login: async (data: LoginRequest): Promise<AccountTokenResponse> => {
    const response = await axiosInstance.post<AccountTokenResponse>('/account/login', data);
    return response.data;
  },
  refreshToken: async (data: RefreshSessionRequest): Promise<AccountTokenResponse> => {
    const response = await axiosInstance.put<AccountTokenResponse>(
      '/account/sessions/refresh',
      data
    );
    return response.data;
  },
  register: async (data: RegisterRequest) => {
    const response = await axiosInstance.post('/account/register', data);
    return response.data;
  },
  getCurrentUser: async (): Promise<CurrentUser> => {
    const response = await axiosInstance.get('/account/current');
    return response.data;
  },
  logout: async () => {
    await axiosInstance.get('/account/logout');
  },
  logoutAllSessions: async () => {
    await axiosInstance.get('/account/logout/all');
  },
};
