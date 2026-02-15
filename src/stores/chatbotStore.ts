import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Message } from '@/components/portfolio/chatbot/types';

interface ChatbotState {
  messages: Message[];
  isOpen: boolean;
  isOffline: boolean;
}

interface ChatbotActions {
  addMessage: (msg: Message) => void;
  setMessages: (msgs: Message[]) => void;
  clearMessages: () => void;
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
  setOffline: (offline: boolean) => void;
}

export const useChatbotStore = create<ChatbotState & ChatbotActions>()(
  persist(
    (set) => ({
      messages: [],
      isOpen: false,
      isOffline: false,

      addMessage: (msg) =>
        set((state) => ({ messages: [...state.messages, msg] })),

      setMessages: (msgs) => set({ messages: msgs }),

      clearMessages: () => set({ messages: [] }),

      setOpen: (open) => set({ isOpen: open }),

      toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),

      setOffline: (offline) => set({ isOffline: offline }),
    }),
    {
      name: 'chatbot-session',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        messages: state.messages,
      }),
    }
  )
);
