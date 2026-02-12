import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Briefcase, ChevronRight, Globe, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExperienceDetailProps {
  isOpen: boolean;
  onClose: () => void;
  experience: {
    title: string;
    company: string;
    location?: string;
    dates: string;
    description: string;
    details?: string[];
    links?: { label: string; url: string }[];
    project?: {
      name: string;
      stack: string;
      demo: string;
    };
  } | null;
}

export function ExperienceModal({ isOpen, onClose, experience }: ExperienceDetailProps) {
  if (!experience) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-card border border-border shadow-2xl rounded-[3rem] overflow-hidden overflow-y-auto max-h-[90vh]"
          >
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-start mb-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-primary">
                    <Briefcase className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-[0.3em]">Expérience Détails</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-tight">
                    {experience.title}
                  </h3>
                  <p className="text-xl font-bold text-muted-foreground italic">
                    {experience.company}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="flex items-center gap-4 p-5 bg-secondary/30 rounded-2xl">
                  <Calendar className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Période</p>
                    <p className="font-bold">{experience.dates}</p>
                  </div>
                </div>
                {experience.location && (
                  <div className="flex items-center gap-4 p-5 bg-secondary/30 rounded-2xl">
                    <MapPin className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Lieu</p>
                      <p className="font-bold">{experience.location}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-10">
                <section>
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-4">Description</h4>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {experience.description}
                  </p>
                </section>

                {experience.details && experience.details.length > 0 && (
                  <section>
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">Réalisations Clés</h4>
                    <ul className="space-y-4">
                      {experience.details.map((detail, idx) => (
                        <li key={idx} className="flex gap-4 group">
                          <ChevronRight className="w-5 h-5 text-primary shrink-0 transition-transform group-hover:translate-x-1" />
                          <span className="font-medium text-foreground/80 leading-snug">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {experience.project && (
                  <section className="p-8 bg-primary/5 border border-primary/10 rounded-[2rem]">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-4">Projet Phare</h4>
                    <div className="space-y-3">
                      <p className="text-xl font-black">{experience.project.name}</p>
                      <p className="text-sm font-bold text-muted-foreground italic">Stack: {experience.project.stack}</p>
                      <a 
                        href={`https://${experience.project.demo}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-black hover:underline"
                      >
                        Voir la démo <Globe className="w-4 h-4" />
                      </a>
                    </div>
                  </section>
                )}

                {experience.links && experience.links.length > 0 && (
                  <section>
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">Liens Utiles</h4>
                    <div className="flex flex-wrap gap-4">
                      {experience.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-full text-sm font-black transition-all flex items-center gap-2"
                        >
                          {link.label}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <Button 
                  onClick={onClose}
                  className="w-full h-14 rounded-2xl font-black uppercase tracking-widest"
                >
                  Fermer
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ExternalLink(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}