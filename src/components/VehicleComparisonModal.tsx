import React from 'react';
import { X, Check, ArrowRight, Trash2, Gauge, Calendar, Fuel, Cog, ShieldCheck, Users } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { VEHICLES_DATA } from '../data/vehicles';
import { Vehicle } from '../types/vehicle';

interface VehicleComparisonModalProps {
  onSelectVehicle: (slug: string) => void;
}

export const VehicleComparisonModal: React.FC<VehicleComparisonModalProps> = ({ onSelectVehicle }) => {
  const { comparisonList, removeFromComparison, clearComparison, isCompareModalOpen, closeCompareModal } = useStore();

  if (!isCompareModalOpen) return null;

  const vehicles: Vehicle[] = comparisonList
    .map(id => VEHICLES_DATA.find(v => v.id === id))
    .filter((v): v is Vehicle => Boolean(v));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Comparateur de Véhicules</span>
              <span className="text-xs bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full font-normal">
                {vehicles.length} / 4 véhicules
              </span>
            </h2>
            <p className="text-xs text-neutral-400">Comparez les caractéristiques techniques et tarifs côte à côte</p>
          </div>

          <div className="flex items-center gap-3">
            {vehicles.length > 0 && (
              <button
                onClick={clearComparison}
                className="text-xs text-neutral-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Effacer tout</span>
              </button>
            )}
            <button
              onClick={closeCompareModal}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {vehicles.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-neutral-400 text-sm">Aucun véhicule dans votre liste de comparaison.</p>
            <p className="text-xs text-neutral-500">
              Cliquez sur l icône de comparaison sur n importe quelle fiche du catalogue pour l ajouter ici.
            </p>
            <button
              onClick={closeCompareModal}
              className="mt-4 px-5 py-2.5 bg-neutral-200 hover:bg-white text-black font-semibold rounded-xl text-xs transition-colors"
            >
              Parcourir le catalogue
            </button>
          </div>
        ) : (
          <div className="p-6 overflow-x-auto">
            <div className="grid grid-flow-col auto-cols-[minmax(240px,1fr)] gap-4 min-w-[600px]">
              {vehicles.map(v => (
                <div key={v.id} className="bg-neutral-950/70 rounded-xl border border-neutral-800 p-4 flex flex-col justify-between space-y-4">
                  {/* Photo & title */}
                  <div>
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-900 mb-3">
                      <img 
                        src={v.images[0] || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400'} 
                        alt={v.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeFromComparison(v.id)}
                        className="absolute top-2 right-2 p-1 rounded-md bg-black/70 text-neutral-400 hover:text-white hover:bg-rose-600 transition-colors"
                        title="Retirer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                      {v.brand}
                    </span>
                    <h3 className="text-sm font-bold text-white line-clamp-1 mb-1">{v.title}</h3>
                    <div className="text-base font-extrabold text-amber-300">{v.priceFormatted}</div>
                  </div>

                  {/* Specs Comparison List */}
                  <div className="space-y-2.5 text-xs text-neutral-300 border-t border-neutral-800/80 pt-3">
                    <div className="flex justify-between py-1 border-b border-neutral-900">
                      <span className="text-neutral-500">Année :</span>
                      <span className="font-semibold text-white">{v.year}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-neutral-900">
                      <span className="text-neutral-500">Kilométrage :</span>
                      <span className="font-semibold text-white">{v.mileage.toLocaleString()} km</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-neutral-900">
                      <span className="text-neutral-500">Carburant :</span>
                      <span className="font-semibold text-white">{v.fuel}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-neutral-900">
                      <span className="text-neutral-500">Transmission :</span>
                      <span className="font-semibold text-white">{v.transmission}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-neutral-900">
                      <span className="text-neutral-500">Puissance :</span>
                      <span className="font-semibold text-white">{v.powerCh} CH</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-neutral-900">
                      <span className="text-neutral-500">Places :</span>
                      <span className="font-semibold text-white">{v.seats} places</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-neutral-900">
                      <span className="text-neutral-500">Garantie :</span>
                      <span className="font-semibold text-emerald-400">{v.warranty}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-neutral-900">
                      <span className="text-neutral-500">Origine :</span>
                      <span className="text-neutral-300 text-[11px] truncate">{v.origin}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => {
                      closeCompareModal();
                      onSelectVehicle(v.slug);
                    }}
                    className="w-full py-2 bg-neutral-800 hover:bg-neutral-200 hover:text-black text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Consulter la fiche</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
