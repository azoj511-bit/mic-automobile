import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, Heart, SlidersHorizontal, ShieldCheck, Calendar, Gauge, 
  Fuel, Cog, Users, Check, ArrowRight, Share2, Printer, MessageCircle, 
  Sparkles, Maximize2, X, ChevronRight, Phone, Mail, Award, CheckCircle2
} from 'lucide-react';
import { Vehicle } from '../types/vehicle';
import { getVehicleBySlug, getSimilarVehicles } from '../data/vehicles';
import { VehicleCard } from '../components/VehicleCard';
import { FinancingCalculator } from '../components/FinancingCalculator';
import { useStore } from '../context/StoreContext';

interface VehicleDetailPageProps {
  slug: string;
  onBack: () => void;
  onSelectVehicle: (slug: string) => void;
}

export const VehicleDetailPage: React.FC<VehicleDetailPageProps> = ({ 
  slug, 
  onBack, 
  onSelectVehicle 
}) => {
  const { isFavorite, toggleFavorite, isInComparison, addToComparison, openInquiryModal, showToast } = useStore();
  const vehicle = getVehicleBySlug(slug);

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'equipements' | 'van' | 'garantie'>('specs');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePhotoIndex(0);
  }, [slug]);

  if (!vehicle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Véhicule introuvable</h2>
        <p className="text-neutral-400 text-sm">Le modèle recherché n est plus disponible ou a été réservé.</p>
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-neutral-200 text-black font-semibold rounded-xl text-xs uppercase tracking-wider"
        >
          Retour au catalogue
        </button>
      </div>
    );
  }

  const images = vehicle.images.length > 0 ? vehicle.images : ['https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1280'];
  const fav = isFavorite(vehicle.id);
  const inComp = isInComparison(vehicle.id);
  const similarVehicles = getSimilarVehicles(vehicle, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: vehicle.title,
        text: `Découvrez cette ${vehicle.title} chez MIC AUTOMOBILE Bruxelles`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Lien du véhicule copié dans le presse-papier !');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
      {/* Top Breadcrumb & Share Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Retour au catalogue</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded-lg border border-neutral-800 transition-colors flex items-center gap-1.5"
            title="Partager"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Partager</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded-lg border border-neutral-800 transition-colors flex items-center gap-1.5"
            title="Imprimer la fiche"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fiche PDF</span>
          </button>

          <button
            onClick={() => addToComparison(vehicle.id)}
            className={`p-2 rounded-lg border transition-colors flex items-center gap-1.5 ${
              inComp ? 'bg-neutral-200 text-black border-white' : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{inComp ? 'Comparé' : 'Comparer'}</span>
          </button>

          <button
            onClick={() => toggleFavorite(vehicle.id)}
            className={`p-2 rounded-lg border transition-colors flex items-center gap-1.5 ${
              fav ? 'bg-rose-500/20 text-rose-500 border-rose-500/40' : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-rose-400'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${fav ? 'fill-rose-500' : ''}`} />
            <span className="hidden sm:inline">Favoris</span>
          </button>
        </div>
      </div>

      {/* Main Showcase: Gallery (Left) & Essential Info (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Photo Gallery - 7 cols */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Photo Box */}
          <div 
            onClick={() => setIsLightboxOpen(true)}
            className="relative aspect-[16/10] bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800 group cursor-zoom-in shadow-2xl"
          >
            <img 
              src={images[activePhotoIndex]} 
              alt={`${vehicle.title} photo ${activePhotoIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {vehicle.isVan && (
                <span className="bg-amber-400 text-black text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  VAN VIP & SUR MESURE
                </span>
              )}
              <span className="bg-neutral-900/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-neutral-700">
                {vehicle.warranty}
              </span>
            </div>

            {/* Lightbox button */}
            <button 
              className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-xl backdrop-blur-md hover:bg-white hover:text-black transition-colors"
              title="Agrandir en plein écran"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-xs text-white px-3 py-1 rounded-lg font-medium">
              Photo {activePhotoIndex + 1} / {images.length}
            </div>

            {/* Next/Prev Navigation */}
            {images.length > 1 && (
              <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhotoIndex(prev => (prev - 1 + images.length) % images.length);
                  }}
                  className="w-9 h-9 rounded-full bg-black/70 hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhotoIndex(prev => (prev + 1) % images.length);
                  }}
                  className="w-9 h-9 rounded-full bg-black/70 hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Thumbnails strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIndex(idx)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  idx === activePhotoIndex 
                    ? 'border-white scale-105 shadow-md' 
                    : 'border-neutral-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`miniature ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Pricing, Badges & Immediate Action Box - 5 cols */}
        <div className="lg:col-span-5 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-1">
              <span>{vehicle.brand} · {vehicle.category}</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>En Stock à Bruxelles</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-white leading-tight">
              {vehicle.title}
            </h1>
          </div>

          {/* Price display */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-baseline justify-between">
            <div>
              <div className="text-xs text-neutral-400 uppercase font-semibold">Prix de vente TTC</div>
              <div className="text-3xl font-extrabold text-white">{vehicle.priceFormatted}</div>
            </div>
            {vehicle.price > 0 && (
              <div className="text-right">
                <div className="text-xs text-neutral-400">Ou en leasing dès</div>
                <div className="text-sm font-bold text-amber-300">
                  {Math.round((vehicle.price * 0.85) / 60)} € / mois
                </div>
              </div>
            )}
          </div>

          {/* Key Specs chips */}
          <div className="grid grid-cols-2 gap-3 text-xs text-neutral-300">
            <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-neutral-400 shrink-0" />
              <div>
                <span className="text-[10px] text-neutral-500 block">Année</span>
                <span className="font-semibold text-white">{vehicle.year}</span>
              </div>
            </div>

            <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center gap-2.5">
              <Gauge className="w-4 h-4 text-neutral-400 shrink-0" />
              <div>
                <span className="text-[10px] text-neutral-500 block">Kilométrage</span>
                <span className="font-semibold text-white">{vehicle.mileage.toLocaleString()} km</span>
              </div>
            </div>

            <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center gap-2.5">
              <Fuel className="w-4 h-4 text-neutral-400 shrink-0" />
              <div>
                <span className="text-[10px] text-neutral-500 block">Énergie</span>
                <span className="font-semibold text-white">{vehicle.fuel}</span>
              </div>
            </div>

            <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center gap-2.5">
              <Cog className="w-4 h-4 text-neutral-400 shrink-0" />
              <div>
                <span className="text-[10px] text-neutral-500 block">Transmission</span>
                <span className="font-semibold text-white truncate">{vehicle.transmission}</span>
              </div>
            </div>

            <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center gap-2.5">
              <Users className="w-4 h-4 text-neutral-400 shrink-0" />
              <div>
                <span className="text-[10px] text-neutral-500 block">Places</span>
                <span className="font-semibold text-white">{vehicle.seats} places</span>
              </div>
            </div>

            <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-neutral-500 block">Garantie</span>
                <span className="font-semibold text-emerald-300 truncate">{vehicle.warranty}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => openInquiryModal('essai', vehicle)}
              className="w-full py-3.5 bg-gradient-to-r from-neutral-200 to-neutral-300 hover:from-white hover:to-neutral-100 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Réserver un Essai Privé</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => openInquiryModal('financement', vehicle)}
              className="w-full py-3 bg-neutral-950 hover:bg-neutral-800 text-white font-semibold rounded-xl text-xs uppercase tracking-wider border border-neutral-700 transition-colors"
            >
              Demande d Offre de Financement / Leasing
            </button>

            <a
              href={`https://wa.me/3228997450?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20la%20${encodeURIComponent(vehicle.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-emerald-950 border border-emerald-800 text-emerald-300 hover:bg-emerald-900 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contacter un Conseiller sur WhatsApp</span>
            </a>
          </div>

          {/* Location & Certifications Info */}
          <div className="pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-400 space-y-1.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-300" />
              <span>{vehicle.origin} · Jamais accidenté · Kilométrage garanti</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-300" />
              <span>Contrôle technique vierge & révision 120 points réalisée</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Technical Specs, Equipment, Van Amenities */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8 space-y-8">
        <div className="flex flex-wrap items-center gap-2 border-b border-neutral-800 pb-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'specs' ? 'bg-neutral-200 text-black font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Fiche Technique Détaillée
          </button>
          <button
            onClick={() => setActiveTab('equipements')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'equipements' ? 'bg-neutral-200 text-black font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Équipements & Options ({vehicle.features.length})
          </button>
          {vehicle.isVan && (
            <button
              onClick={() => setActiveTab('van')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'van' ? 'bg-amber-400 text-black font-bold' : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aménagements Spécifiques Van</span>
            </button>
          )}
          <button
            onClick={() => setActiveTab('garantie')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'garantie' ? 'bg-neutral-200 text-black font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Garantie & Atelier MIC
          </button>
        </div>

        {/* Tab 1: Specs */}
        {activeTab === 'specs' && (
          <div className="space-y-6 text-xs text-neutral-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-bold text-white uppercase tracking-wider text-xs border-b border-neutral-800 pb-1">
                  Moteur & Performances
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-500">Puissance fiscale / DIN :</span>
                    <span className="font-semibold text-white">{vehicle.powerCh} CH ({Math.round(vehicle.powerCh * 0.735)} kW)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-500">Cylindrée :</span>
                    <span className="font-semibold text-white">{vehicle.specs.displacement || 'N.C.'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-500">Couple moteur :</span>
                    <span className="font-semibold text-white">{vehicle.specs.torqueNm ? `${vehicle.specs.torqueNm} Nm` : 'N.C.'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-500">Vitesse maximale :</span>
                    <span className="font-semibold text-white">{vehicle.specs.topSpeedKmh ? `${vehicle.specs.topSpeedKmh} km/h` : 'N.C.'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-500">Norme d émission :</span>
                    <span className="font-semibold text-white">{vehicle.specs.emissionStandard || 'Euro 6'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-white uppercase tracking-wider text-xs border-b border-neutral-800 pb-1">
                  Châssis & Dimensions
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-500">Transmission :</span>
                    <span className="font-semibold text-white">{vehicle.transmission}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-500">Nombre de portes :</span>
                    <span className="font-semibold text-white">{vehicle.doors || 5} portes</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-500">Nombre de places :</span>
                    <span className="font-semibold text-white">{vehicle.seats} places assises</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-500">Couleur extérieure :</span>
                    <span className="font-semibold text-white">{vehicle.color}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-500">Consommation mixte :</span>
                    <span className="font-semibold text-white">{vehicle.specs.combinedConsumption || 'N.C.'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete raw description from vehicle file */}
            <div className="pt-4 border-t border-neutral-800 space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Description Complète du Véhicule</h4>
              <p className="text-xs text-neutral-400 whitespace-pre-line leading-relaxed font-mono bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
                {vehicle.description}
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Equipment */}
        {activeTab === 'equipements' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Équipements et Options Certifiés
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-neutral-300">
              {vehicle.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-neutral-900/50 p-2.5 rounded-lg border border-neutral-800/80">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Van Amenities */}
        {activeTab === 'van' && vehicle.isVan && (
          <div className="space-y-4 text-xs">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Caractéristiques & Aménagements Spécifiques</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-2">
                <span className="font-bold text-white text-sm">Espace Salon & Couchage</span>
                <p className="text-neutral-400 leading-relaxed">
                  Configuration modulaire avec sièges grand confort montés sur rails, table de conférence ou lit double intégré selon la configuration.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-2">
                <span className="font-bold text-white text-sm">Équipements Électriques & Confort</span>
                <p className="text-neutral-400 leading-relaxed">
                  Prises 12V / USB-C, convertisseur électrique 230V, vitrage surteinté athermique et éclairage d ambiance LED tamisé.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Guarantee & Atelier */}
        {activeTab === 'garantie' && (
          <div className="space-y-4 text-xs text-neutral-300">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              La Charte de Confiance MIC AUTOMOBILE
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 space-y-2">
                <ShieldCheck className="w-6 h-6 text-amber-300" />
                <h5 className="font-bold text-white text-sm">Garantie 24 Mois</h5>
                <p className="text-neutral-400 leading-relaxed">
                  Couvre les organes mécaniques majeurs, moteur, boîte et électronique avec prise en charge dans tout le réseau agréé européen.
                </p>
              </div>

              <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 space-y-2">
                <Award className="w-6 h-6 text-emerald-400" />
                <h5 className="font-bold text-white text-sm">Contrôle 120 Points</h5>
                <p className="text-neutral-400 leading-relaxed">
                  Vérification approfondie du châssis, de la carrosserie, du système de freinage, des liaisons au sol et du système antipollution.
                </p>
              </div>

              <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 space-y-2">
                <CheckCircle2 className="w-6 h-6 text-neutral-200" />
                <h5 className="font-bold text-white text-sm">Historique & Car-Pass</h5>
                <p className="text-neutral-400 leading-relaxed">
                  Kilométrage certifié conforme, carnet d entretien complet et traçabilité constructeur vérifiée avant chaque mise en vente.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Integrated Financing Calculator pre-filled with this vehicle */}
      <FinancingCalculator vehicle={vehicle} />

      {/* Similar Vehicles Section */}
      {similarVehicles.length > 0 && (
        <div className="space-y-6 pt-8 border-t border-neutral-800">
          <div>
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Recommandations</span>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
              Véhicules Similaires Disponibles
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarVehicles.map(v => (
              <VehicleCard
                key={v.id}
                vehicle={v}
                onSelect={onSelectVehicle}
              />
            ))}
          </div>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 animate-fade-in">
          {/* Lightbox header */}
          <div className="flex items-center justify-between text-white text-xs px-2">
            <div>
              <span className="font-bold">{vehicle.title}</span> — Photo {activePhotoIndex + 1} sur {images.length}
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Image */}
          <div className="relative flex-1 flex items-center justify-center p-4">
            <img 
              src={images[activePhotoIndex]} 
              alt="Plein écran" 
              className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
            />

            {/* Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActivePhotoIndex(prev => (prev - 1 + images.length) % images.length)}
                  className="absolute left-6 w-12 h-12 rounded-full bg-black/70 hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors shadow-2xl"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setActivePhotoIndex(prev => (prev + 1) % images.length)}
                  className="absolute right-6 w-12 h-12 rounded-full bg-black/70 hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors shadow-2xl"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails row */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIndex(idx)}
                className={`w-14 h-10 rounded border transition-all shrink-0 ${
                  idx === activePhotoIndex ? 'border-white scale-110' : 'border-neutral-800 opacity-50'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover rounded" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
