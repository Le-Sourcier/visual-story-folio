import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Briefcase, Calendar, BookOpen, User } from 'lucide-react';

const ACTIONS = [
  { label: "Mes Projets", icon: Briefcase },
  { label: "Rendez-vous", icon: Calendar },
  { label: "Mon Profil", icon: User },
  { label: "Compétences", icon: Sparkles },
  { label: "Lire le Blog", icon: BookOpen },
];

interface QuickActionsProps {
  onAction: (action: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onAction }) => {
  return (
    <div className="relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none opacity-0" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1 px-1">
        {ACTIONS.map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onAction(action.label)}
            className="flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-full border border-border/50 bg-secondary/20 hover:bg-primary/10 hover:border-primary/30 transition-all text-[11px] font-semibold tracking-tight text-muted-foreground hover:text-primary active:scale-95 group shadow-sm"
          >
            <action.icon className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
            {action.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};