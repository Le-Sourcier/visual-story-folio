import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { projectsApi } from '@/services/api';
import type { Project, ProjectFormData } from '@/types/admin.types';

// Query Keys
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...projectKeys.lists(), filters] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
};

// Get All Projects
export function useProjects() {
  return useQuery({
    queryKey: projectKeys.lists(),
    queryFn: () => projectsApi.getAll(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Get Project by ID
export function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => projectsApi.getById(id),
    enabled: !!id,
  });
}

// Create Project
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProjectFormData) => projectsApi.create(data),
    onSuccess: (newProject) => {
      queryClient.setQueryData<Project[]>(projectKeys.lists(), (old) =>
        old ? [newProject, ...old] : [newProject]
      );
      toast.success('Projet cree avec succes');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la creation');
    },
  });
}

// Update Project
export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjectFormData> }) =>
      projectsApi.update(id, data),
    onSuccess: (updatedProject) => {
      queryClient.setQueryData<Project[]>(projectKeys.lists(), (old) =>
        old?.map((p) => (p.id === updatedProject.id ? updatedProject : p))
      );
      queryClient.setQueryData(projectKeys.detail(updatedProject.id), updatedProject);
      toast.success('Projet mis a jour');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la mise a jour');
    },
  });
}

// Delete Project
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectsApi.delete(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Project[]>(projectKeys.lists(), (old) =>
        old?.filter((p) => p.id !== deletedId)
      );
      queryClient.removeQueries({ queryKey: projectKeys.detail(deletedId) });
      toast.success('Projet supprime');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la suppression');
    },
  });
}
