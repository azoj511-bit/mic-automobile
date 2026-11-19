import React, { useState } from 'react';
import { 
  Calculator, ArrowRight, ShieldCheck, CheckCircle2, Car, RefreshCw, FileText, Send 
} from 'lucide-react';
import { FinancingCalculator } from '../components/FinancingCalculator';
import { useStore } from '../context/StoreContext';

export const FinancingPage: React.FC = () => {
  const { addInquiry, showToast } = useStore();

  // Trade-in form state
  const [tradeMake, setTradeMake] = useState('');
  const [tradeModel, setTradeModel] = useState('');
  const [tradeYear, setTradeYear] = useState('2019');
  const [tradeKm, setTradeKm] = useState('85000');
  const [tradeFuel, setTradeFuel] = useState('Diesel');
  const [tradeGearbox, setTradeGearbox] = useState('Automatique');
  const [tradeName, setTradeName] = useState('');
  const [tradeEmail, setTradeEmail] = useState('');
  const [tradePhone, setTradePhone] = useState('');
  const [tradeSubmitted, setTradeSubmitted] = useState(false);

  const handleTradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tradeMake || !tradeModel || !tradeName || !tradeEmail || !tradePhone) {
      showToast('Veuillez compléter les informations demandées');
      return;
    }

    addInquiry({
      type: 'reprise',
      name: tradeName,
      email: tradeEmail,
      phone: tradePhone,
      message: `Demande de reprise pour : ${tradeMake} ${tradeModel} (${tradeYear}, ${tradeKm} km, ${tradeFuel}, ${tradeGearbox})`
    });

    setTradeSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-semibold tracking-wider uppercase">
          <Calculator className="w-3.5 h-3.5 text-amber-300" />
          <span>Solutions Financières & Reprise</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white">
          Financement sur Mesure & Reprise de Véhicule
        </h1>
        <p className="text-neutral-400 text-xs sm:text-sm font-light">
          Bénéficiez de formules de crédit, LOA ou leasing professionnel aux taux les plus avantageux du marché belge et européen grâce à nos accords bancaires privilégiés.
        </p>
      </div>

      {/* Simulator */}
      <FinancingCalculator />

      {/* Trade-in Estimation Form */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-widest mb-1">
            <RefreshCw className="w-4 h-4" />
            <span>Estimation Gratuite en 2 Minutes</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Faire Reprendre Votre Ancien Véhicule</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Nous rachetons ou reprenons votre véhicule au meilleur prix du marché européen pour financer votre nouveau projet.
          </p>
        </div>

        {tradeSubmitted ? (
          <div className="p-8 text-center space-y-4 bg-neutral-900/60 rounded-2xl border border-neutral-800">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Demande de Reprise Enregistrée !</h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
              Merci <span className="text-white font-semibold">{tradeName}</span>. Notre expert estimation analyse la cote de votre <span className="text-white">{tradeMake} {tradeModel}</span> et vous transmettra une offre ferme sous 24h ouvrées.
            </p>
            <button
              onClick={() => setTradeSubmitted(false)}
              className="mt-4 px-6 py-2.5 bg-neutral-200 hover:bg-white text-black font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors"
            >
              Faire une autre estimation
            </button>
          </div>
        ) : (
          <form onSubmit={handleTradeSubmit} className="space-y-6 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Marque *</label>
                <input
                  type="text"
                  required
                  value={tradeMake}
                  onChange={(e) => setTradeMake(e.target.value)}
                  placeholder="Ex: BMW, Audi, Mercedes..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Modèle et Finition *</label>
                <input
                  type="text"
                  required
                  value={tradeModel}
                  onChange={(e) => setTradeModel(e.target.value)}
                  placeholder="Ex: Série 3 320d Pack M"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Année de 1ère mise en circulation</label>
                <input
                  type="number"
                  value={tradeYear}
                  onChange={(e) => setTradeYear(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Kilométrage actuel (km)</label>
                <input
                  type="number"
                  value={tradeKm}
                  onChange={(e) => setTradeKm(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Carburant</label>
                <select
                  value={tradeFuel}
                  onChange={(e) => setTradeFuel(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white"
                >
                  <option value="Diesel">Diesel</option>
                  <option value="Essence">Essence</option>
                  <option value="Hybride">Hybride</option>
                  <option value="Électrique">Électrique</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Boîte de vitesses</label>
                <select
                  value={tradeGearbox}
                  onChange={(e) => setTradeGearbox(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white"
                >
                  <option value="Automatique">Automatique</option>
                  <option value="Manuelle">Manuelle</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-neutral-800">
              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Votre Nom et Prénom *</label>
                <input
                  type="text"
                  required
                  value={tradeName}
                  onChange={(e) => setTradeName(e.target.value)}
                  placeholder="Marc Laurent"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={tradeEmail}
                  onChange={(e) => setTradeEmail(e.target.value)}
                  placeholder="marc@email.be"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Téléphone *</label>
                <input
                  type="tel"
                  required
                  value={tradePhone}
                  onChange={(e) => setTradePhone(e.target.value)}
                  placeholder="+32 4..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-neutral-200 to-neutral-300 hover:from-white hover:to-neutral-100 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Recevoir mon estimation de reprise</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
