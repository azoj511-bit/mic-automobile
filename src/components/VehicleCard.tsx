import React, { useState } from 'react';
import { 
  Heart, SlidersHorizontal, Gauge, Calendar, Fuel, Cog, 
  Users, ShieldCheck, ChevronLeft, ChevronRight, Sparkles, ArrowUpRight
} from 'lucide-react';
import { Vehicle } from '../types/vehicle';
import { useStore } from '../context/StoreContext';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (slug: string) => void;
  layout?: 'grid' | 'list';
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ 
  vehicle, 
  onSelect,
  layout = 'grid' 
}) => {
  const { isFavorite, toggleFavorite, isInComparison, addToComparison, openInquiryModal } = useStore();
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const images = vehicle.images.length > 0 ? vehicle.images : ['https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800'];
  const fav = isFavorite(vehicle.id);
  const inComp = isInComparison(vehicle.id);

  // Fallback monthly estimation
  const monthlyEstimate = vehicle.price > 0 
    ? Math.round((vehicle.price * 0.85) / 60) 
    : null;

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(vehicle.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToComparison(vehicle.id);
  };

  if (layout === 'list') {
    return (
      <div 
        onClick={() => onSelect(vehicle.slug)}
        className="group bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col md:flex-row cursor-pointer shadow-lg hover:shadow-2xl"
      >
        {/* Media */}
        <div className="relative md:w-80 h-56 md:h-auto shrink-0 bg-neutral-950 overflow-hidden">
          <img 
            src={images[activeImgIndex]} 
            alt={vehicle.title} 
            loading="lazy"
            onError={(e) => {
              // fallback if local path has loading issue
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {vehicle.isVan && (
              <span className="bg-amber-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                <Sparkles className="w-2.5 h-2.5" />
                VAN VIP
              </span>
            )}
            {vehicle.isNewArrival && (
              <span className="bg-neutral-100 text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                NOUVEAUTÉ
              </span>
            )}
          </div>

          {/* Photos count */}
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-[11px] text-white px-2 py-0.5 rounded-md font-medium">
            {images.length} photos
          </div>

          {/* Arrows */}
          {images.length > 1 && (
            <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={prevImg}
                className="w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={nextImg}
                className="w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs text-neutral-400 uppercase tracking-widest font-semibold">
                  {vehicle.brand}
                </span>
                <h3 className="text-base md:text-lg font-bold text-white group-hover:text-neutral-200 transition-colors line-clamp-1">
                  {vehicle.title}
                </h3>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCompareClick}
                  title="Comparer"
                  className={`p-2 rounded-lg border transition-colors ${
                    inComp ? 'bg-neutral-200 text-black border-white' : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
                <button
                  onClick={handleFavoriteClick}
                  title="Favoris"
                  className={`p-2 rounded-lg border transition-colors ${
                    fav ? 'bg-rose-500/20 text-rose-500 border-rose-500/40' : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-rose-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${fav ? 'fill-rose-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Specs bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 text-xs text-neutral-300">
              <div className="flex items-center gap-2 bg-neutral-950/60 p-2 rounded-lg border border-neutral-800/80">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                <span>{vehicle.year}</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-950/60 p-2 rounded-lg border border-neutral-800/80">
                <Gauge className="w-3.5 h-3.5 text-neutral-400" />
                <span>{vehicle.mileage.toLocaleString()} km</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-950/60 p-2 rounded-lg border border-neutral-800/80">
                <Fuel className="w-3.5 h-3.5 text-neutral-400" />
                <span>{vehicle.fuel}</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-950/60 p-2 rounded-lg border border-neutral-800/80">
                <Users className="w-3.5 h-3.5 text-neutral-400" />
                <span>{vehicle.seats} places</span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
              {vehicle.description.slice(0, 180)}...
            </p>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-4 mt-2">
            <div>
              <div className="text-xl md:text-2xl font-extrabold text-white">
                {vehicle.priceFormatted}
              </div>
              {monthlyEstimate && (
                <div className="text-[11px] text-neutral-400">
                  Ou dès <span className="text-neutral-200 font-semibold">{monthlyEstimate} €/mois</span> sans apport
                </div>
              )}
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                onSelect(vehicle.slug);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-neutral-200 to-neutral-300 hover:from-white hover:to-neutral-100 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all"
            >
              <span>Découvrir</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout (Default)
  return (
    <div 
      onClick={() => onSelect(vehicle.slug)}
      className="group bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1"
    >
      {/* Media Carousel */}
      <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden">
        <img 
          src={images[activeImgIndex]} 
          alt={vehicle.title} 
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {vehicle.isVan && (
            <span className="bg-amber-400 text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
              <Sparkles className="w-2.5 h-2.5" />
              VAN VIP
            </span>
          )}
          {vehicle.isNewArrival && (
            <span className="bg-neutral-100 text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
              NOUVEAUTÉ
            </span>
          )}
          <span className="bg-neutral-900/80 backdrop-blur-sm text-neutral-300 text-[10px] font-medium px-2 py-0.5 rounded-full border border-neutral-700">
            {vehicle.category}
          </span>
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={handleCompareClick}
            title={inComp ? 'Retirer du comparateur' : 'Ajouter au comparateur'}
            className={`p-1.5 rounded-lg backdrop-blur-md transition-all ${
              inComp ? 'bg-white text-black shadow-lg scale-105' : 'bg-black/60 text-white/80 hover:bg-black hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleFavoriteClick}
            title={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            className={`p-1.5 rounded-lg backdrop-blur-md transition-all ${
              fav ? 'bg-rose-600 text-white shadow-lg scale-105' : 'bg-black/60 text-white/80 hover:bg-black hover:text-rose-400'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${fav ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Dots Navigation */}
        {images.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1 pointer-events-none">
            {images.slice(0, Math.min(5, images.length)).map((_, idx) => (
              <span 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === activeImgIndex ? 'bg-white w-4' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Navigation Arrows on Hover */}
        {images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={prevImg}
              className="w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextImg}
              className="w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="absolute bottom-2 left-3 text-[10px] text-neutral-300 font-medium bg-black/50 px-2 py-0.5 rounded">
          {images.length} photos réelles
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-1">
            <span>{vehicle.brand}</span>
            <span className="text-neutral-500 text-[11px]">{vehicle.powerCh} CH</span>
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-neutral-200 transition-colors line-clamp-1 mb-3">
            {vehicle.title}
          </h3>

          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-300 bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-800/80 mb-4">
            <div className="flex items-center gap-1.5 truncate">
              <Calendar className="w-3 h-3 text-neutral-400 shrink-0" />
              <span>{vehicle.year}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Gauge className="w-3 h-3 text-neutral-400 shrink-0" />
              <span>{vehicle.mileage.toLocaleString()} km</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Fuel className="w-3 h-3 text-neutral-400 shrink-0" />
              <span>{vehicle.fuel}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Cog className="w-3 h-3 text-neutral-400 shrink-0" />
              <span>{vehicle.transmission}</span>
            </div>
          </div>
        </div>

        {/* Pricing and Action */}
        <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-extrabold text-white">
              {vehicle.priceFormatted}
            </div>
            <div className="text-[10px] text-amber-300/90 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>{vehicle.warranty}</span>
            </div>
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSelect(vehicle.slug);
            }}
            className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-200 text-neutral-200 hover:text-black text-xs font-semibold tracking-wide transition-all flex items-center gap-1"
          >
            <span>Détails</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
