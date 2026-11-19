import React from 'react';
import { 
  ShieldCheck, Award, MapPin, Clock, Phone, Mail, CheckCircle2, 
  Users, Sparkles, Building, ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface AboutPageProps {
  navigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  const { openInquiryModal } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-20">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-semibold tracking-wider uppercase">
          <Building className="w-3.5 h-3.5 text-amber-300" />
          <span>Histoire & Philosophie</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white">
          L'Excellence Automobile à Bruxelles
        </h1>
        <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
          Fondée par des passionnés de mécanique de précision et d ingénierie de pointe, MIC AUTOMOBILE s impose comme la référence multimarque premium et le spécialiste reconnu de la confection de vans VIP en Belgique et en Europe.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-3xl space-y-4 relative overflow-hidden">
          <div className="text-amber-400 font-display font-extrabold text-4xl">01</div>
          <h3 className="text-lg font-bold text-white">Mécanique</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Une expertise technique sans compromis. Tous nos véhicules subissent une inspection méticuleuse de 120 points dans notre atelier agréé avant d intégrer le parc.
          </p>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-3xl space-y-4 relative overflow-hidden">
          <div className="text-amber-400 font-display font-extrabold text-4xl">02</div>
          <h3 className="text-lg font-bold text-white">Innovation</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Pionniers dans l aménagement de salons mobiles de luxe et de vans de haute technologie (intégration 5G, domotique embarquée, insonorisation phonique de studio).
          </p>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-3xl space-y-4 relative overflow-hidden">
          <div className="text-amber-400 font-display font-extrabold text-4xl">03</div>
          <h3 className="text-lg font-bold text-white">Confiance</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Transparence totale, traçabilité certifiée Car-Pass, absence d accident prouvée et garantie 24 mois valable dans tous les réseaux constructeurs en Europe.
          </p>
        </div>
      </div>

      {/* Showroom & Facility */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
            Visite & Expérience Client
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Notre Showroom d Avenue Louise
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
            Situé au cœur de la capitale européenne, notre showroom vous accueille dans un espace épuré et confidentiel pour découvrir nos berlines de prestige, sportives exclusives et tester nos configurations de vans aménagés.
          </p>

          <div className="space-y-3 text-xs text-neutral-300">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-neutral-300 shrink-0" />
              <span>Avenue Louise 475, 1050 Bruxelles, Belgique</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-neutral-300 shrink-0" />
              <span>Du Lundi au Samedi de 09h00 à 19h00 (Dimanche sur rendez-vous)</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-neutral-300 shrink-0" />
              <span>+32 2 899 74 50</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => openInquiryModal('contact')}
              className="px-6 py-3 bg-neutral-200 hover:bg-white text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
            >
              Prendre Rendez-vous Showroom
            </button>
            <button
              onClick={() => navigate('stock')}
              className="px-6 py-3 bg-neutral-900 border border-neutral-800 text-white font-semibold rounded-xl text-xs hover:border-neutral-700 transition-colors"
            >
              Voir le Stock Actuel
            </button>
          </div>
        </div>

        {/* Showroom Visual */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900">
          <img 
            src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1000" 
            alt="MIC AUTOMOBILE Showroom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-xs bg-black/60 backdrop-blur-md p-3 rounded-xl border border-neutral-800">
            <span className="font-bold text-white">Espace Showroom & Lounge Privilège</span>
            <p className="text-[11px] text-neutral-400">Présentation des cuirs, boiseries et essais sur route personnalisés</p>
          </div>
        </div>
      </div>
    </div>
  );
};
