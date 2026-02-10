import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, Project } from '../../data/mockData';
import { ArrowRight, X, ExternalLink, Github } from 'lucide-react';

const CATEGORIES = ['All', 'UI/UX', 'Branding', 'Web', 'Art', 'Photo'] as const;

export function ProjectGallery() {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter(
    (p) => filter === 'All' || p.category === filter
  );

  return (
    <section id="work" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Portfolio</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            >
              Featured <span className="text-muted-foreground/40 italic">Projects</span>
            </motion.h2>
          </div>
          
          <div className="flex flex-wrap gap-2 md:pb-2">
            {CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-primary text-primary-foreground shadow-xl' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent hover:border-border'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Masonry Layout using columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-3xl bg-secondary"
                onClick={() => setSelectedProject(project)}
              >
                <div className={`relative overflow-hidden ${idx % 2 === 0 ? 'aspect-[4/5]' : 'aspect-square'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">{project.category}</p>
                      <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                      <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                        <span>View Case Study</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-background/90 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-card rounded-[2.5rem] shadow-2xl relative scrollbar-hide"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="fixed md:absolute top-6 right-6 p-4 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform z-[110] shadow-xl"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col">
                <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden relative">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />
                  <div className="absolute bottom-12 left-8 md:left-16">
                    <span className="px-4 py-2 bg-primary/20 backdrop-blur-md text-primary text-sm font-bold rounded-full mb-4 inline-block">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-4xl md:text-7xl font-bold">{selectedProject.title}</h2>
                  </div>
                </div>
                
                <div className="px-8 py-12 md:px-24 md:py-24">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-12">
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">Overview</h4>
                        <p className="text-2xl md:text-3xl leading-tight font-medium text-foreground/90">{selectedProject.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-border">
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">The Challenge</h4>
                          <p className="text-lg leading-relaxed text-muted-foreground">{selectedProject.challenge}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">The Solution</h4>
                          <p className="text-lg leading-relaxed text-muted-foreground">{selectedProject.solution}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-12">
                      <div className="p-8 rounded-3xl bg-secondary/50 border border-border">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">Deliverables</h4>
                        <ul className="space-y-4">
                          {selectedProject.results.map((result, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              <span className="text-base font-semibold">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        <button className="w-full flex items-center justify-center gap-3 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:shadow-xl transition-all group">
                          Launch Website
                          <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                        <button className="w-full flex items-center justify-center gap-3 py-4 border border-border rounded-2xl font-bold hover:bg-secondary transition-all">
                          View Code
                          <Github className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}