import { useState, useCallback, useEffect } from 'react';
import { Message, QuickAction } from './types';
import { getInitialMessage, processUserMessage } from './chatbotEngine';
import { chatbotApi } from '@/services/api/chatbot.api';
import { useChatbotStore } from '@/stores/chatbotStore';

const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  { id: '1', label: 'Mes Projets', prompt: 'Montre-moi tes projets' },
  { id: '2', label: 'Rendez-vous', prompt: 'Je veux prendre rendez-vous' },
  { id: '3', label: 'Mon Profil', prompt: 'Qui est David Logan ?' },
  { id: '4', label: 'Competences', prompt: 'Quelles sont tes competences ?' },
  { id: '5', label: 'Lire le Blog', prompt: 'Montre-moi le blog' },
  { id: '6', label: 'Contact', prompt: 'Comment te contacter ?' },
];

export function useChatbot() {
  const store = useChatbotStore();
  const [isTyping, setIsTyping] = useState(false);
  const [quickActions, setQuickActions] = useState<QuickAction[]>(DEFAULT_QUICK_ACTIONS);

  // Initialize: load initial message + quick actions
  useEffect(() => {
    if (store.messages.length > 0) return;

    const init = async () => {
      try {
        const [initialMsg, actions] = await Promise.all([
          chatbotApi.getInitialMessage(),
          chatbotApi.getQuickActions(),
        ]);
        store.setMessages([{ ...initialMsg, timestamp: new Date() }]);
        if (actions?.length) setQuickActions(actions);
        store.setOffline(false);
      } catch {
        store.setMessages([getInitialMessage()]);
        store.setOffline(true);
      }
    };
    init();
  }, []);

  const toggleChat = useCallback(() => {
    store.toggleOpen();
  }, [store]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      type: 'text',
    };

    store.addMessage(userMessage);
    setIsTyping(true);

    try {
      const response = await chatbotApi.sendMessage(content);
      store.addMessage({
        id: response.id || (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content || "Desole, j'ai rencontre une erreur.",
        timestamp: new Date(),
        type: response.type || 'text',
        metadata: response.metadata,
      });
      store.setOffline(false);
    } catch {
      // Fallback to local engine
      try {
        const localResponse = await processUserMessage(content);
        store.addMessage({
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: localResponse.content || "Desole, j'ai rencontre une erreur.",
          timestamp: new Date(),
          type: (localResponse.type as Message['type']) || 'text',
          metadata: localResponse.metadata,
        });
        store.setOffline(true);
      } catch {
        store.addMessage({
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Desole, je ne suis pas disponible pour le moment. Contactez-moi par email.",
          timestamp: new Date(),
          type: 'text',
        });
      }
    } finally {
      setIsTyping(false);
    }
  }, [store]);

  const resetChat = useCallback(async () => {
    try {
      const initialMsg = await chatbotApi.getInitialMessage();
      store.setMessages([{ ...initialMsg, timestamp: new Date() }]);
    } catch {
      store.setMessages([getInitialMessage()]);
    }
  }, [store]);

  return {
    isOpen: store.isOpen,
    messages: store.messages,
    isTyping,
    isOffline: store.isOffline,
    quickActions,
    toggleChat,
    sendMessage,
    resetChat,
  };
}
