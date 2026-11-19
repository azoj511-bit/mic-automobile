import React, { useState } from 'react';
import { 
  Sparkles, Check, ArrowRight, ShieldCheck, ChevronRight, 
  Send, Sliders, CheckCircle2, RotateCcw, Info, Laptop, Coffee, Tv, Wifi, Moon
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CustomVanConfig } from '../types/vehicle';

export const CustomVanPage: React.FC = () => {
  const { saveCustomConfig, showToast } = useStore();

  // Step state
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Configuration Choices
  const [chassis, setChassis] = useState<string>('Mercedes-Benz Classe V Extra-Long');
  const [finishType, setFinishType] = useState<CustomVanConfig['finishType']>('VIP Executive Lounge');
  const [leatherColor, setLeatherColor] = useState<string>('Cuir Nappa Beige Soie');
  const [woodTrim, setWoodTrim] = useState<string>('Ronce de Noyer Véritable Laquée');
  const [exteriorColor, setExteriorColor] = useState<string>('Noir Obsidienne Métallisé');

  // Selected Options
  const [selectedMultimedia, setSelectedMultimedia] = useState<string[]>([
    'Smart TV LED 40 pouces 4K escamotable motorisée',
    'Routeur Wi-Fi 5G haute vitesse professionnel'
  ]);

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    '4 fauteuils Captain Chairs Maybach massants et ventilés',
    'Ciel étoilé en fibre optique Starlight RGB',
    'Minibar réfrigéré à champagne et verres en cristal'
  ]);

  // Form details for final submission
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Price Calculation
  const chassisBasePrices: Record<string, number> = {
    'Mercedes-Benz Classe V Extra-Long': 72000,
    'Mercedes-Benz Sprinter 319 CDI L2H2': 84000,
    'Volkswagen Multivan T7 Long': 58000,
    'Ford Transit Custom Nugget': 54000
  };

  const finishPrices: Record<string, number> = {
    'VIP Executive Lounge': 34000,
    'Bureau Mobile 5G': 38000,
    'Camper Évasion de Luxe': 29000,
    'Navette Prestige 8 Places': 24000
  };

  const optionPrices: Record<string, number> = {
    'Smart TV LED 40 pouces 4K escamotable motorisée': 4500,
    'Routeur Wi-Fi 5G haute vitesse professionnel': 1800,
    'Système Hi-Fi Focal Surround 10 enceintes': 3200,
    'Apple TV 4K & Console de jeu intégrée': 1200,
    '4 fauteuils Captain Chairs Maybach massants et ventilés': 8500,
    'Ciel étoilé en fibre optique Starlight RGB': 3800,
    'Minibar réfrigéré à champagne et verres en cristal': 2900,
    'Machine à café Nespresso encastrée': 1400,
    'Cloison de séparation intégrale motorisée avec interphone': 6500,
    'Batterie auxiliaire Lithium 200Ah & convertisseur 230V': 3900,
    'Pack carrosserie sport & Jantes forgées 20 pouces': 4200,
    'Marchepieds latéraux électriques automatiques': 2400
  };

  const calculateTotalPrice = (): number => {
    let total = chassisBasePrices[chassis] || 70000;
    total += finishPrices[finishType] || 30000;
    selectedMultimedia.forEach(m => total += (optionPrices[m] || 1500));
    selectedFeatures.forEach(f => total += (optionPrices[f] || 2500));
    return total;
  };

  const totalPrice = calculateTotalPrice();

  const toggleMultimedia = (item: string) => {
    setSelectedMultimedia(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const toggleFeature = (item: string) => {
    setSelectedFeatures(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      showToast('Veuillez compléter votre nom, email et téléphone');
      return;
    }

    const config: CustomVanConfig = {
      chassis,
      finishType,
      leatherColor,
      woodTrim,
      exteriorColor,
      multimedia: selectedMultimedia,
      features: selectedFeatures,
      estimatedPrice: totalPrice,
      customerName: clientName,
      customerEmail: clientEmail,
      customerPhone: clientPhone,
      message
    };

    saveCustomConfig(config);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atelier de Confection Sur Mesure</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white">
          Configurateur de Van VIP & Salon Mobile
        </h1>
        <p className="text-neutral-400 text-xs sm:text-sm font-light">
          Personnalisez chaque aspect de votre futur van d exception, du châssis de départ aux cuirs pleine fleur, systèmes multimédia 4K et équipements de confort exclusifs.
        </p>
      </div>

      {/* Steps Indicator Bar */}
      <div className="max-w-4xl mx-auto grid grid-cols-5 gap-2 text-center text-xs">
        {[
          { num: 1, label: '1. Châssis' },
          { num: 2, label: '2. Aménagement' },
          { num: 3, label: '3. Cuir & Boiserie' },
          { num: 4, label: '4. High-Tech' },
          { num: 5, label: '5. Devis & Envoi' }
        ].map((s) => (
          <button
            key={s.num}
            onClick={() => setCurrentStep(s.num)}
            className={`py-3 rounded-xl border font-semibold transition-all ${
              currentStep === s.num
                ? 'bg-neutral-200 text-black border-white shadow-lg'
                : currentStep > s.num
                ? 'bg-neutral-900 border-neutral-700 text-neutral-300'
                : 'bg-neutral-950 border-neutral-900 text-neutral-600'
            }`}
          >
            <span className="hidden sm:inline">{s.label}</span>
            <span className="sm:hidden font-bold">{s.num}</span>
          </button>
        ))}
      </div>

      {/* Main Configurator Area: Form Steps (Left) & Live Price Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Panels - 8 cols */}
        <div className="lg:col-span-8 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl">
          {/* STEP 1: CHASSIS SELECTION */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-lg font-bold text-white">Étape 1 : Choisissez le Châssis Porteur</h3>
                <p className="text-xs text-neutral-400">Le socle technique sur lequel notre atelier réalisera l aménagement.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {[
                  {
                    name: 'Mercedes-Benz Classe V Extra-Long',
                    desc: 'Longueur 5.37m, hauteur < 1.90m (accès parkings sous-terrains), moteur OM654 237ch, suspension Airmatic.',
                    badge: 'Recommandé VIP Shuttle',
                    price: 72000
                  },
                  {
                    name: 'Mercedes-Benz Sprinter 319 CDI L2H2',
                    desc: 'Volume généreux, hauteur intérieure debout (1.95m), moteur V6 190ch, idéal pour cloison intégrale.',
                    badge: 'Jet Van Prestige',
                    price: 84000
                  },
                  {
                    name: 'Volkswagen Multivan T7 Long',
                    desc: 'Plateforme moderne MQB, double toit ouvrant vitré, 7 sièges sur rails, connectivité tactile.',
                    badge: 'Famille & Affaires',
                    price: 58000
                  },
                  {
                    name: 'Ford Transit Custom Nugget',
                    desc: 'Châssis compact dynamique, motorisation EcoBlue 185ch boîte automatique, polyvalence maximale.',
                    badge: 'Loisirs & Urbain',
                    price: 54000
                  }
                ].map((c) => (
                  <div
                    key={c.name}
                    onClick={() => setChassis(c.name)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                      chassis === c.name
                        ? 'bg-neutral-900 border-neutral-300 ring-1 ring-white/50 shadow-xl'
                        : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider bg-amber-400/10 px-2 py-0.5 rounded">
                          {c.badge}
                        </span>
                        {chassis === c.name && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                      <h4 className="font-bold text-white text-sm">{c.name}</h4>
                      <p className="text-neutral-400 mt-1 leading-relaxed text-[11px]">{c.desc}</p>
                    </div>

                    <div className="pt-2 border-t border-neutral-800/80 text-right">
                      <span className="text-xs text-neutral-400">À partir de </span>
                      <span className="font-bold text-white">{c.price.toLocaleString()} €</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 bg-neutral-200 hover:bg-white text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <span>Continuer vers l aménagement</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: FINISH & INTERIOR LAYOUT */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-lg font-bold text-white">Étape 2 : Type d Aménagement Intérieur</h3>
                <p className="text-xs text-neutral-400">L architecture de l habitacle adaptée à vos exigences professionnelles ou privées.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {[
                  {
                    type: 'VIP Executive Lounge' as const,
                    desc: 'Configuration 4 à 6 fauteuils Première Classe en vis-à-vis, table centrale escamotable, éclairage d ambiance tamisé.',
                    price: 34000
                  },
                  {
                    type: 'Bureau Mobile 5G' as const,
                    desc: 'Cloison de confidentialité motorisée, écran 4K escamotable, poste de visioconférence et insonorisation studio.',
                    price: 38000
                  },
                  {
                    type: 'Camper Évasion de Luxe' as const,
                    desc: 'Toit relevable avec literie à coupelles, bloc cuisine en L, réfrigérateur, douchette extérieure et chauffage autonome.',
                    price: 29000
                  },
                  {
                    type: 'Navette Prestige 8 Places' as const,
                    desc: 'Configuration 8 places individuelles en cuir Nappa, modulables sur rails pour transferts aéroport & palaces.',
                    price: 24000
                  }
                ].map((f) => (
                  <div
                    key={f.type}
                    onClick={() => setFinishType(f.type)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                      finishType === f.type
                        ? 'bg-neutral-900 border-neutral-300 ring-1 ring-white/50 shadow-xl'
                        : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-white text-sm">{f.type}</h4>
                        {finishType === f.type && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                      <p className="text-neutral-400 leading-relaxed text-[11px]">{f.desc}</p>
                    </div>

                    <div className="pt-2 border-t border-neutral-800/80 text-right">
                      <span className="text-xs text-neutral-400">Forfait aménagement : </span>
                      <span className="font-bold text-amber-300">+{f.price.toLocaleString()} €</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 bg-neutral-900 text-neutral-300 hover:text-white rounded-xl text-xs"
                >
                  Précédent
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-neutral-200 hover:bg-white text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <span>Personnaliser les cuirs & boiseries</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: LEATHER & MATERIALS */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-lg font-bold text-white">Étape 3 : Cuir Nappa, Boiseries & Teinte Extérieure</h3>
                <p className="text-xs text-neutral-400">Des matériaux nobles sélectionnés chez les meilleurs mégissiers et ébénistes européens.</p>
              </div>

              {/* Leather Color */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300">Teinte de la Sellerie Cuir Nappa</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {[
                    { name: 'Cuir Nappa Beige Soie', hex: '#E8D8C4' },
                    { name: 'Cuir Nappa Noir Perforé', hex: '#1C1C1C' },
                    { name: 'Cuir Cognac Caramel', hex: '#9C5B28' },
                    { name: 'Cuir Bicolore Gris Porcelaine', hex: '#C2C4C6' }
                  ].map((l) => (
                    <button
                      key={l.name}
                      type="button"
                      onClick={() => setLeatherColor(l.name)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        leatherColor === l.name
                          ? 'bg-neutral-900 border-white text-white font-bold'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-neutral-600 shrink-0" style={{ backgroundColor: l.hex }} />
                      <span className="truncate">{l.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Wood / Trims */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300">Inserts Décoratifs & Boiseries</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {[
                    'Ronce de Noyer Véritable Laquée',
                    'Carbone Mat Structurel 3K',
                    'Bois d Ébène Noir Piano Black'
                  ].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWoodTrim(w)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        woodTrim === w
                          ? 'bg-neutral-900 border-white text-white font-bold'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Exterior Color */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300">Peinture Extérieure Carrosserie</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {[
                    'Noir Obsidienne Métallisé',
                    'Gris Sélénite Magno Mat',
                    'Blanc Diamant Nacré',
                    'Bleu Cavansite Intense'
                  ].map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setExteriorColor(col)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        exteriorColor === col
                          ? 'bg-neutral-900 border-white text-white font-bold'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 bg-neutral-900 text-neutral-300 hover:text-white rounded-xl text-xs"
                >
                  Précédent
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-3 bg-neutral-200 hover:bg-white text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <span>Configurer le High-Tech</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: MULTIMEDIA & AMENITIES */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-lg font-bold text-white">Étape 4 : Multimédia, Domotique & Confort</h3>
                <p className="text-xs text-neutral-400">Cochez les équipements exclusifs à intégrer dans votre van.</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <Tv className="w-4 h-4" />
                  <span>Multimédia & Connectivité</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    'Smart TV LED 40 pouces 4K escamotable motorisée',
                    'Routeur Wi-Fi 5G haute vitesse professionnel',
                    'Système Hi-Fi Focal Surround 10 enceintes',
                    'Apple TV 4K & Console de jeu intégrée'
                  ].map((item) => {
                    const isSelected = selectedMultimedia.includes(item);
                    return (
                      <div
                        key={item}
                        onClick={() => toggleMultimedia(item)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-neutral-900 border-neutral-300 text-white font-medium'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <span className="truncate pr-2">{item}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] text-neutral-500">+{optionPrices[item]} €</span>
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isSelected ? 'bg-white text-black border-white' : 'border-neutral-700'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <Coffee className="w-4 h-4" />
                  <span>Confort & Prestige</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    '4 fauteuils Captain Chairs Maybach massants et ventilés',
                    'Ciel étoilé en fibre optique Starlight RGB',
                    'Minibar réfrigéré à champagne et verres en cristal',
                    'Machine à café Nespresso encastrée',
                    'Cloison de séparation intégrale motorisée avec interphone',
                    'Batterie auxiliaire Lithium 200Ah & convertisseur 230V',
                    'Pack carrosserie sport & Jantes forgées 20 pouces',
                    'Marchepieds latéraux électriques automatiques'
                  ].map((item) => {
                    const isSelected = selectedFeatures.includes(item);
                    return (
                      <div
                        key={item}
                        onClick={() => toggleFeature(item)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-neutral-900 border-neutral-300 text-white font-medium'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <span className="truncate pr-2">{item}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] text-neutral-500">+{optionPrices[item]} €</span>
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isSelected ? 'bg-white text-black border-white' : 'border-neutral-700'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 bg-neutral-900 text-neutral-300 hover:text-white rounded-xl text-xs"
                >
                  Précédent
                </button>
                <button
                  onClick={() => setCurrentStep(5)}
                  className="px-6 py-3 bg-neutral-200 hover:bg-white text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <span>Valider mon projet & Recevoir le devis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: FINAL SUMMARY & SUBMISSION */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-lg font-bold text-white">Étape 5 : Récapitulatif & Demande de Devis Détaillé</h3>
                <p className="text-xs text-neutral-400">
                  Notre équipe d ingénieurs et artisans selliers étudiera votre configuration pour vous remettre une étude technique chiffrée.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 text-center space-y-4 bg-neutral-900/60 rounded-xl border border-neutral-800">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Projet Enregistré avec Succès !</h4>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                    Merci <span className="text-white font-semibold">{clientName}</span>. Le dossier technique de votre <span className="text-white">{chassis}</span> en finition <span className="text-white">{finishType}</span> a été transmis au bureau d études. Un devis complet vous sera envoyé à <span className="text-white">{clientEmail}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentStep(1);
                    }}
                    className="px-6 py-2.5 bg-neutral-200 hover:bg-white text-black font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors"
                  >
                    Nouvelle Configuration
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-neutral-400 font-medium mb-1">Nom et Prénom *</label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Alexandre Martin"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 font-medium mb-1">Téléphone *</label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+32 4..."
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-400 font-medium mb-1">Adresse Email *</label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="alexandre@entreprise.com"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 font-medium mb-1">Précisions supplémentaires sur le projet</label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Usage prévu, délais souhaités, besoins particuliers..."
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="px-5 py-2.5 bg-neutral-900 text-neutral-300 hover:text-white rounded-xl text-xs"
                    >
                      Précédent
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-gradient-to-r from-neutral-200 to-neutral-300 hover:from-white hover:to-neutral-100 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-xl transition-all flex items-center gap-2"
                    >
                      <span>Transmettre mon dossier technique</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Live Estimation Summary Box - 4 cols */}
        <div className="lg:col-span-4 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 space-y-6 sticky top-28 shadow-2xl">
          <div className="border-b border-neutral-800 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
              Devis Estimatif en Temps Réel
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {totalPrice.toLocaleString()} € <span className="text-xs font-normal text-neutral-400">HTVA</span>
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              Soit environ <span className="text-white font-semibold">{Math.round(totalPrice * 1.21).toLocaleString()} € TTC</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-neutral-300">
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-bold">Châssis porteur</span>
              <span className="font-semibold text-white">{chassis}</span>
            </div>

            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-bold">Aménagement d habitacle</span>
              <span className="font-semibold text-white">{finishType}</span>
            </div>

            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-bold">Cuir & Boiseries</span>
              <span className="font-semibold text-white">{leatherColor}</span>
              <span className="text-neutral-400 block text-[11px]">{woodTrim}</span>
            </div>

            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-bold">Options sélectionnées ({selectedMultimedia.length + selectedFeatures.length})</span>
              <ul className="mt-1 space-y-1 text-[11px] text-neutral-400 list-disc list-inside">
                {[...selectedMultimedia, ...selectedFeatures].slice(0, 4).map((opt) => (
                  <li key={opt} className="truncate">{opt}</li>
                ))}
                {(selectedMultimedia.length + selectedFeatures.length) > 4 && (
                  <li className="text-amber-300 font-semibold list-none">
                    + {(selectedMultimedia.length + selectedFeatures.length) - 4} autres équipements inclus
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-800 text-[11px] text-neutral-400 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Homologation européenne par type 2e étape</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Garantie 24 mois atelier & pièces</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
