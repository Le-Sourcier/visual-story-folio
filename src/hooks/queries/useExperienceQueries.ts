import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { experiencesApi } from '@/services/api';
import type { Experience, ExperienceFormData } from '@/types/admin.types';

// Query Keys
export const experienceKeys = {
  all: ['experiences'] as const,
  lists: () => [...experienceKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...experienceKeys.lists(), filters] as const,
  details: () => [...experienceKeys.all, 'detail'] as const,
  detail: (id: string) => [...experienceKeys.details(), id] as const,
};

// Get All Experiences
export function useExperiences() {
  return useQuery({
    queryKey: experienceKeys.lists(),
    queryFn: () => experiencesApi.getAll(),
    staleTime: 2 * 60 * 1000,
  });
}

// Get Experience by ID
export function useExperience(id: string) {
  return useQuery({
    queryKey: experienceKeys.detail(id),
    queryFn: () => experiencesApi.getById(id),
    enabled: !!id,
  });
}

// Create Experience
export function useCreateExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ExperienceFormData) => experiencesApi.create(data),
    onSuccess: (newExperience) => {
      queryClient.setQueryData<Experience[]>(experienceKeys.lists(), (old) =>
        old ? [newExperience, ...old] : [newExperience]
      );
      toast.success('Experience creee avec succes');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la creation');
    },
  });
}

// Update Experience
export function useUpdateExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ExperienceFormData> }) =>
      experiencesApi.update(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData<Experience[]>(experienceKeys.lists(), (old) =>
        old?.map((e) => (e.id === updated.id ? updated : e))
      );
      queryClient.setQueryData(experienceKeys.detail(updated.id), updated);
      toast.success('Experience mise a jour');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la mise a jour');
    },
  });
}

// Delete Experience
export function useDeleteExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => experiencesApi.delete(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Experience[]>(experienceKeys.lists(), (old) =>
        old?.filter((e) => e.id !== deletedId)
      );
      queryClient.removeQueries({ queryKey: experienceKeys.detail(deletedId) });
      toast.success('Experience supprimee');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la suppression');
    },
  });
}
