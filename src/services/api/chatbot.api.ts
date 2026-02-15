import { apiClient } from './client';
import type { Message } from '@/components/portfolio/chatbot/types';

export interface QuickAction {
  id: string;
  label: string;
  prompt: string;
}

export const chatbotApi = {
  async sendMessage(content: string): Promise<Message> {
    return apiClient.post<Message>('/chatbot/message', { content });
  },

  async getQuickActions(): Promise<QuickAction[]> {
    return apiClient.get<QuickAction[]>('/chatbot/quick-actions');
  },

  async getInitialMessage(): Promise<Message> {
    return apiClient.get<Message>('/chatbot/initial');
  },
};
