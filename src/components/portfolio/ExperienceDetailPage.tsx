import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Building2,
  ExternalLink,
  Cpu,
  Trophy,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { cvData } from '../../data/cvData';
import { Badge } from '../ui/badge';
import { MarkdownRenderer } from '../shared/MarkdownRenderer';
import { useExperience } from '@/hooks/queries';
import type { Experience } from '@/types/admin.types';

// ======================== COMPONENT ========================

export function ExperienceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  // API query
  const { data: apiExperience, isLoading } = useExperience(id || '');

  // Fallback to mock data
  const mockExperience = cvData.experience.find(exp => exp.id === id);

  // Resolve (API first, mock fallback)
  const experience = (apiExperience as Experience | undefined) || (mockExperience as unknown as Experience) || null;
  const loading = isLoading && !mockExperience;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!loading && !experience) {
      navigate('/404');
    }
  }, [loading, experience, navigate]);

  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 1.1]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!experience) return null;

  const defaultCover = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070';

  return (
    <div className="min-h-screen bg-background">
      {/* ======================== HERO ======================== */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <motion.div style={{ opacity, scale }} className="absolute inset-0">
          <img
            src={experience.coverImage || defaultCover}
            alt={experience.company}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-background/20 to-background" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-12">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to="/#about"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Retour au profil
              </Link>

              <div className="flex flex-wrap gap-4 mb-6">
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20 backdrop-blur-md px-4 py-1">
                  {experience.company}
                </Badge>
                <Badge variant="outline" className="text-white border-white/20 backdrop-blur-md px-4 py-1">
                  {experience.dates}
                </Badge>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase leading-[0.9]">
                {experience.title}
              </h1>

              <div className="flex flex-wrap gap-6 text-white/60">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <span className="font-medium">{experience.company}</span>
                </div>
                {experience.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-medium">{experience.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-medium">{experience.dates}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================== CONTENT ======================== */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Main content */}
            <div className="lg:col-span-8 space-y-24">

              {/* Description */}
              {experience.description && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <SectionHeader label="Contexte" />
                  <div className="text-2xl md:text-3xl font-medium leading-relaxed text-muted-foreground">
                    <MarkdownRenderer content={experience.description} />
                  </div>
                </motion.div>
              )}

              {/* Details */}
              {experience.details && experience.details.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <SectionHeader label="Responsabilites" />
                  <div className="grid gap-6">
                    {experience.details.map((detail, idx) => (
                      <div key={idx} className="flex gap-4 p-6 rounded-2xl bg-secondary/30 border border-border/50">
                        <div className="mt-1"><ChevronRight className="w-5 h-5 text-primary" /></div>
                        <p className="font-medium">{detail}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Stack */}
              {experience.stack && experience.stack.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <SectionHeader label="Stack Technique" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {experience.stack.map((tech, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center p-6 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all group">
                        <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Cpu className="w-6 h-6 text-primary" />
                        </div>
                        <span className="font-black text-sm uppercase tracking-tighter">{tech}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Challenges */}
              {experience.challenges && experience.challenges.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <SectionHeader label="Defis & Solutions" />
                  <div className="space-y-8">
                    {experience.challenges.map((challenge, idx) => (
                      <div key={idx} className="relative pl-12">
                        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <AlertCircle className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-lg font-medium text-foreground/80 leading-relaxed">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-12">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="sticky top-32 space-y-12">

                {/* Achievements */}
                {experience.achievements && experience.achievements.length > 0 && (
                  <div className="p-10 rounded-[2.5rem] bg-card border border-border shadow-sm">
                    <div className="flex items-center gap-3 mb-10">
                      <Trophy className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-black uppercase tracking-tight">Realisations</h3>
                    </div>
                    <div className="space-y-8">
                      {experience.achievements.map((ach, idx) => (
                        <div key={idx} className="group">
                          <div className="flex items-start gap-4 mb-2">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <h4 className="font-black text-sm uppercase tracking-wider">{ach.title}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground pl-6 font-medium leading-relaxed">{ach.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                {experience.links && experience.links.length > 0 && (
                  <div className="p-10 rounded-[2.5rem] bg-secondary/30 border border-border">
                    <h3 className="text-lg font-black uppercase tracking-tight mb-8">Liens utiles</h3>
                    <div className="space-y-4">
                      {experience.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-all group"
                        >
                          <span className="font-bold text-sm uppercase tracking-tight">{link.label}</span>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ======================== SECTION HEADER ========================

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-12 h-[2px] bg-primary rounded-full" />
      <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">{label}</span>
    </div>
  );
}
