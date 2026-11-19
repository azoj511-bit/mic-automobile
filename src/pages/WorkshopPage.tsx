import React, { useState } from 'react';
import { 
  Wrench, Calendar, Clock, CheckCircle2, ShieldCheck, 
  Car, User, Phone, Mail, FileText, ArrowRight, Sparkles, Check
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WorkshopPage: React.FC = () => {
  const { addBooking, showToast } = useStore();

  const [service, setService] = useState('Entretien & Révision Constructeur');
  const [vehicleMakeModel, setVehicleMakeModel] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('09:30');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmedId, setConfirmedId] = useState<string | null>(null);

  const servicesList = [
    { title: 'Entretien & Révision Constructeur', desc: 'Vidange, filtres d origine, bougies et points de contrôle constructeur.', price: 'Dès 249 €' },
    { title: 'Diagnostic Électronique Multiplexé', desc: 'Lecture codes défauts, réinitialisation calculateurs, recherche de panne.', price: 'Dès 95 €' },
    { title: 'Système de Freinage', desc: 'Remplacement disques, plaquettes, liquide haute performance et purge sous pression.', price: 'Dès 180 €' },
    { title: 'Pneumatiques & Géométrie 3D', desc: 'Montage, équilibrage dynamique laser et réglage du parallélisme complet.', price: 'Dès 65 €' },
    { title: 'Climatisation & Traitement Antibactérien', desc: 'Recharge gaz R134a / R1234yf, filtre habitacle et désinfection circuit.', price: 'Dès 129 €' },
    { title: 'Aménagements Van & Accessoires', desc: 'Pose chauffage stationnaire, panneau solaire, convertisseur 230V et suspensions.', price: 'Sur devis' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone || !vehicleMakeModel || !preferredDate) {
      showToast('Veuillez renseigner les champs obligatoires');
      return;
    }

    const ref = addBooking({
      service,
      vehicleMakeModel,
      licensePlate,
      preferredDate,
      preferredTime,
      clientName,
      clientEmail,
      clientPhone,
      notes
    });

    setConfirmedId(ref);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-semibold tracking-wider uppercase">
          <Wrench className="w-3.5 h-3.5 text-amber-300" />
          <span>Atelier Spécialisé Bruxelles</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white">
          Service Mécanique, Entretien & Aménagements
        </h1>
        <p className="text-neutral-400 text-xs sm:text-sm font-light">
          Notre atelier accueille l ensemble des marques de prestige et utilitaires pour un suivi méticuleux dans le respect absolu des préconisations constructeurs.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesList.map((s) => (
          <div
            key={s.title}
            onClick={() => setService(s.title)}
            className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 ${
              service === s.title
                ? 'bg-neutral-900 border-white ring-1 ring-white/50 shadow-2xl'
                : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded">
                  {s.price}
                </span>
                {service === s.title && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
              <h3 className="font-bold text-white text-base">{s.title}</h3>
              <p className="text-neutral-400 text-xs mt-1.5 leading-relaxed">{s.desc}</p>
            </div>

            <div className="pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-500 font-medium">
              Garantie constructeur préservée
            </div>
          </div>
        ))}
      </div>

      {/* Booking Form Section */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto space-y-8">
        <div className="border-b border-neutral-800 pb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-300" />
            <span>Prendre Rendez-vous en Ligne</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Sélectionnez votre prestation, date souhaitée et recevez une confirmation par e-mail.
          </p>
        </div>

        {confirmedId ? (
          <div className="p-8 text-center space-y-4 bg-neutral-900/60 rounded-2xl border border-neutral-800">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Rendez-vous Pré-enregistré !</h3>
            <p className="text-xs text-neutral-300">
              Référence du dossier : <span className="font-mono font-bold text-amber-300 text-sm">{confirmedId}</span>
            </p>
            <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
              Merci <span className="text-white font-semibold">{clientName}</span>. Votre demande d intervention ({service}) le <span className="text-white">{preferredDate} à {preferredTime}</span> a bien été notée. Notre chef d atelier vous contactera par téléphone au <span className="text-white">{clientPhone}</span> pour valider la prise en charge.
            </p>
            <button
              onClick={() => setConfirmedId(null)}
              className="mt-4 px-6 py-2.5 bg-neutral-200 hover:bg-white text-black font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors"
            >
              Nouveau Rendez-vous
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* Selected service badge */}
            <div className="bg-neutral-900 p-3.5 rounded-xl border border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Prestation choisie :</span>
                <span className="font-bold text-white text-sm">{service}</span>
              </div>
              <span className="text-amber-300 text-xs font-semibold">Garantie 24 mois</span>
            </div>

            {/* Vehicle Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Marque et Modèle du Véhicule *</label>
                <input
                  type="text"
                  required
                  value={vehicleMakeModel}
                  onChange={(e) => setVehicleMakeModel(e.target.value)}
                  placeholder="Ex: Mercedes-Benz Classe V 300d 2022"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Plaque d Immatriculation (ou VIN)</label>
                <input
                  type="text"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  placeholder="Ex: 1-ABC-123"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Date souhaitée *</label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Créneau horaire *</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-neutral-500"
                >
                  <option value="08:30">08h30 - Matin</option>
                  <option value="09:30">09h30 - Matin</option>
                  <option value="11:00">11h00 - Matin</option>
                  <option value="14:00">14h00 - Après-midi</option>
                  <option value="16:00">16h00 - Après-midi</option>
                </select>
              </div>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Nom et Prénom *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Philippe Bertrand"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Téléphone *</label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+32 4..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="philippe@email.be"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 font-semibold mb-1">Remarques ou symptômes constatés</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Bruit au freinage, voyant d entretien allumé, climatisation tiède..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 resize-none"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-neutral-200 to-neutral-300 hover:from-white hover:to-neutral-100 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Confirmer ma demande de rendez-vous</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
