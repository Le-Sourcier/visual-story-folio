import { useState, useCallback, useEffect } from 'react';
import { Message, MessageRole } from './types';
import { getInitialMessage, processUserMessage } from './chatbotEngine';

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([getInitialMessage()]);
    }
  }, [messages.length]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await processUserMessage(content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content || "Désolé, j'ai rencontré une erreur.",
        timestamp: new Date(),
        type: response.type || 'text',
        metadata: response.metadata
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chatbot Error:", error);
    } finally {
      setIsTyping(false);
    }
  }, []);

  const resetChat = useCallback(() => {
    setMessages([getInitialMessage()]);
  }, []);

  return {
    isOpen,
    messages,
    isTyping,
    toggleChat,
    sendMessage,
    resetChat
  };
}