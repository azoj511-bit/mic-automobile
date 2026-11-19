import React from 'react';
import { 
  Building2, Users, ShieldCheck, ArrowRight, Award, CheckCircle2, 
  Briefcase, Sparkles, MessageCircle 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProSolutionsPage: React.FC = () => {
  const { openInquiryModal } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-semibold tracking-wider uppercase">
          <Briefcase className="w-3.5 h-3.5 text-amber-300" />
          <span>Division Flottes & Entreprises</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white">
          Solutions Mobilité B2B & Chauffeurs VIP
        </h1>
        <p className="text-neutral-400 text-xs sm:text-sm font-light">
          MIC AUTOMOBILE accompagne les directions générales, hôtels de luxe, ambassades et sociétés de transport VIP dans la constitution et l optimisation de leur parc roulant.
        </p>
      </div>

      {/* Grid of B2B Solutions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-3xl space-y-4">
          <div className="p-3 bg-neutral-900 rounded-xl text-amber-300 border border-neutral-800 w-fit">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Navettes VIP & Salons Mobiles</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Fourniture de Mercedes Classe V Extra-Long et Sprinter aménagés avec cloison de confidentialité, Wi-Fi sécurisé et sièges Première Classe pour le transport de délégations et VIPs.
          </p>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-3xl space-y-4">
          <div className="p-3 bg-neutral-900 rounded-xl text-neutral-200 border border-neutral-800 w-fit">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Fiscalité Avantageuse (TVA 100%)</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Conseil expert sur l homologation utilitaire en Belgique et France : déductibilité intégrale de la TVA, exonération de taxe de mise en circulation et amortissement accéléré.
          </p>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-3xl space-y-4">
          <div className="p-3 bg-neutral-900 rounded-xl text-emerald-400 border border-neutral-800 w-fit">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Maintenance Prioritaire Atelier</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Contrats d entretien flotte avec véhicule de remplacement immédiat, prise en charge expresse sous 24h et suivi télématique personnalisé.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 rounded-3xl p-8 md:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
          Vous avez un projet de flotte ou de navette sur mesure ?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Rencontrez notre responsable des comptes B2B pour une étude fiscale et technique confidentielle.
        </p>
        <button
          onClick={() => openInquiryModal('contact')}
          className="px-8 py-3.5 bg-neutral-200 hover:bg-white text-black font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-xl"
        >
          <span>Prendre Contact avec le Département Flottes</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
