import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { testimonialsApi } from '@/services/api';
import type { Testimonial, TestimonialFormData } from '@/types/admin.types';

// Query Keys
export const testimonialKeys = {
  all: ['testimonials'] as const,
  lists: () => [...testimonialKeys.all, 'list'] as const,
  visible: () => [...testimonialKeys.all, 'visible'] as const,
  details: () => [...testimonialKeys.all, 'detail'] as const,
  detail: (id: string) => [...testimonialKeys.details(), id] as const,
};

// Get All Testimonials (Admin)
export function useTestimonials() {
  return useQuery({
    queryKey: testimonialKeys.lists(),
    queryFn: () => testimonialsApi.getAll(),
    staleTime: 2 * 60 * 1000,
  });
}

// Get Visible Testimonials (Public)
export function useVisibleTestimonials() {
  return useQuery({
    queryKey: testimonialKeys.visible(),
    queryFn: () => testimonialsApi.getVisible(),
    staleTime: 5 * 60 * 1000,
  });
}

// Get Testimonial by ID
export function useTestimonial(id: string) {
  return useQuery({
    queryKey: testimonialKeys.detail(id),
    queryFn: () => testimonialsApi.getById(id),
    enabled: !!id,
  });
}

// Create Testimonial
export function useCreateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TestimonialFormData) => testimonialsApi.create(data),
    onSuccess: (newTestimonial) => {
      queryClient.setQueryData<Testimonial[]>(testimonialKeys.lists(), (old) =>
        old ? [newTestimonial, ...old] : [newTestimonial]
      );
      queryClient.invalidateQueries({ queryKey: testimonialKeys.visible() });
      toast.success('Temoignage cree avec succes');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la creation');
    },
  });
}

// Update Testimonial
export function useUpdateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TestimonialFormData> }) =>
      testimonialsApi.update(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData<Testimonial[]>(testimonialKeys.lists(), (old) =>
        old?.map((t) => (t.id === updated.id ? updated : t))
      );
      queryClient.setQueryData(testimonialKeys.detail(updated.id), updated);
      queryClient.invalidateQueries({ queryKey: testimonialKeys.visible() });
      toast.success('Temoignage mis a jour');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la mise a jour');
    },
  });
}

// Toggle Visibility
export function useToggleTestimonialVisibility() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => testimonialsApi.toggleVisibility(id),
    onSuccess: (updated) => {
      queryClient.setQueryData<Testimonial[]>(testimonialKeys.lists(), (old) =>
        old?.map((t) => (t.id === updated.id ? updated : t))
      );
      queryClient.invalidateQueries({ queryKey: testimonialKeys.visible() });
      toast.success(updated.visible ? 'Temoignage visible' : 'Temoignage masque');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la modification');
    },
  });
}

// Delete Testimonial
export function useDeleteTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => testimonialsApi.delete(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Testimonial[]>(testimonialKeys.lists(), (old) =>
        old?.filter((t) => t.id !== deletedId)
      );
      queryClient.removeQueries({ queryKey: testimonialKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: testimonialKeys.visible() });
      toast.success('Temoignage supprime');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la suppression');
    },
  });
}
