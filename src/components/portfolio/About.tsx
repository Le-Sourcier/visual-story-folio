import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Award as AwardIcon, CheckCircle2 } from 'lucide-react';
import { AWARDS } from '../../data/mockData';

export function About() {
  const profileImage = 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/564508a5-e18e-4304-b909-f59e34b774ee/profile-picture-4826774e-1770728429712.webp';

  const handleDownloadResume = () => {
    // Mock resume download
    const content = "Portfolio Resume Content - Creative Director";
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Creative_Resume_2024.txt');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const skills = [
    "Product Strategy", "User Experience", "Brand Identity", 
    "Art Direction", "Web Development", "Design Systems"
  ];

  return (
    <section id="about" className="py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden group">
              <img 
                src={profileImage} 
                alt="Creative Director" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>
            
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-10 -right-6 md:-right-12 bg-card border border-border p-8 rounded-[2rem] shadow-2xl max-w-[240px] hidden sm:block"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-black text-3xl">10+</h4>
              </div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
                Years of industry experience
              </p>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-12 h-[1px] bg-primary" />
                <span className="text-sm font-black uppercase tracking-[0.2em] text-primary">The Visionary</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter mb-8">
                Turning complex problems into <span className="text-muted-foreground/30 italic">simple solutions.</span>
              </h2>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12"
            >
              I believe that design is not just how it looks, but how it works. My mission is to build products that are as functional as they are beautiful, ensuring every pixel serves a purpose.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Philosophy</h4>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  I prioritize accessibility and empathy in every project, ensuring digital spaces are inclusive for everyone.
                </p>
              </div>
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full border border-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <button 
                onClick={handleDownloadResume}
                className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black hover:shadow-2xl hover:shadow-primary/20 transition-all hover:-translate-y-1"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </button>
              <a href="#contact" className="flex items-center gap-3 px-8 py-4 border border-border rounded-2xl font-black hover:bg-secondary transition-all">
                The Process
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Awards Section Refined */}
        <div className="mt-40">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <h3 className="text-4xl font-bold tracking-tight mb-4">Global Recognition</h3>
              <p className="text-muted-foreground text-lg">My work has been recognized by industry leaders and featured in global design publications.</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 border border-border rounded-full flex items-center justify-center">
                <AwardIcon className="w-8 h-8 text-primary/30" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {AWARDS.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-secondary/30 border border-transparent hover:border-border hover:bg-background transition-all group"
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="text-sm font-black text-primary/40 group-hover:text-primary transition-colors">{award.year}</span>
                  <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                </div>
                <h4 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{award.title}</h4>
                <p className="text-muted-foreground font-medium">{award.organization}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}