import type { ApiResponse, ApiError } from '@/types/admin.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10);

// Token management
const TOKEN_KEY = 'admin_token';
const REFRESH_TOKEN_KEY = 'admin_refresh_token';

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string): void => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = (): void => localStorage.removeItem(TOKEN_KEY);

export const getRefreshToken = (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY);
export const setRefreshToken = (token: string): void => localStorage.setItem(REFRESH_TOKEN_KEY, token);
export const removeRefreshToken = (): void => localStorage.removeItem(REFRESH_TOKEN_KEY);

export const clearTokens = (): void => {
  removeToken();
  removeRefreshToken();
};

// HTTP Client
interface RequestOptions extends RequestInit {
  timeout?: number;
  skipAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(skipAuth = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (!skipAuth) {
      const token = getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    let data: unknown;
    try {
      data = await response.json();
    } catch {
      throw new Error(`HTTP Error: ${response.status} - Invalid JSON response`);
    }

    if (!response.ok) {
      const error = data as ApiError;

      // Only clear tokens on real 401 from the server, don't redirect
      if (response.status === 401) {
        clearTokens();
      }

      throw new Error(error.message || `HTTP Error: ${response.status}`);
    }

    // Try to extract data from standardized response, fallback to raw data
    if (data && typeof data === 'object' && 'data' in (data as Record<string, unknown>)) {
      return (data as ApiResponse<T>).data;
    }
    return data as T;
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestOptions = {}
  ): Promise<Response> {
    const { timeout = API_TIMEOUT, ...fetchOptions } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });
      return response;
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        throw new Error('Request timeout');
      }
      // Network error (backend not running) - don't redirect, just throw
      throw new Error('Serveur indisponible. Verifiez que le backend est demarre.');
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(options.skipAuth),
      ...options,
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: unknown, options: RequestOptions = {}): Promise<T> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(options.skipAuth),
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: unknown, options: RequestOptions = {}): Promise<T> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(options.skipAuth),
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
    return this.handleResponse<T>(response);
  }

  async patch<T>(endpoint: string, data?: unknown, options: RequestOptions = {}): Promise<T> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(options.skipAuth),
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(options.skipAuth),
      ...options,
    });
    return this.handleResponse<T>(response);
  }
}

export const apiClient = new ApiClient(API_URL);
export default apiClient;
