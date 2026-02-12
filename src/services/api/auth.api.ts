import { apiClient, setToken, setRefreshToken, clearTokens } from './client';
import type { LoginCredentials, LoginResponse, AuthUser } from '@/types/admin.types';

export const authApi = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials, {
      skipAuth: true,
    });

    // Store tokens
    setToken(response.token);
    if (response.refreshToken) {
      setRefreshToken(response.refreshToken);
    }

    return response;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      clearTokens();
    }
  },

  async getProfile(): Promise<AuthUser> {
    return apiClient.get<AuthUser>('/auth/me');
  },

  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    const response = await apiClient.post<{ token: string }>(
      '/auth/refresh',
      { refreshToken },
      { skipAuth: true }
    );
    setToken(response.token);
    return response;
  },
};

export default authApi;
