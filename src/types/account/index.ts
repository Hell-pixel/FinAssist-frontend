export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AccountTokenResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
}

export interface RefreshSessionRequest {
  refreshToken: string;
}

export interface CurrentUser {
  id: string;
  email: string;
  name: string;
}
