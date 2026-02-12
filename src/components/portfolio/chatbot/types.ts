export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  type?: 'text' | 'appointment_picker' | 'project_link' | 'loading';
  metadata?: any;
}

export interface ChatbotState {
  isOpen: boolean;
  messages: Message[];
  isTyping: boolean;
}