import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, ShieldCheck, ArrowRight, CheckCircle2, 
  ExternalLink, Lock, Wrench, Sparkles, MessageCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { t } = useLanguage();
  const { showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterConsent) {
      showToast('Veuillez renseigner votre email et accepter la politique de confidentialité');
      return;
    }
    setNewsletterSubscribed(true);
    showToast('Merci ! Vous êtes bien inscrit(e) aux alertes arrivages VIP de MIC AUTOMOBILE.');
    setNewsletterEmail('');
  };

  const handleNav = (route: string) => {
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-sm">
      {/* Top Banner / Trust Bar */}
      <div className="border-b border-neutral-900/80 bg-neutral-900/40 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className="p-3 bg-black rounded-lg text-amber-300 border border-neutral-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Garantie Européenne</h4>
              <p className="text-xs text-neutral-400">Jusqu à 24 mois pièces & main-d œuvre dans tout le réseau agréé</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className="p-3 bg-black rounded-lg text-neutral-200 border border-neutral-800">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Atelier & 120 Points</h4>
              <p className="text-xs text-neutral-400">Contrôle technique rigoureux, historique constructeur & Car-Pass</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className="p-3 bg-black rounded-lg text-amber-300 border border-neutral-800">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Sur Mesure & Vans VIP</h4>
              <p className="text-xs text-neutral-400">Aménagements personnalisés pour particuliers et professionnels</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className="p-3 bg-black rounded-lg text-emerald-400 border border-neutral-800">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Conseil & WhatsApp Direct</h4>
              <p className="text-xs text-neutral-400">Équipe dédiée à votre écoute 6 jours sur 7 à Bruxelles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center p-1.5">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M20 75 L20 25 L45 55 L70 25 L70 75" stroke="#D9D9D9" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="85" cy="30" r="7" fill="#C5A880" />
              </svg>
            </div>
            <span className="font-display font-extrabold text-xl tracking-wider text-white">
              MIC <span className="text-neutral-400 font-light">AUTOMOBILE</span>
            </span>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed max-w-md">
            Société spécialisée dans l importation, la vente et l aménagement haut de gamme de véhicules d exception et de vans VIP à Bruxelles. Nous allions rigueur technique mécanique, innovation d aménagement et confiance durable.
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-neutral-300 shrink-0" />
              <span>Avenue Louise 475, 1050 Bruxelles, Belgique</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-neutral-300 shrink-0" />
              <a href="tel:+3228997450" className="hover:text-white transition-colors">+32 2 899 74 50</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-neutral-300 shrink-0" />
              <a href="mailto:contact@mic-automobile.be" className="hover:text-white transition-colors">contact@mic-automobile.be</a>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <a 
              href="https://wa.me/3228997450?text=Bonjour,%20je%20souhaite%20des%20renseignements%20sur%20un%20v%C3%A9hicule%20MIC%20AUTOMOBILE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-medium hover:bg-emerald-900 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* Col 2: Navigation Rapide */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Catalogue & Stock</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => handleNav('stock')} className="hover:text-white transition-colors">
                Tous les véhicules en stock
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('stock?categorie=Van')} className="hover:text-white transition-colors flex items-center gap-1.5">
                <span>Vans VIP & Utilitaires</span>
                <span className="text-[10px] bg-amber-900/60 text-amber-300 px-1.5 rounded">11</span>
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('stock?categorie=SUV')} className="hover:text-white transition-colors">
                SUV & 4x4 Premium
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('stock?categorie=Berline')} className="hover:text-white transition-colors">
                Berlines de Prestige
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('stock?categorie=Sportive')} className="hover:text-white transition-colors">
                Sportives & Coupés
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('recommandation')} className="hover:text-white transition-colors text-amber-300/90 font-medium">
                → Trouver mon véhicule (Quiz 7 étapes)
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Services & Projets */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Services & Atelier</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => handleNav('sur-mesure')} className="hover:text-white transition-colors text-neutral-300 font-medium">
                Configurateur Van Sur Mesure
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('atelier')} className="hover:text-white transition-colors">
                Prendre Rendez-vous Atelier
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('financement')} className="hover:text-white transition-colors">
                Financement & Leasing (LOA/LLD)
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('financement')} className="hover:text-white transition-colors">
                Estimation & Reprise de véhicule
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('professionnels')} className="hover:text-white transition-colors">
                Flottes d Entreprise & Chauffeurs VIP
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('ressources')} className="hover:text-white transition-colors">
                Guides d achat & Fiscalité
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Horaires & Newsletter */}
        <div className="space-y-4">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Newsletter Privilège</h4>
          <p className="text-xs text-neutral-400">
            Recevez nos arrivages exclusifs et opportunités avant leur mise en ligne publique.
          </p>

          <form onSubmit={handleNewsletter} className="space-y-2.5">
            <div className="relative">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Votre adresse email..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
              />
              <button
                type="submit"
                aria-label="S'inscrire"
                className="absolute right-1 top-1 bottom-1 px-3 bg-neutral-200 hover:bg-white text-black font-semibold rounded text-xs transition-colors flex items-center justify-center"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <label className="flex items-start gap-2 text-[11px] text-neutral-500 cursor-pointer">
              <input
                type="checkbox"
                checked={newsletterConsent}
                onChange={(e) => setNewsletterConsent(e.target.checked)}
                className="mt-0.5 rounded bg-neutral-900 border-neutral-700 text-neutral-200 focus:ring-0"
              />
              <span>J accepte de recevoir les communications de MIC AUTOMOBILE (désinscription en 1 clic).</span>
            </label>
          </form>

          <div className="pt-2 border-t border-neutral-900 text-xs text-neutral-500 space-y-1">
            <div className="font-semibold text-neutral-400">Horaires Showroom & Atelier :</div>
            <div>Du Lundi au Samedi : 09h00 – 19h00</div>
            <div>Dimanche : Sur rendez-vous exclusif</div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-neutral-900 py-6 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} MIC AUTOMOBILE SA — Numéro d enregistrement KRS/BCE 00323819 — Tous droits réservés.
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button onClick={() => handleNav('legal')} className="hover:text-neutral-300 transition-colors">
              Mentions Légales
            </button>
            <button onClick={() => handleNav('legal#privacy')} className="hover:text-neutral-300 transition-colors">
              Politique de Confidentialité
            </button>
            <button onClick={() => handleNav('legal#cookies')} className="hover:text-neutral-300 transition-colors">
              Gestion des Cookies
            </button>
            <button 
              onClick={() => handleNav('admin')} 
              className="hover:text-neutral-300 transition-colors flex items-center gap-1 text-neutral-600 hover:text-neutral-400"
            >
              <Lock className="w-3 h-3" />
              <span>Espace Équipe</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
