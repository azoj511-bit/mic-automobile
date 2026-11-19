import React, { useState } from 'react';
import { 
  Lock, Car, Users, Calendar, Download, Search, CheckCircle2, 
  Clock, ArrowUpRight, ShieldCheck, Sparkles, SlidersHorizontal 
} from 'lucide-react';
import { VEHICLES_DATA } from '../data/vehicles';
import { useStore } from '../context/StoreContext';

export const AdminPage: React.FC = () => {
  const { inquiries, bookings, customConfigs } = useStore();
  const [activeTab, setActiveTab] = useState<'stock' | 'inquiries' | 'bookings' | 'custom'>('stock');
  const [searchTerm, setSearchTerm] = useState('');

  const totalValue = VEHICLES_DATA.reduce((acc, v) => acc + (v.price || 0), 0);
  const vansCount = VEHICLES_DATA.filter(v => v.isVan).length;

  const filteredVehicles = VEHICLES_DATA.filter(v => 
    v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportStockCSV = () => {
    const headers = ['ID', 'Marque', 'Modèle', 'Catégorie', 'Année', 'Km', 'Prix (EUR)', 'Carburant', 'Boîte', 'Places', 'Garantie'];
    const rows = VEHICLES_DATA.map(v => [
      v.id,
      `"${v.brand}"`,
      `"${v.title.replace(/"/g, '""')}"`,
      v.category,
      v.year,
      v.mileage,
      v.price,
      v.fuel,
      v.transmission,
      v.seats,
      `"${v.warranty}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MIC_AUTOMOBILE_Stock_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-10">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300 mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Tableau de Bord Interne · Équipe MIC AUTOMOBILE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Gestion du Parc & Demandes Clients
          </h1>
        </div>

        <button
          onClick={exportStockCSV}
          className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow"
        >
          <Download className="w-4 h-4" />
          <span>Exporter le Stock (CSV)</span>
        </button>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-2xl space-y-1">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Total Véhicules</span>
          <div className="text-2xl md:text-3xl font-extrabold text-white">{VEHICLES_DATA.length}</div>
          <span className="text-[10px] text-neutral-500">100% en stock physique</span>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-2xl space-y-1">
          <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider">Vans VIP & Aménagés</span>
          <div className="text-2xl md:text-3xl font-extrabold text-amber-300">{vansCount}</div>
          <span className="text-[10px] text-neutral-500">10 créations exclusives</span>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-2xl space-y-1">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Valeur du Stock</span>
          <div className="text-2xl md:text-3xl font-extrabold text-white">
            {(totalValue / 1000000).toFixed(2)} M€
          </div>
          <span className="text-[10px] text-neutral-500">Prix moyen : {Math.round(totalValue / VEHICLES_DATA.length).toLocaleString()} €</span>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-2xl space-y-1">
          <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Demandes en Cours</span>
          <div className="text-2xl md:text-3xl font-extrabold text-emerald-400">
            {inquiries.length + bookings.length + customConfigs.length}
          </div>
          <span className="text-[10px] text-neutral-500">Essais, RDV atelier & devis</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('stock')}
          className={`px-4 py-2 rounded-xl transition-colors ${activeTab === 'stock' ? 'bg-neutral-200 text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
        >
          Catalogue Stock ({VEHICLES_DATA.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${activeTab === 'inquiries' ? 'bg-neutral-200 text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
        >
          <span>Demandes Essais & Info</span>
          <span className="bg-neutral-800 px-1.5 py-0.5 rounded-full text-[10px]">{inquiries.length}</span>
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${activeTab === 'bookings' ? 'bg-neutral-200 text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
        >
          <span>Rendez-vous Atelier</span>
          <span className="bg-neutral-800 px-1.5 py-0.5 rounded-full text-[10px]">{bookings.length}</span>
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${activeTab === 'custom' ? 'bg-neutral-200 text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
        >
          <span>Configurations Vans</span>
          <span className="bg-neutral-800 px-1.5 py-0.5 rounded-full text-[10px]">{customConfigs.length}</span>
        </button>
      </div>

      {/* Tab 1: Stock Table */}
      {activeTab === 'stock' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filtrer le tableau par marque, modèle..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
              />
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            </div>

            <span className="text-xs text-neutral-500">
              Affichage de {filteredVehicles.length} véhicules
            </span>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-neutral-900 text-neutral-400 uppercase text-[10px] font-bold tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="px-4 py-3">Photo</th>
                  <th className="px-4 py-3">Réf / Marque</th>
                  <th className="px-4 py-3">Modèle</th>
                  <th className="px-4 py-3">Catégorie</th>
                  <th className="px-4 py-3">Année / Km</th>
                  <th className="px-4 py-3">Prix TTC</th>
                  <th className="px-4 py-3">Garantie</th>
                  <th className="px-4 py-3">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {filteredVehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-neutral-900/50 transition-colors">
                    <td className="px-4 py-2.5">
                      <img 
                        src={v.images[0] || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=100'} 
                        alt="" 
                        className="w-12 h-9 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="font-bold text-white block">{v.brand}</span>
                      <span className="text-[10px] text-neutral-500 font-mono">{v.id}</span>
                    </td>
                    <td className="px-4 py-2.5 font-medium text-white max-w-xs truncate">
                      {v.title}
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        v.isVan ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30' : 'bg-neutral-900 text-neutral-300'
                      }`}>
                        {v.category}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <div>{v.year}</div>
                      <div className="text-neutral-500 text-[10px]">{v.mileage.toLocaleString()} km</div>
                    </td>
                    <td className="px-4 py-2.5 font-bold text-amber-300">
                      {v.priceFormatted}
                    </td>
                    <td className="px-4 py-2.5 text-neutral-400 text-[11px]">
                      {v.warranty}
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="bg-emerald-950 border border-emerald-800 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-medium">
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Inquiries Table */}
      {activeTab === 'inquiries' && (
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
          {inquiries.length === 0 ? (
            <div className="p-12 text-center text-xs text-neutral-500">
              Aucune demande client enregistrée pour l instant.
            </div>
          ) : (
            <div className="divide-y divide-neutral-900">
              {inquiries.map(inq => (
                <div key={inq.id} className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{inq.name}</span>
                      <span className="bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded text-[10px] uppercase font-semibold">
                        {inq.type}
                      </span>
                      {inq.vehicleTitle && (
                        <span className="text-amber-300 font-medium truncate max-w-xs">
                          {inq.vehicleTitle}
                        </span>
                      )}
                    </div>
                    <div className="text-neutral-400">{inq.email} · {inq.phone}</div>
                    <p className="text-neutral-300 pt-1 leading-relaxed">{inq.message}</p>
                  </div>
                  <div className="text-right text-[11px] text-neutral-500 shrink-0">
                    {new Date(inq.createdAt).toLocaleString('fr-FR')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Workshop Bookings */}
      {activeTab === 'bookings' && (
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
          {bookings.length === 0 ? (
            <div className="p-12 text-center text-xs text-neutral-500">
              Aucune réservation d atelier pour le moment.
            </div>
          ) : (
            <div className="divide-y divide-neutral-900">
              {bookings.map(b => (
                <div key={b.id} className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-300">{b.id}</span>
                      <span className="font-bold text-white">{b.clientName}</span>
                      <span className="text-neutral-400">({b.clientPhone})</span>
                    </div>
                    <div className="text-white font-medium">
                      Prestation : <span className="text-neutral-300">{b.service}</span>
                    </div>
                    <div className="text-neutral-400">
                      Véhicule : {b.vehicleMakeModel} {b.licensePlate && `(${b.licensePlate})`}
                    </div>
                    {b.notes && <p className="text-neutral-500 italic pt-1">« {b.notes} »</p>}
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-bold text-white text-sm">{b.preferredDate}</div>
                    <div className="text-neutral-400">{b.preferredTime}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Custom Van Configurations */}
      {activeTab === 'custom' && (
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
          {customConfigs.length === 0 ? (
            <div className="p-12 text-center text-xs text-neutral-500">
              Aucune configuration de van personnalisée enregistrée.
            </div>
          ) : (
            <div className="divide-y divide-neutral-900">
              {customConfigs.map((c, idx) => (
                <div key={idx} className="p-5 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{c.customerName || 'Client Particulier'} ({c.customerEmail})</span>
                    <span className="text-amber-300 font-extrabold text-sm">{c.estimatedPrice.toLocaleString()} € HTVA</span>
                  </div>
                  <div className="text-neutral-300">
                    <strong>Châssis :</strong> {c.chassis} · <strong>Finition :</strong> {c.finishType}
                  </div>
                  <div className="text-neutral-400">
                    <strong>Sellerie :</strong> {c.leatherColor} · <strong>Boiserie :</strong> {c.woodTrim} · <strong>Teinte :</strong> {c.exteriorColor}
                  </div>
                  <div className="text-neutral-400">
                    <strong>Options :</strong> {[...c.multimedia, ...c.features].join(', ')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
