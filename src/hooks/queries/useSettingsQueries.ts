import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { settingsApi, type ApiSettings } from '@/services/api/settings.api';

export const settingsKeys = {
  all: ['settings'] as const,
};

// Get all settings from API (public - used by portfolio pages)
export function useApiSettings() {
  return useQuery({
    queryKey: settingsKeys.all,
    queryFn: () => settingsApi.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

// Update settings (admin)
export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ApiSettings) => settingsApi.update(data),
    onSuccess: (updated) => {
      queryClient.setQueryData(settingsKeys.all, updated);
      toast.success('Parametres enregistres');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la sauvegarde');
    },
  });
}
