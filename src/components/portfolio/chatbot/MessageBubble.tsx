import React from 'react';
import { motion } from 'framer-motion';
import { Message } from './types';
import { cn } from '../../../lib/utils';
import { User, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface MessageBubbleProps {
  message: Message;
}

const AI_AVATAR = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/564508a5-e18e-4304-b909-f59e34b774ee/ai-avatar-ca4be779-1770887268386.webp";

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex w-full gap-3",
        isAssistant ? "justify-start" : "justify-end"
      )}
    >
      {isAssistant && (
        <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 mt-1 border border-primary/20 shadow-sm">
          <img src={AI_AVATAR} alt="AI" className="w-full h-full object-cover" />
        </div>
      )}

      <div className={cn(
        "max-w-[85%] flex flex-col gap-1.5",
        isAssistant ? "items-start" : "items-end"
      )}>
        <div className={cn(
          "px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm transition-all",
          isAssistant 
            ? "bg-secondary/40 border border-border/50 text-foreground rounded-tl-none hover:bg-secondary/60" 
            : "bg-primary text-primary-foreground rounded-tr-none shadow-primary/20"
        )}>
          {message.content}

          {message.type === 'project_link' && message.metadata?.projectId && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-3 pt-3 border-t border-border/30"
            >
              <Link 
                to={`/work/${message.metadata.projectId}`}
                className={cn(
                  "flex items-center justify-between gap-3 p-3 rounded-xl border transition-all group",
                  isAssistant ? "bg-background/50 hover:bg-background" : "bg-white/10 hover:bg-white/20 border-white/20"
                )}
              >
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider opacity-60 font-bold">Project Overview</span>
                  <span className="font-bold text-sm">{message.metadata.projectTitle}</span>
                </div>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </motion.div>
          )}

          {message.type === 'appointment_picker' && message.metadata?.availableTimes && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 grid grid-cols-2 gap-2"
            >
              {message.metadata.availableTimes.map((time: string, idx: number) => (
                <motion.button
                  key={time}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  onClick={() => {
                    const bookingSection = document.getElementById('booking');
                    if (bookingSection) bookingSection.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-background/50 hover:bg-primary/10 border border-border/50 hover:border-primary/50 text-foreground px-3 py-2.5 rounded-xl text-[11px] font-semibold transition-all flex items-center justify-center gap-2 group"
                >
                  <Calendar className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" /> 
                  {time}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
        
        <div className="flex items-center gap-2 px-1">
          <span className="text-[10px] text-muted-foreground/60 font-medium italic">
            {format(message.timestamp, 'HH:mm', { locale: fr })}
          </span>
          {!isAssistant && (
            <CheckCircle2 className="w-3 h-3 text-primary opacity-50" />
          )}
        </div>
      </div>

      {!isAssistant && (
        <div className="w-8 h-8 rounded-lg bg-secondary/80 flex items-center justify-center shrink-0 mt-1 border border-border shadow-sm">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
    </motion.div>
  );
};