import { apiClient } from './client';
import type { NewsletterSubscriber } from '@/types/admin.types';

export const newsletterApi = {
  async subscribe(email: string): Promise<NewsletterSubscriber> {
    return apiClient.post<NewsletterSubscriber>('/newsletter/subscribe', { email });
  },

  async unsubscribe(email: string): Promise<void> {
    return apiClient.post('/newsletter/unsubscribe', { email });
  },

  async getAllSubscribers(): Promise<NewsletterSubscriber[]> {
    return apiClient.get<NewsletterSubscriber[]>('/newsletter/subscribers');
  },

  async getActiveSubscribers(): Promise<NewsletterSubscriber[]> {
    return apiClient.get<NewsletterSubscriber[]>('/newsletter/subscribers/active');
  },

  async getStats(): Promise<{ total: number; active: number }> {
    return apiClient.get<{ total: number; active: number }>('/newsletter/stats');
  },
};

export default newsletterApi;
