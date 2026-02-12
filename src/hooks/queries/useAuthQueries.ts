import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authApi } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';
import type { LoginCredentials } from '@/types/admin.types';

// Query Keys
export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
};

// Get Profile Query
export function useProfile() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => authApi.getProfile(),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Login Mutation
export function useLogin() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.token, data.refreshToken);
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      toast.success('Connexion reussie. Bienvenue !');
      navigate('/admin/dashboard');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Identifiants incorrects');
    },
  });
}

// Logout Mutation
export function useLogout() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      logout();
      queryClient.clear();
      toast.info('Deconnexion reussie');
      navigate('/admin/login');
    },
    onError: () => {
      // Force logout even on error
      logout();
      queryClient.clear();
      navigate('/admin/login');
    },
  });
}

// Refresh Token Mutation
export function useRefreshToken() {
  const { refreshToken, setToken, logout } = useAuthStore();

  return useMutation({
    mutationFn: () => {
      if (!refreshToken) throw new Error('No refresh token');
      return authApi.refreshToken(refreshToken);
    },
    onSuccess: (data) => {
      setToken(data.token);
    },
    onError: () => {
      logout();
    },
  });
}
