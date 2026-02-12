import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LegalMentions() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 font-bold text-xs uppercase tracking-widest">
          <ChevronLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Scale className="w-6 h-6" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              Mentions <span className="text-primary">Légales</span>
            </h1>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground font-medium leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">1. Édition du site</h2>
              <p>
                Le présent site, accessible à l'URL www.creative-portfolio.fr, est édité par :<br />
                Creative Studio SAS, au capital de 10 000 euros, inscrite au R.C.S. de Paris sous le numéro 123 456 789.<br />
                Siège social : 123 Avenue des Champs-Élysées, 75008 Paris.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">2. Hébergement</h2>
              <p>
                Le Site est hébergé par la société Vercel Inc., situé au 340 S Lemon Ave #1192 Walnut, CA 91789, USA.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">3. Directeur de publication</h2>
              <p>
                Le Directeur de la publication du Site est Alexandre Rivière.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">4. Propriété intellectuelle</h2>
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}