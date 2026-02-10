import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, ChevronRight, Check, MessageSquare, AlertCircle } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';

export function AppointmentBooking() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [step, setStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [sujet, setSujet] = useState("");
  const [urgence, setUrgence] = useState("non-urgent");

  const times = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  const handleBook = () => {
    if (!sujet) {
      toast.error("Veuillez renseigner le sujet de votre demande.");
      return;
    }
    toast.success("Rendez-vous réservé avec succès !");
    setStep(3);
  };

  return (
    <div id="booking" className="p-8 md:p-12 rounded-[2.5rem] bg-card border border-border shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10" />
      
      <div className="flex items-center gap-4 mb-12">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <CalendarIcon className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-3xl font-black tracking-tight">Prendre rendez-vous</h3>
          <p className="text-sm text-muted-foreground font-medium italic">Discutons de votre projet en direct</p>
        </div>
      </div>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary">1. Choisir une date</label>
                  <div className="bg-background border border-border rounded-3xl p-4 shadow-inner inline-block">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      locale={fr}
                      className="rounded-md"
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                      <MessageSquare className="w-3 h-3" /> Sujet de la demande
                    </label>
                    <Input 
                      placeholder="Ex: Refonte site e-commerce, Identité visuelle..."
                      value={sujet}
                      onChange={(e) => setSujet(e.target.value)}
                      className="h-14 rounded-2xl bg-background border-border focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                      <AlertCircle className="w-3 h-3" /> Niveau d'urgence
                    </label>
                    <RadioGroup 
                      value={urgence} 
                      onValueChange={setUrgence}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <div className="flex items-center space-x-3 bg-background p-4 rounded-2xl border border-border hover:border-primary/30 transition-colors flex-1">
                        <RadioGroupItem value="non-urgent" id="r1" />
                        <Label htmlFor="r1" className="font-bold cursor-pointer">Non urgent</Label>
                      </div>
                      <div className="flex items-center space-x-3 bg-background p-4 rounded-2xl border border-border hover:border-primary/30 transition-colors flex-1">
                        <RadioGroupItem value="urgent" id="r2" />
                        <Label htmlFor="r2" className="font-bold cursor-pointer">Urgent 🔥</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-black flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/20 transition-all"
              >
                Choisir l'horaire <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary">2. Choisir un horaire</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {times.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-5 rounded-2xl font-bold transition-all border ${
                        selectedTime === time 
                          ? "bg-primary text-primary-foreground border-primary shadow-lg scale-[1.02]" 
                          : "bg-background border-border hover:border-primary/50"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 py-5 border border-border rounded-2xl font-bold hover:bg-secondary transition-all text-sm uppercase tracking-widest"
                >
                  Retour
                </button>
                <button 
                  disabled={!selectedTime}
                  onClick={handleBook}
                  className="flex-[2] py-5 bg-primary text-primary-foreground rounded-2xl font-black flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/20 transition-all disabled:opacity-50 uppercase tracking-widest"
                >
                  Confirmer la réservation
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 space-y-8"
            >
              <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h4 className="text-3xl font-black tracking-tight">C'est réservé !</h4>
                <p className="text-muted-foreground font-medium text-lg">
                  Nous avons bien noté votre demande pour le sujet : <span className="text-foreground font-bold">"{sujet}"</span>
                </p>
                <p className="text-muted-foreground font-medium">
                  RDV le {date && format(date, 'd MMMM yyyy', { locale: fr })} à {selectedTime}.
                </p>
              </div>
              <button 
                onClick={() => { setStep(1); setSelectedTime(null); setSujet(""); }}
                className="px-8 py-4 bg-secondary text-foreground rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-secondary/80 transition-all"
              >
                Prendre un autre RDV
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}