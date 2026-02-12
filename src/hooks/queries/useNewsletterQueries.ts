import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { newsletterApi } from '@/services/api';

// Query Keys
export const newsletterKeys = {
  all: ['newsletter'] as const,
  subscribers: () => [...newsletterKeys.all, 'subscribers'] as const,
  active: () => [...newsletterKeys.all, 'active'] as const,
  stats: () => [...newsletterKeys.all, 'stats'] as const,
};

// Get All Subscribers
export function useNewsletterSubscribers() {
  return useQuery({
    queryKey: newsletterKeys.subscribers(),
    queryFn: () => newsletterApi.getAllSubscribers(),
    staleTime: 2 * 60 * 1000,
  });
}

// Get Active Subscribers
export function useActiveSubscribers() {
  return useQuery({
    queryKey: newsletterKeys.active(),
    queryFn: () => newsletterApi.getActiveSubscribers(),
    staleTime: 2 * 60 * 1000,
  });
}

// Get Stats
export function useNewsletterStats() {
  return useQuery({
    queryKey: newsletterKeys.stats(),
    queryFn: () => newsletterApi.getStats(),
    staleTime: 1 * 60 * 1000,
  });
}

// Subscribe
export function useSubscribe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) => newsletterApi.subscribe(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsletterKeys.all });
      toast.success('Inscription reussie !');
    },
    onError: (error: Error) => {
      if (error.message.includes('Already subscribed')) {
        toast.info('Vous etes deja inscrit');
      } else {
        toast.error(error.message || 'Erreur lors de l\'inscription');
      }
    },
  });
}

// Unsubscribe
export function useUnsubscribe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) => newsletterApi.unsubscribe(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsletterKeys.all });
      toast.success('Desinscription effectuee');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la desinscription');
    },
  });
}
