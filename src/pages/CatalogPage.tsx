import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, SlidersHorizontal, Grid, List, X, RotateCcw, 
  Sparkles, Check, ChevronDown, ChevronUp, Fuel, Cog, Gauge, Calendar, Users
} from 'lucide-react';
import { VEHICLES_DATA } from '../data/vehicles';
import { VehicleCard } from '../components/VehicleCard';
import { VehicleCategory, FuelType, TransmissionType, Vehicle } from '../types/vehicle';
import { useStore } from '../context/StoreContext';

interface CatalogPageProps {
  onSelectVehicle: (slug: string) => void;
  initialQuery?: string;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ onSelectVehicle, initialQuery = '' }) => {
  const { favorites } = useStore();

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedFuel, setSelectedFuel] = useState<string>('');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(300000);
  const [maxKm, setMaxKm] = useState<number>(200000);
  const [minYear, setMinYear] = useState<number>(2005);
  const [minSeats, setMinSeats] = useState<number>(0);
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [onlyVans, setOnlyVans] = useState<boolean>(false);

  // Van-specific options
  const [vanFilterBed, setVanFilterBed] = useState(false);
  const [vanFilterKitchen, setVanFilterKitchen] = useState(false);
  const [vanFilterVip, setVanFilterVip] = useState(false);
  const [vanFilterPopUp, setVanFilterPopUp] = useState(false);

  // Display and sorting
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'km-asc' | 'year-desc'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Mobile sidebar drawer
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Parse initial query params if any
  useEffect(() => {
    if (initialQuery) {
      if (initialQuery.includes('favoris=1')) {
        setOnlyFavorites(true);
      }
      if (initialQuery.includes('categorie=Van')) {
        setSelectedCategory('Van / Utilitaire');
      } else if (initialQuery.includes('categorie=SUV')) {
        setSelectedCategory('SUV / 4x4');
      } else if (initialQuery.includes('categorie=Berline')) {
        setSelectedCategory('Berline');
      } else if (initialQuery.includes('categorie=Sportive')) {
        setSelectedCategory('Sportive / Coupé');
      }
      const m = initialQuery.match(/marque=([^&]+)/);
      if (m) setSelectedBrand(decodeURIComponent(m[1]));
      const b = initialQuery.match(/budgetMax=(\d+)/);
      if (b) setMaxPrice(Number(b[1]));
    }
  }, [initialQuery]);

  // Unique lists for dropdowns
  const brands = useMemo(() => {
    return Array.from(new Set(VEHICLES_DATA.map(v => v.brand))).sort();
  }, []);

  const categories: VehicleCategory[] = [
    'Van / Utilitaire',
    'SUV / 4x4',
    'Berline',
    'Sportive / Coupé',
    'Break',
    'Citadine'
  ];

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('');
    setSelectedCategory('');
    setSelectedFuel('');
    setSelectedTransmission('');
    setMinPrice(0);
    setMaxPrice(300000);
    setMaxKm(200000);
    setMinYear(2005);
    setMinSeats(0);
    setOnlyFavorites(false);
    setOnlyVans(false);
    setVanFilterBed(false);
    setVanFilterKitchen(false);
    setVanFilterVip(false);
    setVanFilterPopUp(false);
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredVehicles = useMemo(() => {
    return VEHICLES_DATA.filter(v => {
      // Favorites filter
      if (onlyFavorites && !favorites.includes(v.id)) return false;

      // Only Vans quick toggle
      if (onlyVans && !v.isVan) return false;

      // Text search
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = v.title.toLowerCase().includes(term);
        const matchesBrand = v.brand.toLowerCase().includes(term);
        const matchesModel = v.model.toLowerCase().includes(term);
        const matchesDesc = v.description.toLowerCase().includes(term);
        const matchesFeat = v.features.some(f => f.toLowerCase().includes(term));
        if (!matchesTitle && !matchesBrand && !matchesModel && !matchesDesc && !matchesFeat) {
          return false;
        }
      }

      // Brand
      if (selectedBrand && v.brand !== selectedBrand) return false;

      // Category
      if (selectedCategory && v.category !== selectedCategory) return false;

      // Fuel
      if (selectedFuel && v.fuel !== selectedFuel) return false;

      // Transmission
      if (selectedTransmission && v.transmission !== selectedTransmission) return false;

      // Price range
      if (v.price > 0 && (v.price < minPrice || v.price > maxPrice)) return false;

      // Max Km
      if (v.mileage > maxKm) return false;

      // Min Year
      if (v.year < minYear) return false;

      // Min Seats
      if (minSeats > 0 && v.seats < minSeats) return false;

      // Van options
      if (vanFilterBed && !v.vanAmenities?.hasBed) return false;
      if (vanFilterKitchen && !v.vanAmenities?.hasKitchen) return false;
      if (vanFilterVip && !v.vanAmenities?.hasVipLounge) return false;
      if (vanFilterPopUp && !v.vanAmenities?.hasPopUpRoof) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return (a.price || 999999) - (b.price || 999999);
      if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'km-asc') return a.mileage - b.mileage;
      if (sortBy === 'year-desc') return b.year - a.year;
      // 'newest' default
      return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0) || b.year - a.year;
    });
  }, [
    searchTerm, selectedBrand, selectedCategory, selectedFuel, selectedTransmission,
    minPrice, maxPrice, maxKm, minYear, minSeats, onlyFavorites, onlyVans,
    vanFilterBed, vanFilterKitchen, vanFilterVip, vanFilterPopUp, sortBy, favorites
  ]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catalogue Officiel MIC AUTOMOBILE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Parc Automobile & Vans en Stock
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            {filteredVehicles.length} véhicules disponibles à l essai immédiat et garantis 24 mois
          </p>
        </div>

        {/* View Mode & Sorting */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white font-semibold flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filtres ({[selectedBrand, selectedCategory, selectedFuel].filter(Boolean).length})</span>
          </button>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-white">
            <span className="text-neutral-500 hidden sm:inline">Trier par :</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              <option value="newest" className="bg-neutral-900">Nouveautés d abord</option>
              <option value="price-asc" className="bg-neutral-900">Prix : Croissant</option>
              <option value="price-desc" className="bg-neutral-900">Prix : Décroissant</option>
              <option value="km-asc" className="bg-neutral-900">Kilométrage : Plus faible</option>
              <option value="year-desc" className="bg-neutral-900">Année : Plus récente</option>
            </select>
          </div>

          {/* Grid/List switch */}
          <div className="hidden sm:flex items-center bg-neutral-900 border border-neutral-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-white'}`}
              title="Affichage grille"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-white'}`}
              title="Affichage liste"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* DESKTOP FILTERS SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-1 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 space-y-6 sticky top-28 shadow-xl">
          <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-neutral-300" />
              <span>Filtres de recherche</span>
            </h2>
            <button
              onClick={resetFilters}
              className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
              title="Réinitialiser"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Effacer</span>
            </button>
          </div>

          {/* Keyword Search */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300">Recherche libre</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ex: RS6, V-Class, Burmester..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
              />
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="absolute right-3 top-2.5 text-neutral-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Filter Pill: Vans Only */}
          <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-bold text-white">Vans VIP & Aménagés</span>
            </div>
            <input
              type="checkbox"
              checked={onlyVans || selectedCategory === 'Van / Utilitaire'}
              onChange={(e) => {
                setOnlyVans(e.target.checked);
                if (e.target.checked) setSelectedCategory('Van / Utilitaire');
                else if (selectedCategory === 'Van / Utilitaire') setSelectedCategory('');
              }}
              className="rounded bg-neutral-800 border-neutral-700 text-amber-400 focus:ring-0 cursor-pointer"
            />
          </div>

          {/* Marque */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300">Marque</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-500"
            >
              <option value="">Toutes les marques ({brands.length})</option>
              {brands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Carrosserie / Catégorie */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300">Catégorie</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-500"
            >
              <option value="">Toutes les carrosseries</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Carburant */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300">Carburant</label>
            <select
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-500"
            >
              <option value="">Toutes les énergies</option>
              <option value="Diesel">Diesel</option>
              <option value="Essence">Essence</option>
              <option value="Hybride">Hybride / PHEV</option>
              <option value="Électrique">100% Électrique</option>
            </select>
          </div>

          {/* Boîte de vitesses */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300">Boîte de vitesses</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedTransmission(selectedTransmission === 'Automatique' ? '' : 'Automatique')}
                className={`py-2 text-xs font-medium rounded-lg border text-center transition-all ${
                  selectedTransmission === 'Automatique'
                    ? 'bg-neutral-200 text-black border-white font-bold'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                Automatique
              </button>
              <button
                type="button"
                onClick={() => setSelectedTransmission(selectedTransmission === 'Manuelle' ? '' : 'Manuelle')}
                className={`py-2 text-xs font-medium rounded-lg border text-center transition-all ${
                  selectedTransmission === 'Manuelle'
                    ? 'bg-neutral-200 text-black border-white font-bold'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                Manuelle
              </button>
            </div>
          </div>

          {/* Budget Max */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-neutral-400 font-semibold">Budget max</span>
              <span className="text-white font-bold">{maxPrice.toLocaleString()} €</span>
            </div>
            <input
              type="range"
              min="10000"
              max="280000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-neutral-200"
            />
          </div>

          {/* Kilométrage Max */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-neutral-400 font-semibold">Kilométrage max</span>
              <span className="text-white font-bold">{maxKm.toLocaleString()} km</span>
            </div>
            <input
              type="range"
              min="10000"
              max="160000"
              step="5000"
              value={maxKm}
              onChange={(e) => setMaxKm(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-neutral-200"
            />
          </div>

          {/* Nombre de places */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300">Nombre de places minimum</label>
            <div className="flex gap-1.5">
              {[0, 4, 5, 7, 8, 9].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setMinSeats(minSeats === s ? 0 : s)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    minSeats === s
                      ? 'bg-neutral-200 text-black border-white'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                  }`}
                >
                  {s === 0 ? 'Tous' : `${s}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Van Specific Amenities (shown if Van is selected or user explores options) */}
          {(selectedCategory === 'Van / Utilitaire' || onlyVans) && (
            <div className="p-3 bg-amber-950/20 border border-amber-900/40 rounded-xl space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                Équipements Spécifiques Van
              </div>
              <div className="space-y-1.5 text-xs text-neutral-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vanFilterVip}
                    onChange={(e) => setVanFilterVip(e.target.checked)}
                    className="rounded bg-neutral-900 border-neutral-700 text-amber-400"
                  />
                  <span>Salon Conférence / Cuir VIP</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vanFilterBed}
                    onChange={(e) => setVanFilterBed(e.target.checked)}
                    className="rounded bg-neutral-900 border-neutral-700 text-amber-400"
                  />
                  <span>Lit / Banquette convertible</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vanFilterKitchen}
                    onChange={(e) => setVanFilterKitchen(e.target.checked)}
                    className="rounded bg-neutral-900 border-neutral-700 text-amber-400"
                  />
                  <span>Bloc Cuisine / Frigo</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vanFilterPopUp}
                    onChange={(e) => setVanFilterPopUp(e.target.checked)}
                    className="rounded bg-neutral-900 border-neutral-700 text-amber-400"
                  />
                  <span>Toit relevable avec couchage</span>
                </label>
              </div>
            </div>
          )}
        </aside>

        {/* RESULTS SECTION */}
        <main className="lg:col-span-3 space-y-6">
          {/* Active Filters Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {selectedBrand && (
              <span className="inline-flex items-center gap-1.5 bg-neutral-900 text-neutral-200 border border-neutral-800 px-3 py-1 rounded-full text-xs">
                <span>Marque : {selectedBrand}</span>
                <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedBrand('')} />
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1.5 bg-neutral-900 text-neutral-200 border border-neutral-800 px-3 py-1 rounded-full text-xs">
                <span>Catégorie : {selectedCategory}</span>
                <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedCategory('')} />
              </span>
            )}
            {selectedFuel && (
              <span className="inline-flex items-center gap-1.5 bg-neutral-900 text-neutral-200 border border-neutral-800 px-3 py-1 rounded-full text-xs">
                <span>Carburant : {selectedFuel}</span>
                <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedFuel('')} />
              </span>
            )}
            {onlyFavorites && (
              <span className="inline-flex items-center gap-1.5 bg-rose-950/60 text-rose-300 border border-rose-900/60 px-3 py-1 rounded-full text-xs">
                <span>Favoris uniquement ({favorites.length})</span>
                <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setOnlyFavorites(false)} />
              </span>
            )}
          </div>

          {/* Zero Results State */}
          {filteredVehicles.length === 0 ? (
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-neutral-900 text-neutral-400 flex items-center justify-center mx-auto border border-neutral-800">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Aucun véhicule ne correspond exactement à vos critères</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                Modifiez vos filtres ou réinitialisez la recherche pour découvrir nos 73 véhicules actuellement disponibles.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-neutral-200 hover:bg-white text-black font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinitialiser les filtres</span>
              </button>
            </div>
          ) : (
            <>
              {/* Vehicles List / Grid */}
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {paginatedVehicles.map(v => (
                  <VehicleCard
                    key={v.id}
                    vehicle={v}
                    onSelect={onSelectVehicle}
                    layout={viewMode}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pt-8 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <div className="text-neutral-500">
                    Page <span className="text-white font-semibold">{currentPage}</span> sur <span className="text-white font-semibold">{totalPages}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => {
                        setCurrentPage(prev => Math.max(1, prev - 1));
                        window.scrollTo({ top: 100, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-800"
                    >
                      Précédent
                    </button>

                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <button
                        key={idx + 1}
                        onClick={() => {
                          setCurrentPage(idx + 1);
                          window.scrollTo({ top: 100, behavior: 'smooth' });
                        }}
                        className={`w-8 h-8 rounded-lg font-semibold transition-colors ${
                          currentPage === idx + 1
                            ? 'bg-neutral-200 text-black'
                            : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        setCurrentPage(prev => Math.min(totalPages, prev + 1));
                        window.scrollTo({ top: 100, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-800"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* MOBILE FILTERS MODAL */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-6 max-w-lg mx-auto w-full pb-8">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filtrer les Véhicules</span>
              </h3>
              <button 
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1 rounded text-neutral-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Marque */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">Marque</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white"
              >
                <option value="">Toutes les marques</option>
                {brands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Catégorie */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">Catégorie</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white"
              >
                <option value="">Toutes les catégories</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Carburant */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">Carburant</label>
              <select
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white"
              >
                <option value="">Tous</option>
                <option value="Diesel">Diesel</option>
                <option value="Essence">Essence</option>
                <option value="Hybride">Hybride</option>
                <option value="Électrique">Électrique</option>
              </select>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 bg-neutral-900 border border-neutral-800 text-white rounded-xl text-xs font-semibold"
              >
                Effacer tout
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-1 py-3 bg-neutral-200 text-black rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Voir les résultats ({filteredVehicles.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
