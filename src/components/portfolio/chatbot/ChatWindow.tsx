import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, RotateCcw, ShieldCheck } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { QuickActions } from './QuickActions';
import { Message } from './types';
import { ScrollArea } from '../../ui/scroll-area';
import { cn } from '../../../lib/utils';

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
  onClose: () => void;
  onSendMessage: (content: string) => void;
  onReset: () => void;
}

const AI_AVATAR = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/564508a5-e18e-4304-b909-f59e34b774ee/ai-avatar-ca4be779-1770887268386.webp";

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isTyping,
  onClose,
  onSendMessage,
  onReset
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20, transformOrigin: 'bottom right' }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className={cn(
        "fixed z-[120] flex flex-col overflow-hidden transition-all duration-300",
        "bg-card/90 backdrop-blur-2xl border border-border/50 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] ring-1 ring-white/10",
        // Position and Size: Responsive logic
        "bottom-[5.5rem] sm:bottom-24 md:bottom-32", // Adjust bottom position based on screen
        "right-4 sm:right-6 md:right-12",
        "w-[calc(100vw-2rem)] sm:w-[420px] md:w-[480px] lg:w-[520px]", // Growing width
        "h-[calc(100vh-8rem)] sm:h-[600px] md:h-[700px] max-h-[85vh]", // Responsive height
        "rounded-[2rem] sm:rounded-[2.5rem]"
      )}
    >
      {/* Header - Fixed with shrink-0 */}
      <div className="shrink-0 p-5 md:p-6 border-b border-border/50 flex items-center justify-between bg-gradient-to-b from-primary/10 to-transparent">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl overflow-hidden border-2 border-primary/20 bg-primary/10">
              <img 
                src={AI_AVATAR} 
                alt="AI Assistant" 
                className="w-full h-full object-cover"
              />
            </div>
            <motion.span 
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 md:w-4 md:h-4 bg-green-500 border-4 border-card rounded-full" 
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm md:text-base tracking-tight">Portfolio Agent</h3>
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] md:text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                Active now
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={onReset}
            className="p-2 md:p-2.5 rounded-full hover:bg-secondary/80 transition-all text-muted-foreground active:scale-90"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button 
            onClick={onClose}
            className="p-2 md:p-2.5 rounded-full hover:bg-secondary/80 transition-all text-muted-foreground active:scale-90"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages - Takes remaining space with flex-1 and min-h-0 */}
      <ScrollArea 
        ref={scrollRef}
        className="flex-1 min-h-0 px-4 py-4 md:py-6"
      >
        <div className="space-y-6">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 items-start"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-primary/20">
                <img src={AI_AVATAR} alt="AI" className="w-full h-full object-cover" />
              </div>
              <div className="bg-secondary/50 px-4 py-3 rounded-2xl rounded-tl-none border border-border/50">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ 
                        y: [0, -4, 0],
                        opacity: [0.4, 1, 0.4]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1, 
                        delay: i * 0.2 
                      }}
                      className="w-1.5 h-1.5 bg-primary rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Footer Actions & Input - Fixed with shrink-0 */}
      <div className="shrink-0 p-4 bg-gradient-to-t from-background via-background to-transparent space-y-3 md:space-y-4">
        <QuickActions onAction={onSendMessage} />
        <ChatInput onSendMessage={onSendMessage} disabled={isTyping} />
      </div>
    </motion.div>
  );
};