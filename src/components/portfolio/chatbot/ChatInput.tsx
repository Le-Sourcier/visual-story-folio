import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSendMessage(value);
      setValue('');
    }
  };

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary/10 rounded-[1.25rem] blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
      <div className="relative flex items-center gap-2 p-1.5 bg-secondary/30 backdrop-blur-md rounded-[1.25rem] border border-border/50 transition-all group-focus-within:bg-secondary/50 group-focus-within:border-primary/30">
        <div className="pl-3 text-muted-foreground/40">
          <Sparkles className="w-4 h-4" />
        </div>
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent border-none h-10 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 text-[13px] placeholder:text-muted-foreground/50 shadow-none"
          disabled={disabled}
        />
        <AnimatePresence>
          {value.trim() && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <Button 
                type="submit" 
                size="icon" 
                disabled={disabled}
                className="h-9 w-9 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 active:scale-90 transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};