import Cookies from 'universal-cookie';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const EXPIRES_AT_KEY = 'expiresAt';

const cookies = new Cookies();

export const authTokenService = {
  setTokens: (
    token: string,
    refreshToken: string,
    expiresIn: number,
    refreshTokenExpiresIn: number
  ) => {
    const tokenExpiresAt = Date.now() + expiresIn * 1000;
    const refreshTokenExpiresAt = Date.now() + refreshTokenExpiresIn * 1000;
    cookies.set(ACCESS_TOKEN_KEY, token, { path: '/', expires: new Date(tokenExpiresAt) });
    cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
      path: '/',
      expires: new Date(refreshTokenExpiresAt),
    });
  },

  getAccessToken: () => cookies.get(ACCESS_TOKEN_KEY),
  getRefreshToken: () => cookies.get(REFRESH_TOKEN_KEY),

  clearTokens: () => {
    cookies.remove(ACCESS_TOKEN_KEY, { path: '/' });
    cookies.remove(REFRESH_TOKEN_KEY, { path: '/' });
    cookies.remove(EXPIRES_AT_KEY, { path: '/' });
  },
};
