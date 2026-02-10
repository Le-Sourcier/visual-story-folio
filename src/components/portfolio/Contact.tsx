import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

export function Contact() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(data);
    toast.success("Message sent! I'll get back to you soon.");
    reset();
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-8"
            >
              Let's create something <span className="text-primary italic">extraordinary</span>.
            </motion.h2>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-md">
              Whether you have a fully-formed idea or just a spark, I'd love to help you bring it to life.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">Email Me</h4>
                  <p className="text-muted-foreground">hello@creative.portfolio</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">Location</h4>
                  <p className="text-muted-foreground">Shoreditch, London</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">Phone</h4>
                  <p className="text-muted-foreground">+44 (0) 20 7946 0958</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl bg-background border border-border shadow-xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider opacity-70">Name</label>
                  <input
                    {...register('name', { required: true })}
                    className="w-full bg-secondary/50 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider opacity-70">Email</label>
                  <input
                    {...register('email', { required: true })}
                    type="email"
                    className="w-full bg-secondary/50 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider opacity-70">Subject</label>
                <select
                  {...register('subject')}
                  className="w-full bg-secondary/50 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary transition-all"
                >
                  <option>New Project</option>
                  <option>Collaboration</option>
                  <option>Just saying hi</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider opacity-70">Message</label>
                <textarea
                  {...register('message', { required: true })}
                  rows={5}
                  className="w-full bg-secondary/50 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                disabled={isSubmitting}
                className="w-full py-5 bg-primary text-primary-foreground rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-primary/20 transition-all disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message
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