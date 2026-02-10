import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, ChevronRight, Check } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';

export function AppointmentBooking() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [step, setStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const times = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  const handleBook = () => {
    toast.success("Rendez-vous réservé avec succès !");
    setStep(3);
  };

  return (
    <div className="p-8 rounded-[2.5rem] bg-card border border-border shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10" />
      
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <CalendarIcon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-black tracking-tight">Prendre rendez-vous</h3>
          <p className="text-sm text-muted-foreground font-medium italic">Discutons de votre projet</p>
        </div>
      </div>

      <div className="space-y-8">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary">1. Choisir une date</label>
              <div className="bg-background border border-border rounded-3xl p-4 shadow-inner">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={fr}
                  className="rounded-md"
                />
              </div>
            </div>
            <button 
              onClick={() => setStep(2)}
              className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/20 transition-all"
            >
              Suivant <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary">2. Choisir un horaire</label>
              <div className="grid grid-cols-2 gap-3">
                {times.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-4 rounded-xl font-bold transition-all border ${
                      selectedTime === time 
                        ? "bg-primary text-primary-foreground border-primary shadow-lg" 
                        : "bg-background border-border hover:border-primary/50"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setStep(1)}
                className="flex-1 py-4 border border-border rounded-2xl font-bold hover:bg-secondary transition-all text-sm"
              >
                Retour
              </button>
              <button 
                disabled={!selectedTime}
                onClick={handleBook}
                className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/20 transition-all disabled:opacity-50"
              >
                Confirmer
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-6">
            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-2xl font-black tracking-tight">C'est réservé !</h4>
              <p className="text-muted-foreground font-medium mt-2">
                RDV le {date && format(date, 'd MMMM yyyy', { locale: fr })} à {selectedTime}.
              </p>
            </div>
            <button 
              onClick={() => { setStep(1); setSelectedTime(null); }}
              className="text-primary font-black uppercase text-[10px] tracking-widest hover:underline"
            >
              Prendre un autre RDV
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}