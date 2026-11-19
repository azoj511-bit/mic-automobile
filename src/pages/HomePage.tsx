import React, { useState } from 'react';
import { 
  Search, ShieldCheck, ArrowRight, Wrench, Sparkles, ChevronRight, 
  Car, Star, Award, CheckCircle2, Sliders, Users, MapPin, Phone
} from 'lucide-react';
import { VEHICLES_DATA, getFeaturedVehicles, getVanVehicles } from '../data/vehicles';
import { VehicleCard } from '../components/VehicleCard';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { VehicleCategory } from '../types/vehicle';

interface HomePageProps {
  navigate: (route: string) => void;
  onSelectVehicle: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate, onSelectVehicle }) => {
  const { t } = useLanguage();
  const { openInquiryModal } = useStore();

  // Search Bar state
  const [searchBrand, setSearchBrand] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchMaxBudget, setSearchMaxBudget] = useState('');

  // Active Category tab
  const [activeTab, setActiveTab] = useState<'Tous' | 'Van' | 'SUV' | 'Berline' | 'Sportive'>('Tous');

  const featured = getFeaturedVehicles();
  const vans = getVanVehicles();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let query = 'stock?';
    if (searchBrand) query += `marque=${encodeURIComponent(searchBrand)}&`;
    if (searchCategory) query += `categorie=${encodeURIComponent(searchCategory)}&`;
    if (searchMaxBudget) query += `budgetMax=${searchMaxBudget}&`;
    navigate(query.replace(/&$/, ''));
  };

  const filteredStock = VEHICLES_DATA.filter(v => {
    if (activeTab === 'Van') return v.isVan;
    if (activeTab === 'SUV') return v.category === 'SUV / 4x4';
    if (activeTab === 'Berline') return v.category === 'Berline';
    if (activeTab === 'Sportive') return v.category === 'Sportive / Coupé';
    return v.featured || v.isNewArrival;
  }).slice(0, 8);

  const brands = Array.from(new Set(VEHICLES_DATA.map(v => v.brand))).sort();

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-neutral-900 bg-black">
        {/* Background Visual with Dark Veil */}
        <div className="absolute inset-0 z-0">
          <img 
            src={vans[0]?.images[0] || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1920'} 
            alt="MIC AUTOMOBILE Showroom" 
            className="w-full h-full object-cover object-center opacity-30 scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/60 to-black pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-20 text-center space-y-8">
          {/* Top Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700 text-neutral-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>Bruxelles · Concession Multimarque & Atelier Certifié</span>
          </div>

          {/* Monumental Title */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-tight">
              L EXCELLENCE AUTOMOBILE & <br />
              <span className="bg-gradient-to-r from-neutral-100 via-neutral-300 to-amber-200 bg-clip-text text-transparent">
                VANS VIP SUR MESURE
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed font-light">
              Découvrez notre collection de véhicules d exception contrôlés en 120 points avec garantie 24 mois européenne, ainsi que notre département de confection de vans de prestige et navettes de direction.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('stock')}
              className="px-8 py-4 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-300 hover:from-white hover:to-neutral-200 text-black font-extrabold rounded-xl text-sm uppercase tracking-wider shadow-2xl hover:shadow-glow-silver transition-all transform active:scale-95 flex items-center gap-2"
            >
              <span>Explorer le Stock ({VEHICLES_DATA.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('sur-mesure')}
              className="px-8 py-4 bg-neutral-900/80 hover:bg-neutral-800 text-white font-semibold rounded-xl text-sm uppercase tracking-wider border border-neutral-700 hover:border-neutral-500 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Configurateur Van VIP</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-neutral-800/60 max-w-4xl mx-auto text-left">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-300 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">Garantie 24 Mois</div>
                <div className="text-neutral-500">Pièces & main-d œuvre</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">120 Points de Contrôle</div>
                <div className="text-neutral-500">Certifié sans accident</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Wrench className="w-5 h-5 text-neutral-300 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">Atelier Haute Précision</div>
                <div className="text-neutral-500">Service mécanique agréé</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-amber-300 shrink-0 fill-amber-300" />
              <div className="text-xs">
                <div className="font-bold text-white">4.9 / 5 Étoiles</div>
                <div className="text-neutral-500">+340 clients satisfaits</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK SEARCH BAR */}
      <section className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
        <form 
          onSubmit={handleSearchSubmit}
          className="bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-2xl p-4 sm:p-6 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Marque */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-1.5">
              Marque
            </label>
            <select
              value={searchBrand}
              onChange={(e) => setSearchBrand(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-neutral-500"
            >
              <option value="">Toutes les marques ({brands.length})</option>
              {brands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-1.5">
              Carrosserie / Profil
            </label>
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-neutral-500"
            >
              <option value="">Tous les types</option>
              <option value="Van / Utilitaire">Vans VIP & Aménagés ({vans.length})</option>
              <option value="SUV / 4x4">SUV & 4x4</option>
              <option value="Berline">Berlines de Luxe</option>
              <option value="Sportive / Coupé">Sportives & Coupés</option>
              <option value="Break">Breaks & Familiales</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-1.5">
              Budget Maximal
            </label>
            <select
              value={searchMaxBudget}
              onChange={(e) => setSearchMaxBudget(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-neutral-500"
            >
              <option value="">Sans limite</option>
              <option value="25000">Jusqu à 25 000 €</option>
              <option value="50000">Jusqu à 50 000 €</option>
              <option value="75000">Jusqu à 75 000 €</option>
              <option value="100000">Jusqu à 100 000 €</option>
              <option value="150000">Jusqu à 150 000 €</option>
            </select>
          </div>

          {/* Submit */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 bg-neutral-200 hover:bg-white text-black font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Filtrer les Véhicules</span>
            </button>
          </div>
        </form>
      </section>

      {/* 3. STOCK EN VEDETTE */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <div className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sélection d Exception</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white">
              Nos Véhicules Prêts à Partir
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-neutral-900 p-1.5 rounded-xl border border-neutral-800 text-xs">
            {(['Tous', 'Van', 'SUV', 'Berline', 'Sportive'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-neutral-200 text-black font-bold shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab === 'Van' ? 'Vans VIP (11)' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStock.map(vehicle => (
            <VehicleCard 
              key={vehicle.id} 
              vehicle={vehicle} 
              onSelect={onSelectVehicle} 
            />
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => navigate('stock')}
            className="px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-lg"
          >
            <span>Voir l ensemble de notre stock ({VEHICLES_DATA.length} véhicules)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. SHOWCASE DIVISION SUR MESURE & VANS VIP */}
      <section className="bg-neutral-950 border-y border-neutral-900 py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Division Haute Couture Automobile</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white leading-tight">
              Créez Votre Van VIP & Salon Mobile d Affaires
            </h2>

            <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-light">
              MIC AUTOMOBILE conçoit et aménage des véhicules d exception sur bases Mercedes Sprinter, Classe V, Volkswagen Multivan et Ford Transit. Chaque création est pensée comme un jet privé sur route.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Salon Conférence VIP</span>
                </div>
                <p className="text-neutral-400">Fauteuils Maybach massants, boiseries précieuses et table de travail intégrée.</p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Haute Technologie & 5G</span>
                </div>
                <p className="text-neutral-400">Smart TV 4K escamotable, Apple TV, sono Focal/Burmester et ciel étoilé RGB.</p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Minibar & Machine Espresso</span>
                </div>
                <p className="text-neutral-400">Compartiment réfrigéré à champagne, machine Nespresso et rangements sur mesure.</p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Cloison de Confidentialité</span>
                </div>
                <p className="text-neutral-400">Séparation intégrale motorisée avec interphone privé pour le chauffeur.</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('sur-mesure')}
                className="px-6 py-3.5 bg-gradient-to-r from-neutral-200 to-neutral-300 hover:from-white hover:to-neutral-100 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-xl transition-all flex items-center gap-2"
              >
                <span>Lancer le Configurateur Van</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => openInquiryModal('sur-mesure')}
                className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-xl text-xs uppercase tracking-wider border border-neutral-700 transition-colors"
              >
                Échanger avec un Designer
              </button>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900">
              <img 
                src={vans[1]?.images[0] || vans[0]?.images[1] || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800'} 
                alt="Aménagement Van VIP"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-neutral-800 text-xs">
                <div className="font-bold text-white text-sm">Mercedes-Benz Sprinter 319 CDI VIP Luxury Lounge</div>
                <div className="text-amber-300 font-semibold mt-0.5">Finition Salon Première Classe · Homologué Europe</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. QUIZ INTERACTIF RECOMMANDATION TEASER */}
      <section className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              <span>Guide Intelligent de Sélection</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Vous hésitez sur le modèle adapté à votre usage ?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              En 7 questions simples (usage, confort, motorisation, budget, aménagements), notre algorithme analyse notre parc de 73 véhicules et sélectionne les véhicules correspondants exactement à votre cahier des charges.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => navigate('recommandation')}
              className="px-8 py-4 bg-gradient-to-r from-neutral-200 to-neutral-300 hover:from-white hover:to-neutral-100 text-black font-extrabold rounded-2xl text-xs uppercase tracking-wider shadow-xl transition-all flex items-center gap-2"
            >
              <span>Démarrer le Questionnaire (2 min)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. ATELIER MECANIQUE & EXPERTISE */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-neutral-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Wrench className="w-3.5 h-3.5" />
            <span>Centre Technique Agréé</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Notre Atelier Mécanique & Carrosserie à Bruxelles
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light">
            Une infrastructure à la pointe pour la révision constructeur, le diagnostic électronique avancé, le freinage haute performance et l installation d accessoires exclusifs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-2xl space-y-3 hover:border-neutral-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-300">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Entretien & Révision Constructeur</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Vidange selon normes constructeurs, filtres d origine, bougies et préservation intégrale de la garantie d origine constructeur.
            </p>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-2xl space-y-3 hover:border-neutral-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-white">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Diagnostic Électronique Multiplexé</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Bancs de test officiels pour toutes marques allemandes et européennes (Audi, BMW, Mercedes-Benz, Porsche, etc.).
            </p>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-2xl space-y-3 hover:border-neutral-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Freinage & Liaisons au Sol</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Disques ventilés, céramique, plaquettes haute température, amortisseurs pilotés et suspensions pneumatiques (Airmatic).
            </p>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-2xl space-y-3 hover:border-neutral-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-white">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Pneumatiques & Géométrie 3D</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Montage, équilibrage haute précision, réglage de parallélisme au laser 3D et gardiennage pneus hiver/été.
            </p>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-2xl space-y-3 hover:border-neutral-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Aménagements & Accessoires Van</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Installation de chauffages stationnaires Webasto, batteries lithium, convertisseurs 230V et suspensions renforcées.
            </p>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-2xl space-y-3 hover:border-neutral-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Carrosserie & Detailing Céramique</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Débosselage sans peinture, réfection boucliers et jantes, polissage miroir et protection céramique longue durée.
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => navigate('atelier')}
            className="px-8 py-3.5 bg-neutral-200 hover:bg-white text-black font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-xl"
          >
            <span>Prendre Rendez-vous à l Atelier en Ligne</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 7. AVIS CLIENTS VERIFIES */}
      <section className="bg-neutral-950 border-t border-neutral-900 py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Témoignages & Avis Réels
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white">
                La Confiance de Nos Clients
              </h2>
            </div>
            <div className="flex items-center gap-3 bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-800">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-white">4.9 / 5</span>
              <span className="text-[11px] text-neutral-400">sur Google Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800 space-y-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed italic">
                « Achat d un Mercedes Classe V 300d pour notre société de conciergerie à Bruxelles. Véhicule dans un état strictement neuf, historique limpide et livraison sous 5 jours avec immatriculation belge effectuée. Service irréprochable. »
              </p>
              <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                <span className="font-bold text-white">Laurent M. — Bruxelles</span>
                <span className="text-neutral-500">Mercedes Classe V</span>
              </div>
            </div>

            <div className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800 space-y-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed italic">
                « Très impressionné par la qualité du travail sur notre van aménagé California Ocean. L atelier a installé un panneau solaire et un onduleur 230V dans les règles de l art. Une vraie équipe de passionnés. »
              </p>
              <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                <span className="font-bold text-white">Sophie & Marc D. — Liège</span>
                <span className="text-neutral-500">VW California 6.1</span>
              </div>
            </div>

            <div className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800 space-y-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed italic">
                « Acquisition d une Audi RS6 Avant. Le véhicule a été livré avec révision totale et garantie 24 mois. Transparence totale sur le contrôle des 120 points. Je recommande les yeux fermés. »
              </p>
              <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                <span className="font-bold text-white">Alexandre V. — Uccle</span>
                <span className="text-neutral-500">Audi RS 6 Avant</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
