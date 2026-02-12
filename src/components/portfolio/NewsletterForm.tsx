import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSubscribed(true);
    toast.success("Bienvenue dans la newsletter !");
  };

  return (
    <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10">
      <div className="flex flex-col gap-6">
        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
          <Mail className="w-6 h-6" />
        </div>
        
        <div>
          <h3 className="text-2xl font-black tracking-tight mb-2">Restez informé</h3>
          <p className="text-muted-foreground font-medium text-sm">Recevez mes dernières réflexions sur le design et le code directement dans votre boîte mail.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={subscribed}
            placeholder="votre@email.com"
            className="w-full bg-background border-border rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary transition-all disabled:opacity-50"
            required
          />
          <button
            type="submit"
            disabled={loading || subscribed}
            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-black hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : subscribed ? (
              <>
                Inscrit ! <Check className="w-5 h-5" />
              </>
            ) : (
              "S'abonner"
            )}
          </button>
        </form>
        
        <p className="text-[10px] text-muted-foreground/50 font-medium text-center italic">
          Pas de spam, promis. Désabonnez-vous à tout moment.
        </p>
      </div>
    </div>
  );
}