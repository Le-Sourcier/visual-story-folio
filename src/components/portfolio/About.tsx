import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Award as AwardIcon, CheckCircle2, Code2, Rocket, Globe, Zap } from 'lucide-react';
import { AWARDS } from '../../data/mockData';

export function About() {
  const profileImage = 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/564508a5-e18e-4304-b909-f59e34b774ee/profile-picture-4826774e-1770728429712.webp';

  const handleDownloadResume = () => {
    // Mock resume download
    const content = `CV Alexandre Rivière - Développeur Fullstack & Architecte Frontend

EXPÉRIENCE
- Lead Frontend Developer @ TechSolutions (2020-Present)
- Senior React Developer @ WebCreative (2017-2020)
- UI/UX Designer @ DesignLab (2014-2017)

COMPÉTENCES
- React 19, Next.js, TypeScript
- Node.js, Supabase, PostgreSQL
- Tailwind CSS, Framer Motion, Figma

FORMATION
- Master en Informatique, École Polytechnique`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'CV_Alexandre_Riviere.txt');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const skills = [
    { name: "React 19 & Next.js", icon: <Code2 className="w-4 h-4" /> },
    { name: "TypeScript Strict", icon: <CheckCircle2 className="w-4 h-4" /> },
    { name: "Node.js & Backend", icon: <Zap className="w-4 h-4" /> },
    { name: "UI/UX & Figma", icon: <Rocket className="w-4 h-4" /> },
    { name: "Design Systems", icon: <Globe className="w-4 h-4" /> },
    { name: "Performance Web", icon: <AwardIcon className="w-4 h-4" /> }
  ];

  return (
    <section id="about" className="py-32 px-6 md:px-12 lg:px-24 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden group border border-white/5 shadow-2xl">
              <img 
                src={profileImage} 
                alt="Alexandre Rivière" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
            </div>
            
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-10 -right-6 md:-right-12 bg-card/80 backdrop-blur-2xl border border-border p-8 rounded-[2.5rem] shadow-2xl max-w-[260px] hidden sm:block"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/20">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-black text-4xl tracking-tighter text-primary">10+</h4>
              </div>
              <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] leading-relaxed">
                Années d'expertise en ingénierie logicielle
              </p>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-16 h-[2px] bg-primary rounded-full" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">Le Profil</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-black leading-[0.85] tracking-tighter mb-10 uppercase">
                Alexandre <br /><span className="text-primary italic">Rivière</span>
              </h2>
              <p className="text-2xl md:text-3xl text-muted-foreground leading-tight font-medium">
                Architecte Frontend & Expert en Expériences <span className="text-foreground border-b-4 border-primary/20">Digitales Immersives.</span>
              </p>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground leading-relaxed mb-16 max-w-2xl font-medium"
            >
              Spécialisé dans la création d'écosystèmes web robustes et scalables. Mon approche fusionne l'excellence technique avec un design centré sur l'utilisateur pour transformer des concepts complexes en solutions fluides.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-20">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/50">Expertise</h4>
                <div className="grid grid-cols-1 gap-4">
                  {skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-3 group cursor-default">
                      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        {skill.icon}
                      </div>
                      <span className="text-sm font-bold tracking-tight">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/50">Formation</h4>
                <div className="space-y-4">
                  <div>
                    <p className="font-black text-sm uppercase tracking-wider">Master Informatique</p>
                    <p className="text-xs text-muted-foreground font-bold italic">École Polytechnique, Paris</p>
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase tracking-wider">Certification UI/UX</p>
                    <p className="text-xs text-muted-foreground font-bold italic">Design Institute of Technology</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-8">
              <button 
                onClick={handleDownloadResume}
                className="group flex items-center gap-4 px-10 py-5 bg-primary text-primary-foreground rounded-[2rem] font-black hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1 active:scale-95"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Télécharger mon CV
              </button>
              <a href="#contact" className="flex items-center gap-4 px-10 py-5 border-2 border-border rounded-[2rem] font-black hover:bg-secondary transition-all hover:border-primary/30">
                Me contacter
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Global Recognition Section */}
        <div className="mt-48">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-12">
            <div className="max-w-2xl">
              <div className="w-12 h-1 bg-primary mb-8" />
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase">Reconnaissance <span className="text-primary">Mondiale</span></h3>
              <p className="text-xl text-muted-foreground font-medium">Récompensé par les institutions les plus prestigieuses du design numérique pour mon souci du détail et mon innovation.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AWARDS.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[3rem] bg-secondary/20 border border-transparent hover:border-primary/20 hover:bg-card transition-all duration-500 group relative"
              >
                <div className="flex justify-between items-start mb-12">
                  <span className="text-xs font-black text-primary/40 group-hover:text-primary transition-colors tracking-widest">{award.year}</span>
                  <AwardIcon className="w-6 h-6 text-primary/20 group-hover:text-primary transition-colors" />
                </div>
                <h4 className="font-black text-xl mb-3 group-hover:text-primary transition-colors uppercase tracking-tight leading-tight">{award.title}</h4>
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest opacity-60">{award.organization}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}