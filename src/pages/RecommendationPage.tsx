import React, { useState } from 'react';
import { 
  Sliders, ArrowRight, Check, CheckCircle2, RotateCcw, 
  Sparkles, Car, ShieldCheck, Heart, User, Send
} from 'lucide-react';
import { VEHICLES_DATA } from '../data/vehicles';
import { Vehicle } from '../types/vehicle';
import { VehicleCard } from '../components/VehicleCard';
import { useStore } from '../context/StoreContext';

interface RecommendationPageProps {
  onSelectVehicle: (slug: string) => void;
  navigate: (route: string) => void;
}

export const RecommendationPage: React.FC<RecommendationPageProps> = ({ 
  onSelectVehicle,
  navigate
}) => {
  const { addInquiry, showToast } = useStore();

  const [step, setStep] = useState(1);

  // Questionnaire responses
  const [vehicleType, setVehicleType] = useState<string>('Van VIP & Navette');
  const [priority, setPriority] = useState<string>('Confort & Luxe');
  const [usage, setUsage] = useState<string>('Professionnel & VIP');
  const [partition, setPartition] = useState<string>('Oui');
  const [bar, setBar] = useState<string>('Oui');
  const [bathroom, setBathroom] = useState<string>('Sans objet');

  // Contact info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Belgique');
  const [consent, setConsent] = useState(true);

  // Result matches
  const [results, setResults] = useState<{ vehicle: Vehicle; score: number }[] | null>(null);

  const calculateMatches = () => {
    const scored = VEHICLES_DATA.map(v => {
      let score = 50;

      // Type
      if (vehicleType.includes('Van') && v.isVan) score += 30;
      if (vehicleType.includes('SUV') && v.category === 'SUV / 4x4') score += 30;
      if (vehicleType.includes('Berline') && v.category === 'Berline') score += 30;
      if (vehicleType.includes('Sportive') && v.category === 'Sportive / Coupé') score += 30;

      // Priority
      if (priority.includes('Confort') && (v.brand === 'Mercedes-Benz' || v.brand === 'Audi' || v.brand === 'Porsche')) score += 10;
      if (priority.includes('Performance') && (v.powerCh >= 200)) score += 10;
      if (priority.includes('Espace') && (v.seats >= 7 || v.isVan)) score += 10;

      // Usage
      if (usage.includes('Voyage') && (v.isVan || v.vanAmenities?.hasBed)) score += 15;
      if (usage.includes('Professionnel') && (v.isVan || v.category === 'Berline')) score += 10;

      // Options
      if (partition === 'Oui' && v.vanAmenities?.hasPartition) score += 15;
      if (bar === 'Oui' && v.vanAmenities?.hasMinibar) score += 10;
      if (bathroom === 'Oui' && v.vanAmenities?.hasKitchen) score += 10;

      return {
        vehicle: v,
        score: Math.min(98, score)
      };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 4);
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      showToast('Veuillez renseigner vos coordonnées');
      return;
    }

    const matches = calculateMatches();
    setResults(matches);

    addInquiry({
      type: 'contact',
      name: fullName,
      email,
      phone,
      message: `Résultats Quiz Recommandation : Type: ${vehicleType}, Priorité: ${priority}, Usage: ${usage}, Pays: ${country}`
    });

    setStep(8);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-semibold tracking-wider uppercase">
          <Sliders className="w-3.5 h-3.5 text-amber-300" />
          <span>Assistant de Sélection Multimarque</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
          Trouvez Votre Véhicule Idéal en 7 Étapes
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl mx-auto">
          Répondez à quelques questions ciblées pour identifier les modèles de notre parc répondant le plus précisément à votre usage et mode de vie.
        </p>
      </div>

      {/* Progress Bar */}
      {step <= 7 && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-neutral-400">
            <span>Question {step} sur 7</span>
            <span>{Math.round((step / 7) * 100)}% complété</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-neutral-200 to-amber-300 transition-all duration-300"
              style={{ width: `${(step / 7) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* QUESTIONNAIRE CARDS */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
        {/* STEP 1: TYPE */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-lg font-bold text-white">Étape 1 : Quel type de véhicule recherchez-vous ?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { title: 'Van VIP & Navette', desc: 'Salon mobile, transport de direction, confort première classe' },
                { title: 'Van de Loisirs & Camping-Car', desc: 'Toit relevable, couchage, bloc cuisine, autonomie voyage' },
                { title: 'SUV & 4x4 Haut de Gamme', desc: 'Polyvalence, transmission intégrale, volume et sécurité' },
                { title: 'Berline de Prestige & Grand Tourisme', desc: 'Acoustique parfaite, élégance statutaire et dynamisme' }
              ].map(item => (
                <div
                  key={item.title}
                  onClick={() => setVehicleType(item.title)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    vehicleType === item.title
                      ? 'bg-neutral-900 border-white text-white font-semibold'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-sm text-white mb-1">{item.title}</div>
                  <div className="text-[11px] text-neutral-500">{item.desc}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-neutral-200 hover:bg-white text-black font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <span>Suivant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PRIORITY */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-lg font-bold text-white">Étape 2 : Quelle est votre priorité absolue ?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                'Confort & Luxe des matériaux (Cuir Nappa, insonorisation)',
                'Espace & Praticité (Nombre de places, modularité)',
                'Haute Technologie & Multimédia (Écrans, Wi-Fi, sono)',
                'Performance & Agrément de conduite (Puissance, 4 roues motrices)',
                'Intimité & Confidentialité (Vitres teintées, cloison)',
                'Autonomie & Économie (Faible consommation, hybride)'
              ].map(opt => (
                <div
                  key={opt}
                  onClick={() => setPriority(opt)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    priority === opt
                      ? 'bg-neutral-900 border-white text-white font-semibold'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {opt}
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(1)} className="px-5 py-2 text-xs text-neutral-400 hover:text-white">
                Précédent
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-neutral-200 hover:bg-white text-black font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <span>Suivant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: USAGE */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-lg font-bold text-white">Étape 3 : Quel sera l usage principal du véhicule ?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                'Professionnel & VIP (Transferts clients, bureau mobile)',
                'Famille nombreuse & Trajets quotidiens',
                'Voyages longue distance & Évasion le week-end',
                'Représentation d entreprise & Événementiel'
              ].map(u => (
                <div
                  key={u}
                  onClick={() => setUsage(u)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    usage === u
                      ? 'bg-neutral-900 border-white text-white font-semibold'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {u}
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(2)} className="px-5 py-2 text-xs text-neutral-400 hover:text-white">
                Précédent
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-2.5 bg-neutral-200 hover:bg-white text-black font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <span>Suivant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: PARTITION */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-lg font-bold text-white">Étape 4 : Souhaitez-vous une cloison de confidentialité chauffeur ?</h3>
            <p className="text-xs text-neutral-400">Séparation physique et acoustique motorisée entre le poste de conduite et le salon passagers.</p>
            <div className="grid grid-cols-3 gap-3 text-xs">
              {['Oui', 'Non', 'Sans objet'].map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPartition(p)}
                  className={`py-4 rounded-xl border font-semibold transition-all ${
                    partition === p
                      ? 'bg-neutral-900 border-white text-white shadow'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(3)} className="px-5 py-2 text-xs text-neutral-400 hover:text-white">
                Précédent
              </button>
              <button
                onClick={() => setStep(5)}
                className="px-6 py-2.5 bg-neutral-200 hover:bg-white text-black font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <span>Suivant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: BAR */}
        {step === 5 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-lg font-bold text-white">Étape 5 : Avez-vous besoin d un bar réfrigéré / machine espresso à bord ?</h3>
            <div className="grid grid-cols-3 gap-3 text-xs">
              {['Oui', 'Non', 'Sans objet'].map(b => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBar(b)}
                  className={`py-4 rounded-xl border font-semibold transition-all ${
                    bar === b
                      ? 'bg-neutral-900 border-white text-white shadow'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(4)} className="px-5 py-2 text-xs text-neutral-400 hover:text-white">
                Précédent
              </button>
              <button
                onClick={() => setStep(6)}
                className="px-6 py-2.5 bg-neutral-200 hover:bg-white text-black font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <span>Suivant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: BATHROOM / SLEEPING */}
        {step === 6 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-lg font-bold text-white">Étape 6 : Espace sanitaire ou couchage intégré requis ?</h3>
            <p className="text-xs text-neutral-400">Pour vans de loisirs ou trajets très longue distance.</p>
            <div className="grid grid-cols-3 gap-3 text-xs">
              {['Oui', 'Non', 'Sans objet'].map(bath => (
                <button
                  key={bath}
                  type="button"
                  onClick={() => setBathroom(bath)}
                  className={`py-4 rounded-xl border font-semibold transition-all ${
                    bathroom === bath
                      ? 'bg-neutral-900 border-white text-white shadow'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {bath}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(5)} className="px-5 py-2 text-xs text-neutral-400 hover:text-white">
                Précédent
              </button>
              <button
                onClick={() => setStep(7)}
                className="px-6 py-2.5 bg-neutral-200 hover:bg-white text-black font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <span>Dernière étape (Coordonnées)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: CONTACT FORM */}
        {step === 7 && (
          <form onSubmit={handleFinish} className="space-y-5 animate-fade-in text-xs">
            <div>
              <h3 className="text-lg font-bold text-white">Étape 7 : Où devons-nous vous transmettre vos recommandations ?</h3>
              <p className="text-neutral-400">Vos correspondances personnalisées parmi nos 73 véhicules en stock.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Nom et Prénom *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jean-Michel Dupont"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Téléphone *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+32 4..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Adresse Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jean.dupont@gmail.com"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Pays / Région de résidence</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Belgique">Belgique</option>
                  <option value="France">France</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Pays-Bas">Pays-Bas</option>
                  <option value="Suisse">Suisse</option>
                  <option value="Autre">Autre pays européen</option>
                </select>
              </div>
            </div>

            <label className="flex items-start gap-2 text-[11px] text-neutral-400 cursor-pointer pt-2">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded bg-neutral-900 border-neutral-700 text-neutral-200"
              />
              <span>J accepte d être recontacté(e) pour recevoir la sélection de véhicules adaptée.</span>
            </label>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(6)}
                className="px-5 py-2 text-neutral-400 hover:text-white"
              >
                Précédent
              </button>
              <button
                type="submit"
                className="px-8 py-3.5 bg-gradient-to-r from-neutral-200 to-neutral-300 hover:from-white hover:to-neutral-100 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-xl transition-all flex items-center gap-2"
              >
                <span>Découvrir mes véhicules correspondants</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 8: RESULTS DISPLAY */}
        {step === 8 && results && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2 border-b border-neutral-800 pb-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Vos Correspondances Identifiées</h3>
              <p className="text-xs text-neutral-400">
                Voici les véhicules du stock MIC AUTOMOBILE présentant la plus forte affinité avec vos critères :
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {results.map(({ vehicle, score }) => (
                <div key={vehicle.id} className="relative">
                  <div className="absolute top-2 right-2 z-20 bg-amber-400 text-black font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-lg">
                    {score}% de correspondance
                  </div>
                  <VehicleCard
                    vehicle={vehicle}
                    onSelect={onSelectVehicle}
                  />
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs">
              <button
                onClick={() => {
                  setStep(1);
                  setResults(null);
                }}
                className="text-neutral-400 hover:text-white flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Recommencer le questionnaire</span>
              </button>

              <button
                onClick={() => navigate('stock')}
                className="px-6 py-2.5 bg-neutral-200 hover:bg-white text-black font-bold rounded-xl uppercase tracking-wider"
              >
                Explorer tout le stock
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
