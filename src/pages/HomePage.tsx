import React, { useState } from 'react';
import { 
  Search, ShieldCheck, ArrowRight, Wrench, Sparkles, ChevronRight, 
  Star, Award, CheckCircle2, Sliders, MapPin, Phone
} from 'lucide-react';
import { VEHICLES_DATA, getFeaturedVehicles, getVanVehicles } from '../data/vehicles';
import { VehicleCard } from '../components/VehicleCard';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';

interface HomePageProps {
  navigate: (route: string) => void;
  onSelectVehicle: (slug: string) => void;
}

// Image hero fiable — Unsplash (haut de gamme Mercedes)
const HERO_IMG = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1920&q=80';
const VAN_INTERIOR_IMG = 'https://images.unsplash.com/photo-1570733117311-d990c3816c47?auto=format&fit=crop&w=900&q=80';

export const HomePage: React.FC<HomePageProps> = ({ navigate, onSelectVehicle }) => {
  const { t } = useLanguage();
  const { openInquiryModal } = useStore();

  const [searchBrand, setSearchBrand] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchMaxBudget, setSearchMaxBudget] = useState('');
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
    <div className="pb-20">

      {/* ═══════════════════════════════════════════════════
          1. HERO — image réelle plein écran
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <img
          src={HERO_IMG}
          alt="MIC AUTOMOBILE — Concession Bruxelles"
          className="hero-bg-img"
          loading="eager"
        />
        {/* Dégradé sombre */}
        <div className="hero-overlay" />
        {/* Halo central subtil */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(197,168,128,0.07) 0%, transparent 70%)' }}
        />

        {/* Contenu hero */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-28 text-center space-y-8">

          {/* Pastille "live" */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/50 border border-white/10 text-neutral-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Bruxelles · Concession Multimarque &amp; Atelier Certifié
          </div>

          {/* Titre monumental */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.9] drop-shadow-2xl">
              L'EXCELLENCE
              <br />
              <span
                className="animate-shimmer"
                style={{
                  background: 'linear-gradient(90deg, #d9d9d9 0%, #ffffff 25%, #c5a880 50%, #ffffff 75%, #d9d9d9 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                AUTOMOBILE
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-300/90 leading-relaxed font-light">
              Collection de véhicules d'exception contrôlés en 120 points, garantie 24 mois européenne,
              et vans VIP sur mesure confectionnés à Bruxelles.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button onClick={() => navigate('stock')} className="btn-primary flex items-center gap-2">
              <span>Explorer le Stock ({VEHICLES_DATA.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => navigate('sur-mesure')} className="btn-secondary flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Configurateur Van VIP</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 mt-4 max-w-4xl mx-auto">
            <div className="bg-black/40 backdrop-blur-md border border-white/8 rounded-2xl p-4 text-left space-y-1">
              <ShieldCheck className="w-5 h-5 text-amber-400 mb-2" />
              <div className="text-sm font-bold text-white">Garantie 24 Mois</div>
              <div className="text-xs text-neutral-400">Pièces &amp; main-d'œuvre</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md border border-white/8 rounded-2xl p-4 text-left space-y-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
              <div className="text-sm font-bold text-white">120 Points</div>
              <div className="text-xs text-neutral-400">Certifié sans accident</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md border border-white/8 rounded-2xl p-4 text-left space-y-1">
              <Wrench className="w-5 h-5 text-neutral-300 mb-2" />
              <div className="text-sm font-bold text-white">Atelier Agréé</div>
              <div className="text-xs text-neutral-400">Service mécanique certifié</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md border border-white/8 rounded-2xl p-4 text-left space-y-1">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400 mb-2" />
              <div className="text-sm font-bold text-white">4.9 / 5 Étoiles</div>
              <div className="text-xs text-neutral-400">+340 clients satisfaits</div>
            </div>
          </div>
        </div>

        {/* Flèche scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-50 animate-bounce">
          <ChevronRight className="w-6 h-6 rotate-90 text-white" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          2. QUICK SEARCH — fond légèrement plus clair
      ═══════════════════════════════════════════════════ */}
      <section className="section-dark-2 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <form 
            onSubmit={handleSearchSubmit}
            className="card-glass rounded-2xl p-5 sm:p-6 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-1.5">Marque</label>
              <select
                value={searchBrand}
                onChange={e => setSearchBrand(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50 transition-colors"
              >
                <option value="">Toutes les marques ({brands.length})</option>
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-1.5">Carrosserie</label>
              <select
                value={searchCategory}
                onChange={e => setSearchCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50 transition-colors"
              >
                <option value="">Tous les types</option>
                <option value="Van / Utilitaire">Vans VIP &amp; Aménagés ({vans.length})</option>
                <option value="SUV / 4x4">SUV &amp; 4x4</option>
                <option value="Berline">Berlines de Luxe</option>
                <option value="Sportive / Coupé">Sportives &amp; Coupés</option>
                <option value="Break">Breaks &amp; Familiales</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-1.5">Budget Maximal</label>
              <select
                value={searchMaxBudget}
                onChange={e => setSearchMaxBudget(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50 transition-colors"
              >
                <option value="">Sans limite</option>
                <option value="25000">Jusqu'à 25 000 €</option>
                <option value="50000">Jusqu'à 50 000 €</option>
                <option value="75000">Jusqu'à 75 000 €</option>
                <option value="100000">Jusqu'à 100 000 €</option>
                <option value="150000">Jusqu'à 150 000 €</option>
              </select>
            </div>

            <div className="flex items-end">
              <button type="submit" className="w-full py-2.5 btn-primary flex items-center justify-center gap-2 !px-4 !py-3">
                <Search className="w-4 h-4" />
                <span>Filtrer</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          3. STOCK EN VEDETTE — fond foncé variant #1
      ═══════════════════════════════════════════════════ */}
      <section className="section-dark-1 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <div className="badge-gold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Sélection d'Exception
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Nos Véhicules<br />
                <span className="text-neutral-400 font-light">Prêts à Partir</span>
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border border-white/8 bg-white/3 text-xs">
              {(['Tous', 'Van', 'SUV', 'Berline', 'Sportive'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === tab
                      ? 'bg-white text-black shadow font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {tab === 'Van' ? `Vans VIP` : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredStock.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} onSelect={onSelectVehicle} />
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => navigate('stock')}
              className="px-8 py-3.5 card-glass rounded-xl text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 hover:bg-white/8"
            >
              <span>Voir tout le stock ({VEHICLES_DATA.length} véhicules)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          4. VANS VIP — fond gradienté bleu-noir
      ═══════════════════════════════════════════════════ */}
      <section className="section-gradient-vans py-24 px-4 md:px-8 relative overflow-hidden">
        {/* Halo or décoratif */}
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(197,168,128,0.15) 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texte */}
          <div className="space-y-7">
            <div className="badge-gold">
              <Sparkles className="w-3.5 h-3.5" />
              Division Haute Couture Automobile
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              Créez Votre Van VIP<br />
              <span className="text-neutral-400 font-light">&amp; Salon Mobile d'Affaires</span>
            </h2>

            <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
              MIC AUTOMOBILE conçoit et aménage des véhicules d'exception sur bases Mercedes Sprinter,
              Classe V, Volkswagen Multivan et Ford Transit. Chaque création est pensée comme un jet privé sur route.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Salon Conférence VIP', desc: 'Fauteuils Maybach massants, boiseries précieuses et table de travail.' },
                { label: 'Haute Technologie 5G', desc: 'Smart TV 4K, Apple TV, sono Focal/Burmester et ciel étoilé RGB.' },
                { label: 'Minibar & Machine Espresso', desc: 'Compartiment réfrigéré champagne, Nespresso, rangements sur mesure.' },
                { label: 'Cloison de Confidentialité', desc: 'Séparation motorisée avec interphone privé pour le chauffeur.' },
              ].map(item => (
                <div key={item.label} className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-1.5 hover:bg-white/5 transition-colors">
                  <div className="font-bold text-white text-xs flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    {item.label}
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button onClick={() => navigate('sur-mesure')} className="btn-primary flex items-center gap-2">
                Lancer le Configurateur
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => openInquiryModal('sur-mesure')} className="btn-secondary">
                Échanger avec un Designer
              </button>
            </div>
          </div>

          {/* Image van */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={VAN_INTERIOR_IMG}
                alt="Van VIP MIC AUTOMOBILE aménagement intérieur"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <div className="font-bold text-white text-sm">Mercedes-Benz Sprinter 319 VIP Luxury</div>
                <div className="text-amber-400 text-xs font-semibold mt-0.5">Finition Première Classe · Homologué Europe</div>
              </div>
            </div>
            {/* Badge flottant */}
            <div className="absolute -top-4 -left-4 px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-black uppercase shadow-xl">
              Sur Mesure
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          5. QUIZ RECOMMANDATION — fond encore différent
      ═══════════════════════════════════════════════════ */}
      <section className="section-dark-2 py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            className="relative rounded-3xl p-8 md:p-14 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #111118 0%, #0d0d14 50%, #111118 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Halo décoratif */}
            <div
              className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full pointer-events-none opacity-20"
              style={{ background: 'radial-gradient(circle, #c5a880 0%, transparent 70%)' }}
            />

            <div className="space-y-4 max-w-xl relative z-10">
              <span className="badge-gold">
                <Sliders className="w-3.5 h-3.5" />
                Guide Intelligent de Sélection
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Vous hésitez sur le modèle adapté à votre usage ?
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                En 7 questions simples (usage, confort, motorisation, budget), notre algorithme analyse notre parc
                de {VEHICLES_DATA.length} véhicules et sélectionne les modèles correspondant exactement à votre cahier des charges.
              </p>
            </div>

            <div className="shrink-0 relative z-10">
              <button onClick={() => navigate('recommandation')} className="btn-primary flex items-center gap-3 !text-sm">
                Démarrer le Questionnaire
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-xs text-neutral-500 text-center mt-3">≈ 2 minutes · Sans inscription</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          6. ATELIER MÉCANIQUE — fond chaud légèrement doré
      ═══════════════════════════════════════════════════ */}
      <section className="section-gradient-atelier py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="badge-gold mx-auto">
              <Wrench className="w-3.5 h-3.5" />
              Centre Technique Agréé
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Notre Atelier Mécanique<br />
              <span className="text-neutral-400 font-light">&amp; Carrosserie à Bruxelles</span>
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Infrastructure à la pointe pour la révision constructeur, le diagnostic électronique avancé,
              le freinage haute performance et l'installation d'accessoires exclusifs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: CheckCircle2, color: 'text-amber-400', title: 'Entretien & Révision Constructeur', desc: 'Vidange normes constructeurs, filtres d\'origine, bougies et préservation de la garantie constructeur.' },
              { icon: Sliders, color: 'text-blue-300', title: 'Diagnostic Électronique Multiplexé', desc: 'Bancs officiels pour toutes marques allemandes et européennes (Audi, BMW, Mercedes, Porsche).' },
              { icon: ShieldCheck, color: 'text-amber-400', title: 'Freinage & Liaisons au Sol', desc: 'Disques ventilés, céramique, amortisseurs pilotés et suspensions pneumatiques Airmatic.' },
              { icon: Wrench, color: 'text-neutral-300', title: 'Pneumatiques & Géométrie 3D', desc: 'Montage, équilibrage précision, réglage parallélisme laser 3D et gardiennage pneus saisonniers.' },
              { icon: Sparkles, color: 'text-amber-400', title: 'Aménagements & Accessoires Van', desc: 'Installation chauffages Webasto, batteries lithium, convertisseurs 230V et suspensions renforcées.' },
              { icon: Award, color: 'text-emerald-400', title: 'Carrosserie & Detailing Céramique', desc: 'Débosselage sans peinture, polissage miroir et protection céramique longue durée.' },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="card-glass p-6 rounded-2xl space-y-3 hover:border-white/15 transition-all">
                <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="text-base font-bold text-white">{title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => navigate('atelier')} className="btn-primary inline-flex items-center gap-2">
              Prendre Rendez-vous à l'Atelier
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          7. AVIS CLIENTS — fond bleuté-noir
      ═══════════════════════════════════════════════════ */}
      <section className="section-gradient-avis py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <span className="badge-gold mb-3 inline-flex">Témoignages &amp; Avis Réels</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                La Confiance de Nos Clients
              </h2>
            </div>
            <div className="flex items-center gap-3 card-glass px-4 py-3 rounded-xl">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <span className="text-sm font-bold text-white">4.9 / 5</span>
              <span className="text-xs text-neutral-400">Google Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                stars: 5,
                text: '« Achat d\'un Mercedes Classe V 300d pour notre société de conciergerie à Bruxelles. Véhicule dans un état strictement neuf, historique limpide et livraison sous 5 jours. Service irréprochable. »',
                name: 'Laurent M.',
                location: 'Bruxelles',
                vehicle: 'Mercedes Classe V',
              },
              {
                stars: 5,
                text: '« Très impressionné par la qualité du travail sur notre van aménagé California Ocean. L\'atelier a installé un panneau solaire et un onduleur 230V dans les règles de l\'art. Équipe de passionnés. »',
                name: 'Sophie & Marc D.',
                location: 'Liège',
                vehicle: 'VW California 6.1',
              },
              {
                stars: 5,
                text: '« Acquisition d\'une Audi RS6 Avant. Livré avec révision totale et garantie 24 mois. Transparence totale sur le contrôle des 120 points. Je recommande les yeux fermés. »',
                name: 'Alexandre V.',
                location: 'Uccle',
                vehicle: 'Audi RS 6 Avant',
              },
            ].map(review => (
              <div key={review.name} className="card-glass p-6 rounded-2xl space-y-5">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(review.stars)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed italic">{review.text}</p>
                <div className="pt-3 border-t border-white/8 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{review.name}</div>
                    <div className="text-neutral-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {review.location}
                    </div>
                  </div>
                  <span className="text-neutral-500 bg-white/5 px-2 py-1 rounded-lg">{review.vehicle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          8. CTA FINAL CONTACT — fond très sombre
      ═══════════════════════════════════════════════════ */}
      <section className="section-dark-4 py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Ligne or */}
          <div className="gold-line max-w-xs mx-auto mb-10" />

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Visitez Notre Showroom<br />
            <span className="text-neutral-400 font-light">à Bruxelles</span>
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-xl mx-auto">
            Venez découvrir notre sélection en présentiel. Notre équipe vous accueille du lundi au samedi,
            sur rendez-vous ou en visite libre.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => navigate('contact')} className="btn-primary flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Nous Rendre Visite
            </button>
            <a
              href="tel:+3200000000"
              className="btn-secondary flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Appeler Maintenant
            </a>
          </div>

          <div className="gold-line max-w-xs mx-auto mt-10" />
        </div>
      </section>

    </div>
  );
};
