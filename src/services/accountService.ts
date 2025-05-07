import { accountApi } from '@/api/account';
import { authTokenService } from './authTokenService';

export const accountService = {
  login: async (email: string, password: string) => {
    const response = await accountApi.login({ email, password });
    authTokenService.setTokens(
      response.token,
      response.refreshToken,
      response.expiresIn,
      response.refreshTokenExpiresIn
    );
    return accountApi.getCurrentUser();
  },

  register: async (name: string, email: string, password: string) => {
    await accountApi.register({ name, email, password });
  },

  logout: async () => {
    await accountApi.logout();
    authTokenService.clearTokens();
  },

  getCurrentUser: async () => {
    return accountApi.getCurrentUser();
  },
};
