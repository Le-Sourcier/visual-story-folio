import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PrivacyPolicy() {
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
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              Politique de <span className="text-primary">Confidentialité</span>
            </h1>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground font-medium leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">1. Collecte des données</h2>
              <p>
                Nous collectons les informations que vous nous fournissez directement via nos formulaires de contact et de réservation. Cela inclut votre nom, adresse e-mail, et les détails de votre projet.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">2. Utilisation des données</h2>
              <p>
                Les données collectées sont utilisées uniquement pour répondre à vos demandes, gérer vos réservations et vous envoyer notre newsletter si vous y avez consenti.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">3. Conservation des données</h2>
              <p>
                Nous conservons vos données personnelles uniquement pour la durée nécessaire aux finalités pour lesquelles elles ont été collectées.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">4. Vos droits</h2>
              <p>
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de vos données personnelles.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}