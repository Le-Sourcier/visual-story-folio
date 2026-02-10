import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { NewsletterForm } from './NewsletterForm';
import { AppointmentBooking } from './AppointmentBooking';

export function Contact() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(data);
    toast.success("Message envoyé ! Je vous répondrai très bientôt.");
    reset();
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 bg-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter & Booking Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <NewsletterForm />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <AppointmentBooking />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold mb-12 tracking-tighter"
            >
              Parlons de votre <span className="text-primary italic">prochain projet</span>.
            </motion.h2>
            
            <p className="text-xl text-muted-foreground mb-16 max-w-md font-medium leading-relaxed">
              Que vous ayez une idée précise ou juste une intuition, je suis là pour vous aider à la concrétiser.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Contact</h4>
                <div className="space-y-2">
                  <p className="font-bold text-lg">hello@creative.portfolio</p>
                  <p className="text-muted-foreground font-medium">+33 (0) 6 12 34 56 78</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Localisation</h4>
                <div className="space-y-2">
                  <p className="font-bold text-lg">Paris, France</p>
                  <p className="text-muted-foreground font-medium">Disponible pour missions remote</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-[3rem] bg-background border border-border shadow-2xl relative"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Nom Complet</label>
                  <input
                    {...register('name', { required: true })}
                    className="w-full bg-secondary/30 border-border rounded-2xl px-6 py-5 focus:ring-2 focus:ring-primary transition-all font-medium"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email</label>
                  <input
                    {...register('email', { required: true })}
                    type="email"
                    className="w-full bg-secondary/30 border-border rounded-2xl px-6 py-5 focus:ring-2 focus:ring-primary transition-all font-medium"
                    placeholder="jean@exemple.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Sujet</label>
                <select
                  {...register('subject')}
                  className="w-full bg-secondary/30 border-border rounded-2xl px-6 py-5 focus:ring-2 focus:ring-primary transition-all font-medium appearance-none"
                >
                  <option>Nouveau Projet</option>
                  <option>Collaboration</option>
                  <option>Demande d'information</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Votre Message</label>
                <textarea
                  {...register('message', { required: true })}
                  rows={5}
                  className="w-full bg-secondary/30 border-border rounded-2xl px-6 py-5 focus:ring-2 focus:ring-primary transition-all resize-none font-medium"
                  placeholder="Dites-m'en plus sur votre projet..."
                />
              </div>

              <button
                disabled={isSubmitting}
                className="w-full py-6 bg-primary text-primary-foreground rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-primary/30 transition-all disabled:opacity-70 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Envoyer le message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}